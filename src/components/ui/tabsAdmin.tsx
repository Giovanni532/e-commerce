"use client";

import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { useMediaQuery } from 'react-responsive';
import { motion, AnimatePresence } from 'framer-motion';

type TabType = {
    title: string | React.ReactNode | any;
    value: string;
    content?: string | React.ReactNode | any;
};

export default function TabsAdmin({ tabs: propTabs }: { tabs: TabType[] }) {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });

    return (
        <div className="flex flex-col px-4">
            <div className="flex w-full flex-col">
                <Tabs
                    aria-label="OptionsAdmin"
                    placement={isTabletOrMobile ? "top" : "start"}
                >
                    {propTabs.map((tab) => (
                        <Tab key={tab.value} title={tab.title}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={tab.value}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 50 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Card>
                                        <CardBody>
                                            {tab.content}
                                        </CardBody>
                                    </Card>
                                </motion.div>
                            </AnimatePresence>
                        </Tab>
                    ))}
                </Tabs>
            </div>
        </div>
    );
}
