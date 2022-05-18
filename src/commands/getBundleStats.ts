import { Command } from '@oclif/core'

// lib
import { handleGenericError } from '../lib/error'
import { getFlashbotsProvider } from '../lib/flashbots'

export default class GetBundleStats extends Command {
  static description = 'Get info about a bundle.'

  static examples = [
    '<%= config.bin %> <%= command.id %> 0x47b1f5ea1b924acd88459b2e4f0ccfd2326ca0a134b982c1bc4a97e9002ff051',
  ]

  static args = [
    {name: 'bundle_hash', description: "Bundle hash returned by simulateBundle", required: true},
    {name: 'target_block', description: "Block in which the bundle was targeted/executed", required: true},
  ]

  async catch(e: any) {
    handleGenericError(e, this)
  }

  public async run(): Promise<void> {
    const {args} = await this.parse(GetBundleStats)

    const flashbotsProvider = await getFlashbotsProvider()
    const res = await flashbotsProvider.getBundleStats(args.bundle_hash, args.target_block)
    this.log(JSON.stringify(res))
  }
}
