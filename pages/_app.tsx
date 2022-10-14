import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";

import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;

  return (
    <div>
      <Navbar/>
      <div className="flex gap-6 md:gap-20">
        <div className=" overflow-hidden xl:hover:overflow-auto">
          <Sidebar/>
        </div>
        <div className="videos flex-1 mt-4 flex flex-col gap-10 overflow-auto h-[88vh]">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
};

export default MyApp;
