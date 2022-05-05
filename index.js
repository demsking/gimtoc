import toc from 'markdown-toc';
import ast from '@textlint/markdown-to-ast';
import inject from 'md-node-inject';
import toMarkdown from 'ast-to-markdown';

export async function gimtoc(mdContent, injectionSection, { firsth1 = false, anchors = false, filter } = {}) {
  const opts = {
    firsth1,
    filter (str, ele, arr) {
      let result = true;

      if (filter instanceof Function) {
        result = filter(str, ele, arr);
      }

      /* eslint-disable-next-line arrow-body-style */
      return result && !ele.children.some(({ content }) => {
        return content === injectionSection;
      });
    }
  };

  const mdAst = ast.parse(mdContent);
  const tocContent = toc(mdContent, opts).content;
  const tocAst = ast.parse(tocContent);
  const mergedAst = inject(injectionSection, mdAst, tocAst);

  if (anchors) {
    const { generateAnchors } = await import('./lib/anchors.js');

    generateAnchors(tocAst, mergedAst);
  }

  return toMarkdown(mergedAst);
}
