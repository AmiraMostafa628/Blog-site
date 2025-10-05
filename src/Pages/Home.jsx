import Feed from "../components/Feed";
import MindCard from "../components/MindCard";
import { useOutletContext } from "react-router";

export default function Home() {
  const { posts, currentUser, findPostAuthor } = useOutletContext();
  return (
    <div className="bg-base-200">
      <div className=" w-[500px] m-auto mt-5">
        {currentUser && <MindCard currentUser={currentUser} />}
        {posts.map((post) => (
          <Feed
            key={post.id}
            currentUser={currentUser}
            user={findPostAuthor(post.userId)}
            id={post.id}
            date={post.date}
            likes={post.likes}
            likedBy={post.likedBy}
            comments={post.comments}
            content={post.content}
            img={post.img}
          />
        ))}
      </div>
    </div>
  );
}
