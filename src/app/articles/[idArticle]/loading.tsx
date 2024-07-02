import { Skeleton } from '@nextui-org/react'
import React from 'react'

export default function LoadingArticle() {
    return (
        <div className="flex flex-col lg:flex-row justify-center pt-20 w-full">
            <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-96 flex flex-col items-center justify-center p-6 rounded-lg">
                    <Skeleton className="w-full h-96 rounded-lg m-1 p-2">
                        <div className="h-3 w-full max-w-sm rounded-lg bg-default-200"></div>
                    </Skeleton>
                </div>
                <div className="w-full lg:w-96 p-6 lg:p-10">
                    <Skeleton className="w-3/5 rounded-lg m-1 p-2">
                        <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="w-2/5 rounded-lg m-1 p-2">
                        <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                    </Skeleton>
                    <Skeleton className="w-2/5 rounded-lg m-1 p-2">
                        <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                    </Skeleton>
                    <hr className="my-4" />
                    <div className="flex flex-row justify-between">
                        <Skeleton className="w-2/5 rounded-lg m-1 p-2">
                            <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                        </Skeleton>
                        <Skeleton className="w-2/5 rounded-lg m-1 p-2">
                            <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                        </Skeleton>
                    </div>
                    <div className="flex flex-col my-4">
                        <Skeleton className="w-3/5 rounded-lg m-1 p-2">
                            <div className="h-3 w-3/5 rounded-lg bg-default-300"></div>
                        </Skeleton>
                        <div className="flex items-center">
                            <Skeleton className="w-2/5 rounded-lg m-1 p-2">
                                <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                            </Skeleton>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <Skeleton className="w-3/5 rounded-lg m-1 p-2">
                            <div className="h-3 w-3/5 rounded-lg bg-default-300"></div>
                        </Skeleton>
                        <Skeleton className="w-3/5 rounded-lg m-1 p-2">
                            <div className="h-3 w-3/5 rounded-lg bg-default-300"></div>
                        </Skeleton>
                    </div>
                </div>
            </div>
        </div>
    )
}
