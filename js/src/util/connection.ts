import { Connection } from "@solana/web3.js";
require('dotenv').config({ path: '.env' })

let connection: Connection;
export default async function getConnection(): Promise<Connection> {
  if (connection) return connection;
  const url = process.env.SOLANA_ENDPOINT_URL ? process.env.SOLANA_ENDPOINT_URL : 'https://api.testnet.solana.com';
  connection = new Connection(url, 'recent');
  const version = await connection.getVersion();

  console.log('Connection to cluster established:', url, version);
  return connection;
}