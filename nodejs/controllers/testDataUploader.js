const artistsModel = require('../models/artist');
const albumsModel = require('../models/album');
const tracksModel = require('../models/track');

class TestDataUploader {

    static async upload() {

        const testArtist = {
            name: "Alex Green",
            description: "Good man"
        };
    
        const artist = await artistsModel.addArtist(testArtist);
    
        const testAlbumFirst = {
            artistId: artist.artistId,
            name: "Best of the best",
            description: "Very cool music",
        };
    
        const testAlbumSecond = {
            artistId: artist.artistId,
            name: "search Nice baby",
            description: "Music about love",
        };
    
        const albumFirst = await albumsModel.addAlbum(testAlbumFirst);
        const albumSecond = await albumsModel.addAlbum(testAlbumSecond);
    
        const trackOneForFirstAlbum = {
            artistId: artist.artistId, 
            albumId: albumFirst.albumId, 
            name: "search la la la", 
            description: "You mast be listen this track", 
            file: "lalala.mp3",
        };
    
        const trackTwoForFirstAlbum = {
            artistId: artist.artistId, 
            albumId: albumFirst.albumId, 
            name: "op op op", 
            description: "Very funny track", 
            file: "opopop.mp3",
        };
    
        const trackThreeForFirstAlbum = {
            artistId: artist.artistId, 
            albumId: albumFirst.albumId, 
            name: "search ha ha ha", 
            description: "Very funny track", 
            file: "hahaha.mp3",
        };
    
        await tracksModel.addTrack(trackOneForFirstAlbum);
        await tracksModel.addTrack(trackTwoForFirstAlbum);
        await tracksModel.addTrack(trackThreeForFirstAlbum);
    
        const trackOneForSecondAlbum = {
            artistId: artist.artistId, 
            albumId: albumSecond.albumId, 
            name: "search Kiss", 
            description: "You mast be listen this track", 
            file: "kiss.mp3",
        };
    
        const trackTwoForSecondAlbum = {
            artistId: artist.artistId, 
            albumId: albumSecond.albumId, 
            name: "search My love", 
            description: "Very funny track", 
            file: "love.mp3",
        };
    
        const trackThreeForSecondAlbum = {
            artistId: artist.artistId, 
            albumId: albumSecond.albumId, 
            name: "baby", 
            description: "Very funny track", 
            file: "baby.mp3",
        };
    
        await tracksModel.addTrack(trackOneForSecondAlbum);
        await tracksModel.addTrack(trackTwoForSecondAlbum);
        await tracksModel.addTrack(trackThreeForSecondAlbum);

    }
    
}

module.exports = TestDataUploader;