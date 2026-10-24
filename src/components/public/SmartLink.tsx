import React from 'react';
import Link from 'next/link';

interface SmartLinkProps {
  href: string;
  className?: string;
  id?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}

/** True for absolute http(s) URLs — i.e. destinations outside welelemedia.co.za. */
export function isExternalUrl(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

/**
 * Renders internal routes with next/link and external URLs as plain outbound
 * anchors (new tab, noopener). External destinations such as https://welele.app
 * are ordinary hyperlinks — never fetched, embedded or integrated.
 */
export default function SmartLink({ href, className, id, children, ariaLabel }: SmartLinkProps) {
  if (isExternalUrl(href)) {
    return (
      <a href={href} className={className} id={id} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} id={id} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
