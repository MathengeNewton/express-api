const express = require('express');
const xlsxFile = require('read-excel-file/node')
const router = express.Router();
const app = express();
const port = 8000;

//read incoming file
let reader = file =>{
    let jsonResponse = {};
    let rowArray = xlsxFile(file).then((rows)=>{
        let rowArray = rows;
        return rowArray;
    });
    console.log(jsonResponse)
    return jsonResponse
}

// handle incoming rquest and fire out a json response with one key: file
router.post('/file-converter',(req,res)=>{
    if(
        !req.body.file
    ){
        res.status(400);
        res.json({message: "Bad Request"});
    }else{
    let incoming = req.body.file
    let response = reader(incoming)
    let myres = {
        "file":response
    }
   res.send(myres);
}
});
//listen to port
app.listen(port,()=>{
    console.log(`running on port:${port}`);
});
