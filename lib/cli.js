const fs = require('fs')
const gimtoc = require('..')

const { name, version, license, author } = require('../package')

const header = `Author: ${author}\nLicense: ${license}\n`

/* eslint-disable-next-line max-len */
const usage = `Usage: ${name} [options]\n\nOptions:
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
`

function validateOptions (options) {
  if (!options.section) {
    return Promise.reject(new Error(`Missing option --section.\n\n${usage}`))
  }

  if (!options.content) {
    return Promise.reject(new Error(`Missing option -f or -i.\n\n${usage}`))
  }

  return Promise.resolve(options)
}

function printVersion () {
  process.stdout.write(`${name} v${version}\n\n${header}`)
  process.exit(0)
}

function printHelp () {
  process.stdout.write(usage)
  process.exit(0)
}

function readStdin () {
  return new Promise((resolve, reject) => {
    let input = ''

    process.stdin.setEncoding('utf8')
    process.stdin.on('readable', () => {
      let chunk

      /* eslint-disable-next-line no-cond-assign */
      while ((chunk = process.stdin.read())) {
        input += chunk
      }
    })

    process.stdin.on('end', () => resolve(input))
    process.stdin.on('error', reject)
  })
}

function parseArgs (argv) {
  const options = {}

  for (let i = 0; i < argv.length; i++) {
    switch (argv[i]) {
      case '-v':
      case '--version':
        printVersion()
        break

      case '-h':
      case '--help':
        printHelp()
        break

      case '-i':
      case '--input':
        options.input = true
        break

      case '-o':
      case '--output':
        options.output = argv[++i]
        break

      case '-a':
      case '--anchor':
        options.anchor = true
        break

      case '-f':
      case '--file':
        if (!argv[i + 1]) {
          return Promise.error(new Error(`Missing input file name. ${usage}`))
        }

        options.filename = argv[++i]
        options.content = fs.readFileSync(options.filename, 'utf8').toString()
        break

      case '-s':
      case '--section':
        if (!argv[i + 1]) {
          return Promise.error(new Error(`Missing section name. ${usage}`))
        }

        options.section = argv[++i]
        break
    }
  }

  if (options.input) {
    return readStdin().then((content) => {
      options.content = content

      return options
    })
  }

  return Promise.resolve(options)
}

function exec (argv) {
  parseArgs(argv)
    .then((options) => validateOptions(options))
    .then((options) => {
      try {
        const output = gimtoc(options.content, options.section)

        if (options.output) {
          fs.writeFileSync(options.output, output)
        } else {
          process.stdout.write(`${output}\n`)
        }

        process.exit(0)
      } catch ({ message }) {
        const { section, filename } = options

        process.stderr.write(`Missing section '${section}' in '${filename}'\n`)
        process.exit(3)
      }
    })
    .catch(({ message }) => {
      process.stderr.write(`${message}\n`)
      process.exit(2)
    })
}

module.exports.usage = usage
module.exports.validateOptions = validateOptions
module.exports.parseArgs = parseArgs
module.exports.exec = exec
