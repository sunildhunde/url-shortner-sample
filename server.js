const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ShortUrl = require('./models/shortUrls');

mongoose.connect('mongodb://localhost/urlShortner',{
  useNewUrlParser: true,
  useUnifiedTopology:true
})

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}))

app.get('/', async (req,res) => {
  const shortUrls = await ShortUrl.find()
  console.log("urls = " + shortUrls);
  
  res.render('index',{shortUrls: shortUrls}  )
})

app.post('/shortUrl',async (req,res) => {
  await ShortUrl.create({ full: req.body.fullUrl})
  res.redirect('/')
});

// api to handle the get request when someone click on the short url link. 
app.get("/:shortUrl", async (req,res)=>{
  
    const shortUrl = await ShortUrl.findOne({short: req.params.shortUrl })
    console.log("Received short Url. = " + shortUrl)

    if(shortUrl == null) return res.sendStatus(404)

    shortUrl.clicks++;
    shortUrl.save()

    console.log("Full Url for selected short url  = " + shortUrl.full);
    
    res.redirect(shortUrl.full)
})

app.listen(process.env.PORT || 5000);
