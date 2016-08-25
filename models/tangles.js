var TangleSchema = new Schema({

    title:      { type: String, required: true },
    location:   {type: Array}
    date:       { type:Date, default:Date.now },
    feed:       { type: String }

});

TangleSchema.index({'location' : '2dsphere'})
