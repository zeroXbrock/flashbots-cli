import { RelayResponseError } from '@flashbots/ethers-provider-bundle'
import { Command } from '@oclif/core'

// lib
import { handleGenericError } from '../lib/error'
import { getFlashbotsProvider } from '../lib/flashbots'

export default class CancelPrivateTransaction extends Command {
  static description = 'Cancel a pending private transaction.'

  static examples = [
`# Cancel a pending private transaction
<%= config.bin %> <%= command.id %> 0x1030b9b9c685b0c63543ce2b14d286b3dcc82852a9d3404e3f1aaaf5108bb73c`,
  ]

  static args = [
    {name: 'tx_hash', description: "Transaction hash of private tx to be cancelled", required: true},
  ]

  async catch(e: any) {
    handleGenericError(e, this)
  }

  public async run(): Promise<void> {
    const {args} = await this.parse(CancelPrivateTransaction)

    const flashbotsProvider = await getFlashbotsProvider()
    try {
      await flashbotsProvider.cancelPrivateTransaction(args.tx_hash)
      this.log(`Transaction cancelled (${args.tx_hash})`)
    } catch (e) {
      if (e instanceof Error) {
        if (e.message.includes("tx not found")) {
          console.error("tx not found")
        } else {
          console.error(e.message)
        }
      }
    }
  }
}
