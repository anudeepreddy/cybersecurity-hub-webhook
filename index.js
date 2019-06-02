const express = require('express')
const fs = require('fs')
const ctf = require('./ctfs.js')
const app = express()
const port = 3000
app.use(express.json())
/*ctf((data)=>{
      console.log(data[0].title)  
    })*/
app.get('/',(req, res)=>{
    res.send("Hello world;)")
})
app.get('/get',(req,res)=>{
    data=fs.readFileSync('./core/welcomeintent.json','utf-8')
        res.send(JSON.parse(data))
})
app.post('/webhook',(req,res)=>{
    intent=req.body.queryResult.intent.displayName
    console.log(intent)
    if(intent=="Default Welcome Intent"){  
        data=fs.readFileSync('./core/welcomeintent.json','utf-8')
        res.send(JSON.parse(data))
    }
    else if(intent=="ctf's"){
        ctf((data)=>{
            console.log(JSON.stringify(data))
            res.send(data)
        })
        
    }

})
app.listen(port)