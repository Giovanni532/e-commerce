"use client";

import { useState } from 'react';
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { useMediaQuery } from 'react-responsive';
import { motion, AnimatePresence } from 'framer-motion';

type TabType = {
    title: string | React.ReactNode;
    value: string;
    content?: string | React.ReactNode;
};

export default function TabsAdmin({ tabs: propTabs }: { tabs: TabType[] }) {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });
    const [selectedTab, setSelectedTab] = useState(propTabs[0].value);

    const handleTabChange = (value: string) => {
        setSelectedTab(value);
    };

    const currentTabContent = propTabs.find(tab => tab.value === selectedTab)?.content;

    return (
        <div className={isTabletOrMobile ? "flex flex-col px-4" : "flex flex-row px-4"}>
            <div className="flex flex-col">
                <Tabs
                    size={isTabletOrMobile ? "sm" : "md"}
                    aria-label="OptionsAdmin"
                    placement={isTabletOrMobile ? "top" : "start"}
                    selectedKey={selectedTab}
                    onSelectionChange={(key) => handleTabChange(key as string)}
                    className='w-full'
                >
                    {propTabs.map((tab) => (
                        <Tab key={tab.value} title={tab.title} value={tab.value} />
                    ))}
                </Tabs>
            </div>
            <div className="w-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedTab}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Card className={isTabletOrMobile ? 'mx-4 my-4' : 'mx-4'}>
                            <CardBody>
                                {currentTabContent}
                            </CardBody>
                        </Card>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
