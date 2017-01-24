
let startX = null
let startY = null
let endX = null
let endY = null
let isDrawing = false


document.addEventListener('mousedown', getStartPosition, false)
document.addEventListener('mouseup', getEndPosition, false)

function getStartPosition(ev) {
	ev.preventDefault();
	startX = ev.clientX
	startY = ev.clientY
  // alert('startX' + startX + 'startY' + startY)
}

function getEndPosition(ev) {
	ev.preventDefault();
	endX = ev.clientX
	endY = ev.clientY
	document.removeEventListener('mousedown', getStartPosition)
	document.removeEventListener('mouseup', getEndPosition)
  	chrome.runtime.sendMessage({from : "get_region", startX: startX, startY: startY, endX: endX, endY: endY})
  
}
