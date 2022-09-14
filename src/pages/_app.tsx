import "../styles/globals.css";
import "prismjs/themes/prism-okaidia.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { DefaultSeo } from "next-seo";
import { config } from "../config";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        title={config.title}
        description={config.description}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
