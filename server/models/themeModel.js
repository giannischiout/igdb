import { model, models } from 'mongoose';
import mongoose from 'mongoose';




const themeSchema = new mongoose.Schema({
    id: Number,
    name: String,
    slug: String,
    url: String,
    checksum: String
},
    {
        timestamps: true
    }
);


const Theme = models.Theme|| model('Theme', themeSchema);
export default Theme