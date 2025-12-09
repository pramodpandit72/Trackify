import React from 'react';
import { Link } from 'react-router-dom';
import heroVideo from '../../assets/Hero_section_video.mp4';

const ACCENT_COLOR = '#775fab';
const DARK_COLOR = '#32284a';
const LIGHT_BG = '#f8f9fa';
const LIGHT_BG_ALT = '#e9ecef';

const ArrowIcon = () => (
  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
);

const TrustBadge = ({ label, description }) => (
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
      <span className="text-white font-bold">✓</span>
    </div>
    <div>
      <p className="text-white font-semibold">{label}</p>
      <p className="text-white/70 text-sm">{description}</p>
    </div>
  </div>
);

const TRUST_BADGES = [
  { label: 'Flexible Plans', description: 'Start anytime' },
  { label: 'Cancel Anytime', description: 'No lock-in' },
  { label: 'Expert Trainers', description: 'Certified professionals' }
];

function HeroSection({ 
  title = "Transform Your Fitness", 
  subtitle = "With expert guidance and support", 
  ctaText = "Get Started", 
  ctaLink = "/signup",
}) {
  return (
    <section className="relative min-h-[90vh] flex items-center px-4 pt-[100px] pb-20 bg-linear-to-br from-[#f8f9fa] to-[#e9ecef] overflow-hidden -mt-[100px]">
      {/* Video Background */}
      <video 
        autoPlay 
        muted 
        loop 
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-black/20 z-5" />

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
        <div className={`absolute top-20 right-20 w-96 h-96 bg-[${ACCENT_COLOR}] rounded-full blur-3xl`} />
        <div className={`absolute bottom-20 right-40 w-40 h-40 bg-[${DARK_COLOR}] rounded-full blur-3xl`} />
      </div>
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="space-y-8">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ACCENT_COLOR }} />
            <span className="text-sm font-semibold" style={{ color: ACCENT_COLOR }}>Transform Your Fitness Journey</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight drop-shadow-lg max-w-2xl">
            {title}
          </h1>

          {/* Subheading */}
          <p className="text-lg lg:text-xl text-white/90 leading-relaxed max-w-xl drop-shadow-md">
            {subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link 
              to={ctaLink}
              className="inline-flex items-center justify-center text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-2xl transform hover:-translate-y-1 backdrop-blur-sm hover:shadow-2xl"
              style={{ backgroundColor: ACCENT_COLOR }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#5d3d89'}
              onMouseLeave={(e) => e.target.style.backgroundColor = ACCENT_COLOR}
            >
              {ctaText}
              <ArrowIcon />
            </Link>
            <Link 
              to="/trainers"
              className="inline-flex items-center justify-center border-2 border-white text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 backdrop-blur-sm hover:bg-white"
              style={{ '--hover-text-color': ACCENT_COLOR }}
              onMouseEnter={(e) => e.target.style.color = ACCENT_COLOR}
              onMouseLeave={(e) => e.target.style.color = 'white'}
            >
              Browse Trainers
            </Link>
          </div>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap gap-8 pt-8">
            {TRUST_BADGES.map((badge, idx) => (
              <TrustBadge key={idx} {...badge} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
