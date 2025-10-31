<h1 align="center">🌱 GrowEase</h1>
<h3 align="center">Stake Discipline. Earn Rewards. Transform Yourself.</h3>

<p align="center">
  <img src="https://img.shields.io/badge/Build-Web3-green?style=for-the-badge&logo=solana" />
  <img src="https://img.shields.io/badge/Backend-Supabase-blue?style=for-the-badge&logo=supabase" />
  <img src="https://img.shields.io/badge/Mobile-Expo-orange?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Smart%20Contracts-Rust-brown?style=for-the-badge&logo=rust" />
</p>

---

## 🧭 Overview

**GrowEase** is a Web3 accountability dApp where users **stake tokens** to commit to personal goals, verified through **IoT data** and secured by **Rust-based Solana smart contracts**.

If you meet your goals — you earn rewards.  
If not — your stake contributes to the community pool.  

GrowEase merges **self-improvement**, **blockchain transparency**, and **IoT verification** into one seamless ecosystem.

---

## 🧩 Features

- 🔒 **Stake to Commit:** Lock your Solana tokens as proof of intent.  
- 📈 **IoT Integration:** Wearables automatically verify your progress.  
- 💰 **Earn Rewards:** Complete commitments and get GWE token rewards.  
- 👥 **Community Challenges:** Compete or collaborate in staking challenges.  
- 🪶 **Supabase Integration:** Handles authentication and real-time data.  
- ⚙️ **Rust Contracts:** Power staking, verification, and reward logic.  

## 🖥️ Web App Setup

The web frontend is built with **HTML, CSS, JavaScript**, and uses **Supabase** as the backend service.

### ⚙️ Tech Stack
- HTML5  
- CSS3  
- JavaScript (Vanilla)  
- Supabase (Auth + Database)

### 🚀 Run Locally

```bash
# Clone the repository
git clone https://github.com/<your-username>/growease.git

# Navigate into the web folder
cd growease/web

# Open index.html in your browser
💡 Tip: Use VS Code Live Server to run your local development environment instantly.

📱 Mobile App Setup
The mobile app enables goal tracking, IoT proof upload, and interaction with the Rust staking contracts.

⚙️ Tech Stack
React Native (Expo)

Rust (Solana smart contracts)

TypeScript (optional)

Supabase (Auth & Backend)

🚀 Run on Device
bash
Copy code
# Navigate to the mobile folder
cd growease/mobile

# Install dependencies
npm i

# Start Expo development server
npx expo start
⚡ A QR code will appear in your terminal.
📲 Scan it using the Expo Go app (Android/iOS) to launch GrowEase instantly.

🦀 Rust Smart Contracts
GrowEase’s on-chain logic is built using Rust on the Solana blockchain.

These contracts manage:

User staking & lockups

Verification proofs

Reward distribution

Challenge pool handling

📂 Location
swift
Copy code
/growease/mobile/contracts/
🧱 Build & Deploy
bash
Copy code
# Navigate to the contracts folder
cd growease/mobile/contracts

# Build Rust program
cargo build-bpf --release
To deploy to Solana:

bash
Copy code
solana program deploy target/deploy/growease_contract.so
🧠 Architecture Overview
text
Copy code
Frontend (HTML, JS)     →  Supabase (Auth + DB)
         ↓
Mobile App (Expo)       →  Rust Contracts (on Solana)
         ↓
IoT Devices             →  Upload Proofs to IPFS
GrowEase connects these components to form a transparent, decentralized accountability loop.

🌐 Live Workflow Example
A user stakes tokens to commit to a fitness goal.

Their IoT device uploads progress proofs (e.g., steps, calories).

Proof is verified on-chain via smart contract.

If verified → user earns rewards; else → stake is redistributed.

Users can share progress or join community challenges.

🧰 Tech Stack Summary
Layer	Technology
Frontend	HTML, CSS, JavaScript
Backend	Supabase
Mobile	Expo (React Native)
Blockchain	Solana (Rust)
Verification	IoT Devices + IPFS
Contracts	Rust (BPF build)

💾 Environment Variables
Create a .env file in both web and mobile directories with your own Supabase credentials:

bash
Copy code
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-anon-key
For blockchain integration:

bash
Copy code
SOLANA_NETWORK=devnet
SOLANA_PROGRAM_ID=your-deployed-contract-id
🧪 Testing the Contracts
You can test your Rust contracts locally using Solana’s CLI test validator:

bash
Copy code
solana-test-validator
Then in another terminal:

bash
Copy code
cargo test