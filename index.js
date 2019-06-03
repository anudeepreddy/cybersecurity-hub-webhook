const express = require('express')
const request = require('request')
const fs = require('fs')
const ctf = require('./ctf.js')
const news = require('./news.js')
const app = express()
const port = process.env.PORT || 3000
var data=''
app.use(express.json())
app.get('/',(req, res)=>{
    res.send("We are all good")
})
app.post('/webhook',(req,res)=>{
    intent=req.body.queryResult.intent.displayName
    console.log(intent)
    if(intent=="Default Welcome Intent"){
        data=fs.readFileSync(__dirname+'/core/simpleTextResponse.json','utf-8')
        res.send(JSON.parse(data))
    }
    else if(intent=="ctf's"){
        res.send(news)
    }
    else if(intent=='news'){
        news()
        data=fs.readFileSync('news.json','utf-8')
        res.send(JSON.parse(data))
    }
    else if(intent=='ctf walkthrough'){
        data=fs.readFileSync('./core/simpleTextResponse.json','utf-8')
        data = JSON.parse(data)
        data.payload.google.items[0].simpleResponse={
            textToSpeech: "Work in progress. This section will be live soon.",
            displayText: "Work in progress. This section will be live soon."
        }
        res.send(data)
    }
})
app.listen(port)