import { fetchLatestPosts } from "@/lib/data";
import LatestArticleCard from "@/ui/home/LatestArticleCard";
import Link from "next/link";

export async function generateStaticParams(){
	const allPosts = await fetchLatestPosts(1);
	const totalPages =  allPosts.meta.pagination.pageCount;
	return Array.from({length : totalPages } , ()=>0).map((e:number, index:number)=>({page : (index +1).toString()}));
}
export default async function Page({
   params 
}: {
    params: Promise<{ page : string }>;
}) {
    const { page : pageString } = await params;	
    const page = parseInt(pageString);
    const response = await fetchLatestPosts(page);
    const articles = response.data;
    const total_pages = response.meta.pagination.pageCount;
    return (
        <div className="flex flex-col items-center justify-between h-full  flex-grow">
            <div className="w-full ">
                <h1 className="pb-14 pl-4 text-4xl font-bold">
                    Latest Articles
                </h1>
                <div className="w-full flex flex-col">
                    {articles.map((article: any, index: number) => (
                        <LatestArticleCard article={article} key={index} />
                    ))}
                </div>
            </div>

            <div className="flex flex-row gap-2 items-center max-w-[99vw] overflow-x-scroll no-scrollbar text-nowrap">
                {total_pages > 1 &&
                    [<p>page : </p>].concat(
                        Array.from({ length: total_pages }, () => 1).map(
                            (_: number, index: number) => (
                                <Link
                                    href={`/articles/latest?p=${index + 1}`}
                                    key={index}
                                    className={`shrink-0 h-10 w-10 align-middle border border-black  font-semibold flex justify-center items-center ${
                                        page == index + 1
                                            ? "bg-gray-800 text-white "
                                            : "text-gray-800"
                                    }`}
                                >
                                    <p>{index + 1}</p>
                                </Link>
                            )
                        )
                    )}
            </div>
        </div>
    );
}
