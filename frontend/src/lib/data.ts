import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";

const CMS_HOSTNAME = process.env.NEXT_PUBLIC_CMS_HOSTNAME!;
const CMS_AUTH_KEY_READONLY = process.env.CMS_AUTH_KEY_READONLY!;

if (!CMS_HOSTNAME || !CMS_AUTH_KEY_READONLY) {
    throw new Error(
        "Missing environment variables for CMS_HOSTNAME or CMS_AUTH_KEY_READONLY"
    );
}

export async function parseMdToHTML(md: string) {
    const parsedHTML = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeSanitize)
        .use(rehypeHighlight)
        .use(rehypeStringify)
        .process(md);
    const strigifiedHTML = parsedHTML.toString();
    return strigifiedHTML;
}
export async function fetchAllPosts() {
    const res = await fetch(`${CMS_HOSTNAME}/api/posts`, {
        method: "GET",
        headers: {
            Authorization: CMS_AUTH_KEY_READONLY,
        },
    });
    if (!res.ok) {
        throw new Error(
            `Failed to fetch posts : ${res.status} ${res.statusText}`
        );
    }
    return await res.json();
}

export async function fetchOnePost(id: string) {
    const res = await fetch(`${CMS_HOSTNAME}/api/posts/${id}`, {
        method: "GET",
        headers: {
            Authorization: CMS_AUTH_KEY_READONLY,
        },
    });
    if (!res.ok) {
        throw new Error(
            `Failed to fetch post with id (${id}) : ${res.status} ${res.statusText}`
        );
    }
    return await res.json();
}

export async function fetchLatestPosts(page :number) {
    const response = await fetch(
        `${CMS_HOSTNAME}/api/posts?sort=createdAt:desc&pagination[page]=${page}&pagination[pageSize]=8&fields=Title,createdAt,excerpt,slug&populate[tags][fields][0]=name&populate[Header][fields][0]=formats`,
        {
            method: "GET",
            headers: {
                Authorization: CMS_AUTH_KEY_READONLY,
            },
        }
    );
    if (!response.ok) {
        const errorBody = await response.text()
        throw new Error(
            `Failed to fetch latest articles :${response.status} ${response.statusText} - ${errorBody}`
        );
    }
    return await response.json();
}


export async function fetchLatestPostsHomePage() {
    const response = await fetch(
        `${CMS_HOSTNAME}/api/posts?sort=createdAt:desc&pagination[limit]=5&fields=Title,createdAt,excerpt,slug&populate[tags][fields][0]=name&populate[Header][fields][0]=formats`,
        {
            method: "GET",
            headers: {
                Authorization: CMS_AUTH_KEY_READONLY,
            },
        }
    );
    if (!response.ok) {
        throw new Error(
            `Failed to fetch latest posts :${response.status} ${response.statusText}`
        );
    }
    return await response.json();
}

export async function fetchPostBySlug(slug: string) {
    const response = await fetch(
        `${CMS_HOSTNAME}/api/posts?filters[slug][$eq]=${slug}&populate=Header`,
        {
            method: "GET",
            headers: {
                Authorization: CMS_AUTH_KEY_READONLY,
            },
        }
    );

    if (!response.ok) {
        throw new Error(
            `failed to fetch post by slug (${slug}) : ${response.status} ${response.statusText}`
        );
    }

    return await response.json();
}
