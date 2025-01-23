import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { Noto_Sans_JP } from "next/font/google";
import { NavigationGuardProvider } from "next-navigation-guard";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import GoogleAdsense from "@/components/other/GoogleAdSense";
import { GoogleAdAdSenseButtomAd } from "@/components/other/GoogleAdSenseButtomAd";

// https://zenn.dev/takna/articles/next-tailwind-googlefonts-basic
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  // weight: 'variable', // default なので不要。バリアブルフォントでなければ必要
  // display: 'swap', // default なので不要
  // preload: true, // default なので不要
  // adjustFontFallback: true, // next/font/google で default なので不要
  // fallback: ['system-ui', 'arial'], // local font fallback なので不要
});

export const metadata: Metadata = {
  title: "エンショク！ | エンジニアの職務経歴書作成サイト",
  description: "エンジニアの職務経歴書作成サイトです",
};

// analicsの設定
//zenn.dev/nenenemo/articles/49a28ddfebf435#%40next%2Fthird-parties

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable}`}>
      <GoogleAnalytics gaId="G-ZBBRYJ4WDW" />
      <GoogleAdsense pId={"4654824676420361"} />
      <body>
        <NavigationGuardProvider>
          <Header />
          {children}
          <Footer />
          <GoogleAdAdSenseButtomAd pId={"4654824676420361"} />
        </NavigationGuardProvider>
      </body>
    </html>
  );
}
