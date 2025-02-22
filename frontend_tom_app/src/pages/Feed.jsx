import React, { useEffect, useState, useRef } from "react";
import {
  createPost,
  getPosts,
  showImage,
  createHearts,
  getHearts,
  deleteHearts,
} from "../api";
import { PaperAirplaneIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { current_user, timeAgo } from "../helpers/utils";
import { FaRegComment } from "react-icons/fa";
import { FiAirplay, FiRepeat, FiSend } from "react-icons/fi";
import { TiHeart, TiHeartOutline } from "react-icons/ti";

const Feed = () => {
  const user = current_user();
  const user_id = user.id;
  const textareaRef = useRef(null);
  const [heartAdded, setHeartAdded] = useState(false);
  const [userPost, setUserPost] = useState(""); // Only store the content, not user_id here
  const [posts, setPosts] = useState([]);
  const [hearts, setHearts] = useState([]);

  const handleHeartClick = async (post) => {
    let included = hearts.map((heart) => heart.post_id).includes(post.id);

    if (!included) {
      try {
        const response = await createHearts({
          post_id: post.id,
          user_id: user_id,
        });
        console.log(response);
        setHeartAdded((prev) => !prev);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await deleteHearts({
          post_id: post.id,
          user_id: user_id,
        });
        // console.log(response);
        setHeartAdded((prev) => !prev);
      } catch (error) {
        console.log(error);
      }
    }
  };

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

  const getUserHearts = async (user_id) => {
    const response = await getHearts(user_id);
    setHearts(response.hearts);
  };

  // Load posts on mount and whenever a new post is created
  useEffect(() => {
    const fetchData = async () => {
      await getAllPosts();
      await getUserHearts(user_id);
    };

    fetchData();
  }, [heartAdded]); // Runs when `heartAdded` changes

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
              {user.profile_picture_url ? (
                <>
                  <img
                    className="size-12 rounded-full"
                    src={showImage(user.profile_picture_url)}
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
              <button
                onClick={() => {
                  handleHeartClick(post);
                }}
                className="bg-transparent  hover:bg-gray-300 border group"
              >
                <div className="group-hover:transition">
                  {!hearts.map((heart) => heart.post_id).includes(post.id) ? (
                    <TiHeartOutline color="" className="size-4" />
                  ) : (
                    <TiHeart color="red" className="size-4" />
                  )}
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Feed;
