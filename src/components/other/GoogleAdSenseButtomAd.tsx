"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}
type Props = {
  pId: string;
};

// 参考https://blog.stin.ink/articles/add-google-adsense-to-blog
//https://pote-chil.com/posts/nextjs-google-adsense
export const GoogleAdAdSenseButtomAd = ({ pId }: Props) => {
  const pathname = usePathname();

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error(e);
    }
  }, [pathname]);

  return (
    <div>
      <ins
        className="adsbygoogle inline-display w-5/6 h-24"
        data-adtest={process.env.NODE_ENV === "development" ? "on" : "off"}
        data-ad-client={pId}
        data-ad-slot="7532327507"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};
