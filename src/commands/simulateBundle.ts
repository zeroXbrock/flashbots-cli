import { Command, Flags } from '@oclif/core'
import { handleGenericError } from '../lib/error'
import { getFlashbotsProvider, getStandardProvider } from '../lib/flashbots'

export default class SimulateBundle extends Command {
  static description = 'Simulate a Flashbots bundle.'

  static examples = [
    `# Simulate a bundle in the current block
    <%= config.bin %> <%= command.id %> '["0x02f8d37c496de...", "0x02f8d38a7bf47..."]'`,
    `# Simulate a bundle against a specific timestamp
    <%= config.bin %> <%= command.id %> '["0x02f8d37c496de...", "0x02f8d38a7bf47..."]' --block-timestamp 1652859017`,
    `# Simulate a bundle against a block tag
    <%= config.bin %> <%= command.id %> '["0x02f8d37c496de...", "0x02f8d38a7bf47..."]' --state-block-tag latest`,
  ]

  static flags = {
    'target-block': Flags.integer({char: 'b', description: 'Block to target for bundle submission'}),
    'state-block-tag': Flags.string({description: 'Block tag which specifies block state to execute simulation against'}),
    'block-timestamp': Flags.integer({description: 'Timestamp to execute simulation against'}),
  }

  static args = [
    {name: 'bundle_txs', required: true, description: "JSON string-encoded array of raw signed transactions (0x-prefixed)"},
  ]

  async catch(e: any) {
    handleGenericError(e, this)
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(SimulateBundle)
    const flashbotsProvider = await getFlashbotsProvider()
    
    let targetBlock: number;
    if (flags['target-block']) {
      targetBlock = flags['target-block']
    } else {
      const provider = getStandardProvider()
      targetBlock = await provider.getBlockNumber()
    }
    this.log(`Targeting block ${targetBlock} for bundle simulation.`)

    const res: any = await flashbotsProvider.simulate(JSON.parse(args.bundle_txs), targetBlock, flags['state-block-tag'], flags['block-timestamp'])
    if (res.error) {
      this.error(JSON.stringify(res.error))
    } else {
      this.log(JSON.stringify(res))
    }
  }
}
