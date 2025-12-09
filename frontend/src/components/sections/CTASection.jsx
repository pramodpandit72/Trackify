import React from 'react';
import { Link } from 'react-router-dom';

function CTASection({ title, description, buttonText = "Get Started", buttonLink = "/signup" }) {
  return (
    <section className="py-24 px-4 bg-linear-to-br from-[#775fab] to-[#32284a] text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">{title}</h2>
        <p className="text-xl mb-10 opacity-95 leading-relaxed max-w-3xl mx-auto">{description}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to={buttonLink}
            className="inline-flex items-center justify-center bg-white text-[#775fab] px-10 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all shadow-xl transform hover:-translate-y-0.5"
          >
            {buttonText}
          </Link>
          <Link 
            to="/trainers"
            className="inline-flex items-center justify-center border-2 border-white text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-[#775fab] transition-all"
          >
            Browse Trainers
          </Link>
        </div>
        
        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm opacity-90">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>Flexible plans</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
