/*
  Based on react-style-singleton by theKashey
  GitHub: https://github.com/theKashey/react-style-singleton
*/

type NullableStyle = HTMLStyleElement | null

function makeStyleTag(): NullableStyle {
  if (!document) return null

  const tag = document.createElement('style')

  return tag
}

function injectStyles(tag: HTMLStyleElement, css: string) {
  tag.appendChild(document.createTextNode(css))
}

function insertStyleTag(tag: HTMLStyleElement): void {
  const head = document.head || document.getElementsByTagName('head')[0]
  head.appendChild(tag)
}

export const useStylesheet = (): {
  add: (style: string) => void
  remove: () => void
} => {
  let counter = 0
  let stylesheet: NullableStyle = null

  return {
    add: (style) => {
      if (counter == 0) {
        if ((stylesheet = makeStyleTag())) {
          injectStyles(stylesheet, style)
          insertStyleTag(stylesheet)
        }
      }

      counter++
    },
    remove: () => {
      counter--

      if (!counter && stylesheet) {
        stylesheet.parentNode?.removeChild(stylesheet)
        stylesheet = null
      }
    },
  }
}
