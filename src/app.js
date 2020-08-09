const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Stokes'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Andrew Stokes'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Andrew Stokes',
        message: 'Bro you need some HELP'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You gotta provide a search term'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forcast(latitude, longitude, (error, forcastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forcastData,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404: Article Not Found",
        name: "Andrew Stokes",
        error: "Bruh!  Try another article name!"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404: Page Not Found",
        name: "Andrew Stoeks",
        error: 'Bro you suck at finding urls'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})