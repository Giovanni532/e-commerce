"use client";

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Image } from "@nextui-org/react"

export default function CarouselHome() {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    ) as any

    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-xs lg:max-w-sm mx-auto"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                        <Image
                            src={`https://plus.unsplash.com/premium_photo-1717529138029-5b049119cfb1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8`}
                            alt="Image"
                            className="object-cover"
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}
