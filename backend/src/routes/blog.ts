import { Hono } from "hono";



export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
        JWT_SECRET: string,
	}
}>();

blogRouter.get('/ ', (c) => {
    return c.text('Hello Hono!')
})
  
blogRouter.post('/', (c) => {
    return c.text('Hello Hono!')
})
  
blogRouter.put('/', (c) => {
    return c.text('Hello Hono!')
})

blogRouter.get('/bulk', (c)=>{
    return c.text('Hello Moto')
})