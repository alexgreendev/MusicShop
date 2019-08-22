const mongoose = require('mongoose');
const uuid = require('uuid');

const Schema = mongoose.Schema;
const artistSchema = new Schema({
    "artistId" : { "type": String, "required": true, "unique": true },
    "name" : { "type": String, "required": true },
    "description" : { "type": String, "required": true },
});

artistSchema.pre('save', function(next) {
    this.artistId = uuid.v1();
    next();
});

const artistModel = mongoose.model('Artist', artistSchema);

class Artists {

    async getArtists(artistId) {
        return await artistModel.find(artistId);
    }

}
module.exports = new Artists();