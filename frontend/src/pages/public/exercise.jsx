import React, { useState, useEffect } from 'react';
import ExerciseCard from '../../components/ui/ExerciseCard';
import { exercisesLibrary, exerciseCategories, difficulties } from '../../data/exercisesLibrary';
import axios from 'axios';

function Exercise() {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalExercises, setTotalExercises] = useState(0);
  const [usingLocalData, setUsingLocalData] = useState(false);

  const ITEMS_PER_PAGE = 12;

  // Fetch exercises - Initial load only
  useEffect(() => {
    const fetchExercises = async () => {
      setLoading(true);
      console.log('[Exercise] Component mounted, loading exercises...');
      
      try {
        // Try API first
        console.log('[Exercise] Attempting to fetch from API...');
        const response = await axios.get('/api/exercises', { params: { limit: 1000 } });
        const data = response.data;
        console.log('[Exercise] API returned:', data.items?.length || 0, 'exercises');

        setExercises(data.items || []);
        setUsingLocalData(false);

        // Extract unique categories
        const allCategories = new Set();
        (data.items || []).forEach(exercise => {
          if (exercise.category) allCategories.add(exercise.category);
        });
        setCategories(Array.from(allCategories).sort());
        setLoading(false);
      } catch (error) {
        console.log('[Exercise] API failed, using local data:', error.message);
        setUsingLocalData(true);
        
        // Use local exercise library as fallback
        console.log('[Exercise] exercisesLibrary length:', exercisesLibrary.length);
        const exercisesWithIds = exercisesLibrary.map((ex, idx) => ({
          ...ex,
          _id: ex.id || `exercise-${idx}`
        }));
        
        console.log('[Exercise] Processed local exercises:', exercisesWithIds.length);
        setExercises(exercisesWithIds);
        
        // Extract unique categories from exercise library
        console.log('[Exercise] exerciseCategories:', exerciseCategories);
        const allCategories = new Set(exerciseCategories);
        setCategories(Array.from(allCategories).sort());
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  // Client-side filtering and pagination for local data
  useEffect(() => {
    console.log('[Exercise-Filter] Running filter effect with exercises:', exercises.length);
    
    if (exercises.length === 0) {
      console.log('[Exercise-Filter] No exercises, setting empty filtered list');
      setFilteredExercises([]);
      setTotalExercises(0);
      setTotalPages(1);
      return;
    }

    let filtered = [...exercises];

    // Apply search filter
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(exercise =>
        exercise.name.toLowerCase().includes(searchLower) ||
        exercise.description?.toLowerCase().includes(searchLower) ||
        exercise.muscleGroups?.some(muscle => muscle.toLowerCase().includes(searchLower))
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(exercise => exercise.category === selectedCategory);
    }

    // Apply difficulty filter
    if (selectedDifficulty) {
      filtered = filtered.filter(exercise => exercise.difficulty === selectedDifficulty);
    }

    // Set total count before pagination
    setTotalExercises(filtered.length);

    // For local data, apply pagination
    if (usingLocalData) {
      const totalPagesCount = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
      const startIdx = (page - 1) * ITEMS_PER_PAGE;
      const endIdx = startIdx + ITEMS_PER_PAGE;
      const paginatedExercises = filtered.slice(startIdx, endIdx);
      
      console.log('[Exercise-Filter] Setting paginated exercises:', paginatedExercises.length, 'of', filtered.length);
      
      setFilteredExercises(paginatedExercises);
      setTotalPages(totalPagesCount);
    } else {
      // For API data, use all results
      console.log('[Exercise-Filter] Using API data, showing all filtered');
      setFilteredExercises(filtered);
      setTotalPages(1);
    }
  }, [search, selectedCategory, selectedDifficulty, exercises, page, usingLocalData, ITEMS_PER_PAGE]);

  return (
    <div className="pt-25 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-linear-to-r from-[#32284a] to-[#443049] text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Exercise Library</h1>
          <p className="text-lg opacity-90">
            Explore our comprehensive library of exercises tailored to all fitness levels
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white border-b border-gray-200 sticky top-25 z-40 py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-[#443049] mb-2">
                Search Exercises
              </label>
              <input
                type="text"
                placeholder="Search by name..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1); // Reset to first page on search
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#775fab]"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-[#443049] mb-2">
                Filter by Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setPage(1);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#775fab]"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-medium text-[#443049] mb-2">
                Filter by Difficulty
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => {
                  setSelectedDifficulty(e.target.value);
                  setPage(1);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#775fab]"
              >
                <option value="">All Levels</option>
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Exercises Grid */}
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {filteredExercises.length > 0 ? (
            <>
              <div className="mb-6">
                <p className="text-gray-600">
                  Found <strong>{totalExercises}</strong> exercise(s)
                  {usingLocalData && totalPages > 1 && (
                    <span className="ml-2 text-sm">(Page {page} of {totalPages})</span>
                  )}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {filteredExercises.map(exercise => (
                  <ExerciseCard key={exercise._id} exercise={exercise} />
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
              <p className="text-gray-600 text-lg">No exercises found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Exercise;