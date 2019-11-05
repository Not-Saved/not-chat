import React, { useState } from "react"
import { Sidebar } from "semantic-ui-react"

import useSocket from "./hooks/useSocket"
import Chat from "./Chat"
import SidebarContent from "./SidebarContent"

const MainPage = ({ user, chatMessages }) => {
  const { messages, sendMessage, onlineUsers } = useSocket(chatMessages)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <Sidebar.Pushable>
      <Sidebar
        animation="overlay"
        onHide={() => setSidebarOpen(false)}
        vertical="true"
        visible={sidebarOpen}
        direction="right"
        width="thin"
      >
        <SidebarContent onlineUsers={onlineUsers} />
      </Sidebar>

      <Sidebar.Pusher dimmed={sidebarOpen}>
        <div className="chat">
          <div className="top">
            <i
              className="sidebar icon clickable"
              onClick={() => setSidebarOpen(true)}
            ></i>
            <div className="text">Chat</div>
          </div>
          <Chat user={user} messages={messages} sendMessage={sendMessage} />
        </div>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  )
}

export default MainPage
