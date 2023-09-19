"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col justify-center items-center h-[50vh]">
      <h2 className="text-slate-300 text-center capitalize text-[30px] md:text-[40px]">
        {error.message || "Something went wrong!"}
      </h2>
      <button
        onClick={() => router.back()}
        className="bg-slate-300 text-green-950 rounded-md py-2 px-4 font-bold mt-4"
      >
        Go Back
      </button>
    </div>
  );
}
