const request = require('request')
function fetch_ctf(){
let url='https://ctftime.org/api/v1/events/?limit=10'
request(url,(error, response, body)=>{
    if(!error&&response.statusCode==200){
        info = JSON.parse(body)
        console.log(info)
        return info
    }
})    
}
module.exports = fetch_ctf
