import React, { useEffect } from "react";
import LatestArticleCard from "./LatestArticleCard";
import Link from "next/link";

export default function LatestPostsSectionHome({
    articles,
}: {
    articles: any;
}) {
    const MAX_ARTICLES_MOBILE = 3;
    const MAX_ARTICLES_DESKTOP = 7;
    return (
        <div className="flex flex-col mx-auto  lg:mx-0 items-center gap-10 px-4 lg:px-10 w-[min(1000px,95vw)] ">
            <div className="flex self-start w-full justify-between md:justify-start md:gap-20 items-center  max-w-screen">
                <h1 className=" self-start font-bold  md:text-4xl text-2xl font-sans underline-offset-10 text-gray-800">
                    Latest articles
                </h1>
                <Link
                    href="/articles/latest/1"
                    className="underline text-sm font-semibold text-gray-600 hover:text-gray-800 font-sans underline-offset-4 text-nowrap block md:text-lg md:block md:pt-1"
                >
                    see more
                </Link>
            </div>
            <div className="flex flex-col gap-4 w-full ">
                {articles.data.map((article: any, index: number) => (
                    <LatestArticleCard
                        key={index}
                        article={article}
                        className={
                            index < MAX_ARTICLES_MOBILE
                                ? "block"
                                : index < MAX_ARTICLES_DESKTOP
                                ? "hidden lg:block"
                                : "hidden lg:hidden"
                        }
                    />
                ))}
            </div>
        </div>
    );
}
