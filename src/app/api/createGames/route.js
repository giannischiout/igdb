
import {parseISO, getTime} from 'date-fns';
import {fetchArtwork, fetchGames, fetchImages } from '../../../../utils/functionsIDGB';




export async function POST(req, res) {
	// I want to fetch games after the year 2010. There will be sufficient data for a database.
	const dateString = '2020-01-01';
	const dateObject = parseISO(dateString);
	const timestamp = getTime(dateObject) / 1000;
	//fetch the first 500 games // The api has a limit of 500 games per request
	//This will indicated to fetch games after this specific ID:
	const singleGameId = 0;
	const limit = 10;
	//FETCH GAMES AFTER THE YEAR 2010:


	let games = await fetchGames(timestamp, singleGameId, limit);
	// console.log(games)
	const gameIds = createIdString(games, 'id');
	console.log(gameIds)
	let artworks = await fetchArtwork(gameIds);
	// console.log(artworks)
	// console.log(artworks)

	return Response.json(games)
}



















function createIdString(games, key) {
	if (!games.every(game => key in game)) {
        throw new Error(`Key "${key}" does not exist in all game objects`);
    }


    const ids = games.map(game => game[key]).join(',');
    return `(${ids})`;
}
