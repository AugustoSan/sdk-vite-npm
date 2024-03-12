import { BrowserProvider, ethers } from 'ethers';
import { ISmartContract } from './interfaces/Blockchain.interface';
import { IInteractionAPIGET, IInteractionAPIPOST, IInteractionContract } from './interfaces/Information.interface';
import { ContractRead } from './services/ContractRead';
import { ContractWrite } from './services/ContractWrite';

interface IDataProps {
    abiSmartContract: ethers.Interface | ethers.InterfaceAbi;
    addressSmartContract: string;
    enviroment: 'prod' | 'dev' | 'test';
    useType: 'frontend' | 'backend';
}

export class DicioBlockchain {
    private contract: ISmartContract;
    private useType: 'frontend' | 'backend';
    enviroment: 'prod' | 'dev' | 'test';
    private APIBaseURL = import.meta.env.API_BASE_URL ?? 'http://122.8.178.167';
    private APIPort = import.meta.env.API_PORT ?? '5116';
    private APIRaiz = import.meta.env.API_RAIZ ?? 'api/Attestation';
    
    constructor({abiSmartContract, addressSmartContract, enviroment, useType = 'frontend'}: IDataProps) {
        if(ethers.ZeroAddress === addressSmartContract || !ethers.isAddress(addressSmartContract)){
            throw Error(`La direccion del smart contract no es correcta o es la direccion cero: ${addressSmartContract}`);
        }
        this.contract = {
            abi: abiSmartContract,
            address: addressSmartContract
        }
        this.enviroment = enviroment;
        this.useType = useType;
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
            if(import.meta.env.URL_NODE === null || import.meta.env.URL_NODE === undefined){
                return new Error(`No se encuentra la variable URL_NODE.`);
            }
            if(import.meta.env.PRIVATE_KEY === null || import.meta.env.PRIVATE_KEY === undefined){
              return new Error(`No se encuentra la variable PRIVATE_KEY.`);
            }
            const provider = import.meta.env.URL_NODE ?? '';
            const privateKey = import.meta.env.PRIVATE_KEY ?? '';
            return new ethers.Wallet(privateKey, provider);
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

    contractReadAPI = async({endpoint, token}: IInteractionAPIGET): Promise<Response> => {
        return fetch(`${this.APIBaseURL}:${this.APIPort}/${this.APIRaiz}/${endpoint}`, {
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
        return fetch(`${this.APIBaseURL}:${this.APIPort}/${this.APIRaiz}/${endpoint}`, {
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
