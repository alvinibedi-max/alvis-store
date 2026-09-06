import {useNonce, type HeadConfig} from '@shopify/hydrogen';
import { Links, Meta, Scripts, ScrollRestoration, Outlet } from '@remix-run/react';

import {NotFound} from '~/components/NotFound';
import {ThemeProvider} from '~/contexts/ThemeContext';
import {Toaster} from '~/components/ui/sonner';
import {TooltipProvider} from '~/components/ui/tooltip';
import {ErrorBoundary} from '~/components/ErrorBoundary';
import '~/index.css';

export const links = () => [
  {
    rel: 'preconnect',
    href: 'https://fonts.googleapis.com',
  },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href:
      'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=Barlow:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap',
  },
  {
    rel: 'icon',
    href: '/favicon.ico',
    type: 'image/svg+xml',
  },
];

export const meta = () => ({
  charset: 'utf-8',
  viewport: 'width=device-width,initial-scale=1',
  title: 'Alvis — Premium Electronics Store',
  description:
    'Alvis is a premium electronics store with the latest smartphones, laptops, audio gear, and gaming consoles. Free delivery on orders over £75.',
});

export const Head: HeadConfig = () => (
  <head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Alvis — Premium Electronics Store</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link
      href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=Barlow:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <link rel="icon" href="/favicon.ico" type="image/svg+xml" />
    <Meta />
    <Links />
  </head>
);

export default function App() {
  const nonce = useNonce();

  return (
    <html lang="en">
      <Head />
      <body>
        <ThemeProvider defaultTheme="light">
          <TooltipProvider>
            <Toaster />
            <ErrorBoundary>
              <Outlet />
            </ErrorBoundary>
            <ScrollRestoration nonce={nonce} />
            <Scripts nonce={nonce} />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export function ErrorBoundaryComponent({error}: {error: Error}) {
  return <NotFound />;
}
