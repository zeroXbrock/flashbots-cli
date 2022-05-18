import {expect, test} from '@oclif/test'

describe('sendBundle', () => {
  test
  .stdout()
  .command(['sendBundle'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['sendBundle', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
