import Image from "next/image";
import styles from "./page.module.css";





export default async function Home() {

  const auth = await fetch('localhost:3000/api/auth');
  console.log('auth')
  console.log(auth)
  
  return (
      <div>
          test
      </div>
  );
}
