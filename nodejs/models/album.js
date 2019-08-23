const mongoose = require('mongoose');
const uuid = require('uuid');

const Schema = mongoose.Schema;
const albumSchema = new Schema({
    "albumId": { "type": String, "unique": true }, 
    "artistId" : { "type": String, "required": true },
    "name": { "type": String, "required": true },
    "description": { "type": String, "required": true },
    "rating": { "type": Number, "required": true, "default" : 0 },
    "price": { "type": Number, "required": true, "default" : 5 },
    "purchases": { "type": Number, "required": true, "default" : 0 }, 
});
albumSchema.index({ name: "text", description: "text" });
albumSchema.pre('save', function(next) {
    this.albumId = uuid.v1();
    next();
});

const albumModel = mongoose.model('Album', albumSchema);

class Albums {

    async addAlbum({ artistId, name, description }) {
        const album = new albumModel({ artistId, name, description });
        return await album.save();
    }

    async getAlbums(filters) {
        return await albumModel.find(filters);
    }

    async updateAlbums(albumId, updateFields) {
        return await albumModel.update({ "albumId" : albumId },
                                        { $set: updateFields },
                                        { "multi" : false, "upsert" : false });
    }

}
module.exports = new Albums();