require('colors') // awesome colors in your console logs!

var HTTP = require('http'),
    HTTPS = require('https'),
    fs = require('fs'),
    express = require('express'), // our framework!
    // config = require('./config'),
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
    HTTPS_app = express(), // initialize express
    HTTP_app = express(), // initialize express
    io = require('socket.io'),
    options = {
        key: fs.readFileSync( './tincan.chat.key', 'utf8' ),
        cert: fs.readFileSync( './tincan.chat.crt', 'utf8' )
    };

mongoose.connect('mongodb://localhost/tincan', (error) => {
    if (error) {
        console.error('ERROR starting mongoose!', error)
        process.exit(128)
    } else {
        console.info('Mongoose connected to MongoDB successfully'.yellow)
    }
})

// server setup
HTTPS_app.use(logger('dev')) // mounting dev logging
HTTPS_app.use(sessions) // mounting HTTPs session cookies

// turn the public folder into a file server
HTTPS_app.use(express.static(__dirname + '/public'))

// enable server-side rendering
HTTPS_app.set('view engine', 'html')

// use EJS as a templating engine
HTTPS_app.engine('html', ejs.renderFile)

// mount the body-parsing middleware to parse payload strings into `body` object stored in `req.body`
HTTPS_app.post('*', bodyParser.json(), bodyParser.urlencoded({
    extended: true
}))

require('./routes')(HTTPS_app) // do all the routing stuff in a separate file by passing a reference of the app!

// start the server/https redirect
HTTP_app.get('*', (req, res) => {
     console.log('Querystring:', req.query);
     res.send(req.query);
});

HTTPS_app.get('*', (req, res) => {
     console.log('Querystring:', req.query);
     res.send(req.query);
});

HTTPS_app.post('*', (req, res) => {
     console.log('POST payload:', req.body);
     res.send(req.body);
});

// HTTP server, just listens for connections and immediately redirects to HTTPs
HTTP.createServer( HTTP_app )
     .listen( 80 );

// HTTPS server, the real app listens on this.
var server = HTTPS.createServer(options, HTTPS_app).listen( 443 );

// { // https://nodejs.org/api/https.html
//      key: privateKey,
//      cert: certificate
// }

// var server = app.listen(port, () => {
//     console.log('Server started on port:', port.toString().cyan)
// })

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
