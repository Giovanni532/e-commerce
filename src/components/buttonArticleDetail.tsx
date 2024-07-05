import React from 'react'
import { Button } from '@nextui-org/react'
import { MoveUpRight } from 'lucide-react';
import Link from 'next/link';
import paths from '@/path';


interface ButtonArticleDetailProps {
    id: number;
}


export default function ButtonArticleDetail({ id }: ButtonArticleDetailProps) {
    return (
        <Button
            as={Link}
            href={paths.articleDetailPath(id.toString())}
            isIconOnly
            color="primary"
            endContent={<MoveUpRight className='h-4' />}
            size='lg'
            className='rounded-full p-4'
        />
    )
}
