import Image from "next/image";
import Link from "next/link";

const imageStyle = {
  // borderRadius: "10%",
};
export default function Home() {
  return (
    <>
      <div className="container pt-24">
        <div className="relative">
          <Image
            src="/topimage.jpg"
            height={718}
            width={1280}
            alt="topimage"
            style={imageStyle}
            priority={true}
            quality={100}
          />
          {/* 共通ボタン化 */}
          <button className="absolute bottom-6 left-6 bg-sky-200 text-sky-700 border-2 border-transparent font-medium text-3xl py-3 px-9 rounded-full hover:bg-white hover:border-black duration-300">
            <Link href={"/resume"}>職務経歴書を作成する</Link>
          </button>
        </div>
        <p className="pl-4 pt-2">※スマホからの入力は対応してません。</p>
        {/* 説明文 */}
      </div>
      {/* topページ 会員登録すると、作成途中のデータを利用できます。
      <Link href={"/resume"}>会員登録して作成</Link> */}
      {/* <button className="mt-20 bg-sky-200 text-sky-700 border-2 border-transparent font-medium text-3xl py-3 px-9 rounded-full hover:bg-white hover:border-black duration-300">
        <Link href={"/resume"}>会員登録なしで利用</Link>
      </button> */}

    </>
  );
}
