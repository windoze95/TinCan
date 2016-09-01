var mongoose = require('mongoose'),
    TangleSchema = new mongoose.Schema({
        title    : { type: String, required: true },
        loc : {
            type: { type: String },
            coordinates: []
        },
        // { type: "Point", coordinates: [ 40, 5 ] },
        date     : { type: Date, default: Date.now },
        feed     : { type: String }
    });

TangleSchema.index({ loc: '2dsphere' });
module.exports = mongoose.model('Tangle', TangleSchema);
