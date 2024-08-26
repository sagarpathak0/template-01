import React, { useEffect, useState } from "react";
import FeedItem from "@/components/FeedItem";
import RightSidebar from "./RightSidebar";
import { useProject } from "@/hooks/useProject"; // Import your custom hook
import SearchBar from "./searchBar";

const FeedPage: React.FC = () => {
  const { getAllProjects, allproject } = useProject(); // Destructure from your hook
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<any[]>([]); // Initialize projects as an array
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        await allproject(); // Fetch projects
        const storedProjects = localStorage.getItem("public");
        if (storedProjects) {
          setProjects(JSON.parse(storedProjects)); // Assuming this data is an array of projects
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to load projects.");
        setLoading(false);
      }
    };

    fetchProjects();
  }, []); // Add allproject to dependencies if it's a changing reference

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Left Section: Feed */}
      <div className="flex-1 mx-auto overflow-auto p-4 max-w-4xl">
        <h1 className="text-2xl font-bold mb-4">Feed</h1>
        <div>
          {projects.length > 0 ? (
            projects.map((project) => (
              <div
                key={project._id}
                className="mb-4 bg-white dark:bg-gray-800 shadow rounded-lg p-4"
              >
                <FeedItem
                  title={project.title}
                  thumbnail={project.thumbnail} // Assuming project has an owner with avatar
                  time={project.createdAt} // Assuming project has createdAt timestamp
                  content={project.description} // Assuming project has a description
                />
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600 dark:text-gray-400">
              No projects available.
            </div>
          )}
        </div>
      </div>
      
      {/* Right Section: Sidebar */}
      <div className="w-full md:w-1/4 p-4 bg-gray-200 dark:bg-gray-800">
            {/* <div className="mb-4 flex items-center">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div> */}
            <div className="mb-6">
                <SearchBar/>
                <h2 className="text-xl pt-10 font-bold">Trending Topics</h2>
            </div>
            <div>
                <ul>
                    <li className="mb-4">
                        <a href="#" className="text-lg font-medium text-black hover:text-gray-900">
                            #TechNews
                        </a>
                    </li>
                    <li className="mb-4">
                        <a href="#" className="text-lg font-medium text-black hover:text-gray-900">
                            #WebDevelopment
                        </a>
                    </li>
                    <li className="mb-4">
                        <a href="#" className="text-lg font-medium text-black hover:text-gray-900">
                            #ReactJS
                        </a>
                    </li>
                    <li className="mb-4">
                        <a href="#" className="text-lg font-medium text-black hover:text-gray-900">
                            #NextJS
                        </a>
                    </li>
                </ul>
            </div>
        </div>
      </div>
  );
};

export default FeedPage;
