import type { MDXComponents } from 'mdx/types'
import { twMerge } from 'tailwind-merge';

// Custom components for MDX
import React from 'react';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => {
      const h1Props = components?.h1 as React.ComponentProps<'h1'>;
      return (
        <h1 className={twMerge('text-3xl font-bold my-4', h1Props?.className)}>
          {children}
        </h1>
      );
    },
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold my-3">{children}</h2>
    ),
    p: ({ children }) => <p className="my-2">{children}</p>,
    a: ({ children, href }) => (
      <a href={href} className="text-blue-500 hover:underline">
        {children}
      </a>
    ),
    ul: ({ children }) => <ul className="list-disc list-inside my-2">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal list-inside my-2">{children}</ol>,
    li: ({ children }) => <li className="my-1">{children}</li>,
    code: ({ children }) => (
      <code className="bg-muted p-1 rounded-md">{children}</code>
    ),
     ...components,
  }
}
