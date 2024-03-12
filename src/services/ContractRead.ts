import { Result, ethers, BrowserProvider } from 'ethers';

import { ISmartContract } from '../interfaces/Blockchain.interface';
import { getError } from '../utils/Errors.util';

interface IDataProps {
  smartContract: ISmartContract;
  functionName: string;
  parameters: any[];
}

export const ContractRead = async ({
  functionName,
  parameters,
  smartContract
}: IDataProps): Promise<Result | Error> => {
  try {
    console.log('Entro en ContractRead');
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
    let response: Result;
      if (typeof contract[functionName] === 'function') {
        response = await contract[functionName](...parameters);
        return response;
      } else {
        return new Error(
          `La función ${functionName} no existe en el contrato`
        );
      }
  } catch (error: any) {
    return getError(error);
  } finally {
  }
};
