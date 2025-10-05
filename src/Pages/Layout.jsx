import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import { api } from "../api/axios";
import { sortPosts } from "../utils/sortPosts";

export default function Layout() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [postToEdit, setPostToEdit] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchUsers = async () => {
      const { data: usersData } = await api.get("/users");
      setUsers(usersData);
    };

    const fetchPosts = async () => {
      const { data: postsData } = await api.get("/posts");
      setPosts(sortPosts(postsData));
    };

    fetchUsers();
    fetchPosts();
  }, []);

  const findPostAuthor = (postUserId) => {
    return users.find((user) => user.id === postUserId);
  };

  return (
    <div className="bg-base-200">
      <NavBar currentUser={currentUser} />
      <div className="p-4">
        <Outlet
          context={{
            users,
            posts,
            setPosts,
            currentUser,
            findPostAuthor,
            postToEdit,
            setPostToEdit,
          }}
        />
      </div>
    </div>
  );
}
