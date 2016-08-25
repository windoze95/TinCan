require('colors') // awesome colors in your console logs!

var express = require('express'), // our framework!
    bodyParser = require('body-parser'), // used for POST routes to obtain the POST payload as a property on `req`
    path = require('path'), // used to resolve paths across OSes
    logger = require('morgan'), // log the routes being accessed by the frontend
    ejs = require('ejs'), // used for server-side templating
    mongoose = require('mongoose'),
    sessions = require('client-sessions')({ // session cookie
        cookieName: "_myAppName", // cookie name (within document.cookies on the Frontend)
        secret: 'My$uP3R@W3$0M3$3CR3+', // encryption secret
        requestKey: 'session', // stores the session cookie in req.session
        duration: 86400, // one week in seconds = 60 * 60 * 24
        cookie: {
            ephemeral: false, // when true, cookie expires when the browser closes
            httpOnly: true, // when true, cookie is not accessible from javascript
            secure: false // when true, cookie will only be sent over SSL;
        }
    }),
    app = express(), // initialize express
    io = require('socket.io'),

    app.settings.env = 'development'
    var Config = require('./config'),
    port = process.env.PORT || 8888 // server port
    // conf = new Config, // access properties like such - conf.service.consumerKey

mongoose.connect('mongodb://localhost/app', (error) => {
    if (error) {
        console.error('ERROR starting mongoose!', error)
        process.exit(128)
    } else {
        console.info('Mongoose connected to MongoDB successfully'.yellow)
    }
})

// server setup
app.use(logger('dev')) // mounting dev logging
app.use(sessions) // mounting HTTPs session cookies

// turn the public folder into a file server
app.use(express.static(__dirname + '/public'))

// enable server-side rendering
app.set('view engine', 'html')

// use EJS as a templating engine
app.engine('html', ejs.renderFile)

// mount the body-parsing middleware to parse payload strings into `body` object stored in `req.body`
app.post('*', bodyParser.json(), bodyParser.urlencoded({
    extended: true
}))

require('./routes')(app) // do all the routing stuff in a separate file by passing a reference of the app!
console.log(process.env.PORT);
// start the server
var server = app.listen(port, () => {
    console.log('Server Started on port:', port.toString().cyan)
})

// mounts socket.io into our server
var socketServer = io(server);

// socketServer emits a connection event (the event when somebody new goes to your site)
socketServer.on('connection', (socket) => {
    // here, socket is the object representing the actual connection on someone using your site.
    // twitterStream.on('tweet', (tweetData) => {
    //     socket.emit('incomingTweet', tweetData); // private socket connection
    // });

    socket.on('randomNumber', (data) => {
        console.log('Data:', data);
        var newNum = data * 100; // manipulating the random number we got from the client

        socketServer.emit('newNumber', newNum); // public socket connection
        // broadcasting a newNumber to (ALL) clients connected via socket
    })
});
