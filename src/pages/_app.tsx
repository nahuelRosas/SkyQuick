import { ChakraProvider } from "@chakra-ui/react";
import { Analytics } from "@vercel/analytics/react";
import { RecoilRoot } from "recoil";

import type { AppProps } from "next/app";
import AuthRoot from "../components/authentication/AuthRoot";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <ChakraProvider>
          <AuthRoot>
            <Component {...pageProps} />
            <Analytics />
          </AuthRoot>
        </ChakraProvider>
      </RecoilRoot>
    </>
  );
}
