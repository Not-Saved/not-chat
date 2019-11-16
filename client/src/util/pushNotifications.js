import { apiRequest } from "../api"
import urlBase64ToUint8Array from "./urlBase64ToUint8Array"

const publicKey =
  "BLaSiTuWqXgNXKfcDRu6QM4sP4luMXbix0iH6OODCk7IBTrTqjQJaVpnOmTEUfiM3ZehoPT6iNOTwp8Hg1Dj-2U"

export async function subscribeToPush() {
  try {
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
    console.log(subscription)
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
