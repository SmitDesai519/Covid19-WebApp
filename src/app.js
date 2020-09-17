const request = require('request')
const express =require('express')
const hbs = require('hbs')
const path=require('path')
const app=express()
const port=3000

//Define path for express configuration
const publicpath=path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'../templates/views')
const partialpath=path.join(__dirname,'../templates/partials')

//setup handlebars engin and view location
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath)

//setup static directory to serve
app.use(express.static(publicpath))

app.get('',(req,res)=>{
    res.render('index',{
        title:"Covid19-App",
        name:"Smit Desai"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About me",
        name:"Smit Desai"
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        name:"Smit Desai",
        helpertext:'You always looking for this page for better Help.'
    })
})

app.get('/covid19',(req,res)=>{
    if(!req.query.city){
        return res.send({
            error:'You Must Provide City'
        })
    }

    const url = "https://api.covid19india.org/state_district_wise.json";
    const city=req.query.city
    request({url:url,json:true},(error,response) => {
        if (!error && response.statusCode == 200){
        const data=[];
        const dd=response.body.Gujarat.districtData
        const cityName = Object.keys(dd)
        const cityData = Object.values(dd)
        for(let i=1;i<cityName.length-1;i++)
        {
            data.push({
                'city' : cityName[i],
                'data' : cityData[i]
            })
        }
        
        const a=data.find(f=>f.city.toLowerCase()==city.toLowerCase());
        if(a){
            console.log(a)
            res.send(a)
        }
        else{
            res.send({
                error:'Error!!'
            })
        }
        
        }
    })

})

app.get('*',(req,res) =>{
    res.render('error',{
        title:'404',
        name:'Smit Desai'
    })
})


app.listen(port,() => {
    console.log(port)
})
