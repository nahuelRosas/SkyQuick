import { ChakraProvider } from '@chakra-ui/react';
import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';

import AuthRoot from '../components/authentication/AuthRoot';
import { logos } from '../utils/logos';

import type { AppProps } from "next/app";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider>
        <AuthRoot>
          <Head>
            <title>SkyQuick</title>
            <meta name="description" content="Generated by create next app" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href={logos.light} />
          </Head>
          <Component {...pageProps} />
          <Analytics />
        </AuthRoot>
      </ChakraProvider>
    </RecoilRoot>
  );
}
