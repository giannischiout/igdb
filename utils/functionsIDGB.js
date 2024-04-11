"use server"

export const auth = async () => {
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
        return headers
}


//Header auth used for subsequnt requests;
const headers = await auth();
//FETCH THE FIRSt 500 games afte a certain timestamp
export const fetchGames = async (timestamp, id, limit) => {
    "use server"
    try {
        const response = await fetch('https://api.igdb.com/v4/games', {
		method: 'POST',
		headers: headers,
		body: `
            fields artworks, name, rating, rating_count, release_date ; 
            where artworks != null & rating >=70 & rating_count > 6 & release_dates.date > ${timestamp}; limit 2;
            `,
		// body: `fields name, id, cover, artworks, ;where rating >= 70 & release_dates.date > ${timestamp} ; where id > ${id}; where artworks != null; sort rating desc; limit ${limit};`,
		// body: `fields name, id, artworks.*;where artworks != null;  where rating >= 70 & release_dates.date > ${timestamp}; where id > ${id}; where rating_count > 10;  sort rating desc; sort date asc;limit ${limit};`,
	})
	return await response.json()
    } catch (e) {
        return e
    }
	
}




export const fetchImages = async (ids) => {
	const response = await fetch('https://api.igdb.com/v4/covers', {
		method: 'POST',
		headers: headers,
		body: `fields *; where id = (${ids});`
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




export const fetchArtwork = async (games) => {
    "use server"
	const response = await fetch(`https://api.igdb.com/v4/artworks`, {
		method: 'POST',
		headers: headers,
		body: `fields *; where game = ${games};`
	})
	const responseJson = await response.json();
	return responseJson;
}