require('colors') // awesome colors in your console logs!

var HTTP = require('http'),
    HTTPS = require('https'),
    fs = require('fs'),
    express = require('express'), // our framework!
    // config = require('./config'),
    bodyParser = require('body-parser'), // used for POST routes to obtain the POST payload as a property on `req`
    path = require('path'), // used to resolve paths across OSes
    logger = require('morgan'), // log the routes being accessed by the frontend
    mongoose = require('mongoose'),
    sessions = require('client-sessions')({ // session cookie
        cookieName: "_tin-can_", // cookie name (within document.cookies on the Frontend)
        secret: 'My$uP3R@W3$0M3$3CR3+', // encryption secret
        requestKey: 'session', // stores the session cookie in req.session
        duration: 86400, // one week in seconds = 60 * 60 * 24
        cookie: {
            ephemeral: false, // when true, cookie expires when the browser closes
            httpOnly: true, // when true, cookie is not accessible from javascript
            secure: false // when true, cookie will only be sent over SSL;
        }
    }),
    app = express(),
    ports = { // server ports
        http:  80,
        https: 443
    },
    // HTTPS_app = express(), // initialize express
    // HTTP_app = express(), // initialize express
    io = require('socket.io'),
    options = {
        key : fs.readFileSync('./tincan.chat.key', 'utf8'),
        cert: fs.readFileSync('./tincan.chat.crt', 'utf8'),
        requestCert: true
        // ca  : [
        //     fs.readFileSync('./intermediate.crt', 'utf8')
        // ]
    };
    // fs.readFileSync("/etc/ssl/certs/rapidssl_intermediate_chain.crt")

mongoose.connect('mongodb://localhost/tincan', (error) => {
    if (error) {
        console.error('ERROR starting mongoose!', error)
        process.exit(128)
    } else {
        console.info('Mongoose connected to MongoDB successfully'.yellow)
    }
})

// server setup
app.use(sessions) // mounting HTTPs session cookies
// this middleware can redirect all traffic to HTTPs
app.all('*', ( req, res, next ) => {
    console.log(req.protocol, req.headers['x-forwarded-proto']);
    if( req.protocol === 'http') {
        res.set('X-Forwarded-Proto','https');
        res.redirect('https://'+ req.headers.host + req.url);
    } else {
        next();
    }
});

app.use(logger('dev')) // mounting dev logging

// turn the public folder into a file server
app.use(express.static(__dirname + '/public'));

// enable server-side rendering
app.set('view engine', 'html');

// use EJS as a templating engine
app.engine('html', require('ejs').renderFile);

// mount the body-parsing middleware to parse payload strings into `body` object stored in `req.body`
app.post('*', bodyParser.json(), bodyParser.urlencoded({ extended: true }));

require('./routes')(app); // do all the routing stuff in a separate file by passing a reference of the app!

// create an HTTP server
HTTP.createServer( app ).listen( ports.http );
// also create an HTTPs server
var server = HTTPS.createServer( options, app).listen( ports.https );

// mounts socket.io into our server
var socketServer = io(server);

// socketServer emits a connection event (the event when somebody new goes to your site)
socketServer.on('connection', require('./sockets')(socketServer));
