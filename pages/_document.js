import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <script
                    type="module"
                    src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/mirage.js"
                ></script>
                <link
                    href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <body style={{ fontFamily: 'Quicksand, sans-serif' }}>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
