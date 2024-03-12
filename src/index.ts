import { ethers } from 'ethers';
import { ISmartContract } from './interfaces/Blockchain.interface';
import { IInteractionContract } from './interfaces/Information.interface';
import { ContractRead } from './services/ContractRead';
import { ContractWrite } from './services/ContractWrite';

interface IDataProps {
    abiSmartContract: ethers.Interface | ethers.InterfaceAbi;
    addressSmartContract: string;
    enviroment: string;
}

export class DicioBlockchain {
    contract: ISmartContract;
    enviroment: string;
    
    constructor({abiSmartContract, addressSmartContract, enviroment}: IDataProps) {
        if(ethers.ZeroAddress === addressSmartContract || !ethers.isAddress(addressSmartContract)){
            throw Error(`La direccion del smart contract no es correcta o es la direccion cero: ${addressSmartContract}`);
        }
        this.contract = {
            abi: abiSmartContract,
            address: addressSmartContract
        }
        this.enviroment = enviroment;
    }
    contractRead = async({functionName, params}: IInteractionContract): Promise<ethers.Result | Error> => {
        return ContractRead({functionName, parameters: params, smartContract: this.contract});
    }
    contractWrite = async({functionName, params}: IInteractionContract): Promise<ethers.TransactionReceipt | Error> => {
        return ContractWrite({functionName, parameters: params, smartContract: this.contract});
    }
}
