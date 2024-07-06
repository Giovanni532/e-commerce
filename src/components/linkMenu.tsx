import { Link } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React from 'react';

interface LinkMenuProps {
  href: string;
  text: string | React.ReactNode;
  isActif: boolean;
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function LinkMenu({ href, text, isActif }: LinkMenuProps) {
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

  return (
    <Link
      onClick={handleTransition}
      href={href}
      color='primary'
      underline={isActif ? 'always' : 'hover'}
      className={isActif ? 'font-medium' : 'font-normal text-gray-600 hover:text-primary'}
    >
      {text}
    </Link>
  );
}
