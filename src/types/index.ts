import {z} from 'astro:content'

const imageSchema = z.object({
    url: z.string(),
    width: z.number(),
    height: z.number(),
})


const fetaredImageSchema = z.object({
    thumbnail: imageSchema,
    medium: imageSchema,
    medium_large: imageSchema,
    large: imageSchema,
    full: imageSchema,
})

export const BaseWPSchema = z.object({
    id: z.number(),
    slug: z.string(),
    title: z.object({
        rendered: z.string()
    }),
    content: z.object({
        rendered: z.string()
    }),
    featured_images: fetaredImageSchema,
    acf: z.object({
        subtitle: z.string()
    })
})



const processSchema = z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
})


export const ProcessPageSchema = BaseWPSchema.extend({
    acf: z.object({
        subtitle: z.string(),
    }).catchall(processSchema) // catchall sirve para agregar las nuevas propiedades del ACF
})

const CategorySchema = z.object({
    name: z.string(),
    slug: z.string()
})

const CategorySchemaArray = z.array(CategorySchema)


// Hacemos un esquema para los posts, omitiendo el campo acf y luego un array de posts para listar varios posts
export const PostSchema = BaseWPSchema.omit({
    acf: true
}).extend({
    date: z.string(),
    category_details: CategorySchemaArray
})



export const PostsSchema = z.array(PostSchema);


export type Post = z.infer<typeof PostSchema>;