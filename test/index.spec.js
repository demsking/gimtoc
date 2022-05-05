import { gimtoc } from '../index.js';

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
  'MIT',
  '',
  '## Title with spaces',
  '',
  'Bla bla'
].join('\n');

describe('gimtoc', () => {
  it('it should successfully generate & inject toc', async () => {
    const injectionSection = 'TOC';

    /* eslint-disable-next-line max-len */
    const expected = '# gimtoc\n\n## TOC\n\n- [Usage](#usage)\n- [License](#license)\n- [Title with spaces](#title-with-spaces)\n\n## Usage\n\nnpm install --save gimtoc\n\n## License\n\nMIT\n\n## Title with spaces\n\nBla bla\n';

    const mdContentWithToc = await gimtoc(mdContent, injectionSection);

    expect(mdContentWithToc).toBe(expected);
  });

  it('it should generate & inject toc with custom options.filter', async () => {
    const injectionSection = 'TOC';
    const options = {
      filter (str, ele) {
        return ele.children.some(({ content }) => content !== 'License');
      }
    };

    /* eslint-disable-next-line max-len */
    const expected = '# gimtoc\n\n## TOC\n\n- [Usage](#usage)\n- [Title with spaces](#title-with-spaces)\n\n## Usage\n\nnpm install --save gimtoc\n\n## License\n\nMIT\n\n## Title with spaces\n\nBla bla\n';

    const mdContentWithToc = await gimtoc(mdContent, injectionSection, options);

    expect(mdContentWithToc).toBe(expected);
  });

  it('it should generate & inject toc with options.anchor', async () => {
    const injectionSection = 'TOC';
    const options = {
      anchors: true
    };

    /* eslint-disable-next-line max-len */
    const expected = '# gimtoc\n\n## TOC\n\n- [Usage](#usage)\n- [License](#license)\n- [Title with spaces](#title-with-spaces)\n\n## <a id="usage"></a>Usage\n\nnpm install --save gimtoc\n\n## <a id="license"></a>License\n\nMIT\n\n## <a id="title-with-spaces"></a>Title with spaces\n\nBla bla\n';

    const mdContentWithToc = await gimtoc(mdContent, injectionSection, options);

    expect(mdContentWithToc).toBe(expected);
  });

  /* eslint-disable-next-line max-len */
  it('it should ignore injection of anchors on title with existing anchors', async () => {
    const injectionSection = 'TOC';
    const options = {
      anchors: true
    };

    /* eslint-disable-next-line max-len */
    const mdContent = '# gimtoc\n\n## TOC\n\n- [Usage](#usage)\n- [License](#license)\n\n## Usage\n\nnpm install --save gimtoc\n\n## <a id="license"></a>License\n\nMIT\n\n## <a id="title-with-spaces"></a>Title with spaces\n\nBla bla\n';

    /* eslint-disable-next-line max-len */
    const expected = '# gimtoc\n\n## TOC\n\n- [Usage](#usage)\n- [License](#license)\n- [Title with spaces](#title-with-spaces)\n\n## <a id="usage"></a>Usage\n\nnpm install --save gimtoc\n\n## <a id="license"></a>License\n\nMIT\n\n## <a id="title-with-spaces"></a>Title with spaces\n\nBla bla\n';

    const mdContentWithToc = await gimtoc(mdContent, injectionSection, options);

    expect(mdContentWithToc).toBe(expected);
  });

  it('it should generate & inject toc with custom options.filter', () => {
    const injectionSection = 'Missing section';

    expect(() => gimtoc(mdContent, injectionSection)).rejects.toThrow(/not found/i);
  });
});
