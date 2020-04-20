const express = require('express');
const mongoose = require('mongoose');
const app = express();
const shortUrl = require('./models/shortUrls');

mongoose.connect('mongodb://localhost/urlShortner',{
  useNewUrlParser: true,
  useUnifiedTopology:true
})

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}))

app.get('/', async (req,res) => {
  let shortUrls = await shortUrl.find()
  console.log("urls = " + shortUrls);
  res.render('index',{shortUrls: shortUrls} = {} )
})

app.post('/shortUrl',async (req,res) => {
  await shortUrl.create({ full: req.body.fullUrl})
  res.redirect('/')
});

app.listen(process.env.PORT || 5000);
