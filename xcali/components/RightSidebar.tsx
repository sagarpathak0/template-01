import React from "react";
import SearchBar from "./searchBar";

const RightSidebar: React.FC = () => {
    return (
        <div className="w-[20%] p-4 bg-gradient-to-r from-blue-900 to to-red-500 h-screen fixed right-0">
            {/* <div className="mb-4 flex items-center">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div> */}
            <div className="mb-6">
                <SearchBar/>
                <h2 className="text-xl font-bold">Trending Topics</h2>
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
    );
};

export default RightSidebar;
