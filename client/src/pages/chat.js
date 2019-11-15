import React from "react"

import { useUserContext } from "../hooks/contextHooks"
import SEO from "../components/general/seo"
import ChatController from "../components/chatScreen/chatController"

const ChatPage = () => {
  const { user } = useUserContext()

  if (!user) return null
  return (
    <div className="page container">
      <SEO title="Chat" />
      <ChatController />
    </div>
  )
}
export default ChatPage
