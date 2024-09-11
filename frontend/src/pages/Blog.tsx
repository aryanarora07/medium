import { Appbar } from "../components/Appbar";
import { useBlog } from "../hooks";

export const Blog = () =>{
    const {loading, blog} = useBlog();

    if(loading){
        return <div>Loading...</div>
    }

    return <div>
        <Appbar/>
        <div className="flex justify-center">
            <div className="max-w-xl">
                <div className="text-xl font-semibold pt-2">
                    {blog?.title}
                </div>
                <div className="text-md font-thin">
                    {blog?.content}
                </div>
            </div>
        </div>
    </div>
}