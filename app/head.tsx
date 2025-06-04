export default function Head() {
  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-icon.png" />
      <meta name="theme-color" content="#2E7D63" />
      <script src="/sw-register.js" defer></script>
    </>
  );
}