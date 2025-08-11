import Image from "next/image";
import Link from "next/link";
import { IoPricetagsSharp } from "react-icons/io5";

export default function LatestArticleCard({
    article,
    className,
}: {
    article: any;
    className?: string;
}) {
    return (
        <div className={className}>
            <div className="lg:h-40   lg:flex-row flex flex-row-reverse row gap-8 items-center lg:items-stretch  pb-4 border-b  border-gray-200  overflow-hidden  transition-transform  hover:scale-101  will-change-transform relative">
                <div className="relative aspect-video lg:aspect-square h-16 w-16 lg:h-auto lg:w-auto  select-none">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_CMS_HOSTNAME}${article.Header.formats.medium.url}`}
                        alt="cover"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="flex flex-col gap-2 py-4 flex-1 min-w-0">
                    {" "}
                    {/*this */}
                    <Link href={`/article/${article.slug}`}>
                        <h1 className="text-lg font-bold hover:underline cursor-pointer text-wrap">
                            {article.Title}
                        </h1>
                    </Link>
                    <div className="px-4 flex gap-2 items-center justify-start overflow-x-scroll no-scrollbar select-none shrink-0 ">
                        <IoPricetagsSharp className="text-violet-600/80 text-lg block  shrink-0" />
                        :
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
                    <p className="line-clamp-3 text-gray-600 text-sm lg:text-base">
                        {article.excerpt}
                    </p>
                </div>
            </div>
        </div>
    );
}
