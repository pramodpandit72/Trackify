import { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "../../components/jobs/JobCard";
import { Link } from "react-router-dom";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("/api/jobs/list");
        setJobs(res.data.jobs || []);
      } catch (err) {
        console.log('Error fetching jobs:', err);
        // Dummy trainer job listings
        setJobs([
          {
            _id: '1',
            title: 'Certified Personal Trainer',
            location: 'Remote',
            type: 'Full-time',
            department: 'Training',
            description: 'Join our team of elite trainers and help clients achieve their fitness goals through personalized virtual training. We\'re looking for NASM, ACE, or ISSA certified trainers with 3+ years of experience.',
            salary: '$45,000 - $65,000',
            requirements: ['NASM, ACE, or ISSA certification', '3+ years training experience', 'Excellent communication skills']
          },
          {
            _id: '2',
            title: 'Specialized Trainer - Sports Performance',
            location: 'Remote',
            type: 'Full-time',
            department: 'Training',
            description: 'Work with athletes and fitness enthusiasts to optimize their performance through specialized training programs. Expertise in sports-specific training required.',
            salary: '$50,000 - $75,000',
            requirements: ['CSCS or similar certification', 'Sports performance background', 'Experience with athletes']
          },
          {
            _id: '3',
            title: 'Wellness & Nutrition Coach',
            location: 'Remote',
            type: 'Part-time',
            department: 'Training',
            description: 'Guide clients on their wellness journey with personalized nutrition and lifestyle coaching. Certification in nutrition or wellness coaching required.',
            salary: '$35,000 - $50,000',
            requirements: ['Nutrition certification', 'Coaching experience', 'Holistic wellness knowledge']
          },
          {
            _id: '4',
            title: 'Senior Strength & Conditioning Coach',
            location: 'Remote',
            type: 'Full-time',
            department: 'Training',
            description: 'Lead our strength training programs and mentor junior trainers. Advanced certifications and 5+ years of experience required.',
            salary: '$60,000 - $85,000',
            requirements: ['CSCS or similar advanced cert', '5+ years experience', 'Leadership skills']
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const values = [
    {
      icon: '🎯',
      title: 'Client-Focused',
      description: 'Everything we do is centered around helping clients succeed'
    },
    {
      icon: '💪',
      title: 'Excellence',
      description: 'We maintain the highest standards in training and client care'
    },
    {
      icon: '🤝',
      title: 'Support',
      description: 'Trainers support each other and share best practices'
    },
    {
      icon: '📈',
      title: 'Growth',
      description: 'Continuous learning and professional development'
    }
  ];

  const perks = [
    { icon: '💰', text: 'Competitive pay + performance bonuses' },
    { icon: '🏠', text: 'Work from anywhere - fully remote' },
    { icon: '⏰', text: 'Flexible scheduling - you choose your hours' },
    { icon: '🏥', text: 'Health, vision & dental insurance' },
    { icon: '📚', text: 'Free continuing education credits' },
    { icon: '🎓', text: 'Professional development & mentorship' },
    { icon: '💻', text: 'Technology & equipment stipend' },
    { icon: '🌴', text: 'Paid time off' }
  ];

  return (
    <div className="pt-25 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-[#f8f9fa] to-[#e9ecef] py-24 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#775fab]/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-bold text-[#1a1a1a] leading-tight">
                Want to be a Trainer at Trackify?
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Join our team of extraordinary certified trainers and help empower individuals to lead healthier, more confident lives through personalized virtual training.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-lg">
                  <span className="text-2xl">✓</span>
                  <span className="text-gray-700">Work remotely from anywhere</span>
                </div>
                <div className="flex items-center gap-3 text-lg">
                  <span className="text-2xl">✓</span>
                  <span className="text-gray-700">Set your own schedule</span>
                </div>
                <div className="flex items-center gap-3 text-lg">
                  <span className="text-2xl">✓</span>
                  <span className="text-gray-700">Competitive pay and benefits</span>
                </div>
              </div>
              <a
                href="#positions"
                className="inline-flex items-center justify-center bg-[#775fab] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#5d3d89] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                View Open Positions
              </a>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-linear-to-br from-[#775fab] to-[#32284a] rounded-3xl shadow-2xl flex items-center justify-center text-white">
                <div className="text-center p-8">
                  <div className="text-8xl mb-4">💪</div>
                  <h3 className="text-3xl font-bold mb-2">Join Our Trainer Network</h3>
                  <p className="text-lg opacity-90">Help people transform their lives</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-4">
              What We Look For
            </h2>
            <p className="text-xl text-gray-600">
              Our trainers are the backbone of what we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="bg-linear-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="positions" className="py-24 px-4 bg-linear-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-4">
              Trainer Openings
            </h2>
            <p className="text-xl text-gray-600">
              We're looking for passionate, certified trainers to join our growing team
            </p>
          </div>

          {jobs.length > 0 ? (
            <div className="grid gap-6">
              {jobs.map(job => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] mb-2">No Open Positions Right Now</h3>
              <p className="text-gray-600 mb-6">
                We don't have any open positions at the moment, but we're always looking for talented people. Check back soon or send us your resume!
              </p>
              <Link 
                to="/contact"
                className="inline-flex items-center justify-center bg-[#775fab] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#5d3d89] transition-all"
              >
                Contact Us
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Perks Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-4">
              Trainer Benefits
            </h2>
            <p className="text-xl text-gray-600">
              We invest in our trainers so they can focus on what matters most - their clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((perk, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-linear-to-br from-purple-50 to-white border border-purple-100 rounded-xl p-6">
                <div className="text-4xl">{perk.icon}</div>
                <p className="text-gray-700 font-medium">{perk.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-24 px-4 bg-linear-to-br from-[#32284a] to-[#443049] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">Why Train with Trackify?</h2>
              <p className="text-lg opacity-90 leading-relaxed mb-6">
                At Trackify, we believe great trainers deserve great support. We provide the technology, resources, and flexibility you need to focus on what you do best - transforming lives through fitness.
              </p>
              <p className="text-lg opacity-90 leading-relaxed mb-8">
                Whether you specialize in strength training, weight loss, sports performance, or rehabilitation, we'll match you with clients who need your expertise. Join our community of elite trainers making a real difference.
              </p>
              <a 
                href="#positions"
                className="inline-flex items-center justify-center bg-white text-[#775fab] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all shadow-xl"
              >
                View Trainer Positions
              </a>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 text-center">
              <div className="text-6xl mb-6">🏆</div>
              <h3 className="text-2xl font-bold mb-4">Elite Training Network</h3>
              <p className="text-lg opacity-90">
                Join a community of top-tier trainers dedicated to delivering exceptional results through personalized virtual coaching
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-6">
            Ready to Join Our Team?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            If you're passionate about fitness and helping others achieve their goals, we'd love to hear from you. Apply today and start making an impact!
          </p>
          <a 
            href="#positions"
            className="inline-flex items-center justify-center bg-[#775fab] text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-[#5d3d89] transition-all shadow-lg hover:shadow-xl"
          >
            View Open Positions
          </a>
        </div>
      </section>
    </div>
  );
}
