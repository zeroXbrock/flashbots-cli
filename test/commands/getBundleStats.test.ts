import {expect, test} from '@oclif/test'

describe('getBundleStats', () => {
  test
  .stdout()
  .command(['getBundleStats'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['getBundleStats', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
