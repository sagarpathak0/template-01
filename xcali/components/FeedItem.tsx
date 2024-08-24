import React from "react";

interface FeedItemProps {
    username: string;
    avatar: string;
    time: string;
    content: string;
}

const FeedItem: React.FC<FeedItemProps> = ({ username, avatar, time, content }) => {
    return (
        <div className="flex p-4 border-b border-gray-200">
            <img
                src={avatar}
                alt={`${username}'s avatar`}
                className="w-12 h-12 rounded-full mr-4"
            />
            <div>
                <div className="flex items-center">
                    <h3 className="font-bold mr-2 text-black">{username}</h3>
                    <span className="text-gray-500 text-sm">{time}</span>
                </div>
                <p className="text-gray-800">{content}</p>
            </div>
        </div>
    );
};

export default FeedItem;
