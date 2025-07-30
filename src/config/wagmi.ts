import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { mainnet, polygon, arbitrum } from 'wagmi/chains';

// Get projectId from https://cloud.walletconnect.com
export const projectId = '05984192f395c149eec9b3bc5e20872a';

if (!projectId) throw new Error('Project ID is not defined');

const metadata = {
  name: 'Cosmic Lottery',
  description: 'Modern Decentralized Gaming Platform',
  url: 'https://cosmic-lottery.app', 
  icons: ['https://cosmic-lottery.app/favicon.ico']
};

const chains = [mainnet, polygon, arbitrum] as const;

export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  enableWalletConnect: true,
  enableInjected: true,
  enableEIP6963: true,
  enableCoinbase: true,
});