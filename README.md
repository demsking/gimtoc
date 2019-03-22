# Generate & Inject Markdown TOC

Generate and Inject Markdown Table of Contents

[![npm](https://img.shields.io/npm/v/gimtoc.svg)](https://www.npmjs.com/package/gimtoc) [![Build status](https://gitlab.com/demsking/gimtoc/badges/master/build.svg)](https://gitlab.com/demsking/gimtoc/pipelines) [![Test coverage](https://gitlab.com/demsking/gimtoc/badges/master/coverage.svg)](https://gitlab.com/demsking/gimtoc/-/jobs)

## Install

```sh
npm install --save gimtoc
```

## Usage

```js
const gimtoc = require('gimtoc')

const mdContent = `
  # gimtoc

  ## TOC

  ## Usage

  npm install --save gimtoc

  ## License

  MIT
`

const injectionSection = 'TOC'
const options = {}

const mdContentWithToc = gimtoc(mdContent, injectionSection, options)

console.log(mdContentWithToc)
```

**Output**

Print the markdown content with the generated TOC in the injection section

```md
# gimtoc

## TOC

- [Usage](#usage)
- [License](#license)

## Usage

npm install --save gimtoc

## License

MIT
```

## Options

Gimtoc use [markdown-toc](https://www.npmjs.com/package/markdown-toc) to
generate Markdown TOC. To configure the TOC generation, please refer to the
[markdown-toc documentation](https://www.npmjs.com/package/markdown-toc#options) for `options` description.

**Title ignored by default**

By default, gimtoc use [options.firsth1 === false](https://www.npmjs.com/package/markdown-toc#optionsfirsth1)
to remove the markdown title from the generated TOC. You can overwrite this
by setting `options.firsth1` to `true`.

**Injection section ignored by default**

Since we perform an injection in a markdown section, the injection section is
ignored when generating the TOC.

## Contribute

Contributions to Vuedoc Parser are welcome. Here is how you can contribute:

1. [Submit bugs or a feature request](https://gitlab.com/demsking/gimtoc/issues) and help us verify fixes as they are checked in
2. Write code for a bug fix or for your new awesome feature
3. Write test cases for your changes
4. [Submit merge requests](https://gitlab.com/demsking/gimtoc/merge_requests) for bug fixes and features and discuss existing proposals

## Versioning

Given a version number `MAJOR.MINOR.PATCH`, increment the:

- `MAJOR` version when you make incompatible API changes,
- `MINOR` version when you add functionality in a backwards-compatible manner, and
- `PATCH` version when you make backwards-compatible bug fixes.

Additional labels for pre-release and build metadata are available as extensions to the `MAJOR.MINOR.PATCH` format.

See [SemVer.org](https://semver.org/) for more details.

## License

Under the MIT license. See [LICENSE](https://gitlab.com/demsking/gimtoc/blob/master/LICENSE) file for more details.
