const mongoose = require('mongoose');
const uuid = require('uuid');

const Schema = mongoose.Schema;
const trackSchema = new Schema({
    "trackId" : { "type": String, "required": true, "unique": true },
    "artistId" : { "type": String, "required": true },
    "albumId": { "type": String, "required": true }, 
    "name" : { "type": String, "required": true },
    "description" : { "type": String, "required": true },
    "url" : { "type": String, "required": true },
    "rating": { "type": Number, "required": true, "default" : 0 },
    "purchases": { "type": Number, "required": true, "default" : 0 },
});

trackSchema.pre('save', function(next) {
    this.trackId = uuid.v1();
    next();
});

const trackModel = mongoose.model('Track', trackSchema);

class Tracks {

    async addTrack({ artistId, albumId, name, description, url }) {
        const track = new trackModel({ artistId, albumId, name, description, url });
        return await track.save();
    }

    async getTracks(filters) {
        return await trackModel.find(filters);
    }

    async purchaseTrack(trackId, updateFields) {
        return await trackModel.update({ "trackId" : trackId },
                                        { $set: updateFields },
                                        { "multi" : false, "upsert" : false });
    }

}
module.exports = new Tracks();