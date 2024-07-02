import React from 'react'
import { Card, Skeleton } from "@nextui-org/react";

export default function LoadingArticles() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-[270px_1fr] gap-8 p-4 md:p-8">
            <Card className='flex flex-col p-4 md:h-screen md:max-h-[60vh] md:overflow-auto'>
                <Skeleton className="w-4/5 rounded-lg m-4 p-1">
                    <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-3/5 rounded-lg m-4 p-1">
                    <div className="h-3 w-3/5 rounded-lg bg-default-300"></div>
                </Skeleton>
                <Skeleton className="w-3/5 rounded-lg m-4 p-1">
                    <div className="h-3 w-3/5 rounded-lg bg-default-300"></div>
                </Skeleton>
                <Skeleton className="w-3/5 rounded-lg m-4 p-1">
                    <div className="h-3 w-3/5 rounded-lg bg-default-300"></div>
                </Skeleton>
                <Skeleton className="w-3/5 rounded-lg m-4 p-1">
                    <div className="h-3 w-3/5 rounded-lg bg-default-300"></div>
                </Skeleton>
                <Skeleton className="w-3/5 rounded-lg m-4 p-1">
                    <div className="h-3 w-3/5 rounded-lg bg-default-300"></div>
                </Skeleton>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 px-4 md:px-8">
                {Array.from({ length: 6 }).map((_, index) => (
                    <Card key={index} className="space-y-5 w-full p-4 mx-auto max-w-sm" radius="lg">
                        <Skeleton className="rounded-lg">
                            <div className="h-60 w-full bg-default-200 rounded-xl"></div>
                        </Skeleton>
                        <Skeleton className="w-3/5 rounded-lg m-2 p-2">
                            <div className="font-bold text-large"></div>
                        </Skeleton>
                        <Skeleton className="w-4/5 rounded-lg m-2 p-2">
                            <div className="text-default-500 pb-1"></div>
                        </Skeleton>
                        <Skeleton className="w-2/5 rounded-lg m-2 p-2">
                            <div className="text-tiny uppercase font-bold"></div>
                        </Skeleton>
                    </Card>
                ))}
            </div>
        </div>
    )
}
