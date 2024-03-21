import { BrowserProvider, JsonRpcProvider, ethers } from 'ethers';
import { ISmartContract } from './interfaces/Blockchain.interface';
import { IDataPropsAPI, IInteractionAPIGET, IInteractionAPIPOST, IInteractionContract } from './interfaces';
import { ContractRead, ContractWrite } from './services';

interface IDataPropsDicioBlockchain {
    abiSmartContract: ethers.Interface | ethers.InterfaceAbi;
    addressSmartContract: string;
    enviroment: 'prod' | 'dev' | 'test';
    useType: 'frontend' | 'backend';
    urlNode?: string | null;
    privateKey?: string | null;
}

export class DicioBlockchain {
    private contract: ISmartContract;
    private useType: 'frontend' | 'backend';
    private privateKey: string | null;
    private urlNode: string | null;
    enviroment: 'prod' | 'dev' | 'test';
    
    constructor({abiSmartContract, addressSmartContract, enviroment, useType = 'frontend', urlNode = null, privateKey = null}: IDataPropsDicioBlockchain) {
        if(ethers.ZeroAddress === addressSmartContract || !ethers.isAddress(addressSmartContract)){
            throw Error(`La direccion del smart contract no es correcta o es la direccion cero: ${addressSmartContract}`);
        }
        this.contract = {
            abi: abiSmartContract,
            address: addressSmartContract
        }
        this.enviroment = enviroment;
        this.useType = useType;
        this.privateKey = privateKey;
        this.urlNode = urlNode;
    }
    private getSigner = async(): Promise<ethers.ContractRunner | Error> => {
        if(this.useType === 'frontend'){
            if(window.ethereum === null || window.ethereum === undefined){
                return new Error(`MetaMask u otro proveedor de Ethereum no detectado.`);
            }
            const provider = new BrowserProvider(window.ethereum);
            return await provider.getSigner();
        }
        else {
            if(this.urlNode === null || this.urlNode === undefined){
                return new Error(`La variable urlNode se encuentra vacia.`);
            }
            if(this.privateKey === null || this.privateKey === undefined){
              return new Error(`La variable privateKey se encuentra vacia.`);
            }
            const provider = new JsonRpcProvider(this.urlNode);
            return new ethers.Wallet(this.privateKey, provider);
        }
    }
    contractRead = async({functionName, params}: IInteractionContract): Promise<ethers.Result | Error> => {
        try {
            const validateType = await this.getSigner();
            if (validateType instanceof Error) {
                return validateType;
            }
            return ContractRead({functionName, parameters: params, smartContract: this.contract, signer: validateType});
        } catch (error) {
            console.log('Error: ', error);
            return Error('Ocurrio un error ');
        }
    }

    contractWrite = async({functionName, params}: IInteractionContract): Promise<ethers.TransactionReceipt | Error> => {
        try {
            const validateType = await this.getSigner();
            if (validateType instanceof Error) {
                return validateType;
            }
            return ContractWrite({functionName, parameters: params, smartContract: this.contract, signer: validateType});
        } catch (error) {
            console.log('Error: ', error);
            return Error('Ocurrio un error ');
        }
    }
}


export class DicioBlockchainAPI {
    private baseURL: string;
    private port: string;
    private raiz: string;
    
    constructor({baseURL, port, raiz}: IDataPropsAPI) {
        this.baseURL = baseURL;
        this.port = port;
        this.raiz = raiz;
    }

    contractReadAPI = async({endpoint, token}: IInteractionAPIGET): Promise<Response> => {
        console.log('DicioBlockchainAPI > contractReadAPI');
        return fetch(`${this.baseURL}:${this.port}/${this.raiz}/${endpoint}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + token
            },
        })
        .then(response => response.json())
        .catch(error => error.json());
    }

    contractWriteAPI = async({endpoint, token, data}: IInteractionAPIPOST): Promise<Response> => {
        console.log('DicioBlockchainAPI > contractWriteAPI');
        return fetch(`${this.baseURL}:${this.port}/${this.raiz}/${endpoint}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .catch(error => error.json());
    }
}

export { ContractRead, ContractWrite } from './services';
export { 
    dateToUint, uintToDate, getError, getAddress, 
    tokensToNumber, numberToTokens, 
    GweiToTokens, validate, validateAddressETH 
} from "./utils";

export { 
    type IBlockchainResponse,  type ISmartContract, type IDataResponseRead, type IDataResponseWrite, 
    type IInteractionContract, type IInteractionAPIGET, type IInteractionAPIPOST, type IDataPropsAPI,
    type ISecret 
} from "./interfaces";