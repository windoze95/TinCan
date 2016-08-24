var TangleSchema = new Schema({
    tangle: {
        title:       { type: String, required: true },
        feed:        { type: String },
        date:        { type:Date, default:Date.now }
    },
    location : {type : Array}
});

TangleSchema.index({'location' : '2dsphere'})
