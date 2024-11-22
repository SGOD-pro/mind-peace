import React from 'react';

function AboutMe() {
  return (
    <section className="about-section bg-background text-muted-foreground py-16 md:pt-28">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">About Mental Peace</h2>
        <p className="text-lg mb-4">
          Welcome to <strong>Mental Peace</strong>—a platform dedicated to promoting mental wellness and emotional well-being. In today{`’`}s fast-paced world, it's easy to forget the importance of taking care of our mental health. That's why we created Mental Peace to provide resources, guidance, and support for individuals seeking balance, peace, and personal growth.
        </p>
        <p className="text-lg mb-4">
          Our mission is to offer a safe space for individuals to explore mindfulness, stress reduction techniques, and emotional support. We aim to break the stigma surrounding mental health by fostering an open dialogue and empowering people to prioritize self-care.
        </p>
        <h3 className="text-2xl font-semibold text-blue-600 mt-8 mb-4">Our Vision</h3>
        <p className="text-lg">
          At Mental Peace, we envision a world where mental well-being is prioritized just as much as physical health. We believe that by promoting mental health awareness and offering practical solutions, we can help individuals lead fulfilling lives—free from the burden of stress, anxiety, and depression.
        </p>
        <h3 className="text-2xl font-semibold text-blue-600 mt-8 mb-4">Our Values</h3>
        <ul className="list-disc pl-6 text-lg">
          <li>Empathy: Understanding and supporting each other's journey.</li>
          <li>Inclusivity: Providing resources and support for people from all walks of life.</li>
          <li>Education: Offering tools, tips, and resources to promote mental wellness.</li>
          <li>Community: Creating a supportive and safe space for open conversations.</li>
        </ul>
      </div>
    </section>
  );
}

export default AboutMe;
