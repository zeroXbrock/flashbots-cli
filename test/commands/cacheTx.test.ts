import {expect, test} from '@oclif/test'

describe('cacheTx', () => {
  test
  .stdout()
  .command(['cacheTx'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['cacheTx', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
