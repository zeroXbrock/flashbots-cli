import {expect, test} from '@oclif/test'

describe('getUserStats', () => {
  test
  .stdout()
  .command(['getUserStats'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['getUserStats', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
