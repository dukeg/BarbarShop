import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PriceListProps {
  className?: string;
}

const services = [
  { name: 'Haircut', price: 45 },
  { name: 'Cut & Shampoo', price: 55 },
  { name: 'Beard Sculpt', price: 30 },
  { name: 'Straight Razor Shave', price: 50 },
  { name: 'Grey Blend', price: 40 },
  { name: 'Brow Cleanup', price: 15 },
  { name: 'Scalp Treatment', price: 35 },
  { name: 'Hot Towel Treatment', price: 20 },
];

const PriceList = ({ className = '' }: PriceListProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { x: '-10vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Menu items stagger
      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            delay: index * 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: menuRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="prices"
      ref={sectionRef}
      className={`relative bg-[#D8D0C6] py-[10vh] ${className}`}
    >
      {/* Header Block */}
      <div className="px-[6vw] mb-[6vh]">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Red Block */}
          <div
            ref={headerRef}
            className="w-full md:w-[44vw] bg-[#C72C2C] p-8 md:p-12"
          >
            <h2 className="font-western text-white text-[clamp(36px,5vw,64px)] uppercase tracking-wider">
              Price List
            </h2>
            <p className="font-condensed text-white/90 text-sm uppercase tracking-[0.2em] mt-4">
              Straightforward. No Surprises.
            </p>
          </div>

          {/* Right Photo */}
          <div className="w-full md:w-[40vw] h-[34vh] md:h-auto">
            <img
              src="/images/vibes_chair.jpg"
              alt="Barbershop chair"
              className="w-full h-full object-cover photo-frame"
            />
          </div>
        </div>
      </div>

      {/* Menu */}
      <div ref={menuRef} className="px-[6vw]">
        <div className="bg-white thick-border p-8 md:p-12">
          {/* Section Title */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[3px] flex-1 bg-[#C72C2C]" />
            <span className="font-condensed text-[#C72C2C] text-sm uppercase tracking-[0.2em]">
              Services
            </span>
            <div className="h-[3px] flex-1 bg-[#C72C2C]" />
          </div>

          {/* Menu Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
            {services.map((service, index) => (
              <div
                key={service.name}
                ref={el => { itemsRef.current[index] = el; }}
                className="menu-item py-3"
              >
                <span className="font-western text-[#111] text-lg uppercase tracking-wider">
                  {service.name}
                </span>
                <div className="menu-dots" />
                <span className="font-western text-[#C72C2C] text-xl">
                  ${service.price}
                </span>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-8 pt-6 border-t-2 border-dotted border-[#6E6A62]">
            <p className="font-typewriter text-[#6E6A62] text-sm text-center">
              All services include consultation and hot towel finish.
              Walk-ins welcome, appointments preferred.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceList;
