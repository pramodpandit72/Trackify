import React from 'react';
import TestimonialCard from '../ui/TestimonialCard';

function TestimonialsSection({ testimonials, title = "What Our Clients Say", subtitle = "Thousands of real clients have accomplished real change on the Trackify platform" }) {
  return (
    <section className="py-24 px-4 bg-linear-to-br from-gray-50 to-white dark:from-black dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1a1a1a] dark:text-white mb-4">{title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index}
              review={testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
