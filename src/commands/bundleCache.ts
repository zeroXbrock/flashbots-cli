import axios from 'axios'
import { Command, Flags } from '@oclif/core'
import { providers } from 'ethers'

// lib
import { FLASHBOTS_PROTECT_URL } from '../lib/constants'
import { handleGenericError } from '../lib/error'

export default class BundleCache extends Command {
  static description = `Interact with the Flashbots Bundle Cache API. 
  Specify [BUNDLE_ID] AND [RAW_TX] to add a new transaction to a bundle. 
  To get the current cached bundle, only set [BUNDLE_ID].`

  static examples = [
`# Add a transaction to a bundle
<%= config.bin %> <%= command.id %> 5b479f88-01ca 0x02f8d30182024...`,   
`# Get transactions in a bundle
<%= config.bin %> <%= command.id %> 5b479f88-01ca`,
  ]

  static flags = {
    // flag with a value (-n, --name=VALUE)
    // name: Flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-g, --get)
    // get: Flags.boolean({char: 'g'}),
  }

  static args = [
    {name: 'bundle_id', required: true, description: 'Unique ID to identify your bundle (UUIDv4 recommended)'}, 
    {name: 'raw_tx', description: 'Raw signed transaction (0x-prefixed hex data)'}
  ]

  async catch(e: any) {
    handleGenericError(e, this)
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(BundleCache)

    if (args.raw_tx) {
      // add tx to bundle
      const provider = new providers.JsonRpcProvider(`${FLASHBOTS_PROTECT_URL}?bundle=${args.bundle_id}`)
      const res = await provider.sendTransaction(args.raw_tx)
      this.log(res.toString())
      this.log(`Cached tx in bundle ${args.bundle_id}`)
    } else {
      // get bundle
      const res = await axios.get(`${FLASHBOTS_PROTECT_URL}/bundle?id=${args.bundle_id}`)
      this.log(JSON.stringify(res.data))
    }
  }
}
