import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">My Docs</h1>
        <div className="space-x-6">
          <Link href="/" className="text-gray-700 hover:text-blue-600">
            首页
          </Link>
          <Link href="/docs" className="text-gray-700 hover:text-blue-600">
            文档
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-600">
            关于
          </Link>
        </div>
      </div>
    </nav>
  );
}
