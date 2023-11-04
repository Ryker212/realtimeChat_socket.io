const express = require('express'); // ดึงpackage express
const app = express(); //ให้app แทน express ที่ดึง
const http = require('http'); //ดึงpotocol http
const { Socket } = require('socket.io');
const server = http.createServer(app); //สร้างserver เชื่อมต่อด้วยhttp ด้วยตัวapp

const {Server} = require('socket.io'); //เรียกใช้ socket.io
const io = new Server(server); //สร้างServerที่เรียก socket.io โดยserver ที่http.createServer(app)

app.get('/',(req,res)=>{    //app.get phat deritory='/' เป็นfunction ที่รับ req,res
    res.sendFile(__dirname+'/index.html'); //ส่งกลับมาเป็นhtml
});

/*io.on('connection',(socket)=>{  //เมื้อเกิดEvent connectionให้รับค่าsocket 
    console.log('a user connected'); //ส่งบอกว่าconnectแล้ว
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log('message: ' + msg.msg);
    })
    socket.on('disconnect',()=>{
        console.log('User disconnected')
    })
});*/

const user = {};

io.on('connection',(socket)=>{  //เมื้อเกิดEvent connectionให้รับค่าsocket 

    socket.on('disconnect', ()=>{
        console.log('User: '+user[socket.id]+ ' disconected');
        io.emit('disconnected',user[socket.id]);
        delete user[socket.id];
    })

    socket.on('Call newuser',(name) =>{
        user[socket.id] = name;
        console.log('Newuser: ' +name+ ' connected');
        io.emit('join room', name);
    })

    socket.on('chat message', (msg) =>{
            console.log(msg.name+": " + msg.msg);
            io.emit('chat message', msg);
    })
});

server.listen(3000,()=>{    //สร้างที่ตั่งserver พร้อมfucntiong เมื้่อเชื่อมเสร็จ
    console.log('listening on port 3000')   //ส่งกลับมาว่าฟังอยู่ ที่port3000
})

//ตัวสร้างServer
