import React from "react"

const URLsRegex = /\b(http|https)?:\/\/\S+/gi

export default function replaceURLs(stringArray) {
  const reconstructed = []
  let textPart = ""
  stringArray.forEach((block, idx) => {
    if (block.match(URLsRegex)) {
      const link = (
        <a href={block} rel="noopener noreferrer" target="_blank">
          {block}
        </a>
      )
      reconstructed.push(textPart + " ")
      textPart = ""
      reconstructed.push(link)
    } else {
      textPart += `${idx === 0 ? "" : " "}${block}`
    }
  })
  reconstructed.push(textPart)
  return reconstructed
}
