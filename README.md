# tgram-bot

## Overview
tgram-bot is a Telegram bot designed to interact with various blockchain networks and provide functionalities such as price tracking, monitoring, and admin management. This bot serves as a bridge between users and blockchain data, offering a seamless experience for accessing and managing blockchain-related information.

## Features
- **Multi-Blockchain Support**: Interact with Ethereum, Binance Smart Chain, Arbitrum, Solana, and PulseChain.
- **Price Tracking**: Fetch and calculate prices from various sources.
- **Admin Management**: Handle admin tasks and commands efficiently.
- **Error Handling**: Robust error management to ensure smooth operation.
- **Data Validation**: Ensure data integrity with built-in validation functions.

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/roberthenry275/tgram-bot.git
   cd tgram-bot
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env` and fill in the required values.


## Usage
To start the bot, run:
```
node src/bot.js
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

# Telegram Blockchain Tracker (Google Cloud)

[![Deploy to GCP](https://deploy.cloud.run/button.svg)](https://console.cloud.google.com/cloudshell/editor?shellonly=true&cloudshell_image=gcr.io/cloudrun/button&cloudshell_git_repo=YOUR_REPO_URL)

## Features
- Real-time tracking for 5 blockchains
- Google Cloud SQL integration
- Secret Manager for credentials
- Automatic scaling
- Cloud Logging

## Deployment
1. Enable required Google Cloud APIs
2. Create Cloud SQL PostgreSQL instance
3. Store secrets in Secret Manager:
   - BOT_TOKEN
   - DATABASE_URL
   - CMC_API_KEY
   - Chain API keys
4. Deploy via Cloud Build:
```bash
gcloud builds submit --config cloudbuild.yaml