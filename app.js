const express = require('express')
const xlsxFile = require('read-excel-file/node')
const app = express();
const http = require('http').createServer(app)
const port = process.env.PORT || 3000;

//processes the actual file
let reader = (file) =>{
    let jsonResponse = {};
    let rowArray = xlsxFile(file).then((rows,columns)=>{
        let rowArray = rows;
        let columnArray = columns;
        return `${rowArray} ${columnArray}` ;
    });
    jsonResponse = {
        file: rowArray
    }
    console.log(jsonResponse)
    return jsonResponse
}


// handle incoming rquest and fire out a json response with one key: file
app.post('/express.app/api/',(req,res)=>{

    if( !req.url==='/express.app/api/'||!req.body||
        !req.method === 'POST')
    {
        const badrequestResponse ={
            status: 400,
            message: "Bad Request"
        };
        console.log(badrequestResponse)
        res.send(badrequestResponse);
    }else{
        let loadFile = req.body.file
        // let convertedFile = reader(loadFile)
        // if(convertedFile){
        //     let myres = {
        //         status: 201,
        //         file: convertedFile
        //         }
        //     res.send(myres);
        // }else{
        //     const internalError = {
        //         status: 500,
        //         message:'internal server error'
        //     }
        //     res.send(internalError)
        // }    
        console.log(loadFile)
        res.send({message:'done'})   
    }
})

//open port
http.listen(port,()=>{
    console.log(`running on port:${port}...`);
});
