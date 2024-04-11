declare module "true-vue-table";

export type { Result, TransactionReceipt } from "ethers";
export type { BigNumber } from "bignumber.js";
export type { 
    IBlockchainResponse,  ISmartContract, IDataResponseRead, IDataResponseWrite,
    IInteractionContract, IInteractionAPIGET, IInteractionAPIPOST, IDataPropsAPI,ISecret, IErrorSDK
} from "./../src/interfaces/index";

export {
    DicioBlockchain, DicioBlockchainAPI, ContractRead, ContractWrite,
    dateToUint,  uintToDate,  getError, getAddress, tokensToNumber, numberToTokens, 
    parseToBigInt, GweiToTokens, validate, validateAddressETH, ErrorClassSDK
} from './../src/index';
