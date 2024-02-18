import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from '../src/createEmotionCache';
import { InitialThemeMode } from '@/utils/hooks/useDarkMode';

type CustomDocumentProps = {
  emotionStyleTags: JSX.Element[];
  initTheme: JSX.Element;
};

export default class MyDocument extends Document<CustomDocumentProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage;

    // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
    // However, be aware that it can have global side effects.
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) =>
          function EnhanceApp(props) {
            return <App emotionCache={cache} {...props} />;
          },
      });

    const initialProps = await Document.getInitialProps(ctx);
    // This is important. It prevents emotion to render invalid HTML.
    // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
      <style
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
        key={style.key}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ));

    // Inject Mui theme mode from localStorage
    const initTheme = (
      <script
        key={'theme-mode'}
        dangerouslySetInnerHTML={{
          __html: InitialThemeMode,
        }}></script>
    );

    return {
      ...initialProps,
      emotionStyleTags,
      initTheme,
    };
  }

  render() {
    const { emotionStyleTags, initTheme } = this.props;

    return (
      <Html lang="en">
        <Head>
          {/* Inject MUI styles first to match with the prepend: true configuration. */}
          {emotionStyleTags}
        </Head>
        <body>
          {initTheme}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// Resolution order
//
// On the server:
// 1. app.getInitialProps
// 2. page.getInitialProps
// 3. document.getInitialProps
// 4. app.render
// 5. page.render
// 6. document.render
//
// On the server with error:
// 1. document.getInitialProps
// 2. app.render
// 3. page.render
// 4. document.render
//
// On the client
// 1. app.getInitialProps
// 2. page.getInitialProps
// 3. app.render
// 4. page.render
