import { Command, Flags } from '@oclif/core'

// lib
import { handleGenericError } from '../lib/error'
import { getFlashbotsProvider, getStandardProvider } from '../lib/flashbots'

export default class SendBundle extends Command {
  static description = `Send a bundle to the Flashbots relay. 
  All flags are optional.`
  static exampleBundle = `'["0x02f8d37c496de...", "0x02f8d38a7bf47..."]'`
  static examples = [
`# Send a bundle in the next available block
<%= config.bin %> <%= command.id %> ${this.exampleBundle}`,
`# Send a bundle with specific timestamp(s)
<%= config.bin %> <%= command.id %> ${this.exampleBundle} --min-timestamp 1652856500 --max-timestamp 1652856700`,
`# Send a bundle with reverting transactions
<%= config.bin %> <%= command.id %> ${this.exampleBundle} --reverting-tx 0x60929406276058bc757bc84a576857e6a6118566690fd3604d4f1cdb5ebd89d3 --reverting-tx 0x548efb5c5de7df6d76f8aca4391def510fa575c81dd588d2ff4e8fc5a7c4eb79`,
  ]

  static flags = {
    'target-block': Flags.integer({char: 'b', description: 'Block to target for bundle submission (default latest+1)'}),
    'min-timestamp': Flags.integer({description: 'Minimum timestamp at which this bundle can be included'}),
    'max-timestamp': Flags.integer({description: 'Maximum timestamp at which this bundle can be included'}),
    'reverting-tx': Flags.string({description: 'Tx hash that is allowed to revert, can be set multiple times', multiple: true}),
  }

  static args = [{name: 'bundle_txs', description: 'JSON string-encoded array of raw signed transactions (0x-prefixed)', required: true}]
  
  async catch(e: any) {
    handleGenericError(e, this)
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(SendBundle)
    
    const flashbotsProvider = await getFlashbotsProvider()
    
    let targetBlock: number;
    if (flags['target-block']) {
      targetBlock = flags['target-block']
    } else {
      const provider = getStandardProvider()
      targetBlock = (await provider.getBlockNumber()) + 1
    }
    this.log(`Targeting block ${targetBlock} for bundle submission.`)

    const optionalArgs = {
      minTimestamp: flags['min-timestamp'],
      maxTimestamp: flags['max-timestamp'],
      revertingTxHashes: flags['reverting-tx'],
    }

    const res: any = await flashbotsProvider.sendRawBundle(JSON.parse(args.bundle_txs), targetBlock, optionalArgs)
    if (res['error']) {
      this.error(JSON.stringify(res.error))
    }
    this.log(JSON.stringify(res))
  }
}
