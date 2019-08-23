const artistsModel = require('../models/artist');
const albumsModel = require('../models/album');
const tracksModel = require('../models/track');
const config = require('config');
const mongoose = require('mongoose');
const testDataUploader = require('./testDataUploader');

mongoose.connect(config.mongodb, { useMongoClient: true });
testDataUploader.upload();

class mainController {

    static async getTracksByAlbumId(req, res) {
        const { albumId } = req.params;
        const traks = await tracksModel.getTracks({ albumId });
        res.send(traks);
        res.end();
    }

    static async buyTrack(req, res) {
        const { albumId, trackId } = req.params;
        const track = await tracksModel.getTracks({ albumId, trackId });
        const purchases = Number(track[0]._doc.purchases) + 1;
        await tracksModel.updateTrack(trackId, { purchases });
        res.send(track);
        res.end();
    }

    static async getAlbumsByArtistId(req, res) {
        const { artistId } = req.params;
        const albums = await albumsModel.getAlbums({ artistId });
        res.send(albums);
        res.end();
    }

    static async buyAlbum(req, res) {
        const { artistId, albumId } = req.params;
        const album = await albumsModel.getAlbums({ artistId, albumId });
        const purchases = Number(album[0]._doc.purchases) + 1;
        await albumsModel.updateAlbums(albumId, { purchases });
        res.send(album);
        res.end();
    }

    static async getArtistById(req, res) {
        const { artistId } = req.params;
        const artists = await artistsModel.getArtists({ artistId });
        res.send(artists[0]._doc);
        res.end();
    }

    static async search(req, res) {
        const { query } = req.query;
        const artists = await artistsModel.getArtists({ $text: { $search: query } });
        const albums = await albumsModel.getAlbums({ $text: { $search: query } });
        const tracks = await tracksModel.getTracks({ $text: { $search: query } });
        res.send({ albums, tracks, artists });
        res.end();
    }
}

module.exports = mainController;