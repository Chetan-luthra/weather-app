const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const port = process.env.PORT || 3000

const app = express();
//paths of the dir
const publicDirPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Chetan Luthra'
    });
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Chetan Luthra'
    });
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'For help contact Chetan Luthra',
        name: 'Chetan Luthra'
    });
})
app.get('/Weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Please Provide the address"
        })
    }
    const address = req.query.address;
    geoCode(address, (error, {latitude, longitude, location}={}) =>{
        if(error){
            return res.send({
                error
            })
        }
        else{
            forecast(latitude, longitude, (error, {summary, temperature, possibility}) => {
                if(error){
                    return res.send({
                        error
                    })
                }
                res.send({
                    location,
                    summary,
                    temperature,
                    possibility
                })
        
            });
        }
       
    });
    // res.send([{
    //     location: 'Delhi',
    //     forecast: 30
    // }, {
    //     location: 'Mumbai',
    //     forecast: 25
    // }]);
})
app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        message: 'help Article not Found',
        name: 'Chetan Luthra'
    });
})
app.get('/*', (req, res) => {
    res.render('error', {
        title: '404',
        message: 'Page not available',
        name: 'Chetan Luthra'
    });
})

app.listen(port, () => {
    console.log('Server Running on port 3000');
})