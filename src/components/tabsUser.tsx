"use client"

import React from "react";
import { Tabs, Tab } from "@nextui-org/react";

interface TabsUserProps {
    tabs: {
        title: string;
        icon: React.ReactNode;
        content: React.ReactNode;
    }[];
}

export default function TabsUser({ tabs }: TabsUserProps) {
    return (
        <div className="flex max-w-2xl mx-auto my-5 flex-col">
            <Tabs
                aria-label="Options"
                color="primary"
                variant="underlined"
                classNames={
                    {
                        tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                        cursor: "w-full bg-primary",
                        tab: "max-w-sm w-full mx-auto px-0 h-12",
                        tabContent: "group-data-[selected=true]:text-primary"
                    }}
            >
                {tabs.map((tab) => (
                    <Tab
                        key={tab.title}
                        title={
                            <div className="flex items-center space-x-2">
                                {tab.icon}
                                <span>{tab.title}</span>
                            </div>
                        }
                    >
                        <div className="flex justify-center">
                            {tab.content}
                        </div>
                    </Tab>
                ))
                }
            </Tabs>
        </div>
    );
}
