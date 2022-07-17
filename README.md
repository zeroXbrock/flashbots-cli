# flashbots-cli

Flashbots CLI Tool

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/flashbots-cli.svg)](https://npmjs.org/package/flashbots-cli)
[![CircleCI](https://circleci.com/gh/zeroXbrock/flashbots-cli/tree/main.svg?style=shield)](https://circleci.com/gh/zeroXbrock/flashbots-cli/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/flashbots-cli)
[![License](https://img.shields.io/npm/l/flashbots-cli.svg)](https://github.com/zeroXbrock/flashbots-cli/blob/main/package.json)

`flashbots-cli` is a quick-and-easy solution for interacting with the flashbots relay. All methods implemented in the [`ethers-provider-flashbots-bundle`](https://github.com/flashbots/ethers-provider-flashbots-bundle) project are implemented here (and more coming soon).

## install

### via npm (global install)

```sh
npm install -g flashbots-cli@latest
flashbots --help
```

### via npx (one-off usage)

```sh
npx flashbots-cli@latest --help

# if you wanna get fancy
alias fb='npx flashbots-cli@latest'
fb --help
```

### install from source (hacker mode)

```sh
# if you use zsh
curl https://raw.githubusercontent.com/zeroXbrock/flashbots-cli/main/install.sh | /bin/zsh

# if you use bash
curl https://raw.githubusercontent.com/zeroXbrock/flashbots-cli/main/install.sh | /bin/bash
```

## use

```sh
# flashbots
# flashbots help
# flashbots --help

flashbots help
```

Result:

```txt
Flashbots CLI tool.

VERSION
  flashbots-cli/x.y.z linux-x64 node-v16.1.0

USAGE
  $ flashbots [COMMAND]

COMMANDS
  bundleCache           Add txs to a bundle one at a time.
  getBundleStats        Get info about a bundle.
  getConflictingBundle  Get information about competing bundles.
  getUserStats          Get Flashbots reputation data for your account.
  help                  Display help for flashbots.
  sendBundle            Send a bundle to the Flashbots relay.
  simulateBundle        Simulate a bundle.
  uuid                  Generate a random UUID.
```

Get command usage

```sh
# flashbots help [COMMAND]
# flashbots --help [COMMAND]
# flashbots [COMMAND] --help

flashbots simulateBundle --help
```

Result

```txt
Simulate a bundle.

USAGE
  $ flashbots simulateBundle [BUNDLE_TXS] [-b <value>] [--state-block-tag
    <value>] [--block-timestamp <value>]

ARGUMENTS
  BUNDLE_TXS  JSON string-encoded array of raw signed transactions (0x-prefixed)

FLAGS
  -b, --target-block=<value>  Block to target for bundle submission
  --block-timestamp=<value>   Timestamp to execute simulation against
  --state-block-tag=<value>   Block tag which specifies block state to execute
                              simulation against

DESCRIPTION
  Simulate a bundle.

EXAMPLES
  # Simulate a bundle in the current block

    $ flashbots simulateBundle '["0x02f8d37c496de...", \
      "0x02f8d38a7bf47..."]'

  # Simulate a bundle against a specific timestamp

    $ flashbots simulateBundle '["0x02f8d37c496de...", \
      "0x02f8d38a7bf47..."]' --block-timestamp 1652859017

  # Simulate a bundle against a block tag

    $ flashbots simulateBundle '["0x02f8d37c496de...", \
      "0x02f8d38a7bf47..."]' --state-block-tag latest
```

## examples

### `bundleCache`

`bundleCache` allows you to add raw signed transactions to a queue one at a time. This is commonly used for whitehat scenarios where you want to build a bundle using transactions that are signed by a private key you don't have.

**Add first transaction to bundle:**

```sh
# raw signed tx #1
tx1='0xf87009851010b8720083010d8894eaa314eb4cc5a16458b17a94e759252f4fda9ea4808b6c617a792077616e6b65721ba026314be2b42cda8015133376447bd6ab93bc08d367fe7d1b57f270256f5e5e04a00595467676caa58aacc709a4c1c987cf2f18f10a527797c4730e23a320d034ce'

# flashbots-cli includes a `uuid` command to generate UUIDs for this
bundleId=$(flashbots uuid)
echo $bundleId
cd8578e0-7c7a-40ce-b60d-190f084a87ee

flashbots bundleCache $bundleId $tx1
```

Result:

```json
{"nonce":9,"gasPrice":{"type":"BigNumber","hex":"0x1010b87200"},"gasLimit":{"type":"BigNumber","hex":"0x010d88"},"to":"0xeAa314Eb4Cc5A16458B17a94e759252f4FDA9eA4","value":{"type":"BigNumber","hex":"0x00"},"data":"0x6c617a792077616e6b6572","chainId":0,"v":27,"r":"0x26314be2b42cda8015133376447bd6ab93bc08d367fe7d1b57f270256f5e5e04","s":"0x0595467676caa58aacc709a4c1c987cf2f18f10a527797c4730e23a320d034ce","from":"0x13babe07e11ff6f2276B97735131c867D793615b","hash":"0x84809aa44167e877b4b95f74b4b7f022ce04114be0c37f39ca858c438abbfb75","type":null,"confirmations":0}
Cached tx in bundle cd8578e0-7c7a-40ce-b60d-190f084a87ee
```

**Add second tranaction to bundle:**

```sh
# raw signed tx #2
tx2='0xf8700a851010b8720083010d8894eaa314eb4cc5a16458b17a94e759252f4fda9ea4808b6c617a792077616e6b65721ba0ef7bdce42d5e3c8ef515d1afaafecd952ac1f2adc97f1c3a76807a0b9ac21784a03a5589f444cf5e5b09456ab599544ac6a6e831fd6a1e9c0b596db0a3cc085edb'

flashbots bundleCache $bundleId $tx2
```

Result:

```json
{"nonce":10,"gasPrice":{"type":"BigNumber","hex":"0x1010b87200"},"gasLimit":{"type":"BigNumber","hex":"0x010d88"},"to":"0xeAa314Eb4Cc5A16458B17a94e759252f4FDA9eA4","value":{"type":"BigNumber","hex":"0x00"},"data":"0x6c617a792077616e6b6572","chainId":0,"v":27,"r":"0xef7bdce42d5e3c8ef515d1afaafecd952ac1f2adc97f1c3a76807a0b9ac21784","s":"0x3a5589f444cf5e5b09456ab599544ac6a6e831fd6a1e9c0b596db0a3cc085edb","from":"0x13babe07e11ff6f2276B97735131c867D793615b","hash":"0x5346ddf789eb33c2e0a07bacbc53cf3f0766608b50cefcea64684586a650b6aa","type":null,"confirmations":0}
Cached tx in bundle cd8578e0-7c7a-40ce-b60d-190f084a87ee
```

**Get entire cached bundle:**

```sh
flashbots bundleCache $bundleId
```

Result:

```txt
{"bundleId":"cd8578e0-7c7a-40ce-b60d-190f084a87ee","rawTxs":["0xf8700a851010b8720083010d8894eaa314eb4cc5a16458b17a94e759252f4fda9ea4808b6c617a792077616e6b65721ba0ef7bdce42d5e3c8ef515d1afaafecd952ac1f2adc97f1c3a76807a0b9ac21784a03a5589f444cf5e5b09456ab599544ac6a6e831fd6a1e9c0b596db0a3cc085edb","0xf87009851010b8720083010d8894eaa314eb4cc5a16458b17a94e759252f4fda9ea4808b6c617a792077616e6b65721ba026314be2b42cda8015133376447bd6ab93bc08d367fe7d1b57f270256f5e5e04a00595467676caa58aacc709a4c1c987cf2f18f10a527797c4730e23a320d034ce"]}
```

### `getBundleStats`

`getBundleStats` retrieves information about a bundle's inclusion from simulation through submission.

```sh
bundleHash='0x123456789abcdef123456789abcdef123456789abcdef123456789abcdef1234'
targetBlock='13509887'

flashbots getBundleStats $bundleHash $targetBlock
```

Result:

```json
{
  "isSimulated": true,
  "isSentToMiners": true,
  "isHighPriority": true,
  "simulatedAt": "2021-10-29T04:00:50.526Z",
  "submittedAt": "2021-10-29T04:00:50.472Z",
  "sentToMinersAt": "2021-10-29T04:00:50.546Z"
}
```

### `getConflictingBundle`

`getConflictingBundle` retrieves information about competing bundle(s).

```sh
signedTxs='["0xf87009851010b8720083010d8894eaa314eb4cc5a16458b17a94e759252f4fda9ea4808b6c617a792077616e6b65721ba026314be2b42cda8015133376447bd6ab93bc08d367fe7d1b57f270256f5e5e04a00595467676caa58aacc709a4c1c987cf2f18f10a527797c4730e23a320d034ce", "0xf8700a851010b8720083010d8894eaa314eb4cc5a16458b17a94e759252f4fda9ea4808b6c617a792077616e6b65721ba0ef7bdce42d5e3c8ef515d1afaafecd952ac1f2adc97f1c3a76807a0b9ac21784a03a5589f444cf5e5b09456ab599544ac6a6e831fd6a1e9c0b596db0a3cc085edb"]'
targetBlock=13140328

flashbots getConflictingBundle $signedTxs $targetBlock
```

Result:

```json
{
  "conflictType": FlashbotsBundleConflictType.NonceCollision,
  "initialSimulation": {
    "totalGasUsed": 205860,
    "bundleHash": "0x1720ea33d96dca026dddd5689f8cad21966988348ced04e9054a0dca5d60f1d4",
    "coinbaseDiff": BigNumber(0x0176750858d000),
    },
    "results": [...]
  },
  "targetBundleGasPricing": {
    "gasUsed": 205860,
    "txCount": 1,
    "gasFeesPaidBySearcher": BigNumber(0x0176750858d000),
    "priorityFeesReceivedByMiner": BigNumber(0x52efd8d80dbc24),
    "ethSentToCoinbase": BigNumber.from(0x00),
    "effectiveGasPriceToSearcher": BigNumber(0x77359400),
    "effectivePriorityFeeToMiner": BigNumber(0x1a6734f601)
  },
  "conflictingBundleGasPricing": {
    "gasUsed": 396462,
    "txCount": 3,
    "gasFeesPaidBySearcher": BigNumber(0xc4c3c97ce1bff8b4),
    "priorityFeesReceivedByMiner": BigNumber(0xc4213e4d7ad82006),
    "ethSentToCoinbase": BigNumber(0xc4c2663d3b804731),
    "effectiveGasPriceToSearcher": BigNumber(0x410ce509aa1e),
    "effectivePriorityFeeToMiner": BigNumber(0x40f2069f201d)
  },
  "conflictingBundle": [
    {
      "transaction_hash": "0x23a33038289dda1b6e722835d2b9388cb41d96d085c19ca6b71bb3e9697e6692",
      "tx_index": 0,
      "bundle_type": "flashbots",
      "bundle_index": 0,
      "block_number": 13140328,
      "eoa_address": "0x38563699560e4512c7574C8cC5Cf89fd43923BcA",
      "to_address": "0x000000000035B5e5ad9019092C665357240f594e",
      "gas_used": 100893,
      "gas_price": "0",
      "coinbase_transfer": "0",
      "total_miner_reward": "0"
    },
   ...
  ]
}
```

### `getUserStats`

`getUserStats` retrieves Flashbots reputation information about your account.

```sh
# Get user stats about hardhat account 0
authSignerKey=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

flashbots getUserStats $authSignerKey
```

Result:

```txt
{"is_high_priority":true,"all_time_miner_payments":"271021997564860145835","all_time_gas_simulated":"28405149806","last_7d_miner_payments":"18728986348907349342","last_7d_gas_simulated":"4798626009","last_1d_miner_payments":"5360668420920718","last_1d_gas_simulated":"4917660"}
```

### `sendBundle`

`sendBundle` sends a bundle of raw signed transactions to flashbots. By default, we target the next available block (`getBlockNumber() + 1`) and sign the bundle with a random account.

To earn reputation for your bundles, make sure to set the `-a` (`--authSigner`) flag.

```sh
signedTxs='["0xf87009851010b8720083010d8894eaa314eb4cc5a16458b17a94e759252f4fda9ea4808b6c617a792077616e6b65721ba026314be2b42cda8015133376447bd6ab93bc08d367fe7d1b57f270256f5e5e04a00595467676caa58aacc709a4c1c987cf2f18f10a527797c4730e23a320d034ce", "0xf8700a851010b8720083010d8894eaa314eb4cc5a16458b17a94e759252f4fda9ea4808b6c617a792077616e6b65721ba0ef7bdce42d5e3c8ef515d1afaafecd952ac1f2adc97f1c3a76807a0b9ac21784a03a5589f444cf5e5b09456ab599544ac6a6e831fd6a1e9c0b596db0a3cc085edb"]'

flashbots sendBundle $signedTxs
```

Result:

```json
Targeting block 14802559 for bundle submission.

{"bundleTransactions":[{"signedTransaction":"0xf87009851010b8720083010d8894eaa314eb4cc5a16458b17a94e759252f4fda9ea4808b6c617a792077616e6b65721ba026314be2b42cda8015133376447bd6ab93bc08d367fe7d1b57f270256f5e5e04a00595467676caa58aacc709a4c1c987cf2f18f10a527797c4730e23a320d034ce","hash":"0x84809aa44167e877b4b95f74b4b7f022ce04114be0c37f39ca858c438abbfb75","account":"0x13babe07e11ff6f2276B97735131c867D793615b","nonce":9},{"signedTransaction":"0xf8700a851010b8720083010d8894eaa314eb4cc5a16458b17a94e759252f4fda9ea4808b6c617a792077616e6b65721ba0ef7bdce42d5e3c8ef515d1afaafecd952ac1f2adc97f1c3a76807a0b9ac21784a03a5589f444cf5e5b09456ab599544ac6a6e831fd6a1e9c0b596db0a3cc085edb","hash":"0x5346ddf789eb33c2e0a07bacbc53cf3f0766608b50cefcea64684586a650b6aa","account":"0x13babe07e11ff6f2276B97735131c867D793615b","nonce":10}],"bundleHash":"0x57b0f5e51b924a9d88a59b2d4f0c4fd2c26c80a130d982c9bc4e97d3001ff054"}
```

### `simulateBundle`

`simulateBundle` simulates a bundle and prints information about the bundle's inclusion viability.

```sh
signedTxs='["0xf87009851010b8720083010d8894eaa314eb4cc5a16458b17a94e759252f4fda9ea4808b6c617a792077616e6b65721ba026314be2b42cda8015133376447bd6ab93bc08d367fe7d1b57f270256f5e5e04a00595467676caa58aacc709a4c1c987cf2f18f10a527797c4730e23a320d034ce", "0xf8700a851010b8720083010d8894eaa314eb4cc5a16458b17a94e759252f4fda9ea4808b6c617a792077616e6b65721ba0ef7bdce42d5e3c8ef515d1afaafecd952ac1f2adc97f1c3a76807a0b9ac21784a03a5589f444cf5e5b09456ab599544ac6a6e831fd6a1e9c0b596db0a3cc085edb"]'

flashbots simulateBundle $signedTxs
```

Result:

```json
Targeting block 14802588 for bundle simulation.
{"bundleHash":"0x57b0f5e51b924a9d88a59b2d4f0c4fd2c26c80a130d982c9bc4e97d3001ff054","coinbaseDiff":{"type":"BigNumber","hex":"0x05db54a1c878e0"},"results":[{"coinbaseDiff":"824265710779504","ethSentToCoinbase":"0","fromAddress":"0x13babe07e11ff6f2276B97735131c867D793615b","gasFees":"824265710779504","gasPrice":"38924523554","gasUsed":21176,"toAddress":"0xeAa314Eb4Cc5A16458B17a94e759252f4FDA9eA4","txHash":"0x84809aa44167e877b4b95f74b4b7f022ce04114be0c37f39ca858c438abbfb75","value":"0x"},{"coinbaseDiff":"824265710779504","ethSentToCoinbase":"0","fromAddress":"0x13babe07e11ff6f2276B97735131c867D793615b","gasFees":"824265710779504","gasPrice":"38924523554","gasUsed":21176,"toAddress":"0xeAa314Eb4Cc5A16458B17a94e759252f4FDA9eA4","txHash":"0x5346ddf789eb33c2e0a07bacbc53cf3f0766608b50cefcea64684586a650b6aa","value":"0x"}],"totalGasUsed":42352}
```

### `sendPrivateTransaction`

`sendPrivateTransaction` sends a single signed transaction to Flashbots. Flashbots will try to get the transaction included for a maximum of 25 blocks.

```sh
signedTx=0xf87080853010b872008a010d8894eaa314db4cc5a16458b17a94e759252a4fda9ea4808b6c6a7a792f77616e6b65721ba05bf41e534c768499a3a84567e9acca5fdec73164d54b0cd21e4cdd94a11af29ba0591f06662aa673b645378774ee4a665fdf8a7ec8e0418ec0ac0d24f915bc8526
flashbots sendPrivateTransaction $signedTx
```

Result:

```json
{"transaction":{"signedTransaction":"0xf87080853010b872008a010d8894eaa314db4cc5a16458b17a94e759252a4fda9ea4808b6c6a7a792f77616e6b65721ba05bf41e534c768499a3a84567e9acca5fdec73164d54b0cd21e4cdd94a11af29ba0591f06662aa673b645378774ee4a665fdf8a7ec8e0418ec0ac0d24f915bc8526","hash":"0x1030b9b9c685b0c63543ce2b14d286b3dcc82852a9d3404e3f1aaaf5108bb73c","account":"0x0000000000092DD1482686a414A08e64fF1463C2","nonce":0}}
```

Send with options:

```sh
signedTx=0xf87080853010b872008a010d8894eaa314db4cc5a16458b17a94e759252a4fda9ea4808b6c6a7a792f77616e6b65721ba05bf41e534c768499a3a84567e9acca5fdec73164d54b0cd21e4cdd94a11af29ba0591f06662aa673b645378774ee4a665fdf8a7ec8e0418ec0ac0d24f915bc8526
flashbots sendPrivateTransaction $signedTx --max-block-number 15161558 --simulation-timestamp 1658080039
```

Result:

```json
{"transaction":{"signedTransaction":"0xf87080853010b872008a010d8894eaa314db4cc5a16458b17a94e759252a4fda9ea4808b6c6a7a792f77616e6b65721ba05bf41e534c768499a3a84567e9acca5fdec73164d54b0cd21e4cdd94a11af29ba0591f06662aa673b645378774ee4a665fdf8a7ec8e0418ec0ac0d24f915bc8526","hash":"0x1030b9b9c685b0c63543ce2b14d286b3dcc82852a9d3404e3f1aaaf5108bb73c","account":"0x0000000000092DD1482686a414A08e64fF1463C2","nonce":0}}
Waiting for inclusion...
Private transaction successfully mined.
```

### `cancelPrivateTransaction`

`cancelPrivateTransaction` cancels a pending private transaction.

```sh
txHash=0x1030b9b9c685b0c63543ce2b14d286b3dcc82852a9d3404e3f1aaaf5108bb73c
flashbots cancelPrivateTransaction $txHash
```

Result:

```txt
Transaction cancelled (0x1030b9b9c685b0c63543ce2b14d286b3dcc82852a9d3404e3f1aaaf5108bb73c)
```

## development

### run local build

```sh
./bin/dev help
```

### publish new release

```sh
TODO: FILL THIS IN
```

## features

- [x] `bundleCache`
- [x] `getBundleStats`
- [x] `getConflictingBundle`
- [x] `getUserStats`
- [x] `sendBundle`
- [x] `simulateBundle`
- [x] `uuid`
- [x] `sendPrivateTransaction`
  - [ ] fast mode option
- [x] `cancelPrivateTransaction`
- [ ] Goerli support
- [ ] auto-complete
- [ ] sign, simulate, & send unsigned txs
- [ ] bundle status polling (equivalent of `(await sendBundle()).wait()`)

Got a big 🧠 idea? Drop it in the [issues](https://github.com/zeroXbrock/flashbots-cli/issues) and tag the maintainer! Or if you can code it yourself, drop a PR! Contributions welcome 🤝
