import styles from "./messageListVirtualized.module.css"

export default function prepareMessages(messages, currentUser) {
  const preparedMessages = []
  messages.forEach((message, index) => {
    let user = message.user || { _id: null, userName: "Unknown" }

    if (checkIfDifferentDay(index, messages, message)) {
      let dateMessage = {}
      dateMessage.type = "DATE_MESSAGE"
      dateMessage.content = getDateStringFromDate(message.createdAt)

      preparedMessages.push(dateMessage)
    }

    let preparedMessage = { ...message }
    preparedMessage.type = "USER_MESSAGE"
    preparedMessage.user = user
    preparedMessage.mine = user._id === currentUser._id
    preparedMessage.createdAt = getTimeStringFromDate(message.createdAt)
    preparedMessage.arrow = checkIfArrow(messages, index, user)
    preparedMessage.isLast = index === messages.length - 1 ? styles.last : ""

    preparedMessages.push(preparedMessage)
  })
  return preparedMessages
}

function getTimeStringFromDate(date) {
  return new Date(date).toLocaleTimeString("it", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

function getDateStringFromDate(date) {
  return new Date(date).toLocaleDateString("en", {
    month: "long",
    day: "numeric",
  })
}

function checkIfArrow(messages, index, user) {
  if (messages.length === index + 1) {
    return true
  } else if (!messages[index + 1].user) {
    return true
  } else if (messages[index + 1].user._id === user._id) {
    return false
  } else {
    return true
  }
}

function checkIfDifferentDay(index, messages, currentMessage) {
  const lastMessage = messages[index - 1] || { createdAt: "null" }
  const lastMessageDay = new Date(lastMessage.createdAt).getDay()
  const currentMessageDay = new Date(currentMessage.createdAt).getDay()
  return lastMessageDay !== currentMessageDay
}
