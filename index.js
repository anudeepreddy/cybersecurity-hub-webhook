const express = require('express')
const request = require('request')
const fs = require('fs')
const ctf = require('./ctfs.js')
const app = express()
const port = 3000
var data=''
app.use(express.json())
/*ctf((data)=>{
      console.log(data[0].title)
    })*/
app.get('/',(req, res)=>{
    res.send("Hello world;)")
})
app.get('/get',(req,res)=>{

})
app.post('/webhook',(req,res)=>{
    intent=req.body.queryResult.intent.displayName
    console.log(intent)
    if(intent=="Default Welcome Intent"){
        data=fs.readFileSync('./core/welcomeintent.json','utf-8')
        res.send(JSON.parse(data))
    }
    else if(intent=="ctf's"){
        let url='https://ctftime.org/api/v1/events/?limit=10'
    }
})
app.listen(port)