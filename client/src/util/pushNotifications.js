import { apiRequest } from "../api"
import urlBase64ToUint8Array from "./urlBase64ToUint8Array"

export async function subscribeToPush() {
  try {
    const publicKey =
      "BHDqfdxEpTorFJ_IV7JA7CIZ9ucySQohTYWKRZOd930mOnpWIDpFCwg4mCrdlEE7SjKpxxhyzi6fBBk_Fs1rMVY"
    const sw = await navigator.serviceWorker.getRegistration("/")
    const subscription = await sw.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey),
    })
    await apiRequest({
      method: "POST",
      url: "/subscribe",
      data: subscription,
    })
  } catch (error) {
    console.error(error)
  }
}

export async function getPushSubscription() {
  try {
    const sw = await navigator.serviceWorker.getRegistration("/")
    const subscription = await sw.pushManager.getSubscription()
    return subscription
  } catch (error) {
    console.error(error)
    return error
  }
}

export function getNotificationPermission() {
  return Notification.permission
}

export async function requestNotificationPermission() {
  try {
    const permission = await Notification.requestPermission()
    return permission
  } catch (error) {
    console.error(error)
    return error
  }
}
