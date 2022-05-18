import { Command, Flags } from '@oclif/core'
import { FLASHBOTS_PROTECT_URL } from '../lib/constants'
import { handleGenericError } from '../lib/error'
import { getFlashbotsProvider, getStandardProvider } from '../lib/flashbots'

export default class SendBundle extends Command {
  static description = `Send a bundle to the Flashbots relay. 
  All flags are optional.`
//0x02f8d30182024b8459682f008506fac1dc58830101ab9457f1887a8bf19b14fc0df6fd9b2acc9af147ea8580b86442842e0e000000000000000000000000dd8e2548da5a992a63ae5520c6bc92c37a2bcc440000000000000000000000004ce2dd8373ece0d7baaa16e559a5817cc875b16a9599e485a199727c7f9567e87c496de855dcb2952d6aa9fc069ad1ed21b0c0c4c001a07151f708ff5d6ea159d99189fb25c6d4483d1ef03f86c9b1fc39a7a3d06f8c42a004a7f3113b30b2dfc87180f8381883d4553e84b402448144ffae579f8c702cb3
//0x02f8d30182024a8459682f0085063e5f024d830101ab9457f1887a8bf19b14fc0df6fd9b2acc9af147ea8580b86442842e0e000000000000000000000000dd8e2548da5a992a63ae5520c6bc92c37a2bcc440000000000000000000000004ce2dd8373ece0d7baaa16e559a5817cc875b16a641ac34001b2cf869ebece0d7508a489de92bd07e8d0cb243f235a3c2deae14cc080a0d6551e9a1e4b48ec9cbc8bf2ce90dc545dbd5ccd8dbbe37ed7d269bd29dee086a03af90c25e825435ea21e7155ebb33a578653607c6e3146927a01277799a7bf47
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
    // flag with a value (-n, --name=VALUE)
    'auth-signer': Flags.string({char: 'a', description: 'Private key to sign bundle'}),
    'target-block': Flags.integer({char: 'b', description: 'Block to target for bundle submission'}),
    'min-timestamp': Flags.integer({description: 'Minimum timestamp at which this bundle can be included'}),
    'max-timestamp': Flags.integer({description: 'Maximum timestamp at which this bundle can be included'}),
    'reverting-tx': Flags.string({description: 'Tx hash that is allowed to revert. This flag can be set multiple times', multiple: true}),
    // flag with no value (-f, --force)
    // force: Flags.boolean({char: 'f'}),
  }

  static args = [{name: 'bundle_txs', description: 'JSON-encoded array of signed transactions', required: true}]
  
  async catch(e: any) {
    handleGenericError(e, this)
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(SendBundle)
    const provider = getStandardProvider()
    const flashbotsProvider = await getFlashbotsProvider(flags['auth-signer'])
    
    const targetBlock = flags['target-block'] || (await provider.getBlockNumber()) + 1
    this.log(`Targeting block ${targetBlock} for bundle submission.`)
    
    const optionalArgs = {
      minTimestamp: flags['min-timestamp'],
      maxTimestamp: flags['max-timestamp'],
      revertingTxHashes: flags['reverting-tx'],
    }

    const res: any = await flashbotsProvider.sendRawBundle(args.bundle_txs, targetBlock, optionalArgs)
    if (res['error']) {
      this.error(JSON.stringify(res.error))
    }
    this.log(JSON.stringify(res))
  }
}
