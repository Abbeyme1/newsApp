import React, { useContext, useEffect, useMemo } from "react";
import { useDeferredValue } from "react";
import Post from "../components/Post";
import { PostsContext, SearchContext } from "../helper/Context";
import Style from "./Home.module.css";

const Home = () => {
  const [posts] = useContext(PostsContext);
  const [search] = useContext(SearchContext);

  useEffect(() => {
    document.title = "News - Home";
  }, []);

  const defferedSearch = useDeferredValue(search);

  const getPosts = useMemo(() => {
    return Object.values(posts).filter((post) =>
      post.title.toLowerCase().match(defferedSearch),
    );
  }, [posts, defferedSearch]);

  return (
    <div className={Style.home}>
      {getPosts.length > 0 ? (
        getPosts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <h2>No Posts Available</h2>
      )}
    </div>
  );
};

export default Home;
