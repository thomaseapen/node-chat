var express = require('express');
var bodyParser = require('body-parser')
console.log("stating")
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongo = require('mongoose');

app.use(express.static(__dirname));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


var dbURL = 'mongodb+srv://user:user1@cluster0-cyv3k.mongodb.net/learning-node';

var Message = mongo.model('Message',{name:String , message:String});




app.get('/messages', (req, res) =>{
    Message.find({},(err,messages)=>{
        console.log('get data : '+messages)
        res.send(messages)
    })
    
})

app.post('/messages', (req, res) =>{``
    console.log(req.body);
    var message = new Message(req.body);
    message.save((err) =>{
        if(err)
            sendStatus(500)
        io.emit('message',req.body);
        res.sendStatus(200);
    });
    
})

mongo.connect(dbURL,(err) =>{
    console.log('mongo db connected' ,err);
})

http.listen(3000 , () => {
    console.log("I am called");
});

io.on('connection', (socker)=>{
    console.log('user connected')
})