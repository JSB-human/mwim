import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import * as gtag from '../lib/gtags';
import { SSRProvider } from '@react-aria/ssr';
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: any) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <SSRProvider>
      <SessionProvider session={pageProps.session}>
        <DefaultSeo
          title = "내가 만든 세상"
          description='내가 만든 세상이에요.'
          openGraph={{
            url : 'https://mwim.vercel.app/',
            title : '내가 만든 세상',
            description : '내가 만든 세상이에요.',
            images : [
              {
                url: 'https://mwim.vercel.app/main_logo.png',
                width: 800,
                height: 600,
                alt: 'Og Image Alt',
                type: 'image/png',
              },
              {
                url: 'https://mwim.vercel.app/main_logo.png',
                width: 900,
                height: 800,
                alt: 'Og Image Alt Second',
                type: 'image/png',
              },
              { url: 'https://mwim.vercel.app/main_logo.png' },
              { url: 'https://mwim.vercel.app/main_logo.png' },
            ],
            site_name : '내가 만든 세상'
          }}
          twitter={{
            handle : '@handle',
            site : '@site',
            cardType : 'summary_large_image',
          }}
        />

        <Component {...pageProps} />
      </SessionProvider>
    </SSRProvider>
  
  )
}

export default MyApp
