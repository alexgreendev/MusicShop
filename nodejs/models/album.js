const mongoose = require('mongoose');
const uuid = require('uuid');

const Schema = mongoose.Schema;
const albumSchema = new Schema({
    "albumId": { "type": String, "required": true, "unique": true }, 
    "artistId" : { "type": String, "required": true },
    "name": { "type": String, "required": true },
    "description": { "type": String, "required": true },
    "rating": { "type": Number, "required": true, "default" : 0 },
    "purchases": { "type": Number, "required": true, "default" : 0 }, 
});

albumSchema.pre('save', function(next) {
    this.albumId = uuid.v1();
    next();
});

const albumModel = mongoose.model('Album', albumSchema);

class Albums {

    async createAlbum({ artistId, name, description }) {
        const album = new orderModel({ artistId, name, description });
        return await album.save();
    }

    async getAlbums(filters) {
        return await albumModel.find(filters);
    }

    async purchaseAlbums(albumId, updateFields) {
        return await albumModel.update({ "albumId" : albumId },
                                        { $set: updateFields },
                                        { "multi" : false, "upsert" : false });
    }

}
module.exports = new Albums();