var Tangle = require('../models/tangles');

module.exports = {
    create: (req, res) => {
        // a way to quickly bounce bad payloads, prefer model validation over this method
        // if( !req.body.make ) {
        //     return res.status(400).json({
        //         message: 'Bad payload'
        //     });
        // }

        // socket.on('coords', (data) => {
        //     console.log('Data:', data);
        //     // var data = {};
        //     data.location = [data.lat, data.lon]


        var newTangle = new Tangle(req.body);
        // req.body.location = [req.body.lat, req.body.lon]

        newTangle.save( (err, data) => {
            // data.location = [data.lat, data.lon]
            if(err) {
                console.error('oh no'.red, err);
                res.status(500).json({
                    message: 'could not be complete'
                });
            } else {
                console.info('oh joy');
                console.info(data);
                console.info(data.lon);
                console.info(data.location);
                console.info(req.body)
                res.json(data);
            }
        });
    }
}
