import Link from "next/link";

const Header = () => {
  return (
    <nav className="bg-white shadow dark:bg-gray-800">
      <div className="container flex items-center  p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
        <Link
          href="/"
          className="text-gray-800 transition-colors duration-300 transform dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6"
        >
          home
        </Link>

        <Link
          href="/other-tools"
          className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
        >
          その他のツール
        </Link>
      </div>
    </nav>
  );
};

export default Header;
