const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { fetchWeatherData } = require('./weatherApi');

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).send({ error: 'City is required' });
    }

    try {
        const weatherData = await fetchWeatherData(city);
        res.send(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        res.status(500).send({ error: 'Failed to fetch weather data' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
