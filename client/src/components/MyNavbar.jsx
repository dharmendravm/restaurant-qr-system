import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-yellow-300 !z-50 fixed top-0 left-0 w-full">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          FoodieHub
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-lg font-medium">
          <li><Link to="/" className="hover:text-amber-200">Home</Link></li>
          <li><Link to="/menu" className="hover:text-amber-200">Menu</Link></li>
          <li><Link to="/about" className="hover:text-amber-200">About</Link></li>
          <li><Link to="/contact" className="hover:text-amber-200">Contact</Link></li>
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white text-3xl">
          ☰
        </button>

      </div>
    </nav>
  );
};

export default Navbar;
