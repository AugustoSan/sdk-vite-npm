import BigNumber from 'bignumber.js';

export const tokensToNumber = (numTokens: string, decimals: number): BigNumber => {
  try {
    BigNumber.set({ DECIMAL_PLACES: decimals + 2 });
    const temp = new BigNumber(numTokens);
    const result = temp.dividedBy(Math.pow(10, decimals));
    // return result.toString();
    return result;
  } catch (error) {
    console.log('Ocurrio un error al convertir los tokens: ', error);
    return new BigNumber(-1);
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
    console.log('Ocurrio un error al convertir los tokens: ', error);
    return new BigNumber(-1);
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
    console.log('Ocurrio un error al convertir los tokens: ', error);
    // return 'Ocurrio un error';
    return new BigNumber(-1);
  }
};

export const parseToBigInt = (num: string): BigInt => {
  try {
    return BigInt(Number(num));
  } catch (error) {
    console.log('Ocurrio un error al convertir los tokens: ', error);
    return BigInt(0);
  }
};
