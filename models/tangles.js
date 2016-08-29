var mongoose = require('mongoose');

var TangleSchema = mongoose.model('tangle', {

    title:      { type: String, required: true },
    location:   { type: Array },
    date:       { type:Date, default:Date.now },
    feed:       { type: String }

});

// tangle.index({'location' : '2dsphere'})

module.exports = mongoose.model('Tangle', TangleSchema)
