import z from "zod"


export const signupinput = z.object ({
    email  : z.string().email(),
    password: z.string().min(6),
    name:z.string ().optional()
})

export const signininput = z.object ({
    email  : z.string().email(),
    password: z.string().min(6),
})

export const createbloginput = z.object ({
    title : z.string(),
    content: z.string(),
})

export const updatebloginput = z.object ({
    title : z.string(),
    content: z.string(),
    id: z.string(),
})

export type CreateBlogInput = z.infer<typeof createbloginput>
export type UpdateBlogInput = z.infer<typeof updatebloginput>
export type SignupInput = z.infer<typeof signupinput> 
export type SigninInput = z.infer<typeof signininput>
