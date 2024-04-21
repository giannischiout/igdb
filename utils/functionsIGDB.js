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
    try {
        const response = await fetch('https://api.igdb.com/v4/games', {
		method: 'POST',
		headers: headers,
		body: `
            fields 
			artworks.image_id, 
			screenshots.image_id, 
			cover.image_id, 
			name, 
			rating, 
			rating_count,
			genres,
			age_ratings,
			release_dates.human ; 
            where artworks != null & rating >=70 & rating_count > 6 & release_dates.date > ${timestamp}; limit 2;
            `,
	})
	return await response.json()
    } catch (e) {
        return e
    }
	
}


export const fetchGenres = async (ids) => {
	const response = await fetch('https://api.igdb.com/v4/genres', {
		method: 'POST',
		headers: headers,
		body: `fields *; limit 500;`
	})
	const responseJson = await response.json();
	return responseJson;

}

export const fetchCovers = async (ids) => {
	const response = await fetch('https://api.igdb.com/v4/covers', {
		method: 'POST',
		headers: headers,
		body: `fields *; where id = (${ids});`
	})
	const responseJson = await response.json();
	return responseJson;
}


export const fetchAgeRatings = async (ids) => {
	const response = await fetch('https://api.igdb.com/v4/age_ratings', {
		method: 'POST',
		headers: headers,
		body: `fields *; limit 500;`
	})
	const responseJson = await response.json();
	return responseJson;

}


// export const fetchArtwork = async (games) => {
// 	const response = await fetch(`https://api.igdb.com/v4/artworks`, {
// 		method: 'POST',
// 		headers: headers,
// 		body: `fields *; where game = ${games};`
// 	})
// 	const responseJson = await response.json();
// 	return responseJson;
// }


// export const fetchScreenshots = async (gameIDs) => {
// 	const response = await fetch(`https://api.igdb.com/v4/screenshots`, {
// 		method: 'POST',
// 		headers: headers,
// 		body: `fields *; where game = ${gameIDs};`
// 	})
// 	console.log(response)
// 	const responseJson = await response.json();
// 	return responseJson;
// }


// export const fetchSimilarGames = async (gameIDs) => {
// 	const response = await fetch(`https://api.igdb.com/v4/games`, {
// 		method: 'POST',
// 		headers: headers,
// 		body: `fields 
// 		artworks.image_id, 
// 		screenshots.image_id, 
// 		cover.image_id, 
// 		name, 
// 		rating, 
// 		rating_count,
// 		release_dates.human ; ; where id = ${gameIDs};`
// 	})
// 	const responseJson = await response.json();
// 	return responseJson;
// }