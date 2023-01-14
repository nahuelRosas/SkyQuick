import { ChakraProvider } from "@chakra-ui/react";
import { Analytics } from "@vercel/analytics/react";
import { RecoilRoot } from "recoil";

import type { AppProps } from "next/app";
import AuthRoot from "../components/authentication/AuthRoot";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-hooks-web";
export default function App({ Component, pageProps }: AppProps) {
  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY
  );

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
