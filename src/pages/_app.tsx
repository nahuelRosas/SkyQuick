import { ChakraProvider } from '@chakra-ui/react';
import { Analytics } from '@vercel/analytics/react';
import { RecoilRoot } from 'recoil';

import Layout from '../components/Layout/Layout';

import type { AppProps } from "next/app";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
          <Analytics />
        </Layout>
      </ChakraProvider>
    </RecoilRoot>
  );
}
