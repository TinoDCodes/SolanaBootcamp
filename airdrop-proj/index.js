const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
} = require("@solana/web3.js");

/**
 * The wallet that we will be airdropping Solana into for this project.
 */
const wallet = new Keypair();
