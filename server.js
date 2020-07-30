var express = require("express");
var mongojs = require('mongojs');
var db  = mongojs('contactlist',['contactlist']);
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());


// app.get('/', function(req,res){
//     res.send('hello')
// });

app.use(express.static(__dirname+"/public"));

app.get('/contactlist',(req,res)=> {

    // res.json(contactlist)
    console.log('req recieved')

    db.contactlist.find((err,docs)=>{
        res.json(docs)
    })
})

app.post('/contactlist',(req,res)=> {
   
    // res.json(contactlist)
    // console.log(req.body)

    db.contactlist.insert(req.body,function(err,doc){
        res.json(doc)
    })
})

app.delete('/contactlist/:id',(req,res)=> {
   
    // res.json(contactlist)
    // console.log(req.body)
    var id = req.params.id;
    db.contactlist.remove({_id:mongojs.ObjectId(id)},function(err,doc){
        res.json(doc)
    })
})

app.get('/contactlist/:id',(req,res)=> {
   

    var id = req.params.id;
    db.contactlist.findOne({_id:mongojs.ObjectId(id)},function(err,doc){
        res.json(doc)
    })
})

app.post('/contactlist/:id',(req,res)=> {
   
    let id = req.params.id;
    db.contactlist.findAndModify({query:{_id:mongojs.ObjectId(id)}, update: {$set:{name: req.body.name,email: req.body.email,number: req.body.number}},new:true},function(err,doc){
        res.json(doc)
    })
})

app.listen(3000, ()=>{
    console.log('server runningn')
})