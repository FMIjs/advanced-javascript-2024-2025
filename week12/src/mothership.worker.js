self.onmessage = ({data}) => {
    fetch('/api/mothership').then(res => res.text()).then( 
        res => self.postMessage(res))
}