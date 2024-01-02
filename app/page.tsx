"use client";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { signIn, signOut, useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

type Post = {
  id: string;
  name: string;
  createdById: string;
  createdAt: string;
  updatedAt: string;
};

export default function Home() {
  const { data: session } = useSession();
  const [data, setData] = useState({
    title: "",
    id: session?.user.id,
  });
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    await axios
      .get("/api/post")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await axios
      .post("/api/post", data)
      .then(() => {
        toast.success("Post created");
      })
      .catch((e) => {
        toast.error("Something went wrong");
      });
  };
  if (session) {
    return (
      <div className="grid place-items-center h-[600px]">
        <div className="grid place-items-center">
          Signed in as {session.user?.name} <br />
          <Button onClick={() => signOut()}>Sign out</Button>
        </div>
        <form onSubmit={handleSubmit} className="">
          <div className="flex flex-col gap-4 w-[400px]">
            <div>
              <label htmlFor="title">
                <textarea
                  name="title"
                  id="title"
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                  value={data.title}
                  className="resize-none w-[400px] h-[150px] border-2 border-black p-2 rounded-md"
                  placeholder="What's on your mind?"
                ></textarea>
              </label>
            </div>
            <div>
              <Button type="submit" className="w-full">
                Post
              </Button>
            </div>
          </div>
        </form>
        <div>
          <ul>
            {posts.length > 0 ? (
              posts.map((post) => (
                <li key={post.id}>
                  {post.name} - {post.createdAt}
                </li>
              ))
            ) : (
              <p>No posts yet</p>
            )}
          </ul>
        </div>
      </div>
    );
  }
  return (
    <>
      <p>Not signed in</p>
      <div className="flex gap-4 mx-4">
        <Button className="flex gap-2" onClick={() => signIn("google")}>
          Sign in with <FaGoogle />
        </Button>
      </div>
    </>
  );
}
