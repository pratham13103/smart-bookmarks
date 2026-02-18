"use client";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#1a1a1a,transparent_60%),radial-gradient(circle_at_70%_70%,#0f172a,transparent_60%)] animate-[pulse_10s_ease-in-out_infinite]" />

      <div
        className="
          relative z-10 p-[2px] rounded-xl
          bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500
          bg-[length:200%_200%]
          animate-[gradientMove_6s_linear_infinite]
        "
      >
        <div className="w-full max-w-sm bg-[#0b0b0b] rounded-xl p-8 border border-gray-700">
          <h1 className="text-2xl font-semibold text-center mb-6">
            Smart Bookmark
          </h1>

          <button
            onClick={login}
            className="
              w-full flex items-center justify-center gap-3
              px-6 py-3 bg-blue-600 hover:bg-blue-700
              rounded-md font-medium transition
            "
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.657 32.656 29.194 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
              <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.338 6.306 14.691z"/>
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.197l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.174 0-9.631-3.317-11.28-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-1.02 2.815-3.021 5.197-5.681 6.565l.003-.002 6.19 5.238C35.353 40.126 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
            </svg>

            Login with Google
          </button>

          <p className="text-gray-500 text-sm text-center mt-6">
            Sign in to manage your private bookmarks
          </p>
        </div>
      </div>
    </div>
  );
}
