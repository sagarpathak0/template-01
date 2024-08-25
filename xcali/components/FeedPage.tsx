import React from "react";
import FeedItem from "@/components/FeedItem";
import RightSidebar from "./RightSidebar";

const feeds = [
    {
        username: "John Doe",
        avatar: "/path/to/avatar1.jpg",
        time: "2h ago",
        content: "This is a sample tweet-like content for the feed.",
    },
    {
        username: "Jane Smith",
        avatar: "/path/to/avatar2.jpg",
        time: "4h ago",
        content: "Another feed item, just like on Twitter!",
    },
    {
        username: "John Doe",
        avatar: "/path/to/avatar1.jpg",
        time: "2h ago",
        content: "This is a sample tweet-like content for the feed.",
    },
    {
        username: "Jane Smith",
        avatar: "/path/to/avatar2.jpg",
        time: "4h ago",
        content: "Another feed item, just like on Twitter!",
    },
    {
        username: "John Doe",
        avatar: "/path/to/avatar1.jpg",
        time: "2h ago",
        content: "This is a sample tweet-like content for the feed.",
    },
    {
        username: "Jane Smith",
        avatar: "/path/to/avatar2.jpg",
        time: "4h ago",
        content: "Another feed item, just like on Twitter!",
    },
    {
        username: "John Doe",
        avatar: "/path/to/avatar1.jpg",
        time: "2h ago",
        content: "This is a sample tweet-like content for the feed.",
    },
    {
        username: "Jane Smith",
        avatar: "/path/to/avatar2.jpg",
        time: "4h ago",
        content: "Another feed item, just like on Twitter!",
    },
    {
        username: "John Doe",
        avatar: "/path/to/avatar1.jpg",
        time: "2h ago",
        content: "This is a sample tweet-like content for the feed.",
    },
    {
        username: "Jane Smith",
        avatar: "/path/to/avatar2.jpg",
        time: "4h ago",
        content: "Another feed item, just like on Twitter!",
    },
    // Add more feed items as needed
];

const FeedPage: React.FC = () => {
    return (
        <>
        <div className="flex">
            
            <div className="flex-1 mx-auto p-4">
                
                <h1 className="text-2xl font-bold mb-4">Feed</h1>
                <div>
                    {feeds.map((feed, index) => (
                        <div key={index} className="mb-4 bg-white shadow rounded-lg p-4">
                            <FeedItem
                                username={feed.username}
                                avatar={feed.avatar}
                                time={feed.time}
                                content={feed.content}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <RightSidebar />
        </div>
        </>
    );
};

export default FeedPage;
