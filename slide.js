var log = console.log.bind(console)
//下一个图片的index
var nextIndex = (self) => {
    var selfP = self.parentElement
    var index = Number(selfP.dataset.show)
    var offset = Number(self.dataset.offset)
    var total = Number(selfP.dataset.images)
    var nextIndex = (index + offset + total) % 3
    selfP.dataset.show = String(nextIndex)
    return nextIndex
}
//图片切换
var imgChange = (index) => {
    var next = index
    log('next', next)
    var selector = "#img-" + String(next)
    var ele = e(selector)
    var eles = es('.img-lmx')
    removeClassAll(eles, 'show')
    ele.classList.add('show')
}
//小圆点的动态切换
var circleChange = (index) => {
    var next = index
    var cirSelector = "#id-indi-" + String(next)
    var s = e(cirSelector)
    var ss = es('.lmx-slide-indi')
    removeClassAll(ss, 'lmx-white')
    s.classList.add('lmx-white')
}
//点击左右按钮切换图片
var changeImg = () => {
    var button = es('.button-img')
    bindEventAll(button, 'click', (event) => {
        var self = event.target
        var next = nextIndex(self)
        imgChange(next)
        circleChange(next)
    })
}
//鼠标移动到小圆点自动切换图片
var mouseCircle = () => {
    var indicators = es('.lmx-slide-indi')
    var c = e('.img-total')
    bindEventAll(indicators, 'mouseover', (event) => {
        var self = event.target
        var index = Number(self.dataset.index)
        c.dataset.show = String(index)
        imgChange(index)
        circleChange(index)
    })
}
var autoPlay = () => {
    setInterval(() => {
        var self = e('.right')
        var index = nextIndex(self)
        imgChange(index)
        circleChange(index)
    }, 2000)
}
var __main = () => {
    changeImg()
    mouseCircle()
    autoPlay()
}
__main()