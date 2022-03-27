import React, { useState, useEffect } from "react";
import { PostForm } from "../components/Form/postForm";
// import { FriendActiveList } from "../components/List/friendActiveList";
import { NewsFeed } from "../components/List/newsfeed";
import { MyAxios } from "../utils/api";
// import { useSelector } from "react-redux";

export const Home = () => {
  // const user = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      await MyAxios.get("posts/all")
        .then((res) => {
          if (res.data) {
            setPosts(res.data.data);
          } else {
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getPosts();
  }, []);

  return (
    <>
      <div className="flex-grow border-l border-r border-solid border-gray-200 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
        <div className="w-full">
          <div className="mb-8">
            <PostForm />
          </div>
          <NewsFeed data={posts} />
        </div>
      </div>
      {/* <div className="hidden lg:inline lg:ml-[745px] xl:ml-[1050px] w-full lg:max-w-[270px] xl:max-w-[320px] px-2 fixed h-screen">
        <FriendActiveList />
      </div> */}
    </>
  );
};
