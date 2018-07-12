var log = console.log.bind(console)
var e = selector => document.querySelector(selector)
var ajax = (method, path, data, callback) => {
    var r = new XMLHttpRequest()
    r.open(method, path, true)
    r.setRequestHeader('Content-Type', 'application/json')
    r.onreadystatechange = () => {
        if (r.readyState == 4) {
            callback(r.response)
        }
    }
    if (method === 'POST') {
        data = JSON.stringify(data)
    }
    r.send(data)
}
var addHtml = (element, html) => element.insertAdjacentHTML('beforeend', html)
