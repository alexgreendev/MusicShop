const artists = require('../models/artist');
const albums = require('../models/album');

class mainController {

    static async getTracksByAlbumId(req, res) {
        console.log('get /albums/:albumId/tracks', req.params);
        const { albumId } = req.params;
        const album = albums.getAlbums({ albumId });
        res.send({ success: true, data: album });
        res.end();
    }

    static async buyTrack(req, res) {
        console.log('patch /albums/:albumId/tracks/:trackId', req.params);
        res.send({ success: true });
        res.end();
    }

    static async getAlbumsByArtistId(req, res) {
        console.log('get /artists/:artistId/albums', req.params);
        res.send({ success: true });
        res.end();
    }

    static async buyAlbum(req, res) {
        console.log('patch /artists/:artistId/albums/:albumId', req.params);
        res.send({ success: true });
        res.end();
    }

    static async getArtistById(req, res) {
        console.log('get /artists/:artistId', req.params);
        res.send({ success: true });
        res.end();
    }

    static async search(req, res) {
        console.log('get /search', req.params);
        res.send({ success: true });
        res.end();
    }
}

module.exports = mainController;