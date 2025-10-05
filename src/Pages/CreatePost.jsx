import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { getFormattedDate } from "../utils/dateFormate";
import { useNavigate, useOutletContext } from "react-router";
import { toast } from "react-toastify";
import { sortPosts } from "../utils/sortPosts";

export default function CreatePost() {
  const { posts, setPosts, currentUser, postToEdit, setPostToEdit } =
    useOutletContext();

  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (postToEdit) {
      setContent(postToEdit.content || "");
      setImage(postToEdit.img || null);
    }
  }, [postToEdit]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
  };

  const uploadToImageBB = async (file) => {
    const apiKey = "dd63f584090dbe38f42f369b200d17a2";
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();
    if (result.success) {
      return result.data.url;
    } else {
      throw new Error("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEditing = Boolean(postToEdit?.id);

    try {
      const formattedDate = getFormattedDate();
      let imageUrl = postToEdit?.img || null;

      if (image instanceof File) {
        imageUrl = await uploadToImageBB(image);
      }

      const postData = {
        userId: Number(currentUser.id),
        content,
        img: imageUrl,
        date: formattedDate,
      };

      if (isEditing) {
        await api.patch(`/posts/${postToEdit.id}`, postData);
        setPosts((prev) =>
          prev.map((post) =>
            post.id === postToEdit.id ? { ...post, ...postData } : post
          )
        );

        toast.success("Post updated successfully!");
        setPostToEdit(null);
      } else {
        const { data: newPost } = await api.post("/posts", {
          ...postData,
          likes: 0,
          comments: 0,
          likedBy: [],
        });
        const updatedPosts = sortPosts([...posts, newPost]);
        setPosts(updatedPosts);

        toast.success("Post created successfully!");
      }

      setTimeout(() => navigate("/home"), 1000);
    } catch (error) {
      console.error("Error during post submission:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white shadow rounded-lg p-6">
      <div className="flex items-center mb-4">
        <img
          src={currentUser.profile}
          alt="User"
          className="w-10 h-10 rounded-full me-3"
        />
        <h2 className="text-sm font-semibold text-gray-700">
          {postToEdit
            ? "Edit your post"
            : `What's on your mind, ${currentUser.name}?`}
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write something..."
          className="w-full h-32 p-3 border border-gray-200 rounded resize-none focus:outline-none focus:ring focus:ring-blue-200"
        />

        <div className="mt-4 flex items-center justify-between">
          <label className="flex items-center cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <span className="text-sm text-blue-600 hover:underline">
              + Add Photo
            </span>
          </label>

          {(image || postToEdit?.img) && (
            <div className="mt-4 relative">
              <img
                src={
                  image instanceof File
                    ? URL.createObjectURL(image)
                    : postToEdit?.img
                }
                alt="Preview"
                className="max-h-30 rounded border"
              />
              <button
                type="button"
                onClick={() => {
                  setImage(null);
                }}
                className="absolute -top-2 -right-2 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="red"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="white"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>
            </div>
          )}

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
          >
            {postToEdit ? "Update" : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
