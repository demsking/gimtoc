#!/usr/bin/env node

import cli from '../lib/cli'

if (process.argv.length < 3) {
  process.stderr.write(cli.usage)
  process.exit(1)
}

cli.exec(process.argv.slice(2))
