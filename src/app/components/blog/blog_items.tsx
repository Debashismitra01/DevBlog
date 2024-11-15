import Image, { StaticImageData } from "next/image";
import React from "react";
import Link from "next/link";

// Define the type for the component's props
interface BlogItemProps {
    id: string;
    image: string | StaticImageData; // Allow both string and StaticImageData types
    category: string;
    title: string;
    description: string;
}

const BlogItem: React.FC<BlogItemProps> = ({id, image, category, title, description }) => {
    return (<Link href={`/blog/${id}`} className="blogitem">
            <Image src={image} alt="image" width={400} height={400} className="Image" />
            <div className="text">
                <div className="a"><p className="category">{category}</p></div>
                <h2 className="title">{title}</h2>
                <p className="description">{description}</p>
        </div>
        </Link>
    );
};

export default BlogItem;
