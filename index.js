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
    
    if(intent=="Default Welcome Intent"){
        console.log(intent)
        data=fs.readFileSync(__dirname+'/core/simpleTextResponse.json','utf-8')
        res.send(JSON.parse(data))
    }
    else if(intent=="ctf's"){
        ctf()
        console.log(intent)
        data=fs.readFileSync('ctf.json','utf-8')
        res.send(JSON.parse(data))
    }
    else if(intent=='news'){
        news()
        console.log(intent)
        data=fs.readFileSync('news.json','utf-8')
        res.send(JSON.parse(data))
    }
    else if(intent=='ctf walkthrough'){
        data=fs.readFileSync('./core/simpleTextResponse.json','utf-8')
        data = JSON.parse(data)
        data.payload.google.richResponse.items[0].simpleResponse={
            textToSpeech: "Work in progress. This section will be live soon.",
            displayText: "Work in progress. This section will be live soon."
        }
        res.send(data)
    }
    else{
        data=fs.readFileSync('./core/simpleTextResponse.json','utf-8')
        data = JSON.parse(data)
        data.payload.google.richResponse.items[0].simpleResponse={
            textToSpeech: "Sorry, I didn't get that. Can you rephrase?",
            displayText: "Sorry, I didn't get that. Can you rephrase?"
        }
        res.send(data)
    }
})
app.listen(port)