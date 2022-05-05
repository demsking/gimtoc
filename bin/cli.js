#!/usr/bin/env node

import { usage, exec } from '../lib/cli';

if (process.argv.length < 3) {
  process.stderr.write(usage);
  process.exit(1);
}

exec(process.argv.slice(2));
