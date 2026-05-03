import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ClassicServiceProps {
  className?: string;
}

const ClassicService = ({ className = '' }: ClassicServiceProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const headlineLeftRef = useRef<HTMLSpanElement>(null);
  const headlineRightRef = useRef<HTMLSpanElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

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
        bannerRef.current,
        { y: '-40vh', opacity: 0.9 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        photoRef.current,
        { y: '70vh', opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        headlineLeftRef.current,
        { x: '-20vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.08
      );

      scrollTl.fromTo(
        headlineRightRef.current,
        { x: '20vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.08
      );

      scrollTl.fromTo(
        [subheadRef.current, ctaRef.current],
        { y: '4vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.12
      );

      // EXIT (70-100%)
      scrollTl.fromTo(
        bannerRef.current,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        photoRef.current,
        { y: 0, opacity: 1 },
        { y: '18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [headlineLeftRef.current, headlineRightRef.current],
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [subheadRef.current, ctaRef.current],
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
      {/* Top Red Banner */}
      <div
        ref={bannerRef}
        className="absolute left-0 top-0 w-full h-[34vh] bg-[#C72C2C]"
      >
        {/* Headline */}
        <div className="absolute inset-0 flex items-center justify-between px-[6vw]">
          <span
            ref={headlineLeftRef}
            className="font-western text-white text-[clamp(36px,6vw,96px)] uppercase tracking-wider"
          >
            Classic
          </span>
          <span
            ref={headlineRightRef}
            className="font-western text-white text-[clamp(36px,6vw,96px)] uppercase tracking-wider"
          >
            Service
          </span>
        </div>

        {/* Subheadline */}
        <p
          ref={subheadRef}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 font-condensed text-white/90 text-sm uppercase tracking-[0.2em]"
        >
          Consultation · Precision · Clean Finish
        </p>
      </div>

      {/* Bottom Photo */}
      <div
        ref={photoRef}
        className="absolute left-[6vw] top-[42vh] w-[88vw] h-[52vh]"
      >
        <img
          src="/images/classic_banner.jpg"
          alt="Barbershop scene"
          className="w-full h-full object-cover photo-frame"
        />

        {/* CTA over photo */}
        <button
          ref={ctaRef}
          onClick={scrollToContact}
          className="absolute right-8 bottom-8 flex items-center gap-2 font-condensed text-white text-sm uppercase tracking-widest bg-[#C72C2C] px-6 py-3 hover:bg-[#a82424] transition-colors"
        >
          Book Now <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default ClassicService;
