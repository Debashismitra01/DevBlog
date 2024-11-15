import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import ConnectDB from "../../../../lib/config/db";
import BlogModels from "../../../../lib/models/BlogModel";

// Connect to the database for each request
async function connectToDatabase() {
    await ConnectDB();
}

export async function GET(request) {
    await connectToDatabase();

    const blogId = request.nextUrl.searchParams.get("id");
    try {
        if (blogId) {
            const blog = await BlogModels.findById(blogId);
            if (!blog) {
                return NextResponse.json({ error: "Blog not found" }, { status: 404 });
            }
            return NextResponse.json({ blog });
        } else {
            const blogs = await BlogModels.find(); // Fetch all blogs
            return NextResponse.json({ blogs });
        }
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
    }
}

export async function POST(request) {
    await connectToDatabase();

    const formData = await request.formData();
    const pass = formData.get("pass");

    if (pass !== process.env.SECRET_PASS) {
        console.log("Unauthorized attempt");
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const timestamp = Date.now();

        // Handle image upload
        const image = formData.get("image");
        if (!image) {
            return NextResponse.json({ error: "Image is required" }, { status: 400 });
        }
        const imageByteData = await image.arrayBuffer();
        const imageBuffer = Buffer.from(imageByteData);
        const imagePath = path.join(process.cwd(), "uploads", `${timestamp}_${image.name}`);
        await fs.writeFile(imagePath, imageBuffer);
        const imageUrl = `/uploads/${timestamp}_${image.name}`;

        // Handle readme upload
        const readme = formData.get("readme");
        if (!readme) {
            return NextResponse.json({ error: "Readme is required" }, { status: 400 });
        }
        const readmeByteData = await readme.arrayBuffer();
        const readmeBuffer = Buffer.from(readmeByteData);
        const readmePath = path.join(process.cwd(), "uploads", `${timestamp}_${readme.name}`);
        await fs.writeFile(readmePath, readmeBuffer);
        const readmeUrl = `/uploads/${timestamp}_${readme.name}`;

        // Create the blog entry
        const blogData = {
            title: formData.get("title"),
            image: imageUrl,
            description: formData.get("description"),
            category: formData.get("category"),
            readme: readmeUrl,
        };

        await BlogModels.create(blogData);
        console.log("Blog submitted successfully");
        return NextResponse.json({ message: "Blog submitted successfully" });
    } catch (error) {
        console.error("Error saving blog:", error);
        return NextResponse.json({ error: "Failed to save blog" }, { status: 500 });
    }
}
