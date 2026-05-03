import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  className?: string;
}

const Hero = ({ className = '' }: HeroProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const poleRef = useRef<HTMLDivElement>(null);
  const titleTopRef = useRef<HTMLHeadingElement>(null);
  const titleBottomRef = useRef<HTMLHeadingElement>(null);
  const leftTicketRef = useRef<HTMLDivElement>(null);
  const rightTicketRef = useRef<HTMLDivElement>(null);

  // Auto-play entrance animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Pole entrance
      tl.fromTo(
        poleRef.current,
        { y: '-120vh', rotation: -8 },
        { y: 0, rotation: 0, duration: 0.6 },
        0
      );

      // Title animations
      tl.fromTo(
        titleTopRef.current,
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.25
      );

      tl.fromTo(
        titleBottomRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.35
      );

      // Ticket entrances
      tl.fromTo(
        leftTicketRef.current,
        { scale: 0.92, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5 },
        0.55
      );

      tl.fromTo(
        rightTicketRef.current,
        { scale: 0.92, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5 },
        0.65
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements when scrolling back to top
            gsap.set(poleRef.current, { y: 0, scale: 1, opacity: 1 });
            gsap.set([titleTopRef.current, titleBottomRef.current], {
              y: 0,
              opacity: 1,
            });
            gsap.set(leftTicketRef.current, { x: 0, opacity: 1 });
            gsap.set(rightTicketRef.current, { x: 0, opacity: 1 });
          },
        },
      });

      // Exit animations (70-100%)
      scrollTl.fromTo(
        poleRef.current,
        { y: 0, scale: 1, opacity: 1 },
        { y: '-18vh', scale: 0.96, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [titleTopRef.current, titleBottomRef.current],
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        leftTicketRef.current,
        { x: 0, opacity: 1 },
        { x: '-12vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        rightTicketRef.current,
        { x: 0, opacity: 1 },
        { x: '12vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className={`section-pinned bg-[#D8D0C6] flex items-center justify-center ${className}`}
    >
      {/* Barber Pole */}
      <div
        ref={poleRef}
        className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[18vw] h-[92vh] max-w-[200px] min-w-[120px]"
      >
        {/* Top cap */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-[120%] aspect-square rounded-full bg-gradient-to-b from-[#1e3a5f] to-[#0B0F17] shadow-lg z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 aspect-square rounded-full bg-gradient-to-br from-gray-300 to-gray-500" />
        </div>

        {/* Pole body */}
        <div className="w-full h-full barber-pole rounded-sm shadow-xl" />

        {/* Bottom cap */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[120%] aspect-square rounded-full bg-gradient-to-b from-[#0B0F17] to-[#1e3a5f] shadow-lg z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 aspect-square rounded-full bg-gradient-to-br from-gray-300 to-gray-500" />
        </div>
      </div>

      {/* Center Title */}
      <div className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 z-20 text-center">
        <h1
          ref={titleTopRef}
          className="font-western text-white text-[clamp(32px,5vw,80px)] uppercase tracking-wider text-shadow-vintage leading-none"
        >
          Gentleman's
        </h1>
        <h1
          ref={titleBottomRef}
          className="font-western text-white text-[clamp(48px,8vw,120px)] uppercase tracking-wider text-shadow-vintage leading-none mt-2"
        >
          Blade
        </h1>
      </div>

      {/* Bottom Left Ticket - Info */}
      <div
        ref={leftTicketRef}
        className="absolute left-[6vw] bottom-[10vh] w-[26vw] min-w-[280px] max-w-[380px] bg-white p-6 thick-border-red"
      >
        <p className="font-typewriter text-sm md:text-base text-[#111] uppercase tracking-wide">
          123 Pearl Street — Downtown
        </p>
        <p className="font-typewriter text-sm md:text-base text-[#6E6A62] mt-2">
          Mon–Fri 9a–7p / Sat 9a–4p
        </p>
      </div>

      {/* Bottom Right Ticket - CTA */}
      <div
        ref={rightTicketRef}
        className="absolute right-[6vw] bottom-[10vh] w-[26vw] min-w-[280px] max-w-[380px] bg-[#C72C2C] p-6 thick-border cursor-pointer group"
        onClick={scrollToContact}
      >
        <p className="font-western text-xl md:text-2xl text-white uppercase tracking-wider text-center">
          Book Appointment
        </p>
        <div className="flex items-center justify-center gap-2 mt-3">
          <Phone className="w-4 h-4 text-white" />
          <p className="font-typewriter text-sm md:text-base text-white">
            (555) 864-0192
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
