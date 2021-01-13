 const express= require('express')
const bodyParser=require('body-parser')
const got=require('got');
const app= express();



app.use(bodyParser.urlencoded());
app.use(express.json());
    
app.get('/',async(req,res)=>{
    res.send("Welcome. To access the endpoint, go to https://ratexchangez.herokuapp.com/api/rates?base={}$currency={}, using base and currency as query parameters")
})
    
 app.get('/api/rates',async(req,res)=>{
    const base=req.query.base.toUpperCase();
    const currency=req.query.currency.toUpperCase();
    try{
    if(!base || ! currency){
        return res.json({Error: "Base and currency fields are required"})
    }
    const options={
        url:`https://api.exchangeratesapi.io/latest?base=${base}` ,
        method:"GET",
    };
    const response=await got(options)
    if(!response)()=> res.json({Error: "There is something wrong with the request,Please Try again"})
    if(response.statusCode==200){ 
    const currencyList= currency.split(',')
    const result=JSON.parse(response.body)
    let ratesObj= currencyList.reduce(function(acc,curr){
        acc[curr]=result.rates[curr]
        return acc;
    },{})  
const prototypeObj={
    result:{
        base:base,
        date:result.date,
        rates:
          ratesObj
        
    }
};

  return res.json(prototypeObj)
}

}catch(e){
    console.log(e)
}
 })


app.listen( (process.env.PORT || 3000),()=>{
    console.log("App2 is live");
})



    




