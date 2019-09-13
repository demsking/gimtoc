const gimtoc = require('..')

/* global describe it expect */

const mdContent = [
  '# gimtoc',
  '',
  '## TOC',
  '',
  '## Usage',
  '',
  'npm install --save gimtoc',
  '',
  '## License',
  '',
  'MIT'
].join('\n')

describe('gimtoc', () => {
  it('it should successfully generate & inject toc', () => {
    const injectionSection = 'TOC'

    /* eslint-disable-next-line max-len */
    const expected = '# gimtoc\n\n## TOC\n\n- [Usage](#usage)\n- [License](#license)\n\n## Usage\n\nnpm install --save gimtoc\n\n## License\n\nMIT\n'

    const mdContentWithToc = gimtoc(mdContent, injectionSection)

    expect(mdContentWithToc).toBe(expected)
  })

  it('it should generate & inject toc with custom options.filter', () => {
    const injectionSection = 'TOC'
    const options = {
      filter (str, ele) {
        return ele.children.some(({ content }) => content !== 'License')
      }
    }

    /* eslint-disable-next-line max-len */
    const expected = '# gimtoc\n\n## TOC\n\n- [Usage](#usage)\n\n## Usage\n\nnpm install --save gimtoc\n\n## License\n\nMIT\n'

    const mdContentWithToc = gimtoc(mdContent, injectionSection, options)

    expect(mdContentWithToc).toBe(expected)
  })

  it('it should generate & inject toc with options.anchor', () => {
    const injectionSection = 'TOC'
    const options = {
      anchor: true
    }

    /* eslint-disable-next-line max-len */
    const expected = '# gimtoc\n\n## TOC\n\n- [Usage](#usage)\n- [License](#license)\n\n## <a id="usage"></a>Usage\n\nnpm install --save gimtoc\n\n## <a id="license"></a>License\n\nMIT\n'

    const mdContentWithToc = gimtoc(mdContent, injectionSection, options)

    expect(mdContentWithToc).toBe(expected)
  })

  /* eslint-disable-next-line max-len */
  it('it should ignore injection of anchors on title with existing anchor', () => {
    const injectionSection = 'TOC'
    const options = {
      anchor: true
    }

    /* eslint-disable-next-line max-len */
    const mdContent = '# gimtoc\n\n## TOC\n\n- [Usage](#usage)\n- [License](#license)\n\n## Usage\n\nnpm install --save gimtoc\n\n## <a id="license"></a>License\n\nMIT\n'

    /* eslint-disable-next-line max-len */
    const expected = '# gimtoc\n\n## TOC\n\n- [Usage](#usage)\n- [License](#license)\n\n## <a id="usage"></a>Usage\n\nnpm install --save gimtoc\n\n## <a id="license"></a>License\n\nMIT\n'

    const mdContentWithToc = gimtoc(mdContent, injectionSection, options)

    expect(mdContentWithToc).toBe(expected)
  })

  it('it should generate & inject toc with custom options.filter', () => {
    const injectionSection = 'Missing section'

    expect(() => gimtoc(mdContent, injectionSection)).toThrow()
  })
})
