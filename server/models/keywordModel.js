import { model, models } from 'mongoose';
import mongoose from 'mongoose';




const keywordSchema = new mongoose.Schema({
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


const Keyword = models.Keyword  || model('Keyword', keywordSchema);
export default Keyword 