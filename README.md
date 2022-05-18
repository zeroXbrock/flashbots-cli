# flashbots-cli

Flashbots CLI Tool

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/flashbots-cli.svg)](https://npmjs.org/package/flashbots-cli)
[![CircleCI](https://circleci.com/gh/zeroXbrock/flashbots-cli/tree/main.svg?style=shield)](https://circleci.com/gh/zeroXbrock/flashbots-cli/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/flashbots-cli)
[![License](https://img.shields.io/npm/l/flashbots-cli.svg)](https://github.com/zeroXbrock/flashbots-cli/blob/main/package.json)

## install

```sh
# if you use zsh
curl https://raw.githubusercontent.com/zeroXbrock/flashbots-cli/main/install.sh | /bin/zsh

# if you use bash
curl https://raw.githubusercontent.com/zeroXbrock/flashbots-cli/main/install.sh | /bin/bash

# soon:
# npm install -g flashbots-cli
```

## use

```sh
flashbots --help
```

```txt
Flashbots CLI tool.

VERSION
  flashbots-cli/0.0.0 linux-x64 node-v16.1.0

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

```sh
flashbots --help [COMMAND]
```

## examples

### bundle cache

Add first transaction to bundle:

```sh
$ flashbots bundleCache cd8578e0-7c7a-40ce-b60d-190f084a87ee
0xf87009851010b8720083010d8894eaa314eb4cc5a16458b17a94e759252f4fda9ea4808b6c617a792077616e6b65721ba026314be2b42cda8015133376447bd6ab93bc08d367fe7d1b57f270256f5e5e04a00595467676caa58aacc709a4c1c987cf2f18f10a527797c4730e23a320d034ce
```

Result:

```json
{"nonce":9,"gasPrice":{"type":"BigNumber","hex":"0x1010b87200"},"gasLimit":{"type":"BigNumber","hex":"0x010d88"},"to":"0xeAa314Eb4Cc5A16458B17a94e759252f4FDA9eA4","value":{"type":"BigNumber","hex":"0x00"},"data":"0x6c617a792077616e6b6572","chainId":0,"v":27,"r":"0x26314be2b42cda8015133376447bd6ab93bc08d367fe7d1b57f270256f5e5e04","s":"0x0595467676caa58aacc709a4c1c987cf2f18f10a527797c4730e23a320d034ce","from":"0x13babe07e11ff6f2276B97735131c867D793615b","hash":"0x84809aa44167e877b4b95f74b4b7f022ce04114be0c37f39ca858c438abbfb75","type":null,"confirmations":0}
Cached tx in bundle cd8578e0-7c7a-40ce-b60d-190f084a87ee
```

Add second tranaction to bundle:

```sh
flashbots bundleCache cd8578e0-7c7a-40ce-b60d-190f084a87ee 0xf8700a851010b8720083010d8894eaa314eb4cc5a16458b17a94e759252f4fda9ea4808b6c617a792077616e6b65721ba0ef7bdce42d5e3c8ef515d1afaafecd952ac1f2adc97f1c3a76807a0b9ac21784a03a5589f444cf5e5b09456ab599544ac6a6e831fd6a1e9c0b596db0a3cc085edb
```

Result:

```json
{"nonce":10,"gasPrice":{"type":"BigNumber","hex":"0x1010b87200"},"gasLimit":{"type":"BigNumber","hex":"0x010d88"},"to":"0xeAa314Eb4Cc5A16458B17a94e759252f4FDA9eA4","value":{"type":"BigNumber","hex":"0x00"},"data":"0x6c617a792077616e6b6572","chainId":0,"v":27,"r":"0xef7bdce42d5e3c8ef515d1afaafecd952ac1f2adc97f1c3a76807a0b9ac21784","s":"0x3a5589f444cf5e5b09456ab599544ac6a6e831fd6a1e9c0b596db0a3cc085edb","from":"0x13babe07e11ff6f2276B97735131c867D793615b","hash":"0x5346ddf789eb33c2e0a07bacbc53cf3f0766608b50cefcea64684586a650b6aa","type":null,"confirmations":0}
Cached tx in bundle cd8578e0-7c7a-40ce-b60d-190f084a87ee
```

Get entire cached bundle:

```sh
flashbots bundleCache cd8578e0-7c7a-40ce-b60d-190f084a87ee
```

Result:

```json
{"bundleId":"cd8578e0-7c7a-40ce-b60d-190f084a87ee","rawTxs":["0xf8700a851010b8720083010d8894eaa314eb4cc5a16458b17a94e759252f4fda9ea4808b6c617a792077616e6b65721ba0ef7bdce42d5e3c8ef515d1afaafecd952ac1f2adc97f1c3a76807a0b9ac21784a03a5589f444cf5e5b09456ab599544ac6a6e831fd6a1e9c0b596db0a3cc085edb","0xf87009851010b8720083010d8894eaa314eb4cc5a16458b17a94e759252f4fda9ea4808b6c617a792077616e6b65721ba026314be2b42cda8015133376447bd6ab93bc08d367fe7d1b57f270256f5e5e04a00595467676caa58aacc709a4c1c987cf2f18f10a527797c4730e23a320d034ce"]}
```
