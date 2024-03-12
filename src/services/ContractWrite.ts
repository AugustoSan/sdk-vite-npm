import { TransactionReceipt, ethers, BrowserProvider } from 'ethers';
import { ISmartContract } from '../interfaces/Blockchain.interface';
import { getError } from '../utils/Errors.util';

interface IDataProps {
  smartContract: ISmartContract;
  functionName: string;
  parameters: any[];
}

export const ContractWrite = async ({
  functionName,
  parameters,
  smartContract
}: IDataProps): Promise<TransactionReceipt | Error> => {
  console.log('Entro en ContractWrite');
  try {
    console.log('Entro en ContractReadAccessControl');
    if(window.ethereum === null || window.ethereum === undefined){
      return new Error(`MetaMask u otro proveedor de Ethereum no detectado.`);
    }
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      smartContract.address,
      smartContract.abi,
      signer
    );
    let response: TransactionReceipt;
    if (typeof contract[functionName] === 'function') {
      console.log(`functionName: ${functionName}  parameters: ${parameters}  length: ${parameters.length}`);
      const tx = await contract[functionName](...parameters);
      response = await tx?.wait(1);
      if(response.status == 1) return response;
      else return response;
    } else {
      return new Error(
        `La función "${functionName} no existe en el contrato"`
        );
    }
  } catch (error: any) {
    return getError(error);
  } finally {
  }
};
