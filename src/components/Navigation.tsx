import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      {/* Fixed Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled
            ? 'bg-[#D8D0C6]/95 backdrop-blur-sm py-3'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="flex items-center justify-between px-[4vw]">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="font-western text-lg md:text-xl uppercase tracking-wider text-[#111] hover:text-[#C72C2C] transition-colors"
          >
            Gentleman's Blade
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('services')}
              className="font-condensed text-xs uppercase tracking-widest text-[#111] hover:text-[#C72C2C] transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('team')}
              className="font-condensed text-xs uppercase tracking-widest text-[#111] hover:text-[#C72C2C] transition-colors"
            >
              Team
            </button>
            <button
              onClick={() => scrollToSection('prices')}
              className="font-condensed text-xs uppercase tracking-widest text-[#111] hover:text-[#C72C2C] transition-colors"
            >
              Prices
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="font-condensed text-xs uppercase tracking-widest text-[#111] hover:text-[#C72C2C] transition-colors"
            >
              Contact
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-5 py-2 bg-[#C72C2C] text-white font-condensed text-xs uppercase tracking-widest rounded-full hover:bg-[#a82424] transition-colors"
            >
              Book
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[#111]"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[99] bg-[#D8D0C6] flex flex-col items-center justify-center gap-8 md:hidden">
          <button
            onClick={() => scrollToSection('services')}
            className="font-western text-2xl uppercase tracking-wider text-[#111]"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection('team')}
            className="font-western text-2xl uppercase tracking-wider text-[#111]"
          >
            Team
          </button>
          <button
            onClick={() => scrollToSection('prices')}
            className="font-western text-2xl uppercase tracking-wider text-[#111]"
          >
            Prices
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="font-western text-2xl uppercase tracking-wider text-[#111]"
          >
            Contact
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="mt-4 px-8 py-3 bg-[#C72C2C] text-white font-western text-lg uppercase tracking-wider"
          >
            Book Now
          </button>
        </div>
      )}
    </>
  );
};

export default Navigation;
