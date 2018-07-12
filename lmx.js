var log = console.log.bind(console)
var e = function (selector) {
    var element = document.querySelector(selector)
    return element
}
var es = function (selector) {
    var elements = document.querySelectorAll(selector)
    return elements
}
var appendHTML = function (element, html) {
    element.insetAdjacentHTML('beforeend', html)
}
var bindEvent = function (element, eventName, callback) {
    element.addEventListener(eventName, callback)
}
var bindEventAll = function (elements, eventName, callback) {
    for (var i = 0; i < elements.length; i++) {
        bindEvent(elements[i], eventName, callback)
    }
}

var removeClassAll = function (elements, className) {
    // var className1 = "." + className
    for (var i = 0; i < elements.length; i++) {
        // log(elements[i].classList)
        elements[i].classList.remove(className)
    }
}