import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"

export const Blogs = () => {
  return (
    <div>
        <Appbar />
    <div className="flex justify-center">
        <div className="max-w-xl">
         <BlogCard id={1} authorName="Aryan" title="My First Blog"
         content="This is the content of my first blog" 
         publishedDate="2021-01-01" 
        />
         <BlogCard id={2} authorName="Aryan" title="My First Blog"
         content="This is the content of my first blog" 
         publishedDate="2021-01-01" 
        />
         <BlogCard id={3} authorName="Aryan" title="My First Blog"
         content="This is the content of my first blog" 
         publishedDate="2021-01-01" 
        />
        </div>
    </div>
    </div>
  )
}

