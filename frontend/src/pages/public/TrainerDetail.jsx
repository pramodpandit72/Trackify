import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TestimonialCard from '../../components/ui/TestimonialCard';

function TrainerDetail() {
  const { trainerId } = useParams();
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainerDetails = async () => {
      try {
        const response = await axios.get(`/api/trainers/${trainerId}`);
        setTrainer(response.data.trainer);
        setReviews(response.data.reviews || []);
      } catch (error) {
        console.error('Error fetching trainer:', error);
        // Dummy data
        setTrainer({
          _id: trainerId,
          name: 'Nate F.',
          title: 'Certified Personal Trainer',
          bio: 'Has been with trainwell since 2019. MS in exercise science and health promotion.',
          specialties: ['Mobility', 'Strength', 'Sports Performance', 'Weight Loss'],
          rating: 4.9,
          reviewsCount: 715,
          experienceYears: 4,
          profilePicture: null,
          pricePerSession: 50,
          location: 'Virtual'
        });
        setReviews([
          {
            text: 'Nate is fantastic! He really understands my goals.',
            clientName: 'John D.',
            rating: 5
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainerDetails();
  }, [trainerId]);

  if (loading) {
    return (
      <div className="pt-25 min-h-screen flex items-center justify-center dark:bg-black">
        <p className="text-gray-600 dark:text-gray-400">Loading trainer details...</p>
      </div>
    );
  }

  if (!trainer) {
    return (
      <div className="pt-25 min-h-screen flex flex-col items-center justify-center dark:bg-black">
        <p className="text-gray-600 dark:text-gray-400 mb-6">Trainer not found</p>
        <button
          onClick={() => navigate('/trainers')}
          className="bg-[#775fab] text-white px-6 py-2 rounded-lg hover:bg-[#5d3d89]"
        >
          Back to Trainers
        </button>
      </div>
    );
  }

  return (
    <div className="pt-25 min-h-screen bg-gray-50 dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate('/trainers')}
          className="text-[#775fab] hover:text-[#5d3d89] mb-6 flex items-center gap-2"
        >
          ← Back to Trainers
        </button>

        {/* Trainer Header */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg dark:shadow-black/30 p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Profile Image */}
            <div className="md:col-span-1">
              <div className="h-64 bg-linear-to-br from-[#775fab] to-[#32284a] rounded-lg flex items-center justify-center text-6xl overflow-hidden">
                {trainer.profilePicture ? (
                  <img src={trainer.profilePicture} alt={trainer.name} className="w-full h-full object-cover" />
                ) : (
                  '👤'
                )}
              </div>
            </div>

            {/* Trainer Info */}
            <div className="md:col-span-2">
              <h1 className="text-4xl font-bold text-[#443049] dark:text-white mb-2">{trainer.name}</h1>
              <p className="text-purple-600 dark:text-purple-400 text-lg font-semibold mb-4">{trainer.title}</p>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(trainer.rating) ? "text-2xl text-yellow-400" : "text-2xl text-gray-300 dark:text-gray-600"}>
                      ⭐
                    </span>
                  ))}
                </div>
                <span className="text-gray-700 dark:text-gray-300">
                  {trainer.rating?.toFixed(1) || 'N/A'} ({trainer.reviewsCount || 0} reviews)
                </span>
              </div>

              {/* Quick Info */}
              <div className="space-y-3 mb-6">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Experience</p>
                  <p className="text-lg font-semibold text-[#443049] dark:text-white">{trainer.experienceYears} years</p>
                </div>
                {trainer.pricePerSession && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Price per Session</p>
                    <p className="text-lg font-semibold text-[#443049] dark:text-white">₹{trainer.pricePerSession}</p>
                  </div>
                )}
                {trainer.location && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                    <p className="text-lg font-semibold text-[#443049] dark:text-white">{trainer.location}</p>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <a
                href="/signup"
                className="inline-block bg-[#775fab] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#5d3d89] transition-colors"
              >
                Book a Session
              </a>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg dark:shadow-black/30 p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#443049] dark:text-white mb-4">About</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{trainer.bio}</p>
        </div>

        {/* Specialties */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg dark:shadow-black/30 p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#443049] dark:text-white mb-4">Specialties</h2>
          <div className="flex flex-wrap gap-2">
            {trainer.specialties?.map((specialty, i) => (
              <span
                key={i}
                className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full font-medium"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        {/* Reviews */}
        {reviews.length > 0 && (
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg dark:shadow-black/30 p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#443049] dark:text-white mb-6">Client Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review, index) => (
                <TestimonialCard key={index} review={review} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrainerDetail;
