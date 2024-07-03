"use client"

import React, { useEffect, useState } from 'react';
import { Ribbon } from 'lucide-react';

interface IconProps {
    id: number;
    delay: number;
    left: number;
}

const LoadingBackground: React.FC = () => {
    const [icons, setIcons] = useState<IconProps[]>([]);

    useEffect(() => {
        const newIcons = Array.from({ length: 50 }).map((_, index) => ({
            id: index,
            delay: Math.random() * 10,
            left: Math.random() * 100
        }));
        setIcons(newIcons);
    }, []);

    return (
        <div className="relative h-[80%] w-[95%]">
            {icons.map((icon) => (
                <Ribbon
                    key={icon.id}
                    className="falling-icon text-primary"
                    style={{
                        left: `${icon.left}%`,
                        animationDuration: `${5 + Math.random() * 5}s`,
                        animationDelay: `${icon.delay}s`
                    }}
                />
            ))}
        </div>
    );
};

export default LoadingBackground;
