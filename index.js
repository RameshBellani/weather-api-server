const express = require('express');
const axios = require('axios');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).send({ error: 'City is required' });
    }

    const apiKey = "6e249a806c4aa137e3d09d10da8e1b07";
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;

    try {
        const response = await axios.get(url);
        const weatherData = response.data;

        if (weatherData.error) {
            return res.status(400).send({ error: weatherData.error.info });
        }

        res.send({
            location: weatherData.location.name,
            temperature: weatherData.current.temperature,
            description: weatherData.current.weather_descriptions[0],
            observation_time: weatherData.current.observation_time
        });
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        res.status(500).send({ error: 'Failed to fetch weather data' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
