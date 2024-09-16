'use client';

import Image from 'next/image';
import { ONCHAINKIT_LINK } from 'src/links';
import ArrowSvg from 'src/svg/ArrowSvg';

const docLinks = [
  { href: 'https://docs.flashbots.net/', title: 'Refunds docs' },
  { href: 'https://protect.flashbots.net/', title: 'Protect' },
  { href: 'https://collective.flashbots.net/', title: 'Forum' },
];

export default function Footer() {
  return (
    <section className="mt-auto mb-2 flex w-full flex-row items-center justify-between gap-4 md:mt-8 md:mb-6">
      <div className="flex items-center space-x-1">
        <div>
            <span>Forked from </span>
            <a
              href={ONCHAINKIT_LINK}
              target="_blank"
              rel="noreferrer"
              className="font-semibold hover:text-indigo-600"
            >
              OnchainKit
            </a>
        </div>
        <div className="flex items-center">
          <span className="mr-2">with love by</span>
          <Image 
            src="/icons/flashbots-logo.svg" 
            alt="Flashbots Logo" 
            width={100} 
            height={100} 
          />
        </div>
      </div>
      <ul className="flex flex-wrap gap-6">
        {docLinks.map(({ href, title }) => (
          <li className="flex" key={href}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              title={title}
              className="flex items-center gap-1"
            >
              <p>{title}</p>
              <ArrowSvg />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}