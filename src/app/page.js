


import { fetchArtwork } from "../../utils/functionsIGDB";
import Image from "next/image";
import Link from "next/link";
export default async function Home() {

  const data = await fetchArtwork(`(20196,45131,136482,135478,11226,51267,143761,115425,115776,22439)`)
  console.log('data')
  console.log(data.length)
 
  return (
      <div>
          {data.map((item, index) => {
            return (
              <div key={index} >
                 <Link href={`https://images.igdb.com/igdb/image/upload/t_screenshot_huge/${item.image_id}.jpg`}>
                {item.image_id}
              </Link>
              </div>
            )
          })}
      </div>
  );
}
