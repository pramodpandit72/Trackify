import React, { useState, useEffect } from 'react';
import TrainerCard from '../../components/ui/TrainerCard';
import axios from 'axios';

function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [filteredTrainers, setFilteredTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [specialties, setSpecialties] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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

        // Extract unique specialties
        const allSpecialties = new Set();
        (data.items || []).forEach(trainer => {
          trainer.specialties?.forEach(s => allSpecialties.add(s));
        });
        setSpecialties(Array.from(allSpecialties).sort());
      } catch (error) {
        console.error('Error fetching trainers:', error);
        // Dummy data
        const dummyTrainers = [
          {
            _id: '1',
            name: 'Nate F.',
            title: 'Certified Personal Trainer',
            bio: 'MS in Exercise Science',
            specialties: ['Mobility', 'Strength', 'Weight Loss'],
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
            specialties: ['Women\'s Fitness', 'Autoimmune Health'],
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
            specialties: ['Prenatal/Postpartum', 'HIIT', 'Functional Strength'],
            rating: 5.0,
            reviewsCount: 198,
            experienceYears: 8,
            profilePicture: null,
            pricePerSession: 48
          }
        ];
        setTrainers(dummyTrainers);
        setFilteredTrainers(dummyTrainers);
        setSpecialties(['Mobility', 'Strength', 'Weight Loss', 'Women\'s Fitness', 'HIIT']);
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
              <label className="block text-sm font-medium text-[#443049] mb-2">
                Search Trainers
              </label>
              <input
                type="text"
                placeholder="Search by name, specialty..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#775fab]"
              />
            </div>

            {/* Specialty Filter */}
            <div>
              <label className="block text-sm font-medium text-[#443049] mb-2">
                Filter by Specialty
              </label>
              <select
                value={selectedSpecialty}
                onChange={(e) => {
                  setSelectedSpecialty(e.target.value);
                  setPage(1);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#775fab]"
              >
                <option value="">All Specialties</option>
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>
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