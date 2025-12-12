import React, { useState, useEffect } from 'react';
import HeroSection from '../../components/sections/HeroSection';
import FeaturesSection from '../../components/sections/FeaturesSection';
import TestimonialsSection from '../../components/sections/TestimonialsSection';
import CTASection from '../../components/sections/CTASection';
import axios from 'axios';

function Home() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('/api/reviews');
        setTestimonials(response.data.items?.slice(0, 3) || []);
      } catch (error) {
        console.log('Error fetching reviews:', error);
        setTestimonials([
          {
            text: "I found a winning combination with Trackify and my coach! The personalized guidance and attentive coaching have been pivotal in my fitness journey, leading to tangible improvements in my balance, stamina, and overall well-being.",
            clientName: "Karen H.",
            trainerName: "Maya",
            rating: 5
          },
          {
            text: "Having a coach make your workouts is great, but having a coach that cares and makes your workout plans is even better. The best thing about my coach is I trust them, and I know they care.",
            clientName: "Kamden",
            trainerName: "Melissa",
            rating: 5
          },
          {
            text: "With the help and accountability of my trainer, I overcame an injury and regained abilities I thought were gone for life. The virtual training has been transformational.",
            clientName: "Eliot",
            trainerName: "Jared",
            rating: 5
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const features = [
    {
      icon: '💪',
      title: 'Customized Workouts',
      description: 'Fully customized workout programs designed around your fitness goals and current abilities'
    },
    {
      icon: '⏰',
      title: 'Anytime, Anywhere',
      description: 'Workouts you can perform in any location at any time'
    },
    {
      icon: '🔄',
      title: 'Unlimited Access',
      description: 'Unlimited 1-on-1 access to a specialized trainer'
    },
    {
      icon: '⌚',
      title: 'Smart Motion Tracking',
      description: 'Advanced motion tracking through your smartwatch'
    },
    {
      icon: '💬',
      title: 'Real-time Feedback',
      description: 'Real-time feedback on movement, pacing, and form'
    },
    {
      icon: '💰',
      title: 'Affordable Access',
      description: 'Certified trainers at less than half the cost of in-gym training'
    }
  ];

  return (
    <div className="pt-25">
      <HeroSection
        title="Get a Real Trainer Who Builds Your Plan, Holds You Accountable, and Helps You Become Your Strongest Self"
        subtitle="No bots pretending to care. No generic workout plans. Just real human support: personalized plans, accountability, and feedback that gets you to your fitness goals."
        ctaText="Get Started"
      />

      {/* Stats Section */}
      <section className="py-16 px-4 bg-linear-to-br from-white to-gray-50 dark:from-black dark:to-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-[#775fab] mb-2">92%</div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">of clients report more consistency with exercise</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-[#775fab] mb-2">89%</div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">of clients report increased strength</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-[#775fab] mb-2">73%</div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">of clients report boosted confidence</p>
            </div>
          </div>
          <p className="text-center text-xs text-gray-500 mt-8">*of 1,200 surveyed clients who rated Trackify's effectiveness</p>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 px-4 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1a1a1a] dark:text-white mb-6">
              Here's What Real Human Support Looks Like
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-linear-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-900 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-8">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] dark:text-white mb-3">The Perfect Trainer Match</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Take our quick assessment to find your perfect trainer, then video chat to get started. Your trainer understands your goals.
              </p>
            </div>

            <div className="bg-linear-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-900 border border-purple-100 dark:border-purple-900/30 rounded-2xl p-8">
              <div className="text-5xl mb-4">💯</div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] dark:text-white mb-3">Real Accountability</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                You'll commit to your trainer and work together to show up even when life gets crazy. Your trainer is your accountability partner.
              </p>
            </div>

            <div className="bg-linear-to-br from-green-50 to-white dark:from-green-900/20 dark:to-gray-900 border border-green-100 dark:border-green-900/30 rounded-2xl p-8">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] dark:text-white mb-3">Personalized Plans</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Step by step guidance. Our app shows you how to do each exercise and gives you live feedback on your pacing and form.
              </p>
            </div>

            <div className="bg-linear-to-br from-orange-50 to-white dark:from-orange-900/20 dark:to-gray-900 border border-orange-100 dark:border-orange-900/30 rounded-2xl p-8">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] dark:text-white mb-3">Form Checks to Stay Safe</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Your trainer is always a message away to review your form and keep you safe from injury.
              </p>
            </div>

            <div className="bg-linear-to-br from-pink-50 to-white dark:from-pink-900/20 dark:to-gray-900 border border-pink-100 dark:border-pink-900/30 rounded-2xl p-8">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] dark:text-white mb-3">Anytime, Anywhere</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Home, gym, or hotel. Your trainer adapts your plan to your equipment and schedule.
              </p>
            </div>

            <div className="bg-linear-to-br from-yellow-50 to-white dark:from-yellow-900/20 dark:to-gray-900 border border-yellow-100 dark:border-yellow-900/30 rounded-2xl p-8">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] dark:text-white mb-3">Track Your Progress</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Celebrate every win with your trainer as you become stronger and more capable.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FeaturesSection
        title="What You'll Get with Trackify"
        subtitle="For most people, including busy professionals and parents, having a virtual trainer is the obvious choice"
        features={features}
      />

      {/* Welcome to Your New Gym Section */}
      <section className="py-24 px-4 bg-linear-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-linear-to-br from-[#775fab] to-[#32284a] rounded-3xl shadow-2xl p-12 text-white">
                <div className="text-6xl mb-6">📱</div>
                <h3 className="text-3xl font-bold mb-4">App-Based Insights + Expert Guidance</h3>
                <p className="text-lg opacity-90 leading-relaxed">
                  You're not just getting app-guided workouts, and you're not just getting a video trainer. You're getting both, plus deeply personalized workouts and motion tracking.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-[#1a1a1a] dark:text-white">
                Welcome to Your New Gym: Anywhere
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                If virtual personal training brings to mind awkward video calls, think again. Advances in technology have brought us light years past the "watch and critique" era.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Video calls still have a role to play, and you can schedule one with your certified personal trainer anytime. Together, these customized workouts and 1-on-1 support calls give you the tools you need to meet your goals on your terms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Workouts Based on You Section */}
      <section className="py-24 px-4 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1a1a1a] dark:text-white mb-6">
              Workouts Based on You
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We're serious about personalization. Our trainers draw from a library of over 1,500 exercises to create truly customized workout routines designed for your unique fitness goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-linear-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-900 border border-purple-100 dark:border-purple-900/30 rounded-2xl p-8">
              <div className="text-4xl mb-4">🏃</div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] dark:text-white mb-3">Current Fitness Level</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Your trainer will adapt every workout to match your current fitness level, ensuring continuous progress and improvement.
              </p>
            </div>

            <div className="bg-linear-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-900 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-8">
              <div className="text-4xl mb-4">💪</div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] dark:text-white mb-3">Workout Preferences</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Whether you prefer cardio, bodyweight exercises, machines, or free weights, your trainer will customize workouts for you.
              </p>
            </div>

            <div className="bg-linear-to-br from-green-50 to-white dark:from-green-900/20 dark:to-gray-900 border border-green-100 dark:border-green-900/30 rounded-2xl p-8">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] dark:text-white mb-3">Access to Equipment</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                From no equipment at all to a fully equipped gym, your training sessions can be adapted to whatever resources you have.
              </p>
            </div>

            <div className="bg-linear-to-br from-orange-50 to-white dark:from-orange-900/20 dark:to-gray-900 border border-orange-100 dark:border-orange-900/30 rounded-2xl p-8">
              <div className="text-4xl mb-4">🩺</div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] dark:text-white mb-3">Physical Considerations</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Your trainer will take into account any injuries or physical limitations you have, crafting personalized workouts for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Approach Training */}
      <section className="py-24 px-4 bg-linear-to-br from-[#32284a] to-[#443049] text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            How Trackify Approaches Virtual Personal Training
          </h2>
          <p className="text-xl mb-12 opacity-90 max-w-3xl mx-auto">
            Our mission is to help as many people as possible reap the benefits of strength training. We believe fitness should fit into your life, not the other way around.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Personal Connection', 'Personalization', 'Gamification', 'Education', 'Accountability', 'Enjoyment', 'Progress Tracking', 'Flexibility'].map((item, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all">
                <p className="font-semibold text-lg">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trainer Quality Section */}
      <section className="py-24 px-4 bg-linear-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1a1a1a] dark:text-white mb-4">
              Not Your Average Personal Trainers
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Trackify only hires the most experienced trainers who embody our supportive and empathetic approach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-6xl mb-6">🎓</div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] dark:text-white mb-4">Highly Experienced & Educated</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Every trainer has a college degree, a nationally-accredited training certification, and at least 3 years of remote training experience.
              </p>
            </div>

            <div className="text-center">
              <div className="text-6xl mb-6">❤️</div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] dark:text-white mb-4">Caring & Approachable</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                No drill sergeants or trainers that think they're the best thing since sliced bread. Our trainers are real people just like you.
              </p>
            </div>

            <div className="text-center">
              <div className="text-6xl mb-6">⭐</div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] dark:text-white mb-4">The Best Training Career</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Unlike gyms, we hire every trainer as a full-time employee with stable salary, benefits, and 6-figure earning potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-24 px-4 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1a1a1a] dark:text-white mb-4">
              Our Trainers Specialize In...
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Whatever your fitness goal, we have trainers ready to help</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              'Strength Training',
              'Weight Loss',
              'Pre/Postpartum Fitness',
              'Injury Prevention & Rehab',
              'Athletic Performance',
              'Body Recomposition',
              'Peri/Menopause Training',
              'At-Home & Travel Workouts'
            ].map((specialty, idx) => (
              <div key={idx} className="bg-linear-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-900 border border-purple-100 dark:border-purple-900/30 rounded-xl p-6 text-center hover:shadow-lg dark:hover:shadow-black/30 transition-all">
                <p className="font-semibold text-[#1a1a1a] dark:text-white">{specialty}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-linear-to-r from-[#775fab]/10 to-[#32284a]/10 dark:from-[#775fab]/20 dark:to-[#32284a]/20 rounded-2xl border border-purple-100 dark:border-purple-900/30 text-center">
            <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">And so much more! 🎯</p>
          </div>
        </div>
      </section>

      {!loading && testimonials.length > 0 && (
        <TestimonialsSection 
          testimonials={testimonials}
          title="Loved by 52,000+ Clients"
          subtitle="Real people. Real results. Join thousands of clients who have changed their lives with the help of a Trackify trainer."
        />
      )}

      <CTASection
        title="Get Started with Trackify's Personal Trainers Today"
        description="Simply fill out a brief questionnaire, and we'll match you with a trainer. Transparent plans from $6/day. Cancel anytime."
        buttonText="Get Started Now"
      />
    </div>
  );
}

export default Home;
