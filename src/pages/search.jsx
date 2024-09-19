import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/gif-context";
import FilterGifs from "../components/FilterGifs";
import Gif from "../components/Gif";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);

  const { gf, filter } = GifState();

  const { query } = useParams();

  const fetchSearchResults = async () => {
    const { data } = await gf.search(query, {
      sort: "relevant",
      lang: "en",
      type: filter,
      limit: 20,
    });
    setSearchResults(data);
  };

  useEffect(() => {
    fetchSearchResults();
  }, [filter]);

  return (
    <div className="my-4">
      <h2 className="text-5xl pb-3 font-extrabold">{query}</h2>

      {/* Filter Gifs toggle bar */}
      <FilterGifs alignLeft={true} />

      {searchResults.length > 0 ? (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
          {searchResults.map((gif) => (
            <Gif gif={gif} key={gif.id} />
          ))}
        </div>
      ) : (
        <span>
          No Gifs found for a {query}. Try searching for Stickers instead?
        </span>
      )}
    </div>
  );
};

export default Search;
