import { Blog } from "../hooks"
import { Avatar } from "./BlogsCard"
import { Appbar } from "./appbar"

export const Fullblog  =({blog}: {blog: Blog}) => {
   return <div>
  <Appbar/>
   <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 pt-10 w-full max-w-screen-xl">
            <div className="col-span-8 ">                
                    <div className="text-3xl font-extrabold">
                            {blog.title}
                    </div>
                    <div className="text-slate-500  pt-2">
                        Posted on 2nd Dec 2024
                    </div>
                    <div className="text-slate-900 text-lg pt-2">
                        {blog.content}
                    </div>
            </div>
            <div  className="col-span-4 pl-10">                
                    <div className="text-slate-600 text-lg ">
                        Author
                        </div>
                    <div className="flex w-full">
                    <div className="pr-4 flex flex-col justify-center">
                    <Avatar size= "big" name={blog.author.name || "anonymous"} />
                    </div>
                        <div>
                            <div className="text-xl font-bold">
                        {blog.author.name || "anaonymous "}
                        </div>
                    <div className="pt-2 text-slate-500">
                        Random catch phrase about the authors ability 
                        to grab the user's attentionn
                        </div>
                        </div>
                    </div>
            </div>
            
        </div>
        </div>
   </div>
}