import Head from 'next/head';
import Link from 'next/link';

import { SITE_TITLE } from 'domain/constants';
import Navigation from './Navigation';

type HeadingTypes = {
  children: React.ReactNode;
  classNames?: string;
};

export const Heading = ({ children = '', classNames = '' }: HeadingTypes) => (
  <h1 className={`mb-3 text-6xl ${classNames}`}>{children}</h1>
);

type LayoutTypes = {
  children: React.ReactNode;
  home?: boolean;
  pageTitle?: string;
};

export default function Layout({
  children,
  home = false,
  pageTitle = '',
}: LayoutTypes) {
  const titleConstructor =
    pageTitle !== '' ? `${pageTitle} - ${SITE_TITLE}` : SITE_TITLE;

  return (
    <>
      <Head>
        <link
          rel="icon"
          href="/favicon.ico"
        />
        <meta
          name="description"
          content="Notes and Todos"
        />
        <title>{titleConstructor}</title>
      </Head>
      <Navigation />
      <header className="container mx-auto mt-4 max-w-4xl text-center">
        {home ? (
          <>
            <Heading>{SITE_TITLE}</Heading>
          </>
        ) : (
          <div className="flex items-center">
            <h2 className="">
              <Link
                href="/"
                className=""
              >
                {SITE_TITLE}
              </Link>
            </h2>
          </div>
        )}
      </header>
      <main className="container mx-auto mt-4 max-w-4xl">{children}</main>
      {!home && (
        <div className="container mx-auto mt-4 max-w-4xl">
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </>
  );
}
