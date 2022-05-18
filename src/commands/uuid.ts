import { Command } from '@oclif/core'
import { randomUUID } from 'crypto'

// lib
import { handleGenericError } from '../lib/error'

export default class Uuid extends Command {
  static description = 'Generate a random UUID.'

  async catch(e: any) {
    handleGenericError(e, this)
  }

  public async run(): Promise<void> {
    this.log(randomUUID())
  }
}
