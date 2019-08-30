var express = require("express");
var ws = require('express-ws');
var app = express();
ws(app)
// app.use()
console.log('启动成功')
let wsList = []
app.all("*", function name(req, res,next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.ws('/zhao',(ws,req)=>{
    ws.send(JSON.stringify('你连接成功了'))
    wsList.push(ws)
    ws.on('message',msg=>{
        console.log('socket信息',msg)
        console.log('所有链接集合',wsList.length)
        wsList.forEach(item=>item.send(msg))
    })
})
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});
app.get("/getmsg", (req, res) => {
  res.send("这是请求的结果");
});
// 发送消息
app.get('/sentmsg',(req,res)=>{
    let thisMsg = req.query.msg;
    res.send(thisMsg)
})
app.listen(12345,'192.168.50.221');//'10.0.0.28'
