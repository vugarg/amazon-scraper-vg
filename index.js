const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 8000;

const generateUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the API");
})

// Get Product Details
app.get('/products/:productId', async (req, res) => {
    const { productId }= req.params;
    const { apiKey } = req.query;
    
    try {
        const responce = await request(`${generateUrl(apiKey)}&url=https://www.amazon.com/dp/${productId}`);
        res.json(JSON.parse(responce));
    } catch (error) {
        res.json(error);
    }
}); 

// Get Product Reviews
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId }= req.params;
    const { apiKey } = req.query;
    
    try {
        const responce = await request(`${generateUrl(apiKey)}&url=https://www.amazon.com/product-reviews/${productId}`);
        res.json(JSON.parse(responce));
    } catch (error) {
        res.json(error);
    }
}); 

// Get Product offers
app.get('/products/:productId/offers', async (req, res) => {
    const { productId }= req.params;
    const { apiKey } = req.query;
    
    try {
        const responce = await request(`${generateUrl(apiKey)}&url=https://www.amazon.com/gp/offer-listing/${productId}`);
        res.json(JSON.parse(responce));
    } catch (error) {
        res.json(error);
    }
}); 

// Get Search Results
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery }= req.params;
    const { apiKey } = req.query;
    
    try {
        const responce = await request(`${generateUrl(apiKey)}&url=https://www.amazon.com/s?k=${searchQuery}`);
        res.json(JSON.parse(responce));
    } catch (error) {
        res.json(error);
    }
}); 

app.listen(PORT, () => console.log("Server is running on port " + PORT));