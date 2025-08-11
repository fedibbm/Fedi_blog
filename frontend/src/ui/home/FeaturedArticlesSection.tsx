import FeaturedArticleCard from "./FeaturedArticleCard";
import React from "react";

export default function FeaturedArticlesSection({
    articles,
}: {
    articles: any;
}) {
    return (
        <div className="flex flex-col  gap-10 px-4  max-w-screen overflow-x-scroll no-scrollbar relative lg:h-140 select-text ">
            <h1 className=" self-start font-bold  text-4xl font-sans underline-offset-10 text-gray-800">
                Featured articles
            </h1>
            <div className="scroll-container flex flex-col lg:flex-row gap-8 lg:gap-4 snap-x snap-mandatory">
                {articles.data.map((article: any, index: number) => (
                        <FeaturedArticleCard article={article} key={index} className="featured-article-card" />
                ))}
                <div className="shrink-0 w-20 h-full"></div>
                <div className="pointer-events-none fixed top-0 right-0 h-full w-12 bg-gradient-to-l from-white via-white via-20% to-transparent  hidden lg:block"></div>
            </div>
        </div>
    );
}
