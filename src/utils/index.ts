import { createBrowserHistory, createHashHistory } from 'history';
import bs58 from 'bs58';

export function configureHistory() {
	return window.matchMedia('(display-mode: standalone)').matches
		? createHashHistory()
		: createBrowserHistory()
}

export const getEtherscanLink = (hash : string, type : string, chainId : number) => {
	let baseURL = 'https://etherscan.io';
	switch(chainId) {
		case 3:
			baseURL = 'https://ropsten.etherscan.io'
			break;
		case 42:
			baseURL = 'https://kovan.etherscan.io'
			break;
		case 4:
			baseURL = 'https://rinkeby.etherscan.io'
			break;
		case 5:
			baseURL = 'https://goerli.etherscan.io'
			break;
	}
	if(type === 'tx') {
		return `${baseURL}/tx/${hash}`
	}else if(type === 'address') {
		return `${baseURL}/address/${hash}`
	}
	console.error('getEtherscanLink should be provided either "tx" or "address" as the type')
	return undefined;
}

// ----------

// IPFS hash helpers from: https://ethereum.stackexchange.com/a/39961/50300

// Return base58 encoded ipfs hash from bytes32 hex string,
// E.g. "0x017dfd85d4f6cb4dcd715a88101f7b1f06cd1e009b2327a0809d01eb9c91f231"
// --> "QmNSUYVKDSvPUnRLKmuxk9diJ6yS96r1TrAXzjTiBcCLAL"
export const getIpfsHashFromBytes32 = (bytes32Hex: string) => {
  // Add our default ipfs values for first 2 bytes:
  // function:0x12=sha2, size:0x20=256 bits
  // and cut off leading "0x"
  const hashHex = "1220" + bytes32Hex.slice(2)
  const hashBytes = Buffer.from(hashHex, 'hex');
  const hashStr = bs58.encode(hashBytes)
  return hashStr
}

export const getBytes32FromIpfsHash = (ipfsListing: string) => {
  return "0x"+bs58.decode(ipfsListing).slice(2).toString('hex')
}

// ----------