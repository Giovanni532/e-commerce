"use client"

import React from "react";
import { Tabs, Tab, Chip } from "@nextui-org/react";

interface TabsUserProps {
    tabs: {
        title: string;
        icon: React.ReactNode;
        content: React.ReactNode;
    }[];
}

export default function TabsUser({ tabs }: TabsUserProps) {
    return (
        <div className="flex max-w-md items-center mx-auto my-5 w-full flex-col">
            <Tabs
                aria-label="Options"
                color="primary"
                variant="underlined"
                classNames={{
                    tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                    cursor: "w-full bg-primary",
                    tab: "max-w-fit px-0 h-12",
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
                        {tab.content}
                    </Tab>
                ))
                }
            </Tabs>
        </div>
    );
}
