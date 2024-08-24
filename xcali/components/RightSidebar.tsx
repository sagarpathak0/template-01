import React from "react";

const RightSidebar: React.FC = () => {
    return (
        <div className="w-64 p-4 bg-gray-100 h-screen fixed right-0">
            <div className="mb-6">
                <h2 className="text-xl font-bold">Trending Topics</h2>
            </div>
            <div>
                <ul>
                    <li className="mb-4">
                        <a href="#" className="text-lg font-medium text-gray-700 hover:text-gray-900">
                            #TechNews
                        </a>
                    </li>
                    <li className="mb-4">
                        <a href="#" className="text-lg font-medium text-gray-700 hover:text-gray-900">
                            #WebDevelopment
                        </a>
                    </li>
                    <li className="mb-4">
                        <a href="#" className="text-lg font-medium text-gray-700 hover:text-gray-900">
                            #ReactJS
                        </a>
                    </li>
                    <li className="mb-4">
                        <a href="#" className="text-lg font-medium text-gray-700 hover:text-gray-900">
                            #NextJS
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default RightSidebar;
