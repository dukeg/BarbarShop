import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TeamProps {
  className?: string;
}

const barbers = [
  {
    name: 'Marcus Hayes',
    role: 'Lead Barber',
    image: '/images/team_marcus.jpg',
    description: '15 years of classic cuts and modern styles.',
  },
  {
    name: 'Danny Ruiz',
    role: 'Beard Specialist',
    image: '/images/team_danny.jpg',
    description: 'Master of the straight razor and beard sculpting.',
  },
  {
    name: 'Alex Chen',
    role: 'Grooming Expert',
    image: '/images/team_alex.jpg',
    description: 'Precision grooming and grey blending specialist.',
  },
];

const Team = ({ className = '' }: TeamProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: '8vh', opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
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
      id="team"
      ref={sectionRef}
      className={`relative bg-[#D8D0C6] py-[10vh] ${className}`}
    >
      {/* Header Block */}
      <div className="px-[6vw] mb-[8vh]">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Red Block */}
          <div
            ref={headerRef}
            className="w-full md:w-[44vw] bg-[#C72C2C] p-8 md:p-12"
          >
            <h2 className="font-western text-white text-[clamp(36px,5vw,64px)] uppercase tracking-wider">
              The Team
            </h2>
            <p className="font-typewriter text-white/90 text-[clamp(14px,1.2vw,18px)] mt-4 max-w-md">
              Chair-side pros who listen, advise, and deliver a cut that grows
              out well.
            </p>
          </div>

          {/* Right Photo */}
          <div className="w-full md:w-[40vw] h-[34vh] md:h-auto">
            <img
              src="/images/price_interior.jpg"
              alt="Barbershop interior"
              className="w-full h-full object-cover photo-frame"
            />
          </div>
        </div>
      </div>

      {/* Barber Cards */}
      <div className="px-[6vw]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-[4vw]">
          {barbers.map((barber, index) => (
            <div
              key={barber.name}
              ref={el => { cardsRef.current[index] = el; }}
              className="group"
            >
              {/* Photo */}
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={barber.image}
                  alt={barber.name}
                  className="w-full h-full object-cover photo-frame transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Info */}
              <div className="mt-6">
                <h3 className="font-western text-[#111] text-2xl uppercase tracking-wider">
                  {barber.name}
                </h3>
                <p className="font-condensed text-[#C72C2C] text-xs uppercase tracking-widest mt-1">
                  {barber.role}
                </p>
                <p className="font-typewriter text-[#6E6A62] text-sm mt-3">
                  {barber.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
