// src/pages/AboutPage.tsx
import React, { useEffect } from 'react';

const AboutPage = () => {
  useEffect(() => {
    document.title = "About Us | Yardie";
  }
  , []);
  return <div className="min-h-screen bg-gray-600  flex flex-col items-center">
  {/* Header */}
  <header className="bg-gray-500  w-full shadow-md py-6">
    <h1 className="text-3xl font-bold text-center text-white">About Us</h1>
  </header>

  {/* Content Section */}
  <div className="flex flex-col items-center w-full max-w-4xl px-6 py-12">
    {/* Introduction */}
    <section className="text-center mb-12">
      <p className="text-white">
        We are a group of passionate developers and designers committed to
        building the best digital solutions. Our team believes in the power of
        technology to change the world for the better.
      </p>
    </section>

    {/* Placeholder Content */}
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      {/* Column 1 */}
      <div className="p-6 bg-gray-500 shadow rounded-md">
        <h3 className="text-xl font-semibold text-white mb-2">Our Mission</h3>
        <p className="text-white">
          Our mission is to deliver top-quality web and mobile applications that
          provide real value to our clients. We strive for excellence in every
          project, ensuring our work meets the highest standards.
        </p>
      </div>

      {/* Column 2 */}
      <div className="p-6 bg-gray-500 shadow rounded-md">
        <h3 className="text-xl font-semibold text-white mb-2">Our Vision</h3>
        <p className="text-white">
          We envision a world where technology empowers businesses to reach
          their full potential. We aim to be the go-to solution provider for
          companies looking to innovate and grow.
        </p>
      </div>

      {/* Column 3 */}
      <div className="p-6 bg-gray-500 shadow rounded-md">
        <h3 className="text-xl font-semibold text-white mb-2">Our Values</h3>
        <p className="text-white">
          We are guided by integrity, collaboration, and a relentless pursuit of
          innovation. These core values define who we are and shape the way we
          do business.
        </p>
      </div>

      {/* Column 4 */}
      <div className="p-6 bg-gray-500 shadow rounded-md">
        <h3 className="text-xl font-semibold text-white mb-2">Our Team</h3>
        <p className="text-white">
          Our team is made up of skilled professionals with diverse backgrounds
          in development, design, and project management. We work together to
          deliver exceptional results.
        </p>
      </div>
    </section>
  </div>
</div>
};

export default AboutPage;