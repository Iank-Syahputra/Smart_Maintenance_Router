import Navbar from "../components/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen text-slate-900">

      <Navbar />

      <main
        className="
        mx-auto
        max-w-7xl
        px-4
        py-6
        "
      >
        {children}
      </main>

    </div>
  );
}