
import React, { useState, useEffect } from 'react';

import TrainerCard from '../../components/ui/TrainerCard';
import CustomDropdown from '../../components/ui/CustomDropdown';
import axios from 'axios';
import AmitKumar from '../../assets/AmitKumar.webp';
import ArjunReddy from '../../assets/ArjunReddy.webp';
import KavitaNair from '../../assets/KavitaNair.webp';
import MeeraKapoor from '../../assets/MeeraKapoor.webp';
import PriyaDesai from '../../assets/PriyaDesai.webp';
import RajeshPatel from '../../assets/RajeshPatel.webp';
import SnehaSharma from '../../assets/SnehaSharma.webp';
import VikramSingh from '../../assets/VikramSingh.webp';

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [filteredTrainers, setFilteredTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const specialties = [
    'Weight Loss',
    'Muscle Building',
    'Strength Training',
    'Cardio',
    'Flexibility',
    'Core Training',
    'Functional Training',
  ];

  useEffect(() => {
    setLoading(true);
    const dummyTrainers = [
      {
        _id: '1',
        name: 'Amit Kumar',
        title: 'Certified Personal Trainer',
        bio: 'MS in Exercise Science',
        specialties: ['Flexibility', 'Strength Training', 'Weight Loss'],
        rating: 4.9,
        reviewsCount: 715,
        experienceYears: 4,
        profilePicture: AmitKumar,
        pricePerSession: 1800
      },
      {
        _id: '2',
        name: 'Meera Kapoor',
        title: 'Certified Personal Trainer & Nutrition Specialist',
        bio: 'Athlete & Mom',
        specialties: ['Core Training', 'Cardio', 'Weight Loss'],
        rating: 4.9,
        reviewsCount: 547,
        experienceYears: 13,
        profilePicture: MeeraKapoor,
        pricePerSession: 2200
      },
      {
        _id: '3',
        name: 'Rajesh Patel',
        title: 'Strength Coach',
        bio: 'Athlete turned pain-free performance coach',
        specialties: ['Functional Training', 'Cardio', 'Muscle Building'],
        rating: 5.0,
        reviewsCount: 198,
        experienceYears: 8,
        profilePicture: RajeshPatel,
        pricePerSession: 2700
      },
      {
        _id: '4',
        name: 'Priya Desai',
        title: 'Yoga & Wellness Coach',
        bio: 'Certified yoga instructor with a passion for holistic health and mindfulness.',
        specialties: ['Flexibility', 'Weight Loss', 'Cardio'],
        rating: 4.8,
        reviewsCount: 320,
        experienceYears: 6,
        profilePicture: PriyaDesai,
        pricePerSession: 2000
      },
      {
        _id: '5',
        name: 'Sneha Sharma',
        title: 'Pilates Instructor',
        bio: 'Expert in pilates and core training.',
        specialties: ['Core Training', 'Flexibility', 'Weight Loss'],
        rating: 4.7,
        reviewsCount: 410,
        experienceYears: 5,
        profilePicture: SnehaSharma,
        pricePerSession: 1900
      },
      {
        _id: '6',
        name: 'Kavita Nair',
        title: 'Cardio Specialist',
        bio: 'Helping clients improve heart health and stamina.',
        specialties: ['Cardio', 'Weight Loss', 'Strength Training'],
        rating: 4.6,
        reviewsCount: 350,
        experienceYears: 7,
        profilePicture: KavitaNair,
        pricePerSession: 2100
      },
      {
        _id: '7',
        name: 'Vikram Singh',
        title: 'Muscle Building Coach',
        bio: 'Specialist in muscle gain and strength.',
        specialties: ['Muscle Building', 'Strength Training', 'Cardio'],
        rating: 4.8,
        reviewsCount: 500,
        experienceYears: 9,
        profilePicture: VikramSingh,
        pricePerSession: 2300
      },
      {
        _id: '8',
        name: 'Arjun Reddy',
        title: 'Functional Training Expert',
        bio: 'Focus on functional movement and injury prevention.',
        specialties: ['Functional Training', 'Strength Training', 'Flexibility'],
        rating: 4.9,
        reviewsCount: 600,
        experienceYears: 10,
        profilePicture: ArjunReddy,
        pricePerSession: 2500
      }
    ];
    setTrainers(dummyTrainers);
    setFilteredTrainers(dummyTrainers);
    setLoading(false);
  }, []);

  useEffect(() => {
    // Always filter the trainers list (dummy or API)
    // Do not clear filteredTrainers if trainers is empty; just filter as normal
    let filtered = trainers;
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(trainer =>
        trainer.name.toLowerCase().includes(s) ||
        trainer.title.toLowerCase().includes(s) ||
        trainer.specialties.some(spec => spec.toLowerCase().includes(s))
      );
    }
    if (selectedSpecialty) {
      filtered = filtered.filter(trainer =>
        trainer.specialties.includes(selectedSpecialty)
      );
    }
    setFilteredTrainers(filtered);
    setTotalPages(1); // Only 1 page for now
  }, [trainers, search, selectedSpecialty]);

  return (
    <div className="pt-25 min-h-screen bg-gray-50 dark:bg-black">
      {/* Header */}
      <div className="bg-linear-to-r from-[#32284a] to-[#443049] text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Find Your Perfect Trainer</h1>
          <p className="text-lg opacity-90">
            Connect with certified personal trainers who understand your goals and fitness needs
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky" style={{ top: '4.5rem', zIndex: 40, paddingTop: '1.5rem', paddingBottom: '1.5rem', paddingLeft: '1rem', paddingRight: '1rem' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Search */}
            <div>
              <label className="block text-xs font-semibold text-[#443049] dark:text-gray-200 mb-1.5">
                <i className="fa-solid fa-magnifying-glass mr-2 text-[#775fab]"></i>
                Search Trainers
              </label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300 group-focus-within:text-[#775fab]">
                  <i className="fa-solid fa-search"></i>
                </span>
                <input
                  type="text"
                  placeholder="Search by name, specialty..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-700 dark:text-white placeholder-gray-400 text-sm transition-all duration-300 hover:border-[#775fab]/50 hover:shadow-md focus:outline-none focus:border-[#775fab] focus:shadow-lg focus:shadow-[#775fab]/10"
                />
              </div>
            </div>

            {/* Specialty Filter */}
            <CustomDropdown
              label="Filter by Specialty"
              icon="fa-solid fa-dumbbell"
              value={selectedSpecialty}
              onChange={(val) => {
                setSelectedSpecialty(val);
                setPage(1);
              }}
              placeholder="All Specialties"
              placeholderIcon="💪"
              options={specialties.map(specialty => ({
                value: specialty,
                label: specialty,
                icon: specialty === 'Weight Loss' ? '🏃' :
                      specialty === 'Muscle Building' ? '💪' :
                      specialty === 'Strength Training' ? '🏋️' :
                      specialty === 'Cardio' ? '❤️' :
                      specialty === 'Flexibility' ? '🧘' : '🎯',
                description: specialty === 'Weight Loss' ? 'Burn calories & shed fat' :
                             specialty === 'Muscle Building' ? 'Build lean muscle mass' :
                             specialty === 'Strength Training' ? 'Increase raw strength' :
                             specialty === 'Cardio' ? 'Improve heart health' :
                             specialty === 'Flexibility' ? 'Enhance mobility' : 'Core stability & strength'
              }))}
            />
          </div>
        </div>
      </div>

      {/* Trainers Grid */}
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center min-h-96">
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-400 text-lg">Loading trainers...</p>
              </div>
            </div>
          ) : filteredTrainers.length > 0 ? (
            <>
              <div className="mb-6">
                <p className="text-gray-600 dark:text-gray-400">
                  Found <strong className="dark:text-white">{filteredTrainers.length}</strong> trainer(s)
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {filteredTrainers.map(trainer => (
                  <TrainerCard key={trainer._id} trainer={trainer} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-12">
                  <button
                    onClick={() => setPage(prev => Math.max(1, prev - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-[#252542] dark:text-white disabled:opacity-50"
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setPage(i + 1)}
                      className={`px-4 py-2 rounded-lg ${
                        page === i + 1
                          ? 'bg-[#775fab] text-white'
                          : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-[#252542] dark:text-white'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-[#252542] dark:text-white disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">No trainers found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Trainers;
