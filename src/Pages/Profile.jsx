import { useOutletContext } from "react-router";
import Feed from "../components/Feed";

export default function Profile() {
  const { currentUser, posts, users } = useOutletContext();

  const userPosts = posts.filter((post) => post.userId === currentUser.id);
  const user = users.find((u) => u.id === currentUser.id);
  const totalLikes = userPosts.reduce((acc, post) => acc + post.likes, 0);

  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className=" bg-white shadow rounded-lg overflow-hidden">
        <div className="relative h-50">
          <img
            src={currentUser?.background || "/assets/profile.jpg"}
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute -bottom-10 left-6">
            <img
              src={currentUser?.profile || "/assets/profile.jpg"}
              alt="Profile"
              className="w-20 h-20 rounded-full border-4 border-white shadow"
            />
          </div>
        </div>

        <div className="pt-12 px-6 pb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {currentUser?.name}
          </h2>
          <p className="text-sm text-gray-500">{currentUser?.email}</p>

          <div className="mt-4 flex gap-6 text-sm text-gray-600">
            <div>
              <span className="font-bold text-gray-800">
                {userPosts.length}
              </span>{" "}
              Posts
            </div>
            <div>
              <span className="font-bold text-gray-800">{totalLikes}</span>{" "}
              Total Likes
            </div>
          </div>

          <div className="mt-6">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
              ✏️ Edit Profile
            </button>
          </div>
        </div>
      </div>

      {userPosts.map((post) => (
        <Feed key={post.id} {...post} currentUser={currentUser} user={user} />
      ))}
    </div>
  );
}
