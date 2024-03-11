import { ethers } from "ethers";

export const validate = (param: any): boolean => {
    if(!param !== null && param !== undefined) return true;
    return false;
}

export const validateAddressETH = (account: string): boolean => {
    return ethers.isAddress(account);
}