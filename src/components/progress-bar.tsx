"use client"

import { Progress } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface ProgressProps {
    description: string;
}

export default function ProgressBar({ description }: ProgressProps) {
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
                <p className="text-md mt-20">{description}</p>
                <div className="flex items-center justify-center w-full max-w-lg">
                    <Progress
                        size="md"
                        value={value}
                        aria-label="progress-bar"
                        classNames={{
                            base: "w-lg",
                            track: "drop-shadow-lg",
                            indicator: "bg-gradient-to-r from-cyan-300 to-indigo-500",
                            label: "tracking-wider font-medium text-default-600",
                            value: "text-foreground/60",
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
