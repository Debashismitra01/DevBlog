import mongoose from "mongoose";

const Schema = new mongoose.Schema ({
    title:{
        type: String,required:true
    },
    image:{
        type: String,required:true
    },
    description:{
        type: String,required:true
    },
    category:{
        type: String,required:true
    },
    readme: { type: String, required: true },
})
const BlogModels = mongoose.models.blog || mongoose.model('blog',Schema);

export default BlogModels;