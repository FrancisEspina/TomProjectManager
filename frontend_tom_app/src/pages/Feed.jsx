import React, { useEffect, useState, useRef } from "react";
import { createPost, getPosts, showImage } from "../api";
import { PaperAirplaneIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { timeAgo } from "../helpers/utils";
import { FaRegComment } from "react-icons/fa";
import { FiAirplay, FiRepeat, FiSend } from "react-icons/fi";
import { TiHeartOutline } from "react-icons/ti";
import { useSelector } from "react-redux";

const Feed = () => {
  const current_user = useSelector((state) => state.user.user);
  const user_id = current_user.id;
  const textareaRef = useRef(null);

  const [userPost, setUserPost] = useState(""); // Only store the content, not user_id here
  const [posts, setPosts] = useState([]);

  // Handling the input and adjusting the height of the textarea
  const handleInput = (event) => {
    const textarea = event.target;
    const textareaValue = event.target.value;
    textarea.style.height = "auto"; // Reset height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set to scroll height

    setUserPost(textareaValue); // Update only the content
  };

  // Handle the submission of the post
  const handleSendPost = async (event) => {
    event.preventDefault();
    if (!userPost.trim()) return; // Don't allow empty posts

    try {
      // Assuming the createPost function takes the post content and user_id
      await createPost({ content: userPost, user_id });

      // Clear the text area after the post is created
      setUserPost("");

      // Fetch the updated list of posts after sending a new one
      getAllPosts();
    } catch (error) {
      console.error("Error sending post:", error);
    }
  };

  // Fetch all posts from the API
  const getAllPosts = async () => {
    const response = await getPosts();
    setPosts(response.posts);
  };

  // Load posts on mount and whenever a new post is created
  useEffect(() => {
    getAllPosts();
  }, []); // Empty dependency array so it runs only once

  return (
    <>
      <h3 className="text-gray-500">TΩM FEED</h3>
      <h1 className="text-gray-400 mb-5 flex justify-center items-center flex-col">
        <img className="size-10" src="tomlogo.png" alt="" />
        <b>Ano't Chika?</b>
      </h1>

      <div>
        <form onSubmit={handleSendPost}>
          <div className="border px-5 pt-7 m-[auto] max-w-xl">
            <div className="flex gap-1">
              {current_user.profile_picture_url ? (
                <>
                  <img
                    className="size-12 rounded-full"
                    src={showImage(current_user.profile_picture_url)}
                  />
                </>
              ) : (
                <>
                  <UserCircleIcon className="size-12 text-gray-500" />
                </>
              )}
              <textarea
                ref={textareaRef}
                placeholder="What's the Tea? ☕"
                className="min-h-[65px] focus:outline-0 bg-transparent w-full p-3 overflow-hidden resize-none"
                onInput={handleInput}
                value={userPost} // Binding the textarea value to state
                style={{ height: "50px" }} // Initial height
              ></textarea>
            </div>

            <br />
            <hr />

            <div className="w-full m-[auto] justify-end my-2 flex">
              <button type="submit" className="bg-amber-500 flex items-center">
                <p>Post</p>
                <PaperAirplaneIcon className="size-4" />
              </button>
            </div>
          </div>
        </form>

        {/* Display posts */}
        {posts.map((post) => (
          <div
            key={post.id}
            className="border cursor-pointer hover:bg-gray-200 px-5 pt-7 m-[auto] max-w-xl"
          >
            <div className="flex gap-1 items-center">
              {true ? (
                <>
                  <img
                    className="size-12 rounded-full"
                    src={showImage(post.user.profile_picture_url)}
                    alt=""
                  />
                </>
              ) : (
                <>
                  <UserCircleIcon className="size-12 text-gray-500" />
                </>
              )}
              <div>
                <h5>
                  <b>
                    {post.user.first_name} {post.user.last_name}
                  </b>
                </h5>
                <h6>{post.user.username}</h6>
              </div>

              <div className="ml-auto flex items-center">
                <h5>{timeAgo(post.created_at)}</h5>
              </div>
            </div>

            <div className="p-3">
              <h5>{post.content}</h5>
            </div>
            <br />
            <hr />

            <div className="w-72 m-[auto] justify-between my-2 flex">
              <button className="bg-transparent hover:bg-gray-300 border">
                <FaRegComment className="size-4" />
              </button>

              <button className="bg-transparent hover:bg-gray-300 border">
                <FiRepeat className="size-4" />
              </button>
              <button className="bg-transparent hover:bg-gray-300 border">
                <TiHeartOutline className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Feed;
