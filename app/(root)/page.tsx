import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import { sanityFetch , SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
export default async function Home({searchParams}: {
  searchParams: Promise<{query?: string}>;
}) {
  const query = (await searchParams).query;
  const params = {search:query || null};
 const {data:posts} = await sanityFetch({query:STARTUPS_QUERY , params});

  return (
    <>
    <section className="pink_container">

    <h1 className="heading">Daniam</h1>
    <p className="sub-heading !max-w-3xl">
      Submit Ideas , Startups and more
    </p>
    <SearchForm query={query}/>
    </section>
    <section className="section_container">
      <p className="text-30-semibold">
{query ? `Search results for ${query}` : "All startups"}
      </p>
      <ul className="mt-7 card_grid">
{posts?.length > 0 ? (
  posts.map((post : StartupCardType, index:number) => (
<StartupCard key={post?._id} post={post}/>
  ))
) : (
  <p className="no-results"> No results </p>
  )}
      </ul>
      </section>

      <SanityLive />
    </>
  );
}
