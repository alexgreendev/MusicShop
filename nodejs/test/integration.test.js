const config = require("config");
const chai = require('chai');
const chaiHttp = require('chai-http');
const url = require('url');

const expect = chai.expect;
chai.use(chaiHttp);

let artist = {};
let album = {};
let track = {};

describe('REST API integration testing.', function() {
    
    it(`Get information about the artists. Successfully.\nGET: /artists/`, function(done) {
        const urlMethod = url.parse(`http://localhost:3300${config.baseUrl}/artists/`);
        chai
            .request(urlMethod.host)
            .get(urlMethod.path)
            .set('content-type', 'application/json')
            .then((response) => {
                const body = response.body;
                expect(body).to.be.an('array');
                artist = body[0];
                done();
            })
            .catch((error) => {
                console.log(error);
            });
    });
    
    it(`Get albums by artist. Successfully. \nGET: /artists/{artistId}/albums/`, function(done) {
        const urlMethod = url.parse(`http://localhost:3300${config.baseUrl}/artists/${artist.artistId}/albums/`);
        chai
            .request(urlMethod.host)
            .get(urlMethod.path)
            .set('content-type', 'application/json')
            .then((response) => {
                const body = response.body;
                expect(body).to.be.an('array');
                album = body[0];
                done();
            })
            .catch((error) => {
                console.log(error);
            });
    });

    it(`Getting information about tracks in an album. Successfully. \nGET: /albums/{albumId}/tracks/`, function(done) {
        const urlMethod = url.parse(`http://localhost:3300${config.baseUrl}/albums/${album.albumId}/tracks/`);
        chai
            .request(urlMethod.host)
            .get(urlMethod.path)
            .set('content-type', 'application/json')
            .then((response) => {
                const body = response.body;
                expect(body).to.be.an('array');
                track = body[0];
                done();
            })
            .catch((error) => {
                console.log(error);
            });
    });

    it(`Get information about the artist by artistId. Successfully. \nGET: /artists/{artistId}/`, function(done) {
        const urlMethod = url.parse(`http://localhost:3300${config.baseUrl}/artists/${artist.artistId}/`);
        chai
            .request(urlMethod.host)
            .get(urlMethod.path)
            .set('content-type', 'application/json')
            .then((response) => {
                const body = response.body;
                expect(body).to.be.an('object');
                done();
            })
            .catch((error) => {
                console.log(error);
            });
    });

    it(`Search for a track, album or artist. Successfully. \nGET: /search/`, function(done) {
        const urlMethod = url.parse(`http://localhost:3300${config.baseUrl}/search/`);
        const query = "kiss la alex love";

        chai
            .request(urlMethod.host)
            .get(urlMethod.path)
            .set('content-type', 'application/json')
            .query({ query })
            .then((response) => {
                const body = response.body;
                expect(body).to.be.an('object');
                expect(body.artists).to.be.an('array');
                expect(body.albums).to.be.an('array');
                expect(body.tracks).to.be.an('array');
                done();
            })
            .catch((error) => {
                console.log(error);
            });
    });

    it(`Buy album. Successfully. \nPATCH: /artists/{artistId}/albums/{albumId}/`, function(done) {
        const urlMethod = url.parse(`http://localhost:3300${config.baseUrl}/artists/${artist.artistId}/albums/${album.albumId}/`);
        const query = "kiss la alex love";

        chai
            .request(urlMethod.host)
            .patch(urlMethod.path)
            .set('content-type', 'application/json')
            .then((response) => {
                const body = response.body;
                expect(body).to.be.an('object');
                done();
            })
            .catch((error) => {
                console.log(error);
            });
    });

    it(`Buy track. Successfully. \nPATCH: /albums/{albumId}/tracks/{trackId}/`, function(done) {
        const urlMethod = url.parse(`http://localhost:3300${config.baseUrl}/albums/${album.albumId}/tracks/${track.trackId}/`);
        const query = "kiss la alex love";

        chai
            .request(urlMethod.host)
            .patch(urlMethod.path)
            .set('content-type', 'application/json')
            .then((response) => {
                const body = response.body;
                expect(body).to.be.an('object');
                done();
            })
            .catch((error) => {
                console.log(error);
            });
    });
});