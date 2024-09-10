import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import {useBlogs } from "../hooks";

export const Blogs = () => {

    const {loading, blogs} = useBlogs();

    if(loading){
        return <div>Loading...</div>
    }

    return (
        <div>
            <Appbar />
        <div className="flex justify-center">
            <div className="max-w-xl">
                {blogs.map((blog : any) => (
                    <BlogCard key={blog.id} id={blog.id} authorName={blog.author.name || "Anonymous"} title={blog.title} content={blog.content} 
                    publishedDate={blog.publishedDate} />
                ))}
            </div>
        </div>
        </div>
    )
}

