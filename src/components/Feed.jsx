import { useState } from "react";
import { api } from "../api/axios";
import { useNavigate, useOutletContext } from "react-router";
import { toast } from "react-toastify";
import Modal from "./Modal";

export default function Feed(props) {
  const navigate = useNavigate();
  const { setPostToEdit } = useOutletContext();
  const { setPosts } = useOutletContext();
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    currentUser,
    user,
    id,
    date,
    likes,
    likedBy,
    comments,
    content,
    img,
  } = props;

  const [liked, setLiked] = useState(
    currentUser?.id ? likedBy?.includes(currentUser.id) : false
  );
  const [likesCount, setLikesCount] = useState(likes);

  const handleLike = async () => {
    if (!currentUser?.id) {
      toast.info("You need to log in to like posts.");
      return;
    }

    const newLikes = liked ? likesCount - 1 : likesCount + 1;

    const updatedLikedBy = liked
      ? likedBy.filter((id) => id !== currentUser.id)
      : [...likedBy, currentUser.id];

    await api.patch(`/posts/${id}`, {
      likes: newLikes,
      likedBy: updatedLikedBy,
    });

    setLikesCount(newLikes);
    setLiked(!liked);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/posts/${id}`);
      toast.success("Post deleted successfully!");

      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (error) {
      toast.error("Failed to delete post");
    } finally {
      setShowConfirm(false);
    }
  };

  return (
    <>
      {showConfirm && (
        <Modal
          message="Are you sure you want to delete this post?"
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
      <div className="card bg-white shadow mt-5 px-5 py-3">
        <div className="flex">
          <div className=" w-10 h-10 rounded-full overflow-hidden hover:cursor-pointer me-3">
            <img alt="Tailwind CSS Navbar component" src={user.profile} />
          </div>

          <div>
            <div className="flex justify-between w-100">
              <div className="flex items-center">
                <h5 className="text-white-50 me-1">{user.name}</h5>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="w-3 h-3 fill-blue-600 mt-1 "
                >
                  <path d="M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM438 209.7C427.3 201.9 412.3 204.3 404.5 215L285.1 379.2L233 327.1C223.6 317.7 208.4 317.7 199.1 327.1C189.8 336.5 189.7 351.7 199.1 361L271.1 433C276.1 438 282.9 440.5 289.9 440C296.9 439.5 303.3 435.9 307.4 430.2L443.3 243.2C451.1 232.5 448.7 217.5 438 209.7z" />
                </svg>
              </div>
              {currentUser && currentUser.id === user.id && !showConfirm && (
                <div className="dropdown dropdown-end ">
                  <div tabIndex={0} role="button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
                  </div>
                  <ul
                    tabIndex={0}
                    className=" mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-40"
                  >
                    <li>
                      <button
                        onClick={() => {
                          setPostToEdit({ id, content, img });
                          navigate("/create-post");
                        }}
                      >
                        🖊 Edit
                      </button>
                    </li>

                    <li>
                      <button
                        onClick={() => setShowConfirm(true)}
                        className="text-blue-600"
                      >
                        ❌ Delete
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="flex">
              <h6 className="text-[10px] text-neutral-500 me-2">{date} </h6>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-3 h-3 fill-neutral-500"
              >
                <path d="M55.7 199.7l30.9 30.9c6 6 14.1 9.4 22.6 9.4l21.5 0c8.5 0 16.6 3.4 22.6 9.4l29.3 29.3c6 6 9.4 14.1 9.4 22.6l0 37.5c0 8.5 3.4 16.6 9.4 22.6l13.3 13.3c6 6 9.4 14.1 9.4 22.6l0 18.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-2.7c0-8.5 3.4-16.6 9.4-22.6l45.3-45.3c6-6 9.4-14.1 9.4-22.6l0-34.7c0-17.7-14.3-32-32-32l-82.7 0c-8.5 0-16.6-3.4-22.6-9.4l-16-16c-4.2-4.2-6.6-10-6.6-16 0-12.5 10.1-22.6 22.6-22.6l34.7 0c12.5 0 22.6-10.1 22.6-22.6 0-6-2.4-11.8-6.6-16l-19.7-19.7C242 130 240 125.1 240 120s2-10 5.7-13.7l17.3-17.3c5.8-5.8 9.1-13.7 9.1-21.9 0-7.2-2.4-13.7-6.4-18.9-3.2-.1-6.4-.2-9.6-.2-95.4 0-175.7 64.2-200.3 151.7zM464 256c0-34.6-8.4-67.2-23.4-95.8-6.4 .9-12.7 3.9-17.9 9.1l-13.4 13.4c-6 6-9.4 14.1-9.4 22.6l0 34.7c0 17.7 14.3 32 32 32l24.1 0c2.5 0 5-.3 7.3-.8 .4-5 .5-10.1 .5-15.2zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z" />
              </svg>
            </div>
          </div>
        </div>
        <hr className="border border-neutral-100 my-2 " />
        <div className="whitespace-pre-wrap break-words text-gray-800 mb-2">
          {content}
        </div>

        {img && (
          <div className="mt-2 h-[300px] flex justify-center">
            <img src={img} alt="" className="h-full w-100 " />
          </div>
        )}

        {/* ------------------------num of likes and comments------------------------ */}
        <div className="flex justify-between my-2">
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              className="w-4 h-4 fill-red-600"
            >
              <path d="M305 151.1L320 171.8L335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1L576 231.7C576 343.9 436.1 474.2 363.1 529.9C350.7 539.3 335.5 544 320 544C304.5 544 289.2 539.4 276.9 529.9C203.9 474.2 64 343.9 64 231.7L64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1z" />
            </svg>
            <span className="text-[10px] text-neutral-500 ms-1">
              {likesCount}
            </span>
          </div>
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              className="w-4 h-4 fill-orange-400"
            >
              <path d="M115.9 448.9C83.3 408.6 64 358.4 64 304C64 171.5 178.6 64 320 64C461.4 64 576 171.5 576 304C576 436.5 461.4 544 320 544C283.5 544 248.8 536.8 217.4 524L101 573.9C97.3 575.5 93.5 576 89.5 576C75.4 576 64 564.6 64 550.5C64 546.2 65.1 542 67.1 538.3L115.9 448.9zM153.2 418.7C165.4 433.8 167.3 454.8 158 471.9L140 505L198.5 479.9C210.3 474.8 223.7 474.7 235.6 479.6C261.3 490.1 289.8 496 319.9 496C437.7 496 527.9 407.2 527.9 304C527.9 200.8 437.8 112 320 112C202.2 112 112 200.8 112 304C112 346.8 127.1 386.4 153.2 418.7z" />
            </svg>
            <span className="text-[10px] text-neutral-500 ms-1">
              {comments} comment
            </span>
          </div>
        </div>

        {/* ------------------------write comment section-------------------- */}

        <div>
          <hr className="border border-neutral-100 my-2 " />
          <div className="flex  items-center">
            <div className=" w-7 h-7 rounded-full overflow-hidden hover:cursor-pointer me-3">
              <img
                alt="Tailwind CSS Navbar component border"
                src={currentUser?.profile ?? "/assets/profile.jpg"}
              />
            </div>
            <input
              type="text"
              className="border-none  placeholder:text-xs "
              placeholder="write a comment"
            />
            <div className="flex items-center ms-auto">
              <button onClick={handleLike} className="btn btn-xs btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={liked ? "red" : "none"}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="red"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </button>
              <span className="text-[10px] text-neutral-500">Like</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
