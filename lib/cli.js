import { readFile, writeFile } from 'fs/promises';
import { gimtoc } from '..';
import { name, version, license, author } from '../package.json';

const header = `Author: ${author}\nLicense: ${license}\n`;

/* eslint-disable-next-line max-len */
export const usage = `Usage: ${name} [options]\n\nOptions:
  -s
  --section  section name

  -f
  --file     markdown input file name

  -i
  --input    enable reading markdown content from stdin
             ex: cat README.md | ${name} -i -s "Table of Contents"

  -o
  --output   write merged content to a file
             ex: ${name} -f README.md -s TOC -o README.md
                 cat README.md | ${name} -i -s TOC -o README.md
  
  -a
  --anchor   generate HTML anchors for each title. This is for BitBucket compatibility
`;

class MissingInputFileNameError extends Error {
  constructor() {
    super(`Missing input file name. ${usage}`);
  }
}

class MissingSectionNameError extends Error {
  constructor() {
    super(`Missing section name. ${usage}`);
  }
}

export function validateOptions (options) {
  if (!options.section) {
    throw new Error(`Missing option --section.\n\n${usage}`);
  }

  if (!options.content) {
    throw new Error(`Missing option -f or -i.\n\n${usage}`);
  }
}

function printVersion () {
  process.stdout.write(`${name} v${version}\n\n${header}`);
  process.exit(0);
}

function printHelp () {
  process.stdout.write(usage);
  process.exit(0);
}

function readStdin () {
  return new Promise((resolve, reject) => {
    let input = '';

    process.stdin.setEncoding('utf8');
    process.stdin.on('readable', () => {
      let chunk;

      /* eslint-disable-next-line no-cond-assign */
      while ((chunk = process.stdin.read())) {
        input += chunk;
      }
    });

    process.stdin.on('end', () => resolve(input));
    process.stdin.on('error', reject);
  });
}

export function parseArgs (argv) {
  const options = {};

  for (let i = 0; i < argv.length; i++) {
    switch (argv[i]) {
      case '-v':
      case '--version':
        printVersion();
        break;

      case '-h':
      case '--help':
        printHelp();
        break;

      case '-i':
      case '--input':
        options.input = true;
        break;

      case '-o':
      case '--output':
        options.output = argv[++i];
        break;

      case '-a':
      case '--anchor':
        options.anchor = true;
        break;

      case '-f':
      case '--file':
        if (!argv[i + 1]) {
          throw new MissingInputFileNameError();
        }

        options.filename = argv[++i];
        options.content = readFile(options.filename, 'utf8').toString();
        break;

      case '-s':
      case '--section':
        if (!argv[i + 1]) {
          throw new MissingSectionNameError();
        }

        options.section = argv[++i];
        break;
    }
  }

  if (options.input) {
    return readStdin().then((content) => {
      options.content = content;

      return options;
    });
  }

  return Promise.resolve(options);
}

export async function exec (argv) {
  let options = {};

  try {
    options = await parseArgs(argv);

    validateOptions(options);

    const output = await gimtoc(options.content, options.section, options);

    if (options.output) {
      writeFile(options.output, output);
    } else {
      process.stdout.write(`${output}\n`);
    }

    process.exit(0);
  } catch (err) {
    if (err instanceof MissingSectionNameError) {
      const { section, filename } = options;

      process.stderr.write(`Missing section '${section}' in '${filename}'\n`);
      process.exit(-3);
    }

    if (err instanceof MissingInputFileNameError) {
      process.stderr.write(`${err.message}\n`);
      process.exit(-2);
    }
  }
}
