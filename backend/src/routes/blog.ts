import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from "@aryanarora/medium-common";

export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
        JWT_SECRET: string,
	},
    Variables: {
        userId: string
    }
}>();



blogRouter.use('/*', async (c, next)=>{
    const authHeader = c.req.header("authorization") || "";

    const user  = await verify(authHeader, c.env.JWT_SECRET);

    try {
        if(user){
            c.set("userId", user.id as string)
            await next();
    
        }
        else{
            c.status(403);
            c.json({
                message: "you are not logged in"
            })
        }
        
    } catch (error) {
        c.status(403);
        c.json({
            message: "You are not logged in"
        })
    }
})

blogRouter.post('/', async (c) => {

	const body = await c.req.json();
    const {success} = createBlogInput.safeParse(body);

    if(!success){
        c.status(411);
        return c.json({
            message: "Invalid Inputs"
        })
    }

	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

    const userId = c.get("userId");

	const post = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: userId
		}
	});
	return c.json({
		id: post.id
	});
})

// add pagination here
blogRouter.get('/bulk', async (c)=>{

    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

    const posts = await prisma.post.findMany();

    return c.json({
        posts
    })
})


blogRouter.get('/:id', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL	,
	}).$extends(withAccelerate());

	const id = c.req.param("id");

    try{
        const post = await prisma.post.findUnique({
            where: {
                id: id
            },
        });

        return c.json({
            post
        })
    }

    catch(e){
        c.status(411);
        return c.json({
            message: "Error while fetching blog post"
        })
    }
})
  
blogRouter.put('/', async (c) => {  



	const body = await c.req.json();
    const {success} = updateBlogInput.safeParse(body);

    if(!success){
        c.status(411);
        return c.json({
            message: "Invalid Inputs"
        })
    }

	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const post = await prisma.post.update({
        where: {
            id: body.id
        },
		data: {
			title: body.title,
			content: body.content,
		}
	});

	return c.json({
		id: post.id
	});
})


