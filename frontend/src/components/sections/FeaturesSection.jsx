function FeaturesSection({ title, features, subtitle }) {
  return (
    <section className="py-24 px-4 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1a1a1a] dark:text-white mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
        
        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-linear-to-br from-gray-50 to-white dark:from-gray-900 dark:to-[#252542] border border-gray-200 dark:border-gray-700 rounded-2xl p-8 hover:shadow-xl dark:hover:shadow-black/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-[#1a1a1a] dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
