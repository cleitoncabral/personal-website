import type { Metadata } from "next";
import { Source_Code_Pro } from "next/font/google";
import "../styles/globals.css";
import "../styles/page.css";
import { AppProps } from "next/app";
import Footer from "src/components/Footer/Footer";
import { appWithTranslation } from "next-i18next";

const source_code_pro = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font'
})

export const metadata: Metadata = {
  title: "Cleiton Cabral",
  description: "Personal Website",
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={source_code_pro.className}>
      <Component className='main' {...pageProps} />

      <Footer />
    </main>
  );
}

export default appWithTranslation(MyApp);