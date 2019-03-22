const toc = require('markdown-toc')
const ast = require('markdown-to-ast')
const inject = require('md-node-inject')
const toMarkdown = require('ast-to-markdown')

module.exports = (mdContent, injectionSection, options = {}) => {
  const opts = {
    firsth1: options.firsth1 || false,
    filter (str, ele, arr) {
      let result = true

      if (options.filter instanceof Function) {
        result = options.filter(str, ele, arr)
      }

      /* eslint-disable-next-line arrow-body-style */
      return result && !ele.children.some(({ content }) => {
        return content === injectionSection
      })
    }
  }

  const mdAst = ast.parse(mdContent)
  const tocContent = toc(mdContent, opts).content
  const tocAst = ast.parse(tocContent)

  try {
    const mergedAst = inject(injectionSection, mdAst, tocAst)
    const mergedContent = toMarkdown(mergedAst)

    return mergedContent
  } catch (e) {
    throw e
  }
}
