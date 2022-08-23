
# Spotifu Gallery

Spotifu Gallery here you can search for your favorite artist, album and track.


## Demo
https://spotify-gallery.vercel.app/


## Tech Stack

🥬**Node 16**
⚛️**React 18**
💎**Tailwind Css**
🔺**Next js**
🪀**RTK Redux**


## Installation

Install spotify-gallery with npm

```bash
git clone https://github.com/Pamsho09/spotify-gallery.git
cd spotify-gallery
npm i 
npm run dev
```
    
## Running Tests

To run tests, run the following command

```bash
  npm run lint
  npm run test
```


## Screenshots

![App Screenshot](https://github.com/Pamsho09/spotify-gallery/blob/main/screenshots/home.png?raw=true)


## how does spotify auth work? 
![auth spotify](https://github.com/Pamsho09/spotify-gallery/blob/main/screenshots/auth.png?raw=true)
![get with token](https://github.com/Pamsho09/spotify-gallery/blob/main/screenshots/fetch.png?raw=true)


## API Reference

#### Get token 

```http
  GET /api/auth/spotify
```

***the following endpoints require a bearer token*** 

#### Get tracks, albums and artist

```http
  GET /api/spotify/search?p=${p}&type=${type}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `p`      | `string` | **Required**. p of item to fetch |
| `type`      | `string` | **Required**. type of item to fetch |


#### Get artist by id

```http
  GET /api/spotify/get-artist-by-id?id=${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. id of item to fetch |

#### Get albums by artist id

```http
  GET /api/spotify/get-albums-by-artist-id?id=${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. id of item to fetch |

#### Get album by id

```http
  GET /api/spotify/get-album-by-id?id=${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. id of item to fetch |

#### Get tracks by album id

```http
  GET /api/spotify/get-tracks-by-album-id?id=${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. id of item to fetch |

#### Get track by id

```http
  GET /api/spotify/get-track-by-id?id=${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. id of item to fetch |
