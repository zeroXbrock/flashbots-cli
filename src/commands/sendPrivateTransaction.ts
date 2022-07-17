import { FlashbotsBundleRawTransaction, FlashbotsPrivateTransaction, FlashbotsPrivateTransactionResponse, FlashbotsTransactionResolution, RelayResponseError } from '@flashbots/ethers-provider-bundle'
import { Command, Flags } from '@oclif/core'

// lib
import { handleGenericError } from '../lib/error'
import { getFlashbotsProvider } from '../lib/flashbots'

export default class SendPrivateTransaction extends Command {
  static description = 'Send a private transaction to Flashbots miners.'

  static examples = [
`signedTx=0xf87080853010b8720083010d8894eaa314eb4cc5a16458ba7a94e759252f4fda9ea4808b6c6a7a792077616e6b657f1ba05bf41e534c768493a3a84567e9acca5fdec73164d54b0cd21e4cdd94a11af29ba0591f06662aa673b645378774ee4a665fdf8a7ec8e0418ec0ac0d24f915bc8516`,
`# Send a private transaction for the next 25 blocks
<%= config.bin %> <%= command.id %> $signedTx`,
`# Send a private transaction up to block 15161558 (note: 25 blocks is still the max duration)
<%= config.bin %> <%= command.id %> $signedTx --max-block-number 15161558`,
`# Send a private transaction with a custom simulation timestamp
<%= config.bin %> <%= command.id %> $signedTx --simulation-timestamp 1658080039`,
  ]

  static args = [
    {name: 'signed_transaction', description: "Raw signed transaction to send", required: true},
  ]

  static flags = {
    'max-block-number': Flags.integer({char: 'b', description: 'Highest block number to allow transaction to be included'}),
    'simulation-timestamp': Flags.integer({char: 't', description: 'Timestamp to use for transaction simulation'}),
  }

  async catch(e: any) {
    handleGenericError(e, this)
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(SendPrivateTransaction)

    const flashbotsProvider = await getFlashbotsProvider()
    const tx: FlashbotsBundleRawTransaction = {
      signedTransaction: args.signed_transaction,
    }

    const res = await flashbotsProvider.sendPrivateTransaction(tx, {
      maxBlockNumber: flags['max-block-number'],
      simulationTimestamp: flags['simulation-timestamp'],
    })
    const resErr = res as RelayResponseError
    const resSuccess = res as FlashbotsPrivateTransactionResponse
    if (resErr.error) {
      console.error(resErr)
    } else {
      const simRes = await resSuccess.simulate()
      if ('error' in simRes) {
        console.error(JSON.stringify(simRes))
      } else {
        console.log(resSuccess.transaction)
        console.log("Waiting for inclusion...")
        const waitRes = await resSuccess.wait()
        if (waitRes === FlashbotsTransactionResolution.TransactionIncluded) {
            this.log("Private transaction successfully mined.")
        } else if (waitRes === FlashbotsTransactionResolution.TransactionDropped) {
            this.log("Private transaction was not mined and has been removed from the system.")
        }
      }
    }
  }
}
