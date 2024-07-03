"use client"

interface StepperProps {
    step: {
        id: number;
        title: string;
        enCours: boolean;
        valide: boolean;
    }[];
}

export default function Stepper({ step }: StepperProps) {
    return (
        <div className="flex mx-auto p-8 rounded-md max-w-2xl">
            {step.map((s) => (
                <>
                    <div key={s.id} className="flex flex-col items-center text-center space-y-4 w-full">
                        <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${s.valide ? 'border-green-500 text-green-500' : s.enCours ? 'border-blue-500 text-blue-500' : 'border-gray-700 text-gray-700'}`}>
                            {s.id}
                        </div>
                        <h3 className="text-md font-semibold">{s.title}</h3>
                    </div>
                    {s.id !== step.length && <div className="flex mt-4 items-center justify-center h-px w-full bg-gray-700" />}
                </>
            ))}
        </div>
    )
}