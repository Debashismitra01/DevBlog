import { NextResponse } from "next/server";
import ConnectDB from "../../../../lib/config/db";
import { writeFile } from "fs/promises";
import BlogModels from "../../../../lib/models/BlogModel";

const LoadDB = async () => {
    await ConnectDB();
};
LoadDB();

export async function GET(request) {
    const blogId = request.nextUrl.searchParams.get("id");
    if (blogId){
        const blog=await BlogModels.findById(blogId);
        return NextResponse.json({blog});
    }
    else{
    try {
        const blogs = await BlogModels.find(); // Fetch all blogs from the database
        return NextResponse.json({ blogs });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
    }
}
}

export async function POST(request) {
    const formData = await request.formData();
    const pass = formData.get('pass');
    if (pass === process.env.SECRET_PASS){
    const timestamp = Date.now();

    const image = formData.get('image');
    const imageByteData = await image.arrayBuffer();
    const imgbuffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}_${image.name}`;
    await writeFile(path, imgbuffer);
    const imageUrl = `/${timestamp}_${image.name}`;
    const readme=formData.get('readme');
    const readmeByteData = await readme.arrayBuffer();
    const rmebuffer = Buffer.from(readmeByteData);
    const rmepath = `./public/${timestamp}_${readme.name}`;
    await writeFile(rmepath, rmebuffer);
    const rmeUrl = `/${timestamp}_${readme.name}`;

    const blogData = {
        title: `${formData.get('title')}`,
        image: `${imageUrl}`,
        description: `${formData.get('description')}`,
        category: `${formData.get('category')}`,
        readme: `${rmeUrl}`
    };

    await BlogModels.create(blogData);
    console.log("Submitted");
    return NextResponse.json("submitted");}
    else{
        console.log("Unauthorized");
    return NextResponse.json("Go away hacker");
    }
}
