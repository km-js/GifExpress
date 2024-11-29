import { useEffect, useState } from "react";
import Gif from "../components/Gif";
import { GifState } from "../context/gif-context";

const Favorites = () => {
  const { favorites, gf } = GifState();
  const [favGif, setFavGif] = useState([]);
  // console.log(favorites);
  //console.log("favgif:", favGif);

  useEffect(() => {
    const fetchGif = () => {
      favorites.map(async (favorite) => {
        const { data } = await gf.gif(favorite);

        setFavGif((prevFavGif) => {
          if (!prevFavGif.find((gif) => gif.id === data.id)) {
            return [...prevFavGif, data];
          }
          return prevFavGif;
        });
      });
    };
    fetchGif();
  }, []);

  return (
    <div>
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 p-2">
        {favGif.map((gif) => {
          return <Gif gif={gif} key={gif.title} />;
        })}
      </div>
    </div>
  );
};

export default Favorites;
