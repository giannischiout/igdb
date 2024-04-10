
import {parseISO, getTime} from 'date-fns';
export async function POST(req, res) {
	const auth = await fetch('https://id.twitch.tv/oauth2/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Client-ID': 'vrbh2hx2bnitj46w6403c4orzcgwp5',
		},
		body: JSON.stringify({
			client_secret: "z58rcf3ox98vedtpift5r5d19q0fd4",
			grant_type: "client_credentials"
		}),

	})


		const authJson = await auth.json()
		const token = authJson.access_token
		const headers = {
			'Accept': 'application/json',
			'Client-ID': 'vrbh2hx2bnitj46w6403c4orzcgwp5',
			'Authorization': 'Bearer ' + token,
		}

	// I want to fetch games after the year 2010. There will be sufficient data for a database.
	const dateString = '2010-01-01';
	const dateObject = parseISO(dateString);
	const timestamp = getTime(dateObject) / 1000;
	//fetch the first 500 games // The api has a limit of 500 games per request
	const id = 0;
	//FETCH GAMES AFTER THE YEAR 2010:


	let games = await fetchGames(timestamp, id, token);
	let images = await fetchImages(games, token);
	// console.log(games)
	console.log('images')
	console.log(images)
	// Consolidate games with corresponding images
	games = consolidateGamesWithImages(games, images);
	console.log(games)

	const artwork = await fetchArtwork(headers, 277143)
	console.log('artwork')
	console.log(artwork)
	return Response.json(games)
}




const fetchGames = async (timestamp, id, token) => {
	const response = await fetch('https://api.igdb.com/v4/games', {
		method: 'POST',
		headers: {
			'Client-ID': 'vrbh2hx2bnitj46w6403c4orzcgwp5',
			'Authorization': 'Bearer ' + token,
		},
		// body: `fields *;where rating >= 70 & release_dates.date > ${timestamp}; where id > ${id}; sort rating desc; limit 2;`,
		body: `fields id, name, cover;where rating >= 70 & release_dates.date > ${timestamp}; where id > ${id}; sort rating desc; limit 2;`,
	})
	return await response.json()
}




const fetchImages = async (games, token) => {
	const coverIds= games.map(game => game.cover)
	const response = await fetch('https://api.igdb.com/v4/covers', {
		method: 'POST',
		headers: {
			'Client-ID': 'vrbh2hx2bnitj46w6403c4orzcgwp5',
			'Authorization': 'Bearer ' + token,
		},
		body: `fields *; where id = (${coverIds});`
	})
	const responseJson = await response.json();
	const _newImages = [];
	for(let item of responseJson) {
		_newImages.push({
			id: item.id,
			url: item.url,
			game: item.game,
			image_id: item.image_id,
			width: item.width,
			height: item.height,
			screenshotHuge: `https://images.igdb.com/igdb/image/upload/t_screenshot_huge/${item.image_id}.jpg`

		})
	}
	return _newImages;


}




const consolidateGamesWithImages = (games, images) => {
	console.log(images)
	console.log(games)
	const _games = games.map(game => {
		const image = images.find(image => image.game === game.id)
		return {
			...game,
			image_id: image?.image_id || null
		}
	})
	return _games;
}




const fetchArtwork = async (headers, game) => {
	const response = await fetch(`https://api.igdb.com/v4/artworks`, {
		method: 'POST',
		headers: headers,
		body: `fields *; where game = ${game};`
	})
	const responseJson = await response.json();
	return responseJson;
}
