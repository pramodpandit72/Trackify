import React, { useState, useEffect } from 'react';
import TrainerCard from '../../components/ui/TrainerCard';
import CustomDropdown from '../../components/ui/CustomDropdown';
import axios from 'axios';

function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [filteredTrainers, setFilteredTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Important fitness specialties
  const specialties = [
    'Weight Loss',
    'Muscle Building',
    'Strength Training',
    'Cardio',
    'Flexibility',
    'Core Training'
  ];

  const ITEMS_PER_PAGE = 12;

  // Fetch trainers
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        setLoading(true);
        const params = {
          page,
          limit: ITEMS_PER_PAGE,
          ...(search && { search }),
          ...(selectedSpecialty && { specialty: selectedSpecialty })
        };

        const response = await axios.get('/api/trainers', { params });
        const data = response.data;

        setTrainers(data.items || []);
        setFilteredTrainers(data.items || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error('Error fetching trainers:', error);
        // Dummy data
        const dummyTrainers = [
          {
            _id: '1',
            name: 'Nate F.',
            title: 'Certified Personal Trainer',
            bio: 'MS in Exercise Science',
            specialties: ['Flexibility', 'Strength Training', 'Weight Loss'],
            rating: 4.9,
            reviewsCount: 715,
            experienceYears: 4,
            profilePicture: null,
            pricePerSession: 50
          },
          {
            _id: '2',
            name: 'Melissa',
            title: 'Certified Personal Trainer & Nutrition Specialist',
            bio: 'Athlete & Mom',
            specialties: ['Core Training', 'Cardio', 'Weight Loss'],
            rating: 4.9,
            reviewsCount: 547,
            experienceYears: 13,
            profilePicture: null,
            pricePerSession: 55
          },
          {
            _id: '3',
            name: 'Jay S.',
            title: 'Strength Coach',
            bio: 'Athlete turned pain-free performance coach',
            specialties: ['Functional Training', 'Cardio', 'Muscle Building'],
            rating: 5.0,
            reviewsCount: 198,
            experienceYears: 8,
            profilePicture: null,
            pricePerSession: 48
          }
        ];
        setTrainers(dummyTrainers);
        setFilteredTrainers(dummyTrainers);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, [page, search, selectedSpecialty]);

  return (
    <div className="pt-25 min-h-screen bg-gray-50">
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
      <div className="bg-white border-b border-gray-200 sticky top-25 z-40 py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Search */}
            <div>
              <label className="block text-sm font-semibold text-[#443049] mb-2">
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
                  className="w-full pl-11 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 transition-all duration-300 hover:border-[#775fab]/50 hover:shadow-md focus:outline-none focus:border-[#775fab] focus:shadow-lg focus:shadow-[#775fab]/10"
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
                <p className="text-gray-600 text-lg">Loading trainers...</p>
              </div>
            </div>
          ) : filteredTrainers.length > 0 ? (
            <>
              <div className="mb-6">
                <p className="text-gray-600">
                  Found <strong>{filteredTrainers.length}</strong> trainer(s)
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
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50"
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
                          : 'border border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No trainers found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Trainers;