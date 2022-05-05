# Generate & Inject Markdown TOC

Generate and Inject Markdown Table of Contents

[![npm](https://img.shields.io/npm/v/gimtoc.svg)](https://www.npmjs.com/package/gimtoc) [![Build status](https://gitlab.com/demsking/gimtoc/badges/master/pipeline.svg)](https://gitlab.com/demsking/gimtoc/pipelines) [![Test coverage](https://gitlab.com/demsking/gimtoc/badges/master/coverage.svg)](https://gitlab.com/demsking/gimtoc/-/jobs)

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)
: Node 12+ is needed to use it and it must be imported instead of required.

```sh
# install gimtoc globally as  binary
npm install -g gimtoc

# install gimtoc as npm dependency
npm install --save gimtoc
```

## CLI Usage

```sh
# print package version
gimtoc -v
gimtoc --version

# print CLI usage
gimtoc -h
gimtoc --help

# print merged README.md with injected TOC
gimtoc -f README.md -s "Table of Contents"
gimtoc --file README.md --section "Table of Contents"

# update the README.md's section called TOC
gimtoc --file README.md --section 'TOC' --output README.md

# update the README.md's TOC section using pipe
cat README.md | gimtoc -i -s 'TOC' -o README.md

# generate a TOC with BitBucket compatibility (option --anchor)
gimtoc --file README.md --section 'TOC' --anchor --output README.md
```

## Programmatic Usage

```js
import gimtoc from 'gimtoc';

const mdContent = `
  # Awesome Mardown Documentation

  ## Table of Contents

  ## Usage

  npm install -g gimtoc

  ## License

  MIT
`;

const injectionSection = 'Table of Contents';
const options = {
  // use this option to enable the BitBucket compatibility.
  // the default value is false
  anchor: false
  // see https://www.npmjs.com/package/markdown-toc#options for other options
};

const mdContentWithToc = gimtoc(mdContent, injectionSection, options);

console.log(mdContentWithToc);
```

**Output**

Print the markdown content with the generated TOC in the injection section

```md
# Awesome Mardown Documentation

## Table of Contents

- [Usage](#usage)
- [License](#license)

## Usage

npm install -g gimtoc

## License

MIT
```

## Options

Gimtoc use [markdown-toc](https://www.npmjs.com/package/markdown-toc) to
generate Markdown TOC. To configure the TOC generation, please refer to the
[markdown-toc documentation](https://www.npmjs.com/package/markdown-toc#options)
for `options` description.

**Title ignored by default**

By default, gimtoc use [options.firsth1 === false](https://www.npmjs.com/package/markdown-toc#optionsfirsth1)
to remove the markdown title from the generated TOC. You can overwrite this
by setting `options.firsth1` to `true`.

**Injection section ignored by default**

Since we perform an injection in a markdown section, the injection section is
ignored when generating the TOC.

## Contribute

Contributions to Gimtoc are welcome. Here is how you can contribute:

1. [Submit bugs or a feature request](https://gitlab.com/demsking/gimtoc/issues) and help us verify fixes as they are checked in
2. Write code for a bug fix or for your new awesome feature
3. Write test cases for your changes
4. [Submit merge requests](https://gitlab.com/demsking/gimtoc/merge_requests) for bug fixes and features and discuss existing proposals

## Versioning

Given a version number `MAJOR.MINOR.PATCH`, increment the:

- `MAJOR` version when you make incompatible API changes,
- `MINOR` version when you add functionality in a backwards-compatible manner, and
- `PATCH` version when you make backwards-compatible bug fixes.

Additional labels for pre-release and build metadata are available as extensions
to the `MAJOR.MINOR.PATCH` format.

See [SemVer.org](https://semver.org/) for more details.

## License

Under the MIT license. See [LICENSE](https://gitlab.com/demsking/gimtoc/blob/master/LICENSE)
file for more details.
