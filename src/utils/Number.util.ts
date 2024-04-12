import BigNumber from 'bignumber.js';
import { ErrorClassSDK } from './Errors.util';

export const tokensToNumber = (numTokens: string, decimals: number): BigNumber => {
  try {
    BigNumber.set({ DECIMAL_PLACES: decimals + 2 });
    const temp = new BigNumber(numTokens);
    const result = temp.dividedBy(Math.pow(10, decimals));
    // return result.toString();
    return result;
  } catch (error) {
    if(error instanceof Error){
      throw new ErrorClassSDK({group: 'Utils', message: error.message, code: 'TOKENS_TO_NUMBER', error});
    }
    console.log('ERROR: ', error);
    throw new ErrorClassSDK({group: 'Utils', message: 'Ocurrio un error inesperado', code: 'TOKENS_TO_NUMBER', error: Error('Error inesperado al convertir los tokens a un numero.')});
  }
};

export const numberToTokens = (num: string, decimals: number): BigNumber => {
  try {
    BigNumber.set({ DECIMAL_PLACES: decimals + 2 });
    const temp = new BigNumber(num);
    const result = temp.multipliedBy(Math.pow(10, decimals));
    // return result.toString();
    return result;
  } catch (error) {
    if(error instanceof Error){
      throw new ErrorClassSDK({group: 'Utils', message: error.message, code: 'NUMBER_TO_TOKENS', error});
    }
    console.log('ERROR: ', error);
    throw new ErrorClassSDK({group: 'Utils', message: 'Ocurrio un error inesperado', code: 'NUMBER_TO_TOKENS', error: Error('Error inesperado al convertir el numero a tokens.')});
  }
};

export const GweiToTokens = (num: string, decimals: number): BigNumber => {
  try {
    BigNumber.set({ DECIMAL_PLACES: decimals + 2 });
    const token = Math.pow(10, decimals);
    const temp = new BigNumber(num);
    const result = temp.multipliedBy(1).dividedBy(token);
    // return result.toString();
    return result;
  } catch (error) {
    if(error instanceof Error){
      throw new ErrorClassSDK({group: 'Utils', message: error.message, code: 'GWEI_TO_TOKENS', error});
    }
    console.log('ERROR: ', error);
    throw new ErrorClassSDK({group: 'Utils', message: 'Ocurrio un error inesperado', code: 'GWEI_TO_TOKENS', error: Error('Error inesperado al convertir el numero a Gwei.')});
  }
};

export const parseToBigInt = (num: string): BigInt => {
  try {
    return BigInt(Number(num));
  } catch (error) {
    if(error instanceof Error){
      throw new ErrorClassSDK({group: 'Utils', message: error.message, code: 'PARSE_TO_BIGINT', error});
    }
    console.log('ERROR: ', error);
    throw new ErrorClassSDK({group: 'Utils', message: 'Ocurrio un error inesperado', code: 'PARSE_TO_BIGINT', error: Error('Error inesperado al parsear el numero a BigInt.')});
  }
};
