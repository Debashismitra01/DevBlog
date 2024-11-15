"use client";
import React, { useState, useEffect } from "react";
import BlogItem from "./blog_items";
import axios from "axios";
import "./blog.css";

interface Blog {
    _id: string;
    image: string;
    category: string;
    title: string;
    description: string;
}

export default function BlogList() {
    const [menu, setMenu] = useState<string>("All");
    const [blogs, setBlogs] = useState<Blog[]>([]);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get<{ blogs: Blog[] }>('/api/blog'); // Define the type of response data
            setBlogs(response.data.blogs); // Assuming the response has a 'blogs' array
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    useEffect(() => {
        fetchBlogs(); // Fetch blogs when the component loads
    }, []);

    return (
        <div className="bloglist">
            <div className="list">
                <button onClick={() => setMenu('All')} className={menu === "All" ? 'select' : 'unselect'}>All</button>
                <button onClick={() => setMenu('Technology')} className={menu === 'Technology' ? 'select' : 'unselect'}>Technology</button>
<button onClick={() => setMenu('AI/ML')} className={menu === 'AI/ML' ? 'select' : 'unselect'}>AI/ML</button>
<button onClick={() => setMenu('Security')} className={menu === 'Security' ? 'select' : 'unselect'}>Security</button>
<button onClick={() => setMenu('Web3')} className={menu === 'Web3' ? 'select' : 'unselect'}>Web3</button>
<button onClick={() => setMenu('Infrastructure')} className={menu === 'Infrastructure' ? 'select' : 'unselect'}>Infrastructure</button>

            </div>
            <div className="item">
                {blogs
                    .filter((item) => menu === "All" ? true : item.category === menu)
                    .map((item) => (
                        <BlogItem 
                            key={item._id} 
                            id={item._id} 
                            image={item.image} 
                            category={item.category} 
                            title={item.title} 
                            description={item.description} 
                        />
                    ))}
            </div>
        </div>
    );
}
