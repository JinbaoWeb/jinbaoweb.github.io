import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen flex justify-center px-6 py-24">
        <article className="prose prose-blue lg:prose-lg bg-white rounded-2xl shadow p-10 max-w-4xl w-full">
          {children}
        </article>
      </div>
    </>
  );
}
