"use client"

import { Button, Link } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React from 'react';

interface LinkMenuProps {
  href: string;
  text: string | React.ReactNode;
  isActif: boolean;
  isButton: boolean;
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function LinkMenu({ href, text, isActif, isButton }: LinkMenuProps) {
  const router = useRouter();

  const handleTransition = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const page = document.querySelector('.page-transition');

    if (!page) return;

    page.classList.add('page-transition-exit');

    await sleep(500);

    router.push(href);

    await sleep(500);

    page.classList.remove('page-transition-exit');
    page.classList.add('page-transition-enter');

    await sleep(500);

    page.classList.remove('page-transition-enter');
  };

  if (isButton) {
    return (
      <Button
        as={Link}
        onClick={(e) => handleTransition(e as any)}
        href={href}
        color='primary'
      >
        {text}
      </Button>
    );
  }

  return (
    <Link
      onClick={handleTransition}
      href={href}
      color='primary'
      className={isActif ? 'font-medium' + (!React.isValidElement(text) ? ' border-slide' : '') : 'font-normal text-gray-600 hover:text-primary' + (!React.isValidElement(text) ? ' border-slide' : '')}
    >
      {text}
    </Link>
  );
}
