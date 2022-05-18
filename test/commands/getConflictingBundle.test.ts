import {expect, test} from '@oclif/test'

describe('getConflictingBundle', () => {
  test
  .stdout()
  .command(['getConflictingBundle'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['getConflictingBundle', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
