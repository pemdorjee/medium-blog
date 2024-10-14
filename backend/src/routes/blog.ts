import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify ,decode} from "hono/jwt";
import { CreateBlogInput, createbloginput, updatebloginput } from "@pemdorjee11/medium-common/dist";

export const blogRouter= new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_SECRET:string
    },
    Variables:{
      user:string
    }
}>();

blogRouter.use('/*', async (c, next) => {
    const token=  c.req.header("authorization") || "";
   
     const response = await  verify (token, c.env.JWT_SECRET)
   
     if (response.id){
      c.set("user", response.id)
       await next()  
     }else {
       c.status(403)
       return c.json({error: "unauthorized"})
     }
     
   }) 
   
   // zod validation and password hashing
   

blogRouter.post('/', async (c) => {
     const body= await c.req.json();
     const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
     }).$extends(withAccelerate())
     const {success} = createbloginput.safeParse(body);
     if(!success){
       c.status(411);
       return c.json({
         message: "Inputs not correct "
       })
     }

     const userid= c.get('user')

       const blog =  await prisma.post.create ({
            data:{
                title: body.title,
                content : body.content,
                authorId: userid,

            }
        })
     return c.json({
        id: blog.id
     })
   })
   
blogRouter.put('/',async(c)=>{
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const {success} = updatebloginput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message: "Inputs not correct "
    })
  }
  
  const post = await prisma.post.update({
    where:{
      id:body.id
    },
    data:{
      title:body.title,
      content: body.content
    }
  })
  return c.json({
     
    post:post
  })

})
// pagination
blogRouter.get('/bulk', async(c) => {
  const prisma = new PrismaClient({
   datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())


  const posts = await prisma.post.findMany({
    select: {
          content: true,
          title: true,
          id: true,
          author: {
            select: {
              name: true
            }
          }
    }
  }); 
  return c.json({
   posts
  })
   })

blogRouter.get('/:id', async(c) => {
    const ID=  c.req.param("id");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
      const blog = await prisma.post.findUnique({
        where :{
          id:ID
        }, select: {
          id: true,
          title: true,
          content: true,
          author : {
                  select:{
                    name: true 
                  }
          }
        }
  
     })
  
     return c.json({
      blog 
     })
    }catch(e){
      console.log(e)
      c.status(411)
        return c.text("invalid")
    }
    
    
   })

   
   
   


