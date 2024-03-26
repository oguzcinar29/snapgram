import HomePosts from "./HomePosts";

export default function HomePage() {
  return (
    <div className="p-10 ml-52 max-sm:ml-0 max-sm:p-5 ">
      <div>
        <h1 className="text-3xl font-black">Home Feed</h1>
        <HomePosts />
      </div>
    </div>
  );
}
