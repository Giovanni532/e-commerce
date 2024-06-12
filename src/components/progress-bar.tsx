"use client"

import { Progress } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface ProgressProps {
    title: string;
    description: string;
}

export default function ProgressBar({ title, description }: ProgressProps) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setValue((v) => (v + 100));
        }, 1200);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center justify-center">
            <div className="space-y-4 text-center">
                <h2 className="text-2xl font-bold mt-20">{title}</h2>
                <p className="text-lg">{description}</p>
                <div className="flex items-center justify-center w-full max-w-md">
                    <Progress
                        size="md"
                        value={value}
                        aria-label="progress-bar"
                        classNames={{
                            base: "max-w-md",
                            track: "drop-shadow-md",
                            indicator: "bg-gradient-to-r from-blue-300 to-blue-600",
                            label: "tracking-wider font-medium text-default-600",
                            value: "text-foreground/60",
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
