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
