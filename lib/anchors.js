const headers = [ 'heading', 'Header' ]
const RE_LINK = /\[(\w+)\]\(#(\w+) ?\)/

function extractAnchors (tocAst) {
  return tocAst.children
    .filter(({ type }) => type === 'List')
    .reduce((result, { children }) => {
      children.forEach(({ raw }) => {
        const match = RE_LINK.exec(raw)

        if (match[1]) {
          result.push({
            title: match[1],
            anchor: match[2]
          })
        }
      })

      return result
    }, [])
}

function setTitlesAnchors (markdownAst, anchors) {
  markdownAst.children.forEach((node) => {
    if (headers.indexOf(node.type) !== -1) {
      const index = anchors.findIndex(({ title }) => node.raw.endsWith(title))

      if (index > -1) {
        const { title, anchor } = anchors[index];
        const re = new RegExp(`^(#+ )(${title})$`)

        if (re.test(node.raw)) {
          node.raw = node.raw.replace(re, `$1<a id="${anchor}"></a>$2`)
        }

        anchors.splice(index, 1)
      }
    }
  })
}

function generateAnchors (tocAst, markdownAst) {
  const anchors = extractAnchors(tocAst)

  // make sure the anchors array is sorted descendingly with title.length
  anchors.sort((a, b) => b.title.length - a.title.length)

  // set anchors
  setTitlesAnchors(markdownAst, anchors)
}

module.exports.extractAnchors = extractAnchors
module.exports.setTitlesAnchors = setTitlesAnchors
module.exports.generateAnchors = generateAnchors
