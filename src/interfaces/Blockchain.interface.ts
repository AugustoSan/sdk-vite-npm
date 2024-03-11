export interface IBlockchainResponse {
    gasUsed: string;
    transactionHash: string;
    blockNumber: number;
    blockHash: string;
}

export interface ISmartContract {
    address: string;
    abi: string;
}