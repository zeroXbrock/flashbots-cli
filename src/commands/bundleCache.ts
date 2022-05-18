import {Command, Flags} from '@oclif/core'
import { providers } from 'ethers'
import axios from 'axios'

export default class BundleCache extends Command {
  static description = 'Cache a transaction to iteratively build a bundle.'

  static examples = [
`# Add a transaction to a bundle

<%= config.bin %> <%= command.id %> 5b479f88-01ca-4c1b-a1b9-1299ce969590 0x02f8d30182024b8459682f008506fac1dc58830101ab9457f1887a8bf19b14fc0df6fd9b2acc9af147ea8580b86442842e0e000000000000000000000000dd8e2548da5a992a63ae5520c6bc92c37a2bcc440000000000000000000000004ce2dd8373ece0d7baaa16e559a5817cc875b16a9599e485a199727c7f9567e87c496de855dcb2952d6aa9fc069ad1ed21b0c0c4c001a07151f708ff5d6ea159d99189fb25c6d4483d1ef03f86c9b1fc39a7a3d06f8c42a004a7f3113b30b2dfc87180f8381883d4553e84b402448144ffae579f8c702cb3
    
# Get transactions in a bundle

<%= config.bin %> <%= command.id %> 5b479f88-01ca-4c1b-a1b9-1299ce969590`,
  ]

  static flags = {
    // flag with a value (-n, --name=VALUE)
    // name: Flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-g, --get)
    // get: Flags.boolean({char: 'g'}),
  }

  static args = [
    {name: 'bundle_id', required: true, description: 'UUID to identify your bundle'}, 
    {name: 'raw_tx', description: 'Raw signed transaction (0x-prefixed hex data)'}
  ]

  async catch(e: any) {
    if (e.reason && e.value)
        this.error(`${e.reason}: ${e.value}`)
    else {
        this.error(e)
    }
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(BundleCache)

    if (args.raw_tx) {
      // add tx to bundle
      const provider = new providers.JsonRpcProvider(`https://rpc.flashbots.net?bundle=${args.bundle_id}`)
      const res = await provider.sendTransaction(args.raw_tx)
      this.log(res.toString())
      this.log(`Cached tx in bundle ${args.bundle_id}`)
    } else {
      // get bundle
      const res = await axios.get(`https://rpc.flashbots.net/bundle?id=${args.bundle_id}`)
      this.log(JSON.stringify(res.data))
    }
  }
}
