import {
    Keypair,
    Connection,
    PublicKey,
    SystemProgram,
    Transaction,
    sendAndConfirmTransaction,
    LAMPORTS_PER_SOL
} from '@solana/web3.js';
import { NATIVE_MINT, approve, createMint, createAccount, createApproveInstruction, createInitializeAccountInstruction, getAccount, getMint, getMinimumBalanceForRentExemptAccount, mintTo, AccountLayout, TOKEN_PROGRAM_ID } from '@solana/spl-token';

import { TokenSwap, CurveType, TOKEN_SWAP_PROGRAM_ID } from '..';
import { newAccountWithLamports, requestSolToken } from './new-account-with-lamports';
import { sleep } from './sleep';
import { bs58 } from '@coral-xyz/anchor/dist/cjs/utils/bytes';
import * as connection from './connection';
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

const SWAP_PROGRAM_OWNER_FEE_ADDRESS =
  process.env.SWAP_PROGRAM_OWNER_FEE_ADDRESS;

export async function createPool(connection: Connection, tokenSwapAccount: Keypair, payer: Keypair, owner: Keypair): 
                Promise<{ tokenAccountPool: PublicKey, tokenPool: PublicKey, feeAccount: PublicKey }> {
    const [authority, bumpSeed] = await PublicKey.findProgramAddressSync(
        [tokenSwapAccount.publicKey.toBuffer()],
        TOKEN_SWAP_PROGRAM_ID,
    );

    console.log("\nauthority:" + authority.toBase58());

    console.log('\ncreating pool mint');
    let tokenPool = await createMint(
        connection,
        payer,
        authority,
        null,
        2,
        Keypair.generate(),
        undefined,
        TOKEN_PROGRAM_ID,
    );

    console.log("\ntokenPool: " + tokenPool.toBase58());

    console.log('\ncreating pool account');
    let tokenAccountPool = await createAccount(connection, payer, tokenPool, owner.publicKey, Keypair.generate());
    // if no feeOwner provide, feeAccount will be created under ownerKey
    const ownerKey = SWAP_PROGRAM_OWNER_FEE_ADDRESS || owner.publicKey.toString();
    let feeAccount = await createAccount(connection, payer, tokenPool, new PublicKey(ownerKey), Keypair.generate());

    console.log("\ntokenAccountPool: " + tokenAccountPool.toBase58());
    console.log("\nfeeAccount: " + feeAccount.toBase58());
    return { tokenAccountPool, tokenPool, feeAccount };
}

export async function createMoveToken(connection: Connection, payer: Keypair, owner: Keypair, tokenSwapAccount: Keypair, tokenProgramId: PublicKey, currentSwapTokenA: bigint): Promise<{ tokenAccountA: PublicKey, mintA: PublicKey }> {
    console.log('\ncreating token MOVE');
    const [authority, bumpSeed] = PublicKey.findProgramAddressSync(
        [tokenSwapAccount.publicKey.toBuffer()],
        TOKEN_SWAP_PROGRAM_ID,
    );

    let mintA = await createMint(
        connection,
        payer,
        owner.publicKey,
        null,
        2,
        Keypair.generate(),
        undefined,
        tokenProgramId,
    );
    console.log("\MOVE: " + mintA.toBase58());

    console.log('\ncreating token MOVE account');
    let tokenAccountA = await createAccount(connection, payer, mintA, authority, Keypair.generate());
    console.log("\ntokenAccountA: " + tokenAccountA.toBase58());
    console.log('\nminting token MOVE to swap');
    await mintTo(connection, payer, mintA, tokenAccountA, owner, currentSwapTokenA);
    return { tokenAccountA, mintA };
}

export async function initSolToken(connection: Connection, payer: Keypair, owner: Keypair, tokenSwapAccount: Keypair, mintBProgramId: PublicKey, currentSwapTokenB: bigint): 
                    Promise<{tokenAccountB: PublicKey, mintB: PublicKey}> {
    // Native SOL: So11111111111111111111111111111111111111112
    let mintB = new PublicKey("So11111111111111111111111111111111111111112");
    // console.log('\init token B');
    const [authority, bumpSeed] = PublicKey.findProgramAddressSync(
        [tokenSwapAccount.publicKey.toBuffer()],
        TOKEN_SWAP_PROGRAM_ID,
    );
    // let mintB = await createMint(
    //     connection,
    //     payer,
    //     owner.publicKey,
    //     null,
    //     2,
    //     Keypair.generate(),
    //     undefined,
    //     mintBProgramId,
    // );
    console.log("\nmintB: " + mintB);
    

    console.log('\ncreating token B account');
    let tokenAccountB = await createAccount(connection, payer, mintB, authority, Keypair.generate());
    console.log("\ntokenAccountB: " + tokenAccountB);
    // console.log('\nminting token B to swap');
    // await mintTo(connection, payer, mintB, tokenAccountB, owner, currentSwapTokenB);
    await requestSolToken(connection, tokenAccountB, LAMPORTS_PER_SOL);
    return {tokenAccountB, mintB};
}