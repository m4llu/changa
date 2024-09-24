import React from 'react';
import './AnnouncementBar.scss';

const AnnouncementBar: React.FC = () => {
    const segments = [
        "Summer sale! 50% off all items!",
        "Free shipping on orders over $50",
        "New arrivals every week",
        "Follow us on Instagram @changastore",
    ];

    return (
        <div className="announcement-bar">
            <div className="scrolling-text-wrapper">
                {segments.map((segment, index) => (
                    <span key={index}>{segment}</span>
                ))}
                {segments.map((segment, index) => (
                    <span key={`${index}-dup`}>{segment}</span> // Duplicate for seamless scroll
                ))}
            </div>
        </div>
    );
};

export default AnnouncementBar;
