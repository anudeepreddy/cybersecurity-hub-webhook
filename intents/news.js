var each = require("async-each")
const fs = require('fs')
const request = require('request')
let items=[]
let jsondata={}
let news = require('../responses/carouselResponse.json')
fetch()
function fetch(){
    let url = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'
    request(url,(error,response,body)=>{
        if(!error && response.statusCode==200){
            makeItems(JSON.parse(body))
        }
    })
}
function makeItems(data){
    let urllist=[]
    let url='https://hacker-news.firebaseio.com/v0/item/'
    for(i=0;i<10;i++){
        urllist.push(url+data[i]+'.json')
    }
    each(urllist,request,(error,contents)=>{
    assignList(contents)
    })

}
function assignList(data){
for(i=0;i<data.length;i++){
body=JSON.parse(data[i].body)
    openUrlActionOptions={
               url:body.url
           }
           items[i]={
            title: body.title,
            openUrlAction:openUrlActionOptions,
            description:body.type+' by '+body.by
           }
}
news.payload.google.richResponse.items[1].carouselBrowse.items=items
fs.writeFileSync(__dirname+'/../data/news.json',JSON.stringify(news))
}
module.exports = fetch
