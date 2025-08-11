import { fetchLatestPostsHomePage } from "@/lib/data";
import FeaturedPostsSectionHome from "@/ui/home/FeaturedArticlesSection";
import LatestPostsSectionHome from "@/ui/home/LatestArticlesSection";

export default async function Page() {
    const latestPosts = await fetchLatestPostsHomePage();
    const featuredPosts = await fetchLatestPostsHomePage();
    
    return( <div className="space-y-10">
        <FeaturedPostsSectionHome articles={latestPosts} />
        <LatestPostsSectionHome articles={featuredPosts} />
    </div>)
}
