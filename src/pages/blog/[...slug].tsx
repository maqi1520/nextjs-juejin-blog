/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef } from "react";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import Error from "next/error";
import { getArticleDetail } from "../../lib/db";
import { InferGetServerSidePropsType } from "next";
import { Article } from "../../types/article";
import MarkdownIt from "markdown-it";
import matter from "gray-matter";

import { NextSeo } from "next-seo";
import Prism from "prismjs";
require("prismjs/components/prism-jsx");
require("prismjs/components/prism-tsx");
require("prismjs/components/prism-typescript");
require("prismjs/components/prism-bash");
require("prismjs/components/prism-markdown");

const md = new MarkdownIt();

export default function Page({
  data,
  statusCode,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  if (statusCode || !data) {
    return <Error statusCode={statusCode} />;
  }

  const result = matter(data?.article_info.mark_content || "");

  return (
    <div className="px-3 md:px-0 mx-auto prose prose-indigo">
      <NextSeo
        title={data.article_info.title}
        description={data.article_info.brief_content}
        openGraph={{
          images: [{ url: data.article_info.cover_image }],
        }}
      />
      <div className="pt-6">
        <h1>{data?.article_info.title}</h1>
        <dl>
          <dt className="sr-only">Published on</dt>
          <dd className="text-base font-medium leading-6 text-gray-500">
            <time>
              {new Date(+data.article_info.ctime * 1000).toLocaleDateString(
                "zh-CN",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </time>
          </dd>
        </dl>
        {data.article_info.cover_image && (
          <img
            className="max-w-full"
            src={data.article_info.cover_image}
            alt={data.article_info.title}
          />
        )}
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: md.render(result.content),
        }}
      ></div>
    </div>
  );
}

// 每次刷新页面都后执行这个函数
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const slug = context.query?.slug as string[];
  // 通过 API 请求数据
  const res = await getArticleDetail(slug[0]);
  if (res.err_msg === "success") {
    // 将数据传递到页面上
    return { props: { data: res.data as Article } };
  }

  // 将数据传递到页面上
  return { props: { statusCode: 500 } };
}
