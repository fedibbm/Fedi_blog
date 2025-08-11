import { fetchPostBySlug, parseMdToHTML, fetchAllPosts } from "@/lib/data";
import Image from "next/image";
import "highlight.js/styles/atom-one-dark.css";

export async function generateStaticParams(){
	const articles = await fetchAllPosts();
	return articles.data.map((article: any) => (
		{slug: article.slug}
	))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const {slug} = await params;
    const article = await fetchPostBySlug(slug);
    const parsedHTML = await parseMdToHTML(article.data[0].Content);
    const coverImageFormats = article.data[0].Header.formats;
    const coverImageUrl = coverImageFormats.large?.url || coverImageFormats.medium?.url || coverImageFormats.small?.url ;

    return (
        <div className="w-full pb-40">
            <div className="flex flex-col items-start gap-8 w-full max-w-screen-md mx-auto prose px-4 md:px-0 pt-10">
                <h1 className="">{article.data[0].Title}</h1>
                <div className="relative w-full aspect-video ">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_CMS_HOSTNAME}${coverImageUrl}`}
                        alt="cover"
                        fill
                        className="object-cover lg: not-prose"
                        priority
                    />
                </div>
                <p>{article.data[0].excerpt}</p>
                <article
                    className="w-full  prose lg:prose-xl max-w-screen-md mx-auto antialiased"
                    dangerouslySetInnerHTML={{ __html: parsedHTML }}
                />
            </div>
        </div>
    );
}
