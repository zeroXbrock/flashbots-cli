import { JsonRpcProvider } from '@ethersproject/providers'
import { FlashbotsBundleProvider } from '@flashbots/ethers-provider-bundle'
import { Wallet, providers } from 'ethers'
import { FLASHBOTS_PROTECT_URL } from './constants'

export const getStandardProvider = (): JsonRpcProvider => {
    return new providers.JsonRpcProvider({url: FLASHBOTS_PROTECT_URL}, 1)
}

export const getFlashbotsProvider = async (authSignerKey?: string): Promise<FlashbotsBundleProvider> => {
    const provider = getStandardProvider()
    const authSigner = authSignerKey ? new Wallet(authSignerKey) : Wallet.createRandom()
    return await FlashbotsBundleProvider.create(provider, authSigner)
}
