import React, { useEffect, useState } from "react";
import FeedItem from "@/components/FeedItem";
import RightSidebar from "./RightSidebar";
import { useProject } from "@/hooks/useProject"; // Import your custom hook

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
    <div className="flex min-h-screen">
      {/* Left Section: Feed */}
      <div className="flex-1 mx-auto overflow-auto p-4 max-w-4xl">
        <h1 className="text-2xl font-bold mb-4">Feed</h1>
        <div>
          {projects.length > 0 ? (
            projects.map((project) => (
              <div
                key={project._id}
                className="mb-4 bg-white shadow rounded-lg p-4"
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
            <div className="text-center text-gray-600">
              No projects available.
            </div>
          )}
        </div>
      </div>
      
      {/* Right Section: Sidebar */}
      <div className="w-full md:w-1/4 p-4">
        <RightSidebar />
      </div>
    </div>
  );
};

export default FeedPage;
