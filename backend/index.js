import express from 'express';
import jwt from 'jsonwebtoken';

const app=express();
app.use(express.json());

app.get('/', (req, res)=> {
res.send('Привет, мир!');
}); 

app.post('/auth/login',(req,res)=>{
    console.log(req.body);
    const token=jwt.sign(
        {
            email:req.body.email,
            fullName:"Василий Иван",

        },
        'secret123',
    )
    res.json({
        succes:true,
        token,
    })
})

app.listen(4444,(err)=>
    {
        if(err){
            return console.log(err);
        }
        console.log('Server OK');
    });