import React from "react";

interface FeedItemProps {
    username: string;
    avatar: string;
    time: string;
    content: string;
}

const FeedItem: React.FC<FeedItemProps> = ({ username, avatar, time, content }) => {
    return (
        <div className="flex p-4 border-b border-gray-300 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <img
                src={avatar}
                alt={`${username}'s avatar`}
                className="w-12 h-12 rounded-full mr-4 object-cover"
            />
            <div className="flex-1">
                <div className="flex items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{username}</h3>
                    <span className="text-gray-500 text-sm ml-2">{time}</span>
                </div>
                <p className="text-gray-700 text-base">{content}</p>
            </div>
        </div>
    );
};

export default FeedItem;
