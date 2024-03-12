import { Result, ethers } from 'ethers';

import { ISmartContract } from '../interfaces/Blockchain.interface';
import { getError } from '../utils/Errors.util';

interface IDataProps {
  smartContract: ISmartContract;
  functionName: string;
  parameters: any[];
  signer: ethers.ContractRunner;
}

export const ContractRead = async ({
  functionName,
  parameters,
  smartContract,
  signer,
}: IDataProps): Promise<Result | Error> => {
  try {
    console.log('Entro en ContractRead');
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
