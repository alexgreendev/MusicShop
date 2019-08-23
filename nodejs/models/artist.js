const mongoose = require('mongoose');
const uuid = require('uuid');

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;
const artistSchema = new Schema({
    "artistId" : { "type": String, "unique": true },
    "name" : { "type": String, "required": true },
    "description" : { "type": String, "required": true },
});
artistSchema.index({ name: "text", description: "text" });

artistSchema.pre('save', function(next) {
    this.artistId = uuid.v1();
    next();
});

const artistModel = mongoose.model('Artist', artistSchema);

class Artists {

    async addArtist({ name, description }) {
        const artist = new artistModel({ name, description });
        return await artist.save();
    }

    async getArtists(artistId) {
        return artistModel.find(artistId);
    }

}
module.exports = new Artists();