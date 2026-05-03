import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TheCutProps {
  className?: string;
}

const TheCut = ({ className = '' }: TheCutProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const redBlockRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0-30%)
      scrollTl.fromTo(
        redBlockRef.current,
        { x: '-60vw', opacity: 0.9 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        photoRef.current,
        { x: '60vw', opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
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
        { x: '-20vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.08
      );

      scrollTl.fromTo(
        bodyRef.current,
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.12
      );

      // SETTLE (30-70%) - hold positions

      // EXIT (70-100%)
      scrollTl.fromTo(
        redBlockRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        photoRef.current,
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
        { y: '-8vh', opacity: 0, ease: 'power2.in' },
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
      id="services"
      ref={sectionRef}
      className={`section-pinned bg-[#D8D0C6] ${className}`}
    >
      {/* Left Red Block */}
      <div
        ref={redBlockRef}
        className="absolute left-0 top-0 w-[46vw] h-full bg-[#C72C2C]"
      />

      {/* Vertical Rule */}
      <div
        ref={ruleRef}
        className="absolute left-[50vw] top-[10vh] w-[1.2vw] max-w-[12px] h-[80vh] bg-[#C72C2C] origin-top"
      />

      {/* Right Photo */}
      <div
        ref={photoRef}
        className="absolute left-[54vw] top-[14vh] w-[40vw] h-[72vh]"
      >
        <img
          src="/images/cut_haircheck.jpg"
          alt="Barber checking a haircut"
          className="w-full h-full object-cover photo-frame"
        />
      </div>

      {/* Headline */}
      <div
        ref={headlineRef}
        className="absolute left-[6vw] top-[18vh] z-10"
      >
        <span className="font-western text-white text-[clamp(24px,3vw,48px)] uppercase tracking-wider block">
          The
        </span>
        <span className="font-western text-white text-[clamp(64px,10vw,140px)] uppercase tracking-wider block leading-none">
          Cut
        </span>
      </div>

      {/* Body Copy */}
      <div
        ref={bodyRef}
        className="absolute left-[6vw] top-[62vh] w-[34vw] z-10"
      >
        <p className="font-typewriter text-white text-[clamp(14px,1.2vw,18px)] leading-relaxed">
          A sharp shape tailored to your jawline, hair type, and daily routine.
          Finished with a hot towel neck clean-up.
        </p>
        <button
          onClick={scrollToContact}
          className="mt-6 flex items-center gap-2 font-condensed text-white text-sm uppercase tracking-widest hover:gap-4 transition-all"
        >
          Book a Cut <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default TheCut;
