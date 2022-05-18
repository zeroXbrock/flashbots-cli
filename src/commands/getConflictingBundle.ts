import { Command, Flags } from '@oclif/core'
import { getFlashbotsProvider } from '../lib/flashbots'

export default class GetConflictingBundle extends Command {
  static description = 'Get information about competing bundles.'

  static examples = [
    `<%= config.bin %> <%= command.id %> '["0x02f8d37c496de...", "0x02f8d38a7bf47..."]' 14797973`,
  ]

  static flags = {
    // flag with a value (-n, --name=VALUE)
    name: Flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: Flags.boolean({char: 'f'}),
  }

  static args = [
    {name: 'bundle_txs', description: 'JSON string-encoded array of raw signed transactions (0x-prefixed)', required: true},
    {name: 'target_block', description: 'Block in which the conflicting bundle was mined', required: true},
  ]

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(GetConflictingBundle)
    const flashbotsProvider = await getFlashbotsProvider()
    const res = flashbotsProvider.getConflictingBundle(JSON.parse(args.bundle_txs), parseInt(args.target_block))
    this.log(JSON.stringify(res))
  }
}
