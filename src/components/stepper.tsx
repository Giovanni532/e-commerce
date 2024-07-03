"use client"

import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

interface StepperProps {
    step: {
        id: number;
        title: string;
        enCours: boolean;
        valide: boolean;
    }[];
}

export default function Stepper({ step }: StepperProps) {
    const [animatingSteps, setAnimatingSteps] = useState<number[]>([]);

    useEffect(() => {
        const newAnimatingSteps = step.filter(s => s.valide).map(s => s.id);
        setAnimatingSteps(newAnimatingSteps);
    }, [step]);

    return (
        <div className="flex mx-auto p-8 rounded-md max-w-2xl">
            {step.map((s, index) => (
                <React.Fragment key={s.id}>
                    <div className="flex flex-col items-center text-center space-y-4 w-full">
                        <div
                            className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${s.valide ? 'border-primary text-primary' : 'border-gray-700 text-gray-700'}`}
                        >
                            <span className={`${animatingSteps.includes(s.id) ? 'animate-rotate-check' : ''}`}>
                                {s.valide ? <Check size={16} /> : s.id}
                            </span>
                        </div>
                        <h3 className="text-md font-semibold">{s.title}</h3>
                    </div>
                    {index !== step.length - 1 && <div className="flex mt-4 items-center justify-center h-px w-full bg-gray-700" />}
                </React.Fragment>
            ))}
        </div>
    );
}
