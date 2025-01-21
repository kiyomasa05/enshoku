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
          <button className="absolute bottom-6 left-36 bg-sky-200 text-sky-700 border-2 border-transparent font-blod text-2xl py-3 px-9 rounded-full hover:bg-white hover:border-black duration-300  shadow-md">
            <Link href={"/resume?step=1"}>職務経歴書を作成する</Link>
          </button>
        </div>
        <p className="pl-36 pt-2">※スマホからの入力は対応しておりません。</p>
        {/* 説明文 */}
        <div>
          <div className="confuse mt-10 border-b-2 border-gray-500 border-solid ">
            <div className="flex gap-5 justify-center">
              <div className="">
                <Image
                  src="/confuse-men.png"
                  width={40}
                  height={40}
                  alt="confuse-men"
                  className="inline"
                />
                <Image
                  src="/hatena.png"
                  width={40}
                  height={40}
                  fill={false}
                  alt="hatena"
                  // style={ }
                  className="inline-block align-top ml-10 origin-top-left rotate-12"
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
              <div className="flex items-start space-x-8">
                <Image
                  src="/confuse-men2.png"
                  width={80}
                  height={80}
                  alt="confuse-men"
                  className=""
                />
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
                <Image
                  src="/confuse-men2.png"
                  width={80}
                  height={80}
                  alt="confuse-men"
                  className=""
                />
                <div className="relative bg-blue-100 text-gray-800 p-8 rounded-lg shadow-md ">
                  <p className="text-xl">
                    書類でスキルがうまく伝わらず、書類選考で落ちてしまう。
                  </p>
                  <div className="absolute -right-2 top-8 w-4 h-4 bg-blue-100 rotate-45 transform rounded-sm"></div>
                </div>
              </div>
              {/* 3つ目 */}
              <div className="mt-10 flex items-start space-x-8">
                <Image
                  src="/confuse-men2.png"
                  width={80}
                  height={80}
                  alt="confuse-men"
                  className=""
                />
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
                className="inline"
              />
              <h2 className="text-5xl font-extrabold mx-10">
                エンショクなら！
              </h2>
              <Image
                src="/mai.png"
                width={100}
                height={100}
                alt="taikyokuken"
                className="inline"
              />
            </div>

            {/* あああ */}
            {/* コンポーネント化してもいい */}
            <div className="flex gap-5 justify-center">
              <div className="flex flex-col items-center p-5 rounded-lg shadow-lg w-1/3 bg-green-100">
                <div className="w-40 h-40 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/macho-1.png"
                    alt="macho1-men"
                    width={80}
                    height={80}
                    className="object-contain"
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
                    className="object-contain"
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
                    className="object-contain"
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

        <div className="m-20 flex justify-center items-center relative">
          <button
            id="createButton"
            className="bg-sky-800 text-white border-2 border-transparent font-extrabold text-2xl py-3 px-9 w-1/2 hover:bg-sky-600 hover:border-black hover:text-gray-800 duration-300 rounded-lg shadow-md"
          >
            <Link href={"/resume?step=1"}>職務経歴書を作成する</Link>
          </button>
          <div className="absolute top-1 right-16 bg-yellow-400 text-black font-bold text-lg py-3 px-4 rounded-lg shadow-lg flex items-center">
            もちろん無料！
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-yellow-400"></div>
          </div>
        </div>

        <div className="mt-10 flex items-start space-x-8 mb-20">
          <div className="relative bg-gray-100 text-gray-800 p-2 rounded-lg shadow-md">
            <p className="text-sm">
              作者が未経験ながら転職できたのは職務経歴書が褒められたためです。
              <br />
              どこの面接でも上手ですねと言われたレイアウトを使ってます。
            </p>
            <div className="absolute -left-2 top-8 w-4 h-4 bg-gray-100 rotate-45 transform rounded-sm"></div>
          </div>
        </div>
      </div>

      {/* 職務経歴書を定期的に作ることは大事なことでうす。byピポっど */}
    </>
  );
}
