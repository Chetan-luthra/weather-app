const request = require('request');
const forecast = (latitude, longitude, callback) =>{
    const url = 'https://api.darksky.net/forecast/d9f9ee3ab4a3c0a8b68b6327d27ab541/'+ latitude +','+ longitude +'?units=si';
    request({url, json: true}, (error, { body }) =>{
        if(error){
            callback('Unable to connect to Web Services',undefined);
        }
        else if(body.error){
            callback('Invalid Location');
        }
        else{
            callback(undefined,{
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                possibility: body.currently.precipProbability
            })
        }
    });
}
module.exports = forecast;