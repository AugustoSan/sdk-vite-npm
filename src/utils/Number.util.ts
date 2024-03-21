import BigNumber from 'bignumber.js';

export const tokensToNumber = (numTokens: string, decimals: number): string => {
  try {
    // BigNumber.set({ DECIMAL_PLACES: decimals + 2 });
    const temp = new BigNumber(numTokens);
    const result = temp.dividedBy(Math.pow(10, decimals));
    return result.toFormat();
  } catch (error) {
    console.log('Ocurrio un error al convertir los tokens: ', error);
    return 'Ocurrio un error';
  }
};

export const numberToTokens = (num: string, decimals: number): string => {
  try {
    // BigNumber.set({ DECIMAL_PLACES: decimals + 2 });
    const temp = new BigNumber(num);
    const result = temp.multipliedBy(Math.pow(10, decimals));
    return result.toFormat();
  } catch (error) {
    console.log('Ocurrio un error al convertir los tokens: ', error);
    return 'Ocurrio un error';
  }
};

export const GweiToTokens = (num: string, decimals: number): string => {
  try {
    // BigNumber.set({ DECIMAL_PLACES: decimals + 2 });
    const token = Math.pow(10, decimals);
    const temp = new BigNumber(num);
    const x = temp.multipliedBy(1).dividedBy(token);
    return x.toFormat();
  } catch (error) {
    console.log('Ocurrio un error al convertir los tokens: ', error);
    return 'Ocurrio un error';
  }
};
