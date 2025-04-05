const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/weather/:city", async (req, res)=>{

    try{
        const city = req.params.city;

        const{lat, lon} = await getCoordinates(city);

        const weatherResponse = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
    
        console.log("weather report", weatherResponse.data);

       const weatherData = weatherResponse.data.current_weather;
       const humidity = weatherResponse.humidity;
       const precipitation = weatherResponse.precipitation;
       

       res.json({
            city: city,
            temperature: `${weatherData.temperature}°C`,
            wind_speed: `${weatherData.windspeed} km/h`,
            time : `${weatherData.time}`,


       });
    } catch (error)
    {
        res.status(500).json({error: error.message || "Error fetching weather data!"});
    }
    
});

async function getCoordinates(city){
    const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${city}`);
    
    if(response.data.length === 0){
        throw new Error("City not found");
    }

    const data = response.data[0];
    return {lat: data.lat, lon: data.lon};
}

module.exports = router;


