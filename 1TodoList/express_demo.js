
// 引入 express 并且创建一个 express 实例赋值给 app
var express = require('express')
var bodyParser = require('body-parser')
var app = express()

var todoList = []

// 配置静态文件目录
app.use(express.static('static_files'))

// 把前端通过 body 发送过来的数据自动解析成 json 的套路
app.use(bodyParser.json())

var sendHtml = (path, response) => {
    var fs = require('fs')
    var options = {
        encoding: 'utf-8',
    }
    fs.readFile(path, options, (error, data) => {
        console.log(`读取的 html 文件 ${path} 内容是`, typeof data)
        response.send(data)
    })
}

var sendJSON = (data, response) => {
    var r = JSON.stringify(data, null, 2)
    response.send(r)
}
// 用 get 定义一个给用户访问的网址
// request 是浏览器发送的请求
// response 是我们要发给浏览器的响应
// 我们把可以访问的路径叫做 路由(router)
// 用 response.send 函数返回数据(响应)给浏览器
app.get('/', (request, response) => {
    var path = 'index.html'
    sendHtml(path, response)
})

app.get('/todo/all', (request, response) => {
    // var r = JSON.stringify(todoList)
    // response.send(r)
    sendJSON(todoList, response)
})

var todoAdd = (form) => {
    // 给新增的 todo 加上 id 属性
    // 在 todoList.push 之前
    // 如果 todoList.length === 0
    // todo 的 id 为 1
    // 如果 todoList.length > 0
    // todo 的 id 为 todoList 中最后一个元素的 id + 1
    if (todoList.length === 0) {
        form.id = 1
        form.done = false
    } else {
        var tail = todoList[todoList.length - 1]
        form.id = tail.id + 1
        form.done = false
    }
    todoList.push(form)
    return form
}

app.post('/todo/add', (request, response) => {
    var form = request.body
    console.log('form', form, typeof form)
    var todo = todoAdd(form)
    sendJSON(todo, response)
})

// var todoDelete = (form) => {

// }

// delete 这个路由函数用了一个叫做 动态路由 的概念
// 其中, :id 是一个动态的变量
// 它可以匹配下面的 url
// /todo/delete/1
// /todo/delete/2
// /todo/delete/3

// 甚至可以匹配下面的形式, 只不过是错误的
// /todo/delete/error

var todoDelete = (id) => {
    id = Number(id)
    // 在 todoList 中找到 id 对应的数据, 然后删除掉
    var index = -1
    for (var i = 0; i < todoList.length; i++) {
        var t = todoList[i]
        if (t.id === id) {
            // 找到了
            index = i
            break
        }
    }

    // 判断 index 是否找到了
    if (index > -1) {
        // 找到了, 删除
        var t = todoList.splice(index, 1)[0]
        return t
    } else {
        // 没有找到
        return {}
    }
}
var todoDone = (id, body) => {
    id = Number(id)
    // 在 todoList 中找到 id 对应的数据, 然后删除掉
    var index = -1
    for (var i = 0; i < todoList.length; i++) {
        var t = todoList[i]
        if (t.id === id) {
            // 找到了
            index = i
            break
        }
    }
    // 判断 index 是否找到了
    if (index > -1) {
        // 找到了, 删除
        // var body = JSON.parse(body)
        todoList[index].done = body.done
        return todoList[index]
    }
}

app.get('/todo/delete/:id', (request, response) => {
    // 动态路由的变量通过 request.params.key 的形式获取
    // 变量永远是 String 类型
    var id = request.params.id
    console.log('id', id, typeof id)
    var todo = todoDelete(id)
    sendJSON(todo, response)
})
app.post('/todo/done/:id', (request, response) => {
    // 动态路由的变量通过 request.params.key 的形式获取
    // 变量永远是 String 类型
    var id = request.params.id
    var body = request.body
    var todo = todoDone(id, body)
    console.log('todo', todo)
    sendJSON(todo, response)
})

// listen 函数的第一个参数是我们要监听的端口
// 这个端口是要浏览器输入的
// 默认的端口是 80
// 所以如果你监听 80 端口的话，浏览器就不需要输入端口了
// 但是 1024 以下的端口是系统保留端口，需要管理员权限才能使用
var server = app.listen(8000, (...args) => {
    var host = server.address().address
    var port = server.address().port

    console.log(`应用实例，访问地址为 http://${host}:${port}`)
})