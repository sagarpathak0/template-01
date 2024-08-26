import React from "react";
import Image from "next/image";

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
        <div className="flex flex-col md:flex-row p-6 border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-r from-white via-gray-100 to-gray-50 max-w-4xl mx-auto my-6">
            <div className="w-14 h-14 rounded-full mb-4 md:mb-0 md:mr-6 border-2 border-gray-300 overflow-hidden flex items-center justify-center">
                <Image
                    src={thumbnail}
                    alt={`${title}'s thumbnail`}
                    width={100} // Match the width and height to the parent div
                    height={100}
                    className="rounded-full" // Apply rounded class to ensure image is circular
                    objectFit=""
                    // fill={true} // {true} | {false}?
                />
            </div>
            <div className="flex-1">
                <div className="flex flex-col md:flex-row items-start md:items-center mb-3">
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    <span className="text-gray-500 text-sm md:ml-4 mt-1 md:mt-0">{formattedDate}</span>
                </div>
                <p className="text-gray-600 text-base leading-relaxed">{content}</p>
            </div>
        </div>
    );
};

export default FeedItem;
