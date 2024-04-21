
// connect to Mongo:
import mongoose from "mongoose";
async function connectMongo() {
  try {
    await mongoose.connect('mongodb+srv://giannischiout:johntherevelator@cluster0.myjp2fs.mongodb.net/igdb').then(() => {
        console.log('Connected to MongoDB')
    }) ;

  } catch (e) {
    console.log(e)
  }
}

export default  connectMongo;