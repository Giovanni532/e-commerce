import CardArticle from "@/components/cardArticle";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default async function Home() {

  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Stay curious.</h1>
                <p className="max-w-[600px] text-gray-600 md:text-xl">
                  Discover stories, thinking, and expertise from writers on any topic.
                </p>
              </div>

              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-full bg-black text-white px-6 text-sm font-medium transition-colors hover:bg-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
                  prefetch={false}
                >
                  Start reading
                </Link>
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-full border border-gray-300 bg-white px-6 text-sm font-medium transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
                  prefetch={false}
                >
                  Become a member
                </Link>
              </div>
            </div>
            <img
              src="/placeholder.svg"
              width="550"
              height="550"
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:aspect-square"
            />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Explore new perspectives.
                </h2>
                <p className="max-w-[600px] text-gray-600 md:text-xl">
                  Read thought-provoking stories from independent writers and thinkers.
                </p>
              </div>
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-full bg-black text-white px-6 text-sm font-medium transition-colors hover:bg-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
                prefetch={false}
              >
                Explore topics
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Write and share your story.
                </h2>
                <p className="max-w-[600px] text-gray-600 md:text-xl">
                  Publish your passions, your way. Get the entire Medium network of curious readers.
                </p>
              </div>
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-full bg-black text-white px-6 text-sm font-medium transition-colors hover:bg-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
                prefetch={false}
              >
                Start writing
              </Link>
            </div>
            <img
              src="/placeholder.svg"
              width="550"
              height="310"
              alt="Image"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
