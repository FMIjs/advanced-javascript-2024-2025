const mult = new Worker(new URL('./multiplier.worker.js', import.meta.url))
const mthr = new Worker(new URL('./mothership.worker.js', import.meta.url))

window.sendToWorker = (num) => {
    mult.postMessage(num);
    mthr.postMessage('hey Mom!');
}

mthr.onmessage = ({data}) => {
    document.getElementById('result').textContent = `Mothership: ${data}`;
}

mult.onmessage = ({data}) => {
  document.getElementById('result').textContent = `WebWork Result: ${data}`;
}