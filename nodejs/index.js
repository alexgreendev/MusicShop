const config = require('config');
const Express = require('express');
const bodyParser = require('body-parser');
const mainController = require('./controllers/mainController');

const app = new Express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get(`${config.baseUrl}/albums/:albumId/tracks/`, mainController.getTracksByAlbumId);
app.patch(`${config.baseUrl}/albums/:albumId/tracks/:trackId/`, mainController.buyTrack);

app.get(`${config.baseUrl}/artists/:artistId/albums/`, mainController.getAlbumsByArtistId);
app.patch(`${config.baseUrl}/artists/:artistId/albums/:albumId/`, mainController.buyAlbum);

app.get(`${config.baseUrl}/artists/`, mainController.getArtists);
app.get(`${config.baseUrl}/artists/:artistId/`, mainController.getArtistById);

app.get(`${config.baseUrl}/search/`, mainController.search);

const port = config.port;
app.listen(port, () => {
  console.log(`Server was started on '${port}'`);
});