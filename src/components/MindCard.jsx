import { useNavigate } from "react-router";

export default function MindCard(props) {
  const { currentUser } = props;
  const navigate = useNavigate();
  return (
    <div className="card shadow bg-white p-5">
      <div className="flex">
        <div className=" w-10 h-10 rounded-full overflow-hidden hover:cursor-pointer me-3">
          <img alt="Tailwind CSS Navbar component" src={currentUser.profile} />
        </div>
        <input
          type="text"
          readOnly
          onClick={() =>
            navigate("/create-post", {
              state: {
                currentUser: currentUser,
              },
            })
          }
          className="placeholder:text-xs ps-4 w-100 h-[35px] bg-base-200 rounded-3xl"
          placeholder={`what is on your mind,${currentUser.name}`}
        />
      </div>

      <hr className="border border-neutral-100 my-3" />

      <div className="flex items-center justify-around mb-1">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4 fill-red-600"
          >
            <path d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
          <h5 className="text-[10px] ms-2 text-neutral-600">Live Video</h5>
        </div>

        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="green"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
          >
            <path d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>

          <h5 className="text-[10px] ms-2 text-neutral-600">Photo/Video</h5>
        </div>

        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="orange"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
          >
            <path d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
          </svg>

          <h5 className="text-[10px] ms-2 text-neutral-600">
            Feeling/Activity
          </h5>
        </div>
      </div>
    </div>
  );
}
