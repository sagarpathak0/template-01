import React, { useEffect, useState } from "react";
import FeedItem from "@/components/FeedItem";
import RightSidebar from "./RightSidebar";
import { useProject } from "@/hooks/useProject";  // Import your custom hook

const FeedPage: React.FC = () => {
    const { getAllProjects, projects } = useProject(); // Destructure from your hook
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                await getAllProjects(); // Fetch projects
                setLoading(false);
            } catch (err) {
                setError("Failed to load projects.");
                setLoading(false);
            }
        };

        fetchProjects();
    }, [getAllProjects]);

    if (loading) return <p className="text-center text-gray-600">Loading...</p>;
    if (error) return <p className="text-center text-red-600">{error}</p>;

    return (
        <div className="flex">
            <div className="flex-1 mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Feed</h1>
                <div>
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <div key={project._id} className="mb-4 bg-white shadow rounded-lg p-4">
                                <FeedItem
                                    username={project.owner.username} // Assuming project has an owner with username
                                    avatar={project.owner.avatar}     // Assuming project has an owner with avatar
                                    time={project.createdAt}          // Assuming project has createdAt timestamp
                                    content={project.description}     // Assuming project has a description
                                />
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600">No projects available.</p>
                    )}
                </div>
            </div>
            <RightSidebar />
        </div>
    );
};

export default FeedPage;
