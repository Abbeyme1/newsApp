import React, { useContext, useEffect, useMemo } from "react";
import { useDeferredValue } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../components/Post";
import { SearchContext } from "../helper/Context";
import Style from "./Home.module.css";
import { fetchPosts } from "../redux/features/posts/postsSlice";

const Home = () => {
  const { posts } = useSelector((state) => state.posts);
  const [search] = useContext(SearchContext);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "News - Home";
    dispatch(fetchPosts());
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
