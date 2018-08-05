var express = require("express");
var bodypaser = require("body-parser");
let pg = require('pg');
var app = express();

let pool = new pg.Pool({    
    user: 'postgres',
    schema: 'public',
    database: 'sampe',
    password: 'eniyan007',
    host: 'localhost',
    port: 5432,
    max: 50
})


app.use(function(request,response,next){
    response.header("Access-Control-Allow-Origin","*");
    response.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    response.header("Access-Control-Allow-Credentials",true);
    next();
  });


app.use(bodypaser.json());

app.post('/db',(req,res)=>{
    console.log(req.body);
    var email = req.body.email;
    var pass = req.body.pass;
    pool.connect((err,db,done)=>
    {
            if(err){
                console.log(err);
                return res.status(400).send(err);
            }
            else
            {
                // console.log(`UPDATE public.login SET password='${password}',mobile=${mobile} WHERE email LIKE '${email}' AND coll_id LIKE '${coll_id}'`);
                db.query
                (`INSERT into users values('${pass}','${email}')`,
                (err,table)=>{
                    done();
                    if(err){
                        console.log(err)
                        res.status(201).end(JSON.stringify({status:false,message:'Wrong Details'}));
                    }
                    else{
                        console.log('DATA INSERTED',table);
                        db.end();
                        return res.status(201).send(({status:true}));
                    }
                })  
            }
    })
    // res.send({message:"hi"});
})


app.listen(5000,()=>{
    console.log("server listening");
});