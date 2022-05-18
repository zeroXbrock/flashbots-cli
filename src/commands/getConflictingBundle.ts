import { Command, Flags } from '@oclif/core'

// lib
import { handleGenericError } from '../lib/error'
import { getFlashbotsProvider } from '../lib/flashbots'

export default class GetConflictingBundle extends Command {
  static description = 'Get information about competing bundles.'

  static examples = [
`# Get conflicting bundles (if any)
<%= config.bin %> <%= command.id %> '["0x02f8d37c496de...", "0x02f8d38a7bf47..."]' 14797973`,
`# Get conflicting bundles (if any) and skip gas pricing calculations
<%= config.bin %> <%= command.id %> -g '["0x02f8d37c496de...", "0x02f8d38a7bf47..."]' 14797973`,
  ]

  static flags = {
    'ignore-gas-pricing': Flags.boolean({char: 'g', description: "Gets conflicting bundle(s) without calculating gas pricing data"}),
  }

  static args = [
    {name: 'bundle_txs', description: 'JSON string-encoded array of raw signed transactions (0x-prefixed)', required: true},
    {name: 'target_block', description: 'Block in which the conflicting bundle was mined', required: true},
  ]

  async catch(e: any) {
    handleGenericError(e, this)
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(GetConflictingBundle)
    const flashbotsProvider = await getFlashbotsProvider()
    let res: any;
    if (flags['ignore-gas-pricing']) {
      res = flashbotsProvider.getConflictingBundleWithoutGasPricing(JSON.parse(args.bundle_txs), parseInt(args.target_block))
    } else {
      res = flashbotsProvider.getConflictingBundle(JSON.parse(args.bundle_txs), parseInt(args.target_block))
    }
    this.log(JSON.stringify(res))
  }
}
