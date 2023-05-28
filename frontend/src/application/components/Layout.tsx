import Head from "next/head";
import Link from "next/link";
import Navigation from "./Navigation";
import { SITE_TITLE } from "domain/constants";

type HeadingTypes = {
  children: React.ReactNode;
  classNames?: string;
};

export const Heading = ({ children = "", classNames = "" }: HeadingTypes) => (
  <h1 className={`text-6xl mb-3 ${classNames}`}>{children}</h1>
);

type LayoutTypes = {
  children: React.ReactNode;
  home?: boolean;
  pageTitle?: string;
};

export default function Layout({
  children,
  home = false,
  pageTitle = "",
}: LayoutTypes) {
  const titleConstructor =
    pageTitle !== "" ? `${pageTitle} - ${SITE_TITLE}` : SITE_TITLE;

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Notes and Todos" />
        <title>{titleConstructor}</title>
      </Head>
      <Navigation />
      <header className="text-center container max-w-4xl mx-auto mt-4">
        {home ? (
          <>
            <Heading>{SITE_TITLE}</Heading>
          </>
        ) : (
          <div className="flex items-center">
            <h2 className="">
              <Link href="/" className="">
                {SITE_TITLE}
              </Link>
            </h2>
          </div>
        )}
      </header>
      <main className="container max-w-4xl mx-auto mt-4">{children}</main>
      {!home && (
        <div className="container max-w-4xl mx-auto mt-4">
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </>
  );
}
