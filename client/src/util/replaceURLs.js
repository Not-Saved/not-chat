import React from "react"

const URLsRegex = /\b(http|https)?:\/\/\S+/gi

export default function replaceURLs(string) {
  const reconstructed = []
  string.split(" ").forEach((block, idx) => {
    if (idx) reconstructed.push(" ")
    if (block.match(URLsRegex)) {
      reconstructed.push(
        <a key={idx} href={block} rel="noopener noreferrer" target="_blank">
          {block.substring(0, 200)}
        </a>
      )
    } else {
      return reconstructed.push(block)
    }
  })
  return reconstructed
}
