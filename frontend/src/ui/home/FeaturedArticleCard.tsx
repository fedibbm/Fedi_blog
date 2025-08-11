"use client"
import Image from "next/image";
import Link from "next/link";
import { IoPricetagsSharp } from "react-icons/io5";

export default function FeaturedArticleCard({ article, className }: { article: any , className? : string}) {
    return (
        <div className={className}>
            <div className="md:snap-center md:h-120 md:w-100 border md:border-0 shrink-0 p-1 flex flex-col gap-6 rounded-xs items-stretch  border-gray-200  overflow-hidden  transition-transform  hover:scale-101 will-change-transform  no-scrollbar ">
                <div className="relative aspect-video select-none">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_CMS_HOSTNAME}${article.Header.formats.medium.url}`}
                        alt="cover"
                        fill
                        className="object-cover md:rounded-4xl"
                    />
                </div>
                <div className="px-4 flex gap-2 items-center justify-start flex-nowrap overflow-x-scroll no-scrollbar w-full shrink-0 select-none">
                    <IoPricetagsSharp className="text-violet-600/80 text-lg block  shrink-0" />:
                    {article.tags &&
                        article.tags.map(
                            (tag: any, index: number) =>
                                tag.name && (
                                    <Link
                                        key={index}
                                        href={`/tags/${tag.name}`}
                                        className="px-2 py-1 bg-violet-800/35 text-violet-900 block text-nowrap text-xs"
                                        target="blank"
                                    >
                                        {tag.name}
                                    </Link>
                                )
                        )}
                </div>
                <div className="flex flex-col gap-2 px-4">
                    <Link href={`/article/${article.slug}`}>
                        <h1 className="text-lg  font-bold py-1 cursor-pointer hover:underline select-text">
                            {article.Title}
                        </h1>
                    </Link>
                    <p className="line-clamp-3 text-gray-600 text-sm md:text-base ">
                        {article.excerpt}
                    </p>
                </div>
            </div>
        </div>
    );
}
