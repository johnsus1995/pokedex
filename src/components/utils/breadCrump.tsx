'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function BreadcrumbNew() {
  const pathname = usePathname(); // e.g. /pokemon/1
  const segments = pathname.split('/').filter(Boolean); // ['pokemon', '1']

  const buildHref = (index: number) => {
    return '/' + segments.slice(0, index + 1).join('/');
  };

  return (
    <Breadcrumb className="px-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {segments.map((segment, index) => (
          <span key={index} className="flex items-center">
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {index === segments.length - 1 ? (
                <BreadcrumbPage className="capitalize">
                  {decodeURIComponent(segment)}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={buildHref(index)} className="capitalize">
                    {decodeURIComponent(segment)}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </span>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
