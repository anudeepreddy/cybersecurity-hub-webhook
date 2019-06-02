const request = require('request')
const fs = require('fs')
var template
fs.readFile('./core/ctfintent.json',(err,data)=>{
    template=JSON.parse(data)
})
function fetchCtf(callback){
let url='https://ctftime.org/api/v1/events/?limit=10'
var info
request(url,(error, response, body)=>{
    if(!error&&response.statusCode==200){
        info = JSON.parse(body)
        createItems(info,(data)=>{
            //console.log(JSON.stringify(data))
            callback(data)
        })
    }
})
}
function createItems(data,callback){
    let items = []
    for(i=0;i<data.length;i++){
        console.log(data.title)
        openUrlActionOptions={
            url:data.url
        }
        if(data.logo)
        imageOptions={
            url:data.logo,
            accessibilityText:data.description
        }
        else
        imageOptions={
            url:'https://ctftime.org/static/images/nologo.png',
            accessibilityText:data.description
        }
        items[i]={
            title: data.title,
            openUrlAction:openUrlActionOptions,
            description:data.description,
            image: imageOptions
        }
    }
    createTemplate(template,items,(data)=>{
        callback(data)
    })
}
function createTemplate(template,items,callback){
    template.payload.google.richResponse.items[1].carouselBrowse.items=items
    callback(template)
}
module.exports = fetchCtf