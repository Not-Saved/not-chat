import React from "react"

import Seo from "../components/general/seo"
import ChatController from "../components/chatScreen/chatController"

const ChatPage = () => {
  return (
    <div className="page container">
      <Seo title="Chat" />
      <ChatController />
    </div>
  )
}
export default ChatPage
