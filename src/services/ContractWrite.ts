import { TransactionReceipt, ethers } from 'ethers';
import { ISmartContract } from '../interfaces/Blockchain.interface';
import { getError } from '../utils/Errors.util';

interface IDataProps {
  smartContract: ISmartContract;
  functionName: string;
  parameters: any[];
  signer: ethers.ContractRunner;
}

export const ContractWrite = async ({
  functionName,
  parameters,
  smartContract,
  signer
}: IDataProps): Promise<TransactionReceipt | Error> => {
  try {
    const contract = new ethers.Contract(
      smartContract.address,
      smartContract.abi,
      signer
    );
    let response: TransactionReceipt;
    if (typeof contract[functionName] === 'function') {
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
