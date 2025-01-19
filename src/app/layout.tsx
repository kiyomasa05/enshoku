import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans_JP } from "next/font/google";
import { NavigationGuardProvider } from "next-navigation-guard";
import Header from "@/components/ui/Header";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable}`}>
      <body>
        <NavigationGuardProvider>
          <Header />
          {children}
        </NavigationGuardProvider>
      </body>
    </html>
  );
}
