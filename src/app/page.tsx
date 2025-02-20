import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="container pt-4">
        <div className="relative">
          <Image
            src="/topimage.jpg"
            height={630}
            width={950}
            alt="topimage"
            priority={true}
            quality={100}
            className="mx-auto block"
          />
          <Link
            href={"/resume?step=1"}
            className="absolute bottom-6 left-36 bg-sky-200 text-sky-700 border-2 border-transparent font-blod text-2xl py-3 px-9 rounded-full hover:bg-white hover:border-black duration-300  shadow-md"
          >
            職務経歴書を作成する
          </Link>
          {/* </button> */}
        </div>
        <p className="pl-36 pt-2">※スマホからの入力は対応しておりません。</p>
        {/* 説明文 */}
        <div>
          <div className="confuse mt-10 border-b-2 border-gray-500 border-solid ">
            <div className="flex gap-5 justify-center">
              <div className="w-16 h-44 relative">
                <Image
                  src="/confuse-men.png"
                  fill={true}
                  sizes="6rem"
                  alt="confuse-men"
                />
              </div>
              <div className="w-12 h-20 relative">
                <Image
                  src="/hatena.png"
                  fill={true}
                  sizes="6rem"
                  alt="hatena"
                  className="inline-block align-top ml-2 origin-top-left rotate-12"
                />
              </div>

              <div>
                <h2 className="text-3xl font-extrabold pt-8 pb-4 px-20 mt-10 border-b-4 border-indigo-500 border-solid ">
                  こんな困り事はありませんか？
                </h2>
              </div>
            </div>
            <div className="confuse-list mt-10 pb-2 ">
              {/* 1つ目 */}
              {/*imageは 237 × 414 px fillで指定するhttps://nextjs.org/docs/pages/api-reference/components/image#fill*/}
              <div className="flex items-start space-x-8">
                <div className="w-24 h-40 relative">
                  <Image
                    src="/confuse-men2.png"
                    fill={true}
                    sizes="6rem"
                    alt="confuse-men"
                  />
                </div>
                <div className="relative bg-blue-100 text-gray-800 p-6 rounded-lg shadow-md">
                  <p className="text-xl">
                    職務経歴書に何書けばいいかわからない
                    <br />
                    ネットに一般的なものは落ちてるけど、エンジニア用のが見つからない
                  </p>
                  <div className="absolute -left-2 top-8 w-4 h-4 bg-blue-100 rotate-45 transform rounded-sm"></div>
                </div>
              </div>
              {/* 2つ目 */}
              <div className="mt-10 flex items-start space-x-8 flex-row-reverse">
                <div className="w-24 h-40 relative">
                  <Image
                    src="/confuse-men2.png"
                    fill={true}
                    sizes="6rem"
                    alt="confuse-men"
                  />
                </div>
                <div className="relative bg-blue-100 text-gray-800 p-8 rounded-lg shadow-md ">
                  <p className="text-xl">
                    書類でスキルがうまく伝わらず、書類選考で落ちてしまう。
                  </p>
                  <div className="absolute -right-2 top-8 w-4 h-4 bg-blue-100 rotate-45 transform rounded-sm"></div>
                </div>
              </div>
              {/* 3つ目 */}
              <div className="mt-10 flex items-start space-x-8">
                <div className="w-24 h-40 relative">
                  <Image
                    src="/confuse-men2.png"
                    fill={true}
                    sizes="6rem"
                    alt="confuse-men"
                  />
                </div>
                <div className="relative bg-blue-100 text-gray-800 p-6 rounded-lg shadow-md">
                  <p className="text-xl">
                    word慣れてないし、作るのがめんどくさい
                  </p>
                  <div className="absolute -left-2 top-8 w-4 h-4 bg-blue-100 rotate-45 transform rounded-sm"></div>
                </div>
              </div>
            </div>
          </div>
          {/* 解決法 */}
          <div className="supose-list mt-16">
            <div className="flex gap-5 justify-center items-center mb-10">
              <Image
                src="/mai.png"
                width={100}
                height={100}
                alt="taikyokuken"
                className="inline object-contain w-auto h-auto max-w-full max-h-full"
              />
              <h2 className="text-5xl font-extrabold mx-10">
                エンショクなら！
              </h2>
              <Image
                src="/mai.png"
                width={100}
                height={100}
                alt="taikyokuken"
                className="inline object-contain w-auto h-auto max-w-full max-h-full"
              />
            </div>

            {/* コンポーネント化してもいい */}
            <div className="flex gap-5 justify-center">
              <div className="flex flex-col items-center p-5 rounded-lg shadow-lg w-1/3 bg-green-100">
                <div className="w-40 h-40 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/macho-1.png"
                    alt="macho1-men"
                    width={80}
                    height={80}
                    className="object-contain w-auto h-auto max-w-full max-h-full"
                  />
                </div>
                <p className="text-center text-xl text-gray-700 leading-relaxed">
                  エンジニアが必須レベルで書くべき項目をフォームを通して入力可能。
                  <mark className="">入力項目は考えなくてもOK</mark>
                </p>
              </div>
              <div className="flex flex-col items-center p-5  rounded-lg shadow-lg w-1/3 bg-green-100">
                <div className="w-40 h-40 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/macho-2.png"
                    alt="macho2-men"
                    width={80}
                    height={80}
                    className="object-contain w-auto h-auto max-w-full max-h-full"
                  />
                </div>
                <p className="text-center text-xl text-gray-700 leading-relaxed">
                  入力した項目を整形しword出力するので、表を作るなどの
                  <mark>慣れないword操作は不要！</mark>
                </p>
              </div>
              <div className="flex flex-col items-center p-5 rounded-lg shadow-lg w-1/3 bg-green-100">
                <div className="w-40 h-40 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/macho-3.png"
                    alt="macho3-men"
                    width={80}
                    height={80}
                    className="object-contain w-auto h-auto max-w-full max-h-full"
                  />
                </div>
                <p className="text-center text-xl text-gray-700 leading-relaxed">
                  一度出力したwordはご自身で修正可能なので、
                  <mark>
                    叩き台だけ作っていくらでもご自身の好きなように変えられる！
                  </mark>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* サンプル */}
        <div className="sample mt-12">
          <h2 className="text-4xl text-center font-extrabold m-3">作成例</h2>
          <p className="text-center p-4 text-xl font-semibold">
            表形式で{" "}
            <span className="font-bold text-sky-600 underline">伝わる</span>{" "}
            職務経歴書に！
          </p>
          <div className="flex items-center gap-5">
            <div className="flex flex-col items-center p-5  rounded-lg shadow-lg w-1/2 bg-gray-100">
              <p className="p-3  text-xl">職務経歴欄</p>
              <div>
                <Image
                  src={"/resume-sample.png"}
                  width={600}
                  height={600}
                  alt="resume-sample"
                />
              </div>
            </div>
            <div className="flex flex-col items-center p-5  rounded-lg shadow-lg w-1/2 bg-gray-100">
              <p className="p-3  text-xl">スキル欄</p>
              <div>
                <Image
                  src={"/skill-sample.png"}
                  width={600}
                  height={600}
                  alt="skill-sample"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="m-20 flex justify-center items-center relative">
          <Link
            href="/resume?step=1"
            className="bg-sky-800 text-white border-2 border-transparent font-extrabold text-2xl py-3 px-9 w-1/2 hover:bg-sky-600 hover:border-black hover:text-gray-800 duration-300 rounded-lg shadow-md flex items-center justify-center"
          >
            職務経歴書を作成する
            <Image
              src="/right-arrow1.png"
              alt="right-arrow"
              width={20}
              height={20}
              className="display-inline ml-4"
            />
          </Link>
          <div className="absolute top-1 right-16 bg-yellow-400 text-black font-bold text-lg py-3 px-4 rounded-lg  flex items-center">
            もちろん無料！
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-yellow-400"></div>
          </div>
        </div>

        {/* <div className="mt-10 flex items-start space-x-8 mb-20">
          <div className="relative bg-gray-100 text-gray-800 p-2 rounded-lg shadow-md">
            <p className="text-sm">
              作者が未経験ながら転職できたのは職務経歴書が褒められたためです。
              <br />
              どこの面接でも上手ですねと言われたレイアウトを使ってます。
            </p>
            <div className="absolute -left-2 top-8 w-4 h-4 bg-gray-100 rotate-45 transform rounded-sm"></div>
          </div>
        </div> */}
      </div>
      {/* プライバシーポリシー */}

      {/* 職務経歴書を定期的に作ることは大事なことでうす。byピポっど */}
    </>
  );
}
