import {Command} from '@oclif/core'
import { randomUUID } from 'crypto'

export default class Uuid extends Command {
  static description = 'describe the command here'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  public async run(): Promise<void> {
    this.log(randomUUID())
  }
}
