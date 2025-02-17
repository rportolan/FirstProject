const LandingPage = () => {
  return (
    <div className="bg-tertiary min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 md:p-6 flex items-center justify-between">
        {/* Logo à gauche */}
        <div className="text-xl md:text-2xl font-bold">One Goal</div>
        
        {/* Liens de navigation au centre */}
        <nav className="hidden md:flex flex-1 justify-center">
          <a href="#features" className="hover:underline ml-4 md:ml-9">Features</a>
          <a href="#about" className="hover:underline ml-4 md:ml-9">About</a>
          <a href="#contact" className="hover:underline ml-4 md:ml-9">Contact</a>
        </nav>
        
        {/* Liens de connexion et d'inscription à droite */}
        <div className="flex space-x-2 md:space-x-4">
          <a href="/login" className="border border-secondary px-6 md:px-10 py-2 rounded-md hover:bg-primary hover:text-white">Login</a>
          <a href="/register" className="bg-tertiary border border-secondary px-6 md:px-10 py-2 rounded-md hover:bg-primary hover:text-white">Register</a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-grow flex items-center justify-center bg-cover bg-center px-4" style={{ backgroundImage: "url('https://source.unsplash.com/featured/?goals,productivity')" }}>
        <div className="text-center p-6 bg-opacity-50 rounded-lg max-w-lg md:max-w-3xl">
          <h1 className="text-2xl md:text-4xl font-bold">Structure Your Goals Efficiently</h1>
          <p className="text-base md:text-lg mb-8 md:mb-12">Organize, track, and achieve your goals with our powerful tools designed to streamline your productivity.</p>
          <a href="/register" className="border border-secondary text-white px-12 md:px-24 py-2 md:py-3 rounded-md text-base md:text-lg hover:bg-primary-dark">Get Started</a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-black py-16 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Why Choose GoalStruct?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-tertiary rounded-lg shadow-lg">
              <h3 className="text-xl md:text-2xl font-semibold mb-4">Organize Your Tasks</h3>
              <p className="text-sm md:text-base">Structure your goals into manageable tasks, and achieve more by breaking down your objectives into actionable steps.</p>
            </div>
            <div className="text-center p-6 bg-tertiary rounded-lg shadow-lg">
              <h3 className="text-xl md:text-2xl font-semibold mb-4">Track Your Progress</h3>
              <p className="text-sm md:text-base">Monitor your progress with real-time tracking, and stay motivated by seeing how far you've come.</p>
            </div>
            <div className="text-center p-6 bg-tertiary rounded-lg shadow-lg">
              <h3 className="text-xl md:text-2xl font-semibold mb-4">Achieve Your Goals</h3>
              <p className="text-sm md:text-base">Set deadlines, prioritize your tasks, and ensure that you reach your goals on time with our powerful scheduling tools.</p>
            </div>
            <div className="text-center p-6 bg-tertiary rounded-lg shadow-lg">
              <h3 className="text-xl md:text-2xl font-semibold mb-4">Collaborate with Your Team</h3>
              <p className="text-sm md:text-base">Work together with your team on shared goals. Assign tasks, set milestones, and track progress as a unit.</p>
            </div>
            <div className="text-center p-6 bg-tertiary rounded-lg shadow-lg">
              <h3 className="text-xl md:text-2xl font-semibold mb-4">Customizable Workflows</h3>
              <p className="text-sm md:text-base">Adapt the system to fit your workflow. Customize task lists, set up recurring goals, and create templates for future projects.</p>
            </div>
            <div className="text-center p-6 bg-tertiary rounded-lg shadow-lg">
              <h3 className="text-xl md:text-2xl font-semibold mb-4">Detailed Analytics</h3>
              <p className="text-sm md:text-base">Gain insights into your performance with detailed analytics. See what's working, identify bottlenecks, and improve your productivity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="cta" className="bg-primary py-12 md:py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold">Ready to Take Your Goals to the Next Level?</h2>
        <p className="text-base md:text-lg mb-8 md:mb-12">Join thousands of others who are achieving their goals with GoalStruct.</p>
        <a href="/register" className="border border-secondary text-white px-12 md:px-24 py-2 md:py-3 rounded-md text-base md:text-lg hover:bg-primary-dark">Sign Up Now</a>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p>&copy; 2024 GoalStruct. All rights reserved.</p>
          <div className="mt-4 space-x-2 md:space-x-4">
            <a href="/privacy" className="hover:underline">Privacy Policy</a>
            <a href="/terms" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;


