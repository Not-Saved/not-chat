import React from "react"

import SEO from "../components/seo"
import ErrorLayout from "../components/errorLayout"

const NotFoundPage = () => {
  function throwError() {
    throw new Error("Hey")
  }

  return (
    <>
      <SEO title="404: Not found" />
      <ErrorLayout
        headerText="NOT FOUND"
        subText="The page you were looking for doesn't exist."
      />
    </>
  )
}

export default NotFoundPage
