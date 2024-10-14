import { BlogSkeleton } from "../components/BlogSkeleton";
import { BlogCard } from "../components/BlogsCard"
import { Appbar } from "../components/appbar"
import { useBlogs } from "../hooks"

export const  Blogs =() => {
    const {loading, blogs} = useBlogs();
    if (loading){
        return <div>
             <div  className="flex justify-center pt-20">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    } 
    return <div>
   
    <Appbar/>

    <div className="flex justify-center pt-4">
    <div className="">
        {blogs.map(blog => <BlogCard
                id={blog.id}
                authorName={blog.author.name || "anonymous"}
                title={blog.title}
                content={blog.content}
                publishedDate={"24 May 2024"}

        />)}
           </div>
    </div>
    </div>
}