"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import READMEViewer from "./readme";
import "./page.css";
import Header from "../../components/header/header"
import Footer from "../../components/footer/footer"

export default function Blog({ params }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const resolvedParams = React.use(params); // Unwrap the params

    useEffect(() => {
        if (resolvedParams && resolvedParams.id) {
            const fetchBlog = async () => {
                try {
                    const response = await axios.get(`/api/blog?id=${resolvedParams.id}`);
                    if (response.data.blog) {
                        setData(response.data.blog);
                    } else {
                        setData(null); // If no blog is found
                    }
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching blog:", error);
                    setLoading(false);
                }
            };
            fetchBlog();
        }
    }, [resolvedParams]); // Re-run when params change

    if (loading) {
        return (<div className="page"><div className="pageheader"><h1>Loading...</h1></div></div>);
    }

    return (
        <><Header/>
            {data ? (
                <div className="page">
                    <div className="pageheader">
                    <h1>{data.title}</h1>
                    <Image src={data.image} alt={data.title} width={400} height={300} /></div>
                    <READMEViewer readmeUrl={data.readme}/>
                </div>
            ) : (
                <h1>No blog found.</h1>
            )}
            <Footer/>
        </>
    );
}
