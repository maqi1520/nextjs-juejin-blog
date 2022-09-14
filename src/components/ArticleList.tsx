/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import Pagination from "./Pagination";
import { Article } from "../types/article";

type Props = {
  articles: Article[];
  currentPage: number;
  totalPages: number;
};
export default function ArticleList({
  articles,
  totalPages,
  currentPage,
}: Props) {
  return (
    <div className="px-3 md:px-0 max-w-5xl mx-auto">
      <ul>
        {articles.map((article) => (
          <li key={article.article_id} className="py-4">
            <article className="md:gap-2 md:grid md:grid-cols-4 md:items-start">
              <dl>
                <dt>
                  {article.article_info.cover_image && (
                    <Link href={`/blog/${article.article_id}`}>
                      <img
                        className="w-full md:w-52"
                        src={article.article_info.cover_image}
                        alt={article.article_info.title}
                      />
                    </Link>
                  )}
                </dt>
                <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                  <span className="sr-only">Published on</span>
                  <time dateTime="2022-07-22T00:00:00.000Z">
                    {new Date(
                      +article.article_info.ctime * 1000
                    ).toLocaleDateString("zh-CN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </dd>
              </dl>
              <div className="space-y-3 md:col-span-3">
                <div>
                  <h3 className="text-2xl font-bold leading-8 tracking-tight">
                    <Link href={`/blog/${article.article_id}`}>
                      <a className="text-gray-900 dark:text-gray-100">
                        {article.article_info.title}
                      </a>
                    </Link>
                  </h3>
                  <div className="mt-3 flex flex-wrap">
                    {article.tags.map((tag) => (
                      <Link key={tag.tag_id} href={`/tags/${tag.tag_name}`}>
                        <a className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          {tag.tag_name}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                  {article.article_info.brief_content}
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
}
