import React from "react";

const About = () => {
  const isDark = false;
  const services = [
    {
      name: "AC Repair",
      description: "Expert AC servicing, gas filling, and installation by certified technicians.",
      icon: "❄️"
    },
    {
      name: "Plumbing",
      description: "24/7 plumbing solutions for leaks, blockages, and installations.",
      icon: "🚰"
    },
    {
      name: "Electrical",
      description: "Safe wiring, fixture installation, and electrical repairs by licensed electricians.",
      icon: "💡"
    },
    {
      name: "TV Repair",
      description: "Professional diagnosis and repair for all TV brands and models.",
      icon: "📺"
    },
    {
      name: "Painting",
      description: "Interior and exterior painting with premium quality materials.",
      icon: "🎨"
    },
    {
      name: "Appliance Repair",
      description: "Fixing washing machines, refrigerators, and other home appliances.",
      icon: "🛠️"
    }
  ];

  return (
    <div className="min-h-screen dashboard-bg-pattern text-slate-900">
      {/* Hero Section */}
      <div className={`relative ${isDark ? "bg-gray-900 text-white" : "bg-blue-600 text-white"} py-12 md:py-20`}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="max-w-10xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            About Provider
          </h1>
          <p className="text-lg sm:text-xl md:text-xl mb-6 sm:mb-8">
            Your trusted partner for all home service needs.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className={`max-w-10xl mx-auto px-4 sm:px-6 py-8 sm:py-12 ${isDark ? "text-white" : "text-black"}`}>
        {/* Introduction */}
        <section className="mb-12 sm:mb-16">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
            <div className="md:w-1/2 w-full">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                alt="Professional service" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="md:w-1/2 w-full">
              <h2 className={`text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 ${isDark ? "text-gray-200" : "text-gray-800"}`}>Why Choose Provider ?</h2>
              <p className={`text-base sm:text-lg mb-3 sm:mb-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                Daksh revolutionizes home services by offering professional, affordable, and reliable solutions right at your doorstep. With just a few clicks, you can book experienced professionals for all your home maintenance needs.
              </p>
              <p className={`text-base sm:text-lg ${isDark ? "text-gray-300" : "text-gray-700"}`}>Our mission is to make home maintenance simple, accessible, and stress-free for everyone. We understand that your home is your sanctuary, and we treat it with the care and respect it deserves.</p>
            </div>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section className={`mb-12 sm:mb-16 p-6 sm:p-8 rounded-10xl shadow-md ${isDark ? "bg-gray-800" : "bg-white"}`}>
          <h2 className={`text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center ${isDark ? "text-white" : "text-gray-800"}`}>What Makes Us Different</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className={`${isDark ? "bg-gray-900" : "bg-blue-50"} p-4 sm:p-6 rounded-lg`}>
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🏆</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Verified Professionals</h3>
              <p className={`text-sm sm:text-base ${isDark ? "text-gray-300" : "text-gray-600"}`}>Every service provider on our platform is carefully vetted with background checks and has minimum 1 year of verified experience.</p>
            </div>
            <div className={`${isDark ? "bg-gray-900" : "bg-blue-50"} p-4 sm:p-6 rounded-lg`}>
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">⏱️</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Quick Response</h3>
              <p className={`text-sm sm:text-base ${isDark ? "text-gray-300" : "text-gray-600"}`}>Our average response time is under 30 minutes, with most services completed the same day you book them.</p>
            </div>
            <div className={`${isDark ? "bg-gray-900" : "bg-blue-50"} p-4 sm:p-6 rounded-lg`}>
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">💰</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Transparent Pricing</h3>
              <p className={`text-sm sm:text-base ${isDark ? "text-gray-300" : "text-gray-600"}`}>No hidden charges. We provide upfront pricing before any work begins, with 100% satisfaction guarantee.</p>
            </div>
          </div>
        </section>

        {/* Our Services */}
        <section className="max-w-10xl mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-gray-800">
            Our Services
          </h2>
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`${isDark ? "bg-gray-800" : "bg-white"} p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-blue-500`}
              >
                <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">{service.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{service.name}</h3>
                <p className={`text-sm sm:text-base ${isDark ? "text-gray-300" : "text-gray-600"}`}>{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}

        <section className={`${isDark ? "bg-gray-900 text-white" : "bg-blue-600 text-white"} p-6 sm:p-8 rounded-10xl`}>
          
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center">
              <div className={`bg-white ${isDark ? "text-black" : "text-blue-600"} rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mx-auto mb-3 sm:mb-4 font-bold text-lg sm:text-xl`}>1</div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">Book a Service</h3>
              <p className="text-blue-100 text-xs sm:text-sm">Select your service and preferred time slot through our app or website</p>
            </div>
            <div className="text-center">
              <div className={`bg-white ${isDark ? "text-black" : "text-blue-600"} rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mx-auto mb-3 sm:mb-4 font-bold text-lg sm:text-xl`}>2</div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">Get Matched</h3>
              <p className="text-blue-100 text-xs sm:text-sm">We instantly connect you with the best available professional in your area</p>
            </div>
            <div className="text-center">
              <div className={`bg-white ${isDark ? "text-black" : "text-blue-600"} rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mx-auto mb-3 sm:mb-4 font-bold text-lg sm:text-xl`}>3</div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">Professional Service</h3>
              <p className="text-blue-100 text-xs sm:text-sm">Our expert arrives on time with all necessary tools and parts</p>
            </div>
            <div className="text-center">
              <div className={`bg-white ${isDark ? "text-black" : "text-blue-600"} rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mx-auto mb-3 sm:mb-4 font-bold text-lg sm:text-xl`}>4</div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">Job Done</h3>
              <p className="text-blue-100 text-xs sm:text-sm">Pay securely only after you're completely satisfied with the service</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;