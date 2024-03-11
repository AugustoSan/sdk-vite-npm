import { Wallet } from "ethers"

export const getAddress = ( privateKey: string): string => {
    return new Wallet(privateKey).address;
}