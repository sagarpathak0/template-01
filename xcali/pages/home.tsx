import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";
import {
  faHome,
  faProjectDiagram,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/hooks/useAuth";

const Home: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [expanded, setExpanded] = useState(false);

  return (
    <main className="flex flex-col bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 text-white">
          {/* Hero Section */}
          <section className="flex flex-col items-center justify-center min-h-screen text-center">
            <motion.h1
              className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500 mb-6"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Collaborate. Build. Connect.
            </motion.h1>
            <motion.p
              className="text-lg max-w-3xl mb-10"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Revolutionize the way you work together. Our platform merges the
              power of collaboration with the ease of connection. Get started on
              your next big idea today.
            </motion.p>
            <motion.div
              className="flex gap-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <a
                href="https://github.com/sagarpathak0/template-01"
                className="bg-gray-800 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg transition-transform transform hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGithub} className="mr-2" />
                View on GitHub
              </a>
              <a
                href="https://discord.gg/3CJGCbXj"
                className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg transition-transform transform hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faDiscord} className="mr-2" />
                Join the Community
              </a>
            </motion.div>
          </section>

          {/* How It Works Section */}
          <section className="w-full max-w-7xl mx-auto my-24 text-center">
            <h2 className="text-4xl font-bold mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  title: "Create a Project",
                  description:
                    "Start by creating a new project. Set goals, add tasks, and invite your team.",
                },
                {
                  title: "Collaborate",
                  description:
                    "Work together in real-time, share ideas, and track progress seamlessly.",
                },
                {
                  title: "Deploy & Connect",
                  description:
                    "Deploy your project and connect with the community to showcase your work.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-r from-blue-500 to-teal-500 text-white p-6 rounded-lg shadow-2xl hover:shadow-xl transition-shadow transform hover:scale-105"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.3 }}
                >
                  <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                  <p>{item.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Features Section */}
          <section className="w-full max-w-7xl mx-auto my-24 text-center">
            <h2 className="text-4xl font-bold mb-12">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[
                {
                  title: "Real-Time Collaboration",
                  description:
                    "Edit and update projects with your team in real-time.",
                },
                {
                  title: "Integrated Chat",
                  description:
                    "Stay connected with team members using our built-in chat.",
                },
                {
                  title: "Version Control",
                  description:
                    "Keep track of every change and revert if needed.",
                },
                {
                  title: "Customizable Workflows",
                  description:
                    "Create workflows that fit your team's unique needs.",
                },
                {
                  title: "Secure & Scalable",
                  description:
                    "Your data is secure with industry-leading encryption.",
                },
                {
                  title: "Community Driven",
                  description:
                    "Join a community of like-minded developers and creators.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-lg shadow-2xl hover:shadow-xl transition-shadow transform hover:scale-105"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.3 }}
                >
                  <h3 className="text-2xl font-semibold mb-4">
                    {feature.title}
                  </h3>
                  <p>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="w-full max-w-7xl mx-auto my-24 text-center">
            <h2 className="text-4xl font-bold mb-12">What People Are Saying</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[
                {
                  name: "Jane Doe",
                  feedback:
                    "This platform has transformed the way we work as a team!",
                },
                {
                  name: "John Smith",
                  feedback:
                    "The real-time collaboration feature is a game-changer.",
                },
                {
                  name: "Sarah Lee",
                  feedback:
                    "I love how easy it is to connect with the community.",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-r from-green-500 to-yellow-500 text-white p-6 rounded-lg shadow-2xl hover:shadow-xl transition-shadow transform hover:scale-105"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.3 }}
                >
                  <p className="text-lg italic mb-4">{testimonial.feedback}</p>
                  <h4 className="text-xl font-semibold">{testimonial.name}</h4>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="w-full max-w-7xl mx-auto my-24 text-center">
            <h2 className="text-4xl font-bold mb-12">Get Started Today</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Ready to take your projects to the next level? Sign up today and
              start collaborating with your team.
            </p>
            <motion.a
              href="/signup"
              className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition-transform transform hover:scale-110"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Sign Up Now
            </motion.a>
          </section>
    </main>
  );
};

export default Home;
