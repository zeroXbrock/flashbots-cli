oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g flashbots-cli
$ flashbots COMMAND
running command...
$ flashbots (--version)
flashbots-cli/0.0.0 linux-x64 node-v16.1.0
$ flashbots --help [COMMAND]
USAGE
  $ flashbots COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`flashbots hello PERSON`](#flashbots-hello-person)
* [`flashbots hello world`](#flashbots-hello-world)
* [`flashbots help [COMMAND]`](#flashbots-help-command)
* [`flashbots plugins`](#flashbots-plugins)
* [`flashbots plugins:install PLUGIN...`](#flashbots-pluginsinstall-plugin)
* [`flashbots plugins:inspect PLUGIN...`](#flashbots-pluginsinspect-plugin)
* [`flashbots plugins:install PLUGIN...`](#flashbots-pluginsinstall-plugin-1)
* [`flashbots plugins:link PLUGIN`](#flashbots-pluginslink-plugin)
* [`flashbots plugins:uninstall PLUGIN...`](#flashbots-pluginsuninstall-plugin)
* [`flashbots plugins:uninstall PLUGIN...`](#flashbots-pluginsuninstall-plugin-1)
* [`flashbots plugins:uninstall PLUGIN...`](#flashbots-pluginsuninstall-plugin-2)
* [`flashbots plugins update`](#flashbots-plugins-update)

## `flashbots hello PERSON`

Say hello

```
USAGE
  $ flashbots hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Whom is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/code/hello-world/blob/v0.0.0/dist/commands/hello/index.ts)_

## `flashbots hello world`

Say hello world

```
USAGE
  $ flashbots hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
```

## `flashbots help [COMMAND]`

Display help for flashbots.

```
USAGE
  $ flashbots help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for flashbots.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.10/src/commands/help.ts)_

## `flashbots plugins`

List installed plugins.

```
USAGE
  $ flashbots plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ flashbots plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `flashbots plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ flashbots plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ flashbots plugins add

EXAMPLES
  $ flashbots plugins:install myplugin 

  $ flashbots plugins:install https://github.com/someuser/someplugin

  $ flashbots plugins:install someuser/someplugin
```

## `flashbots plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ flashbots plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ flashbots plugins:inspect myplugin
```

## `flashbots plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ flashbots plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ flashbots plugins add

EXAMPLES
  $ flashbots plugins:install myplugin 

  $ flashbots plugins:install https://github.com/someuser/someplugin

  $ flashbots plugins:install someuser/someplugin
```

## `flashbots plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ flashbots plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ flashbots plugins:link myplugin
```

## `flashbots plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ flashbots plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ flashbots plugins unlink
  $ flashbots plugins remove
```

## `flashbots plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ flashbots plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ flashbots plugins unlink
  $ flashbots plugins remove
```

## `flashbots plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ flashbots plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ flashbots plugins unlink
  $ flashbots plugins remove
```

## `flashbots plugins update`

Update installed plugins.

```
USAGE
  $ flashbots plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
