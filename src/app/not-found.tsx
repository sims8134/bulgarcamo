import Link from 'next/link';
import { fontVariables } from '@/lib/fonts';
import './globals.css';

// 404 hors langue (URL sans préfixe reconnu) : même identité, sans en-tête localisé.
export default function GlobalNotFound() {
  return (
    <html lang="en" className={fontVariables}>
      <body className="bg-bg text-text font-sans">
        <main className="site-layer min-h-screen flex items-center px-6">
          <div className="mx-auto max-w-xl space-y-8 text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/bulgarcamo-wordmark-phosphor.svg"
              alt="Bulgarcamo"
              width={680}
              height={86}
              className="mx-auto h-6 w-auto"
            />
            <p className="tag">404 · Page not found</p>
            <h1 className="heading-sm">This page is no longer in the archive.</h1>
            <Link href="/en" className="cta">
              <span aria-hidden>←</span>
              <span>Back to Bulgarcamo</span>
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
