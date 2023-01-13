import { ChakraProvider } from "@chakra-ui/react";
import { Analytics } from "@vercel/analytics/react";
import { RecoilRoot } from "recoil";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <ChakraProvider>
          <Component {...pageProps} />
          <Analytics />
        </ChakraProvider>
      </RecoilRoot>
    </>
  );
}
