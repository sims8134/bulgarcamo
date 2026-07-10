import Link from 'next/link';

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: '#F2EFE8',
          color: '#1A1A18',
          fontFamily: 'serif',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          margin: 0,
        }}
      >
        <div style={{ maxWidth: '32rem', textAlign: 'center' }}>
          <p
            style={{
              fontFamily: 'monospace',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              opacity: 0.6,
              marginBottom: '2rem',
            }}
          >
            404 · Page not found
          </p>
          <h1
            style={{
              fontStyle: 'italic',
              fontSize: '2.5rem',
              fontWeight: 300,
              marginBottom: '2rem',
            }}
          >
            This page is no longer in the archive.
          </h1>
          <Link
            href="/en"
            style={{
              fontFamily: 'monospace',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              borderBottom: '1px solid #1A1A18',
              paddingBottom: '2px',
              color: '#1A1A18',
              textDecoration: 'none',
            }}
          >
            ← Back to Bulgarcamo
          </Link>
        </div>
      </body>
    </html>
  );
}
