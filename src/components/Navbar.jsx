import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex justify-between items-center py-4 px-8 max-w-7xl mx-auto">
        <h1 className="text-2xl font-extrabold text-blue-600 tracking-tight">
          DUA NITIN
        </h1>
        <ul className="flex gap-6 text-gray-700 font-medium">
          <li><Link href="#">About</Link></li>
          <li><Link href="#">Newsletter</Link></li>
          <li><Link href="#">Podcast</Link></li>
          <li><Link href="#">Membership</Link></li>
          <li><Link href="#">Courses</Link></li>
          <li><Link href="#">Workshops</Link></li>
        </ul>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition-all shadow">
          Subscribe
        </button>
      </div>
    </nav>
  );
}
