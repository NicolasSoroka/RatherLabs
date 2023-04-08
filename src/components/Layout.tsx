import React from "react";
import Head from "next/head";
import StarSky from "./StarSky";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Head>
        <title>Rather Labs - Nicolas Soroka</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <StarSky />
        {children}
      </main>
    </div>
  );
};

export default Layout;
