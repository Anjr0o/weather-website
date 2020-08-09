const request = require('request')

const forcast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=fe9e5a31d4b5f3fa919d8f0930c75419&query=" + longitude + "," + latitude + "&units=f"
    
    request({url, json: true}, (error, { body } ) => {
        if (error) {
            callback('Unable to connect to weather service', undefined) 
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ": It is currently " + body.current.temperature + " degrees and feels like " + body.current.feelslike + " degrees")
        }
    })     
}

module.exports = forcast