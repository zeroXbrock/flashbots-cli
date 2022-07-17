import { JsonRpcProvider } from '@ethersproject/providers'
import { FlashbotsBundleProvider } from '@flashbots/ethers-provider-bundle'
import { Wallet, providers } from 'ethers'
import { FLASHBOTS_PROTECT_URL } from './constants'

const ENV_AUTH_SIGNER = process.env.FB_AUTH_SIGNER ? (() => {
    const wallet = new Wallet(process.env.FB_AUTH_SIGNER)
    console.log(`Auth Signer: ${wallet.address}`)
    return wallet
})() : (() => {
    console.warn("FB_AUTH_SIGNER is not set in your environment. Using a random wallet.")
    return Wallet.createRandom()
})()

export const getStandardProvider = (): JsonRpcProvider => {
    return new providers.JsonRpcProvider({url: FLASHBOTS_PROTECT_URL}, 1)
}

export const getFlashbotsProvider = async (authSignerKeyOverride?: string): Promise<FlashbotsBundleProvider> => {
    const provider = getStandardProvider()
    const signer = authSignerKeyOverride ? new Wallet(authSignerKeyOverride) : ENV_AUTH_SIGNER
    return await FlashbotsBundleProvider.create(provider, signer)
}
