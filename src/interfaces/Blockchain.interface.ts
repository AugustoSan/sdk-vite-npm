import { Result, TransactionReceipt, ethers } from "ethers";
import { IInteractionContract } from "./Information.interface";

export interface IBlockchainResponse {
    gasUsed: string;
    transactionHash: string;
    blockNumber: number;
    blockHash: string;
}

export interface ISmartContract {
    address: string;
    abi: ethers.Interface | ethers.InterfaceAbi;
}

export interface IDataResponseRead {
    result: Result | null;
    isLoading: boolean;
    isSuccess: boolean;
    isFinish: boolean;
    callContractFunction: (paramsContract: IInteractionContract) => Promise<void>;
}
  
export interface IDataResponseWrite {
    result: TransactionReceipt | null;
    isLoading: boolean;
    isSuccess: boolean;
    isFinish: boolean;
    callContractFunction: (paramsContract: IInteractionContract) => Promise<void>;
}