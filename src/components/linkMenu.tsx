import { Link } from '@nextui-org/react'
import React from 'react'

interface LinkMenuProps {
    href: string;
    text: string;
    isActif: boolean;
}

export default function LinkMenu({ href, text, isActif }: LinkMenuProps) {
    return (
        <Link
            href={href}
            color='primary'
            underline={isActif ? 'always' : 'hover'}
            className={isActif ? 'font-medium' : 'font-normal text-gray-600 hover:text-primary'}
        >
            {text}
        </Link>
    )
}
