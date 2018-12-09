var {google} = require('googleapis') 
var drive = google.drive('v3')
var key = require('./private_key.json')
var path = require('path')
var fs = require('fs')

var jwToken = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    ["https://www.googleapis.com/auth/drive"],
    null
)
jwToken.authorize((authErr)=>{
    if(authErr){
        console.log('error: '+authErr)
        return
    }
    else {
        console.log('authorization accorded')
    }
})

// list file in speciifcs folder
var folder = "0B7l-TXMfW3Y6MlRhUk1XLWJkeTA"
drive.files.list({
    auth: jwToken,
    pageSize: 1000,
    q:"'" + folder + "' in parents and trashed= false",
    fields: 'files(id,name)',
},(err,{data})=>{
    if(err) return console.log('The API returned an error: '+ err)
    var files = data.files
    if(files.length){
        console.log('File: ')
        files.map(file=>{
            console.log(`${file.name} (${file.id})`)
        })
    } else {
        console.log('No files found.')
    }
})
