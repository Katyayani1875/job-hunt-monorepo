import { motion } from 'framer-motion';
import { RocketIcon, SearchIcon, BotIcon, BriefcaseIcon } from 'lucide-react';

const features = [
  {
    icon: <SearchIcon className="w-6 h-6" />,
    title: 'Smart Job Search',
    description: 'Find your dream job using AI recommendations based on your resume and interests.',
  },
  {
    icon: <BriefcaseIcon className="w-6 h-6" />,
    title: 'AI-Powered Resume Analysis',
    description: 'Instant feedback on your resume to help you stand out from the crowd.',
  },
  {
    icon: <BotIcon className="w-6 h-6" />,
    title: '24/7 AI Chat Assistant',
    description: 'Ask career questions, get interview help, or explore new opportunities — instantly.',
  },
  {
    icon: <RocketIcon className="w-6 h-6" />,
    title: 'Boost Employer Reach',
    description: 'Employers can create compelling job posts using AI, reach more talent efficiently.',
  },
];

const About = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow hover:shadow-lg transition"
              whileHover={{ scale: 1.03 }}
            >
              <div className="mb-4 text-blue-600">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
