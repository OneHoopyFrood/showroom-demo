
import Image from "next/image";

import logo from "../public/logo.svg";

export function Navbar() {
  return (
    <nav className="w-full flex justify-center bg-gray-700 mb-5">
      <div className="flex justify-between w-2/3 py-4 items-center">
        <div className="flex items-center">
        <Image src={logo} className="bg-amber-50 rounded-4xl" alt="Showroom Logo" width={36} height={36} />
        <span className="text-white font-bold text-lg mx-3">Showroom</span>
        </div>
        <button className="bg-gray-800 text-white px-4 py-2 rounded font-semibold hover:bg-cyan-900 cursor-pointer transition">
          Admin Access
        </button>
      </div>
    </nav>
  );
}
