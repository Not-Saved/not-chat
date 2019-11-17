import React from "react"

import SEO from "../components/general/seo"
import ChatController from "../components/chatScreen/chatController"

const ChatPage = () => {
  return (
    <div className="page container">
      <SEO title="Chat" />
      <ChatController />
    </div>
  )
}
export default ChatPage
