import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

import appCss from '../styles.css?url'

const PREF_INIT_SCRIPT = `(function(){try{
  var storedTheme = window.localStorage.getItem('theme');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var resolvedTheme = (storedTheme === 'dark' || (!storedTheme && prefersDark)) ? 'dark' : 'light';
  var root = document.documentElement;
  root.classList.remove('light','dark');
  root.classList.add(resolvedTheme);
  root.setAttribute('data-theme', resolvedTheme);

  var isElderly = window.localStorage.getItem('bantu_jelasin_elderly_mode_v1') === 'true';
  if (isElderly) {
    root.setAttribute('data-elderly', 'true');
    root.classList.add('elderly-mode');
  }
}catch(e){}})();`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Bantu Jelasin — Penyederhana Teks Rumit untuk Orang Awam & Lansia',
      },
      {
        name: 'description',
        content:
          'Bantu Jelasin membantu Anda memahami surat perjanjian hukum, tagihan listrik, hasil laboratorium medis, dan dokumen dinas dengan bahasa sehari-hari yang sederhana dan jelas.',
      },
      {
        name: 'theme-color',
        content: '#ea580c',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: PREF_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body className="min-h-screen bg-[var(--bj-bg)] text-[var(--bj-text-main)] antialiased transition-colors duration-200">
        <Navbar />
        {children}
        <Footer />
        <Scripts />
      </body>
    </html>
  )
}
