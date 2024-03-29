# Generate & Inject Markdown TOC

Generate and Inject Markdown Table of Contents

[![npm](https://img.shields.io/npm/v/gimtoc.svg)](https://www.npmjs.com/package/gimtoc)
[![Build status](https://gitlab.com/demsking/gimtoc/badges/main/pipeline.svg)](https://gitlab.com/demsking/gimtoc/pipelines)
[![Test coverage](https://gitlab.com/demsking/gimtoc/badges/main/coverage.svg)](https://gitlab.com/demsking/gimtoc/-/jobs)
[![Buy me a beer](https://img.shields.io/badge/Buy%20me-a%20beer-1f425f.svg)](https://www.buymeacoffee.com/demsking)

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)
: Node 14+ is needed to use it and it must be imported instead of required.

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
import { gimtoc } from 'gimtoc';

const mdContent = `
  # Awesome Markdown Documentation

  ## Table of Contents

  ## Usage

  npm install -g gimtoc

  ## License

  MIT
`;

const injectionSection = 'Table of Contents';
const options = {
  // use this option to generate links anchors
  // the default value is false
  anchors: false
  // see https://www.npmjs.com/package/markdown-toc#options for other options
};

gimtoc(mdContent, injectionSection, options)
  .then((mdContentWithToc) => console.log(mdContentWithToc));
```

**Output**

Print the markdown content with the generated TOC in the injection section

```md
# Awesome Markdown Documentation

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

## Development Setup

1. [Install Nix Package Manager](https://nixos.org/manual/nix/stable/installation/installing-binary.html)

2. [Install `direnv` with your OS package manager](https://direnv.net/docs/installation.html#from-system-packages)

3. [Hook it `direnv` into your shell](https://direnv.net/docs/hook.html)

4. At the top-level of your project run:

   ```sh
   direnv allow
   ```

   > The next time your launch your terminal and enter the top-level of your
   > project, `direnv` will check for changes.

## Contribute

Please follow [CONTRIBUTING.md](https://gitlab.com/demsking/gimtoc/blob/main/CONTRIBUTING.md).

## Versioning

Given a version number `MAJOR.MINOR.PATCH`, increment the:

- `MAJOR` version when you make incompatible API changes,
- `MINOR` version when you add functionality in a backwards-compatible manner, and
- `PATCH` version when you make backwards-compatible bug fixes.

Additional labels for pre-release and build metadata are available as extensions
to the `MAJOR.MINOR.PATCH` format.

See [SemVer.org](https://semver.org/) for more details.

## License

Under the MIT license. See [LICENSE](https://gitlab.com/demsking/gimtoc/blob/main/LICENSE)
file for more details.
