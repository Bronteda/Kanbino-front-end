const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 px-4">
      {/* Logo */}
      <img
        src="../../images/kanbinologo.png"
        alt="Kanbino Logo"
        className="h-70 w-auto mb-6"
      />

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
        Welcome to <span className="text-[#F36A1B]">Kanbino</span>
      </h1>

      {/* Tagline */}
      <p className="text-lg sm:text-xl text-gray-600 mb-8">
        Your one-stop solution for project management.
      </p>

      {/* Call to Action */}
      <div className="flex space-x-4">
        <a
          href="/sign-up"
          className="px-6 py-3 bg-[#F36A1B] text-white font-medium rounded-xl shadow-md hover:bg-orange-600 transition-colors"
        >
          Get Started
        </a>
        <a
          href="/sign-in"
          className="px-6 py-3 bg-white text-[#3C75A6] border border-[#3C75A6] font-medium rounded-xl shadow-sm hover:bg-[#3C75A6] hover:text-white transition-colors"
        >
          Sign In
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
