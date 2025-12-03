import { Link } from "react-router-dom";
import Button from "./Button";
import { BrandLogo } from "./shared/BrandLogo";

const Navbar = () => {
  return (
    <div className="flex justify-center w-full ">
      <nav className="
        w-10/12 rounded-full bg-[#0a0a0a]/90 backdrop-blur-xl 
        border border-white/10 shadow-[0_0_25px_rgba(255,165,0,0.1)] fixed top-1 z-50 px-6 py-3
      ">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <BrandLogo/>

          <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
            <li><Link to="/" className="text-gray-300 hover:text-orange-300 transition">Home</Link></li>
            <li><Link to="/menu" className="text-gray-300 hover:text-orange-300 transition">Menu</Link></li>
            <li><Link to="/about" className="text-gray-300 hover:text-orange-300 transition">About</Link></li>
            <li><Link to="/contact" className="text-gray-300 hover:text-orange-300 transition">Contact</Link></li>
          </ul>

          <div className="hidden md:flex">
            <Button />
          </div>

          <button className="md:hidden text-orange-300 text-3xl">
            ☰
          </button>

        </div>
      </nav>
    </div>
  );
};

export default Navbar;
