"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });

    setBookmarks(data || []);
  };

  const addBookmark = async () => {
    if (!url.trim()) return;

    const { data } = await supabase.auth.getUser();
    if (!data.user) return;

    await supabase.from("bookmarks").insert({
      url: url.trim(),
      user_id: data.user.id,
    });

    setUrl("");
    fetchBookmarks();

    await supabase.channel("bookmark-sync").send({
      type: "broadcast",
      event: "updated",
      payload: {},
    });
  };

  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);
    fetchBookmarks();

    await supabase.channel("bookmark-sync").send({
      type: "broadcast",
      event: "updated",
      payload: {},
    });
  };

  useEffect(() => {
    let channel: any;

    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push("/login");
        return;
      }

      await fetchBookmarks();
      setLoading(false);

      channel = supabase
        .channel("bookmark-sync")
        .on("broadcast", { event: "updated" }, () => {
          fetchBookmarks();
        })
        .subscribe();
    };

    init();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, [router]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-gray-400">
        Loading bookmarks...
      </div>
    );

  return (
    <div className="min-h-screen bg-black flex justify-center p-6 text-white">
      <div className="w-full max-w-2xl bg-[#111] border border-gray-700 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">My Bookmarks</h1>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              router.push("/login");
            }}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium"
          >
            Logout
          </button>
        </div>

        <div className="flex gap-3 mb-6">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 bg-black border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addBookmark}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-md font-medium"
          >
            Add
          </button>
        </div>

        {bookmarks.length === 0 ? (
          <p className="text-center text-gray-500 text-sm">
            No bookmarks yet
          </p>
        ) : (
          <ul className="space-y-3">
            {bookmarks.map((b) => (
              <li
                key={b.id}
                className="flex justify-between items-center border border-gray-700 rounded-md px-4 py-3 bg-[#0b0b0b]"
              >
                <a
                  href={b.url}
                  target="_blank"
                  className="text-blue-400 underline break-all text-sm"
                >
                  {b.url}
                </a>
                <button
                  onClick={() => deleteBookmark(b.id)}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
