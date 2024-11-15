"use client"
import Header from "./components/header/header";
import BlogList from "./components/blog/blog_list";
import Footer from "./components/footer/footer";
import SubscribeForm from "./components/subscribe/subscribe";

export default function Home() {
  return (
    <div className="page">
    <Header/>

    <BlogList/>
    <SubscribeForm/>
    <Footer/>
    </div>
  );
}
