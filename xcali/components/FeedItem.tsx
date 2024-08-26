import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment, faShare } from "@fortawesome/free-solid-svg-icons";

interface FeedItemProps {
    title: string;
    thumbnail: string;
    time: string;
    content: string;
}

const FeedItem: React.FC<FeedItemProps> = ({ title, thumbnail, time, content }) => {
    // Convert time to a human-readable date format
    const formattedDate = new Date(time).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="flex flex-col md:flex-row p-6 border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 max-w-4xl mx-auto my-6 dark:bg-gray-800 dark:border-gray-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="w-14 h-14 rounded-full mb-4 md:mb-0 md:mr-6 border-2 border-gray-300 overflow-hidden flex items-center justify-center">
                <Image
                    src={thumbnail}
                    alt={`${title}'s thumbnail`}
                    width={100} // Match the width and height to the parent div
                    height={100}
                    className="rounded-full" // Apply rounded class to ensure image is circular
                />
            </div>
            <div className="flex-1">
                <div className="flex flex-col md:flex-row items-start md:items-center mb-3">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{title}</h3>
                    <span className="text-gray-500 text-sm md:ml-4 mt-1 md:mt-0 dark:text-gray-400">{formattedDate}</span>
                </div>
                <p className="text-gray-600 text-base leading-relaxed dark:text-gray-300">{content}</p>
                <div className="flex space-x-4 mt-4">
                    <button className="flex items-center text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400">
                        <FontAwesomeIcon icon={faHeart} className="mr-1" />
                        <span>Like</span>
                    </button>
                    <button className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                        <FontAwesomeIcon icon={faComment} className="mr-1" />
                        <span>Comment</span>
                    </button>
                    <button className="flex items-center text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">
                        <FontAwesomeIcon icon={faShare} className="mr-1" />
                        <span>Share</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeedItem;
