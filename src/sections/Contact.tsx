import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ContactProps {
  className?: string;
}

const Contact = ({ className = '' }: ContactProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bannerRef.current,
        { y: '-6vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        contactRef.current,
        { x: '-8vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        formRef.current,
        { x: '8vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`relative bg-[#0B0F17] py-[10vh] ${className}`}
    >
      {/* Top Red Banner */}
      <div
        ref={bannerRef}
        className="w-full h-[34vh] bg-[#C72C2C] flex items-center justify-center"
      >
        <h2 className="font-western text-white text-[clamp(36px,6vw,80px)] uppercase tracking-wider text-center px-4">
          Book Your Chair.
        </h2>
      </div>

      {/* Content */}
      <div className="px-[6vw] mt-[10vh]">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Contact Info */}
          <div ref={contactRef} className="w-full lg:w-[40vw]">
            <h3 className="font-western text-white text-2xl uppercase tracking-wider mb-8">
              Visit Us
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#C72C2C] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-typewriter text-white/90">
                    123 Pearl Street
                  </p>
                  <p className="font-typewriter text-[#6E6A62]">Downtown</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-[#C72C2C] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-typewriter text-white/90">
                    Mon–Fri 9a–7p
                  </p>
                  <p className="font-typewriter text-[#6E6A62]">Sat 9a–4p</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-[#C72C2C] mt-1 flex-shrink-0" />
                <p className="font-typewriter text-white/90">(555) 864-0192</p>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-[#C72C2C] mt-1 flex-shrink-0" />
                <p className="font-typewriter text-white/90">
                  hello@gentlemansblade.com
                </p>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div ref={formRef} className="w-full lg:w-[42vw]">
            <div className="bg-white thick-border p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-[#C72C2C] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h4 className="font-western text-[#111] text-2xl uppercase tracking-wider">
                    Request Received
                  </h4>
                  <p className="font-typewriter text-[#6E6A62] mt-2">
                    We'll call you to confirm your appointment.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="font-condensed text-xs uppercase tracking-widest text-[#6E6A62] block mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full border-2 border-[#111] px-4 py-3 font-typewriter text-[#111] focus:outline-none focus:border-[#C72C2C] transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="font-condensed text-xs uppercase tracking-widest text-[#6E6A62] block mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full border-2 border-[#111] px-4 py-3 font-typewriter text-[#111] focus:outline-none focus:border-[#C72C2C] transition-colors"
                      placeholder="(555) 000-0000"
                    />
                  </div>

                  <div>
                    <label className="font-condensed text-xs uppercase tracking-widest text-[#6E6A62] block mb-2">
                      Service
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full border-2 border-[#111] px-4 py-3 font-typewriter text-[#111] focus:outline-none focus:border-[#C72C2C] transition-colors bg-white"
                    >
                      <option value="">Select a service</option>
                      <option value="haircut">Haircut - $45</option>
                      <option value="cut-shampoo">Cut & Shampoo - $55</option>
                      <option value="beard">Beard Sculpt - $30</option>
                      <option value="shave">Straight Razor Shave - $50</option>
                      <option value="grey">Grey Blend - $40</option>
                      <option value="brow">Brow Cleanup - $15</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-condensed text-xs uppercase tracking-widest text-[#6E6A62] block mb-2">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full border-2 border-[#111] px-4 py-3 font-typewriter text-[#111] focus:outline-none focus:border-[#C72C2C] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="font-condensed text-xs uppercase tracking-widest text-[#6E6A62] block mb-2">
                      Notes
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={3}
                      className="w-full border-2 border-[#111] px-4 py-3 font-typewriter text-[#111] focus:outline-none focus:border-[#C72C2C] transition-colors resize-none"
                      placeholder="Any special requests?"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#C72C2C] text-white font-western text-lg uppercase tracking-wider py-4 border-2 border-[#111] hover:bg-[#a82424] transition-colors"
                  >
                    Request Appointment
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-[10vh] px-[6vw] pt-8 border-t border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-western text-white/60 text-sm uppercase tracking-wider">
            Gentleman's Blade
          </p>
          <p className="font-typewriter text-white/40 text-xs">
            © 2024 All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
