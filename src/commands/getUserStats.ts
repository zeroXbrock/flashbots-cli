import { Command } from '@oclif/core'

// lib
import { handleGenericError } from '../lib/error'
import { getFlashbotsProvider } from '../lib/flashbots'

export default class GetUserStats extends Command {
  static description = `Get Flashbots reputation data for your account.
  Note: your private key is not sent over the web. It is only used to sign a message which proves you own the account.`

  static examples = [
    '<%= config.bin %> <%= command.id %> 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
  ]

  static args = [{name: 'signer_key', description: "Private key used to sign bundles", required: true}]
  
  async catch(e: any) {
    handleGenericError(e, this)
  }

  public async run(): Promise<void> {
    const {args} = await this.parse(GetUserStats)
    const flashbotsProvider = await getFlashbotsProvider(args.signer_key)
    const res = await flashbotsProvider.getUserStats()
    this.log(JSON.stringify(res))
  }
}
