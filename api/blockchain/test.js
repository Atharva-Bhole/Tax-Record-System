import { ethers } from 'ethers';
import { rpcUrl, privateKey, contractAddress } from './config.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const abi = require('./abi.json');

const provider = new ethers.JsonRpcProvider(rpcUrl);
const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress, abi, wallet);

// 🟢 Read-only version of contract for view functions
const readContract = new ethers.Contract(contractAddress, abi, provider);

async function runTests() {
  try {
    console.log("Registering taxpayer...");
    let nonce = await wallet.getNonce();

const registerTx = await contract.register("Atharva", "ZYX123", { nonce: nonce });
await registerTx.wait();

const payTx = await contract.payTax(1, {
  value: ethers.parseEther("1"),
  nonce: nonce + 1 // increment manually
});
await payTx.wait();

    console.log("✅ Tax Paid");
    
    // ✅ Use readContract for view functions
    const payments = await readContract.getPaymentCount();
    console.log("Total Payments:", payments.toString());

    const taxpayer = await readContract.getTaxPayer(wallet.address);
    const [name, pan, isRegistered, totalTaxPaid, paymentIds] = taxpayer;

    console.log("👤 Name:", name);
    console.log("🧾 PAN:", pan);
    console.log("📌 Registered:", isRegistered);
    console.log("💰 Total Tax Paid:", totalTaxPaid.toString());
    console.log("🧾 Payment IDs:", paymentIds.map(id => id.toString()));
    
  } catch (err) {
    console.error("❌ Error during test:", err);
  }
}


runTests();
