
// server.js  

const express = require('express');  
const cors = require('cors');  
const url = require('url');  
const jsdom = require("jsdom")
const { JSDOM } = jsdom
global.DOMParser = new JSDOM().window.DOMParser
const app = express();  
const PORT = process.env.PORT || 7876;  

// CORS Options  
const corsOptions = {  
    origin: 'http://localhost:3000', // or '*' for all origins  
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  
    credentials: true, // enable set cookie  
    optionsSuccessStatus: 204 // some legacy browsers (IE11, various SmartTVs) choke on 204  
};  

// Use CORS middleware  
app.use(cors(corsOptions));  

// Middleware to parse JSON bodies  
app.use(express.json());  

// URL Parser route  
app.post('/url-parser', async(req, res) => {  
    const inputUrl = req.query.url; // expecting a query parameter 'url'  
    if (!inputUrl) {  
        return res.status(400).json({ error: 'url parameter is required' });  
    }  
    let Uplaod = await fetch(inputUrl)
    let resp = await Uplaod.text();
    let parser = new DOMParser()
    let docs = parser.parseFromString(resp,'text/html')
    const description = docs.querySelector('meta[name="description"]')?.getAttribute('content') || "";
    const title = docs.querySelector('meta[name="title"]')?.getAttribute('content') || "";
    const image = docs.querySelector('meta[property="og:image"]')?.getAttribute('content') || "";
res.status(200).send({success:true,code:200,data:{description,image,docs,title}})
    try {  
        
    } catch (error) {  
        res.status(400).json({ error: 'Invalid URL' });  
    }  
});  

// Start the server  
app.listen(PORT, () => {  
    console.log(`Server is running on http://localhost:${PORT}`);  
});