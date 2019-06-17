const fs = require('fs')
const request = require('request')
let ctf = require('../responses/carouselResponse.json')
fetch()
function fetch(){
    let url = 'https://ctftime.org/api/v1/events/?limit=10'
    request(url,(error,response,body)=>{
        if(!error && response.statusCode==200)
        makeItems(JSON.parse(body))
    })
}
function makeItems(data){
    //console.log(data[0])
    let items = []
    for(i=0;i<data.length;i++){
        openUrlActionOptions={
            url:data[i].url
        }
        if(data[i].logo)
        imageOptions={
            url:data[i].logo,
            accessibilityText:data[i].title
        }
        else
        imageOptions={
            url:'https://ctftime.org/static/images/nologo.png',
            accessibilityText:data[i].title
        }
        items[i]={
            title: data[i].title,
            openUrlAction:openUrlActionOptions,
            description:data[i].description,
            image: imageOptions
        }
    }
    ctf.payload.google.richResponse.items[1].carouselBrowse.items=items
    fs.writeFileSync(__dirname+'/../data/ctf.json',JSON.stringify(ctf))
}
module.exports = fetch