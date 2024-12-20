const express = require('express')
const PORT = 3000
const axios = require('axios')
let cityDetails
const server = express()
server.set('view engine','ejs')
server.get('/',(req,res)=>{
    res.render('home')
})

server.get('/getWeather',async(req,res)=>{
    const cityName = req.query.txtcity
    console.log(cityName)
    const URL =`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=6d98bfb5178f4c7ff426bd439d826df8`
    await axios.get(URL)
    .then((result)=>{
        console.log(result)
        cityDetails = result
    })
    .catch((error)=>{
        console.log('Some error occured....'+error)
    })
    //console.log('current Lat:'+cityDetails.data[0].lat)
    //console.log('current Lon:'+cityDetails.data[0].lon)
    const weatherURL = `http://api.openweathermap.org/data/2.5/weather?lat=${cityDetails.data[0].lat}&lon=${cityDetails.data[0].lon}&units=metric&appid=6d98bfb5178f4c7ff426bd439d826df8`
    console.log('Weather URL:'+weatherURL)
    await axios(weatherURL)
    .then((finalResult)=>{
        console.log(finalResult)
    })
    .catch((error)=>{
        console.log(error)
    })
})
server.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})