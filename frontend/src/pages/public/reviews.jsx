import React, { useState, useEffect } from 'react';
import TestimonialCard from '../../components/ui/TestimonialCard';
import axios from 'axios';

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/reviews', {
          params: { page, limit: ITEMS_PER_PAGE }
        });
        setReviews(response.data.items || []);
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        // Dummy reviews
        const dummyReviews = [
          {
            _id: '1',
            text: "I found a winning combination! The personalized guidance and attentive coaching have been pivotal in my fitness journey, leading to tangible improvements in balance, stamina, and overall well-being.",
            clientName: "Karen H.",
            trainerName: "Maya",
            rating: 5
          },
          {
            _id: '2',
            text: "I have been with my coach for over three months and I love her! The best thing about my coach is I trust her, and I know she cares.",
            clientName: "Kamden",
            trainerName: "Mel",
            rating: 5
          },
          {
            _id: '3',
            text: "With the help and accountability of my trainer, I overcame an injury and regained abilities I thought were gone forever.",
            clientName: "Eliot",
            trainerName: "Jared",
            rating: 5
          },
          {
            _id: '4',
            text: "The flexibility of working out whenever I want combined with personalized programming is exactly what I needed.",
            clientName: "Sarah M.",
            trainerName: "Alex",
            rating: 5
          },
          {
            _id: '5',
            text: "As a busy parent, this virtual option is perfect for my lifestyle, and my trainer adapts workouts to my home setup.",
            clientName: "Michael T.",
            trainerName: "Jordan",
            rating: 5
          },
          {
            _id: '6',
            text: "The form correction feedback is incredible. My trainer catches things I would never notice.",
            clientName: "Jennifer L.",
            trainerName: "Nicole",
            rating: 4.9
          }
        ];
        setReviews(dummyReviews);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [page]);

  return (
    <div className="pt-25 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-linear-to-r from-[#32284a] to-[#443049] text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Client Testimonials</h1>
          <p className="text-lg opacity-90">
            See what our clients have achieved with personalized virtual training
          </p>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {reviews.length > 0 ? (
            <>
              <div className="mb-6">
                <p className="text-gray-600">
                  <strong>{reviews.length}</strong> testimonials from our satisfied clients
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {reviews.map(review => (
                  <TestimonialCard key={review._id} review={review} />
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
              <p className="text-gray-600 text-lg">No testimonials found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reviews;