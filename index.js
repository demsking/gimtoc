import toc from 'markdown-toc';
import ast from '@textlint/markdown-to-ast';
import inject from 'md-node-inject';
import toMarkdown from 'ast-to-markdown';
import { generateAnchors } from './lib/anchors';

export default function gimtoc(mdContent, injectionSection, options = {}) {
  const opts = {
    firsth1: options.firsth1 || false,
    filter (str, ele, arr) {
      let result = true;

      if (options.filter instanceof Function) {
        result = options.filter(str, ele, arr);
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

  if (options.anchor) {
    generateAnchors(tocAst, mergedAst);
  }

  return toMarkdown(mergedAst);
}
