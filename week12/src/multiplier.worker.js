self.onmessage = ({data}) => {
  self.postMessage(data * 2)
}