const express = require('express')
const request = require('request')
const {dialogflow,
       BasicCard,
       BrowseCarousel,
       BrowseCarouselItem,
       Image,
       Button,
       Suggestions,
       simpleResponse
       }
const fs = require('fs')
const ctf = require('./intents/ctf.js')
const news = require('./intents/news.js')
const app = express()
const port = process.env.PORT || 3000
const textResponse = require('./responses/simpleTextResponse.json')
var data=''
app.use(express.json())
app.get('/',(req, res)=>{
    res.send("We are all good")
})
app.post('/webhook',(req,res)=>{
    intent=req.body.queryResult.intent.displayName
    console.log(intent)
    if(intent=="Default Welcome Intent"){
        res.send(textResponse)
    }
    else if(intent=="ctf's"){
        ctf()
        data=fs.readFileSync('./data/ctf.json','utf-8')
        res.send(JSON.parse(data))
    }
    else if(intent=='news'){
        news()
        data=fs.readFileSync('./data/news.json','utf-8')
        res.send(JSON.parse(data))
    }
    else if(intent=='ctf walkthrough'){
        textResponse.payload.google.richResponse.items[0].simpleResponse={
            textToSpeech: "Work in progress. This section will be live soon.",
            displayText: "Work in progress. This section will be live soon."
        }
        res.send(textResponse)
    }
    else if(intent=='challenge'){
        data=fs.readFileSync('./data/challenge.json','utf-8')
        res.send(JSON.parse(data))
    }
    else{
        textResponse.payload.google.richResponse.items[0].simpleResponse={
            textToSpeech: "Sorry, I didn't get that. You can use the suggestions below to navigate",
            displayText: "Sorry, I didn't get that. You can use the suggestions below to navigate"
        }
        res.send(textResponse)
    }
})
app.listen(port)