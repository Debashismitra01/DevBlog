import Image from "next/image";
import React from "react";
import "./header.css"

export default function Header(){
    return(
    <div className="header">
        <Image 
        src="/logo.png"
        alt="logo"
        width={130}
        height={1}
        className="Image"
        />
        <button className="button"> 
        About Me
        </button>
    </div>
    );
}
