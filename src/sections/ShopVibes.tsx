import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ShopVibesProps {
  className?: string;
}

const ShopVibes = ({ className = '' }: ShopVibesProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const topPhotoRef = useRef<HTMLDivElement>(null);
  const bottomPhotoRef = useRef<HTMLDivElement>(null);
  const redBlockRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0-30%)
      scrollTl.fromTo(
        topPhotoRef.current,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        bottomPhotoRef.current,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.08
      );

      scrollTl.fromTo(
        redBlockRef.current,
        { x: '60vw', opacity: 0.9 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        ruleRef.current,
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        headlineRef.current,
        { y: '-12vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        bodyRef.current,
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      // EXIT (70-100%)
      scrollTl.fromTo(
        [topPhotoRef.current, bottomPhotoRef.current],
        { x: 0, opacity: 1 },
        { x: '-14vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        redBlockRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        ruleRef.current,
        { scaleY: 1 },
        { scaleY: 0, transformOrigin: 'bottom', ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-6vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bodyRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
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
      ref={sectionRef}
      className={`section-pinned bg-[#D8D0C6] ${className}`}
    >
      {/* Left Collage - Top Photo */}
      <div
        ref={topPhotoRef}
        className="absolute left-[6vw] top-[10vh] w-[34vw] h-[38vh]"
      >
        <img
          src="/images/vibes_chair.jpg"
          alt="Classic barbershop chair"
          className="w-full h-full object-cover photo-frame"
        />
      </div>

      {/* Left Collage - Bottom Photo */}
      <div
        ref={bottomPhotoRef}
        className="absolute left-[6vw] top-[54vh] w-[34vw] h-[38vh]"
      >
        <img
          src="/images/vibes_coffee.jpg"
          alt="Barbershop waiting area"
          className="w-full h-full object-cover photo-frame"
        />
      </div>

      {/* Vertical Rule */}
      <div
        ref={ruleRef}
        className="absolute left-[44vw] top-[10vh] w-[1.2vw] max-w-[12px] h-[80vh] bg-[#C72C2C] origin-top"
      />

      {/* Right Red Block */}
      <div
        ref={redBlockRef}
        className="absolute left-[50vw] top-0 w-[50vw] h-full bg-[#C72C2C]"
      />

      {/* Headline */}
      <div
        ref={headlineRef}
        className="absolute left-[58vw] top-[18vh] z-10"
      >
        <span className="font-western text-white text-[clamp(48px,8vw,120px)] uppercase tracking-wider block leading-none">
          Shop
        </span>
        <span className="font-western text-white text-[clamp(48px,8vw,120px)] uppercase tracking-wider block leading-none mt-2">
          Vibes
        </span>
      </div>

      {/* Body Copy */}
      <div
        ref={bodyRef}
        className="absolute left-[58vw] top-[62vh] w-[34vw] z-10"
      >
        <p className="font-typewriter text-white text-[clamp(14px,1.2vw,18px)] leading-relaxed">
          Leather chairs, good coffee, and conversation. No rush—just results.
        </p>
        <button
          onClick={scrollToContact}
          className="mt-6 flex items-center gap-2 font-condensed text-white text-sm uppercase tracking-widest hover:gap-4 transition-all"
        >
          Visit the Shop <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default ShopVibes;
