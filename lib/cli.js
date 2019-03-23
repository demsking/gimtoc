const fs = require('fs')
const gimtoc = require('..')

const { name, version, license, author } = require('../package')

const header = `Author: ${author}\nLicense: ${license}\n`

/* eslint-disable-next-line max-len */
const usage = `Usage: ${name} [options]\n\nOptions:
  -s
  --section\t section name

  -f
  --file   \t markdown input file name

  -i
  --input  \t enable reading markdown content from stdin
           \t ex: cat README.md | ${name} -i -s TOC
`

function validateOptions (options) {
  if (!options.section) {
    throw new Error(`Missing required --section.\n${usage}`)
  }

  if (!options.content) {
    throw new Error(`Missing required --file or --input.\n${usage}`)
  }
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
    const arg = argv[i]

    switch (arg) {
      case '-v':
      /* eslint-disable-next-line no-fallthrough */
      case '--version':
        printVersion()
        break

      case '-h':
      /* eslint-disable-next-line no-fallthrough */
      case '--help':
        printHelp()
        break

      case '-s':
      /* eslint-disable-next-line no-fallthrough */
      case '--section':
        if (!argv[i + 1]) {
          /* eslint-disable-next-line max-len */
          throw new Error('Missing section value. Usage: --section [section name]')
        }

        options.section = argv[++i]
        break

      case '-f':
      /* eslint-disable-next-line no-fallthrough */
      case '--file':
        if (!argv[i + 1]) {
          /* eslint-disable-next-line max-len */
          throw new Error('Missing input file name. Usage: --file [input markdown name]')
        }

        options.content = fs.readFileSync(argv[++i], 'utf8').toString()
        break

      case '-i':
      /* eslint-disable-next-line no-fallthrough */
      case '--input':
        options.input = true
        break
    }
  }

  if (options.input) {
    return readStdin()
      .then((content) => {
        options.content = content
      })
      .then(() => validateOptions(options))
      .then(() => options)
  }

  validateOptions(options)

  return Promise.resolve(options)
}

function exec (argv) {
  parseArgs(argv)
    .then((options) => {
      try {
        const output = gimtoc(options.content, options.section)

        process.stdout.write(`${output}\n`)
        process.exit(0)
      } catch ({ message }) {
        process.stderr.write(`${message}\n`)
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
