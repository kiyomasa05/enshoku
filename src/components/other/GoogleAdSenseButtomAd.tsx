import { useRouter } from "next/router";
import { useEffect } from "react";

declare global {
  var adsbygoogle: unknown[];
}
type Props = {
  pId: string;
};

// 参考https://blog.stin.ink/articles/add-google-adsense-to-blog
export const GoogleAdAdSenseButtomAd = ({ pId }: Props) => {
  const { asPath } = useRouter();

  useEffect(() => {
    try {
      (adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error(error);
    }
  }, [asPath]);

  return (
    <div key={asPath}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={pId}
        data-ad-slot="999999999"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};
