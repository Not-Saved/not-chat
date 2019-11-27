import React from "react"

const URLsRegex = /\b(http|https)?:\/\/\S+/gi

export default function replaceURLs(stringArray) {
  const reconstructed = []
  stringArray.forEach((block, idx) => {
    if (block.match(URLsRegex)) {
      const splittedLink = block
        .substring(0, 200)
        .match(/[\s\S]{1,8}/g)
        .map((e, idx) => (
          <a key={idx} href={block} rel="noopener noreferrer" target="_blank">
            {e}
          </a>
        ))
      reconstructed.push(splittedLink)
    } else {
      return reconstructed.push(block)
    }
  })
  return reconstructed
}
