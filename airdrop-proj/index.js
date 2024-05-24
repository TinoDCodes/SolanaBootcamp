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

const walletPublicKey = new PublicKey(wallet._keypair.publicKey);
const walletSecretKey = wallet._keypair.secretKey;

/**
 * This function will log the balance of the wallet with {@link walletPublicKey} to the console. The value will be represented in Sol.
 */
const getWalletBalance = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const walletBalance = await connection.getBalance(walletPublicKey);

    const balanceInSol = walletBalance / LAMPORTS_PER_SOL;

    console.log(`Current wallet balance is ${balanceInSol}`);
  } catch (error) {
    console.error(error);
  }
};

/**
 * This function will airdrop/send `2 Sol` to the wallet with {@link walletPublicKey}.
 */
const airDropSol = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const fromAirdropSignature = await connection.requestAirdrop(
      walletPublicKey,
      2 * LAMPORTS_PER_SOL
    );

    await connection.confirmTransaction(fromAirdropSignature);
  } catch (error) {
    console.error(error);
  }
};

const main = async () => {
  await getWalletBalance();
  await airDropSol();
  await getWalletBalance();
};

main();
