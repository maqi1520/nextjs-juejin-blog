import React from "react";
import { GetServerSidePropsContext } from "next";
import { getArticles } from "../lib/db";
import { InferGetServerSidePropsType } from "next";
import ArticleList from "../components/ArticleList";

export default function Page({
  data,
  count,
  page,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // Render data...

  return <ArticleList totalPages={count} currentPage={page} articles={data} />;
}

// 每次刷新页面都后执行这个函数
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const page = (context.query?.page as string) || 1;
  // 通过 API 请求数据
  const uid = process.env.uid!;
  const { data, count } = await getArticles(uid, (+page - 1) * 10);

  // 将数据传递到页面上
  return { props: { data, count, page: +page } };
}
