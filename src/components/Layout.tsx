/* eslint-disable @next/next/no-img-element */
import React, { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { config } from "../config";

type Props = {
  children: ReactNode;
};
export default function Layout({ children }: Props) {
  const router = useRouter();
  if (router.pathname === "/") {
    return <div className="min-h-screen">{children}</div>;
  }
  return (
    <>
      <div className="p-3 bg-primary-50 border-b border-primary-100 top-0 sticky">
        <div className="mx-auto max-w-5xl relative z-20 flex justify-between items-center">
          <div className="flex items-center max-w-full">
            <Link href="/">
              <a className="flex items-center no-underline">
                <img
                  src={config.avatar}
                  alt=""
                  className="h-10 w-10 md:h-12 md:w-12 lg:h-20 lg:w-20 rounded-full"
                />
              </a>
            </Link>
            <Link href="/">
              <a className="ml-3 block no-underline text-xl lg:text-3xl font-extrabold leading-none lg:leading-tight">
                {config.author}
              </a>
            </Link>
          </div>
          <div className="tracking-wide text-xs spaced-x-6">
            <Link href="/blog">
              <a className=" font-semibold no-underline hover:text-primary-500">
                全部文章
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="min-h-screen">{children}</div>
      <footer className="p-3 bg-primary-50 border-t border-primary-100 text-center py-5">
        Github • © 2022 • Next.js Juejin Blog
      </footer>
    </>
  );
}
