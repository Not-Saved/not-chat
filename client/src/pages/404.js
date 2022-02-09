import React from "react"

import Seo from "../components/general/seo"
import ErrorLayout from "../components/layouts/errorLayout"

const NotFoundPage = () => {
  return (
    <>
      <Seo title="404: Not found" />
      <ErrorLayout
        headerText="NOT FOUND"
        subText="The page you were looking for doesn't exist."
      />
    </>
  )
}

export default NotFoundPage
