import {expect, test} from '@oclif/test'

describe('simulateBundle', () => {
  test
  .stdout()
  .command(['simulateBundle'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['simulateBundle', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
