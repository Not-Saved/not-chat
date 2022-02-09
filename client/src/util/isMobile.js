var f = () => {
  const regex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
  if (navigator && regex.test(navigator.userAgent)) {
    return true
  }
  return false
}
export default f
