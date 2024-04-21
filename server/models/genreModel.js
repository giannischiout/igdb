import { model, models } from 'mongoose';
import mongoose from 'mongoose';




const genreSchema = new mongoose.Schema({
    id: Number,
    created_at: String,
    name: String,
    slug: String,
    updated_at: Number,
    url: String,
    checksum: String
},
    {
        timestamps: true
    }
);


const Genre = models.Genre || model('Genre', genreSchema);
export default Genre