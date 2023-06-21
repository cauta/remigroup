import {Keypair, Connection, PublicKey} from '@solana/web3.js';

import {sleep} from './sleep';

export async function newAccountWithLamports(
  connection: Connection,
  lamports: number = 1000000,
): Promise<Keypair> {
  const account = Keypair.generate();

  let retries = 30;
  await connection.requestAirdrop(account.publicKey, lamports);
  for (;;) {
    await sleep(500);
    if (lamports == (await connection.getBalance(account.publicKey))) {
      return account;
    }
    if (--retries <= 0) {
      break;
    }
  }
  throw new Error(`Airdrop of ${lamports} failed`);
}

export async function requestSolToken(connection: Connection,
  address: PublicKey,
  lamports: number = 1000000,
): Promise<void> {
  let preBalance = await connection.getBalance(address);
  let retries = 30;
  await connection.requestAirdrop(address, lamports);
  for (;;) {
    await sleep(500);
    if (lamports + preBalance == (await connection.getBalance(address))) {
      return ;
    }
    if (--retries <= 0) {
      break;
    }
  }
  throw new Error(`Airdrop of ${lamports} failed`);
}
