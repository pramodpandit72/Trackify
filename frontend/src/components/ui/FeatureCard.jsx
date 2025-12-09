import React from 'react';

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-start gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="text-4xl">{icon}</div>
      <h3 className="text-xl font-semibold text-[#443049]">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

export default FeatureCard;
