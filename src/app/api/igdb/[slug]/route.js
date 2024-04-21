import { auth } from "../../../../../utils/functionsIGDB";
import connectMongo from "../../../../../server/config";
import Genre from "../../../../../server/models/genreModel";
import Theme from "../../../../../server/models/themeModel";
import Keyword from "../../../../../server/models/keywordModel";


export async function POST(req, {params}) {
    const {slug} = params;
    await connectMongo();

    if(slug === 'genre') {
        let genres = await fetcher('genres', `fields *; limit 500;`)
        let insert = await Genre.insertMany(genres)
        return Response.json(insert)
    }
    if(slug === "themes") {
        let themes = await fetcher('themes', `fields *; limit 500;`)
        let insert = await Theme.insertMany(themes)
        return Response.json(insert)
    }
    if(slug === "keywords") {
        let result = await fetcher('keywords', `fields *; limit 500;`)
        let insert = await Keyword.insertMany(result)
        return Response.json(insert)
    }
    if(slug === "collections") {
        let result = [];
        let id = 0
        while (id > 0) {
            let data = await fetcher('collections', 
            `fields *; limit 500; 
            where id > ${0};
            sort id asc;`)
            console.log(data)
            id = result[result.length - 1]
            result.push(data)
        }
       
        console.log(result.length)
        return Response.json( result )
    }
 
	
}





const fetcher = async (type, body) => {
    console.log(process.env.IGDB_API_URL)
    const headers = await auth()
        const res = await fetch(`${process.env.IGDB_API_URL}/${type}`, {
            method: 'POST',
            headers: headers,
            body: body
        })
    let data = await res.json()
    return await data
}







