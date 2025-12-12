'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface RecentPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
}

interface TableOfContentsProps {
  content: unknown[];
  recentPosts?: RecentPost[];
  currentPostId?: string;
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

interface PortableTextBlock {
  _type: string;
  style?: string;
  children?: Array<{ _type: string; text?: string }>;
}

function extractHeadings(blocks: unknown[]): TOCItem[] {
  const headings: TOCItem[] = [];

  blocks.forEach((block) => {
    const typedBlock = block as PortableTextBlock;
    if (typedBlock._type === 'block' && ['h2', 'h3'].includes(typedBlock.style || '')) {
      const text = typedBlock.children
        ?.filter((child) => child._type === 'span')
        .map((child) => child.text || '')
        .join('') || '';

      if (text) {
        headings.push({
          id: slugify(text),
          text,
          level: parseInt((typedBlock.style || 'h2').substring(1)),
        });
      }
    }
  });

  return headings;
}

export default function TableOfContents({ content, recentPosts = [], currentPostId }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeH2Id, setActiveH2Id] = useState<string>('');
  const tocContainerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const extractedHeadings = extractHeadings(content);
    setHeadings(extractedHeadings);

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter(entry => entry.isIntersecting);
        if (intersecting.length > 0) {
          const mostVisible = intersecting.reduce((prev, current) =>
            current.intersectionRatio > prev.intersectionRatio ? current : prev
          );
          setActiveId(mostVisible.target.id);
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '-100px 0px -60% 0px',
      }
    );

    const timeoutId = setTimeout(() => {
      const headingElements = document.querySelectorAll('h2[id], h3[id]');
      headingElements.forEach((element) => observer.observe(element));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [content]);

  useEffect(() => {
    if (!activeId) return;

    const activeHeading = headings.find((h) => h.id === activeId);
    if (!activeHeading) return;

    if (activeHeading.level === 2) {
      setActiveH2Id(activeId);
    } else if (activeHeading.level === 3) {
      const activeIndex = headings.findIndex((h) => h.id === activeId);
      for (let i = activeIndex - 1; i >= 0; i--) {
        if (headings[i].level === 2) {
          setActiveH2Id(headings[i].id);
          break;
        }
      }
    }
  }, [activeId, headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="sticky top-24">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
        <h3 className="text-xs text-brand-blue font-bold uppercase tracking-widest mb-6">
          Table of Contents
        </h3>
        <ul
          ref={tocContainerRef}
          className="space-y-1 max-h-[calc(100vh-12rem)] overflow-y-auto -mr-2"
        >
          {headings.map((heading, index) => {
            let isVisible = true;
            let parentH2Id = '';

            if (heading.level === 3) {
              for (let i = index - 1; i >= 0; i--) {
                if (headings[i].level === 2) {
                  parentH2Id = headings[i].id;
                  break;
                }
              }
              isVisible = parentH2Id === activeH2Id;
            }

            const hasChildren = heading.level === 2 &&
              headings[index + 1]?.level === 3;

            return (
              <li
                key={heading.id}
                className={`
                  ${heading.level === 3 ? 'ml-4' : ''}
                  ${heading.level === 3 && !isVisible ? 'hidden' : ''}
                  mr-2
                `}
              >
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(heading.id);
                    if (element) {
                      element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                      });
                      setActiveId(heading.id);
                    }
                  }}
                  className={`
                    text-sm block py-2 px-3 rounded-lg
                    border-l-2 relative
                    transition-all duration-200
                    ${
                      activeId === heading.id
                        ? 'text-white bg-brand-blue/10 border-brand-blue'
                        : 'text-white/50 border-transparent hover:text-brand-blue hover:bg-white/5 hover:border-brand-blue/30'
                    }
                    ${hasChildren ? 'flex items-center justify-between' : ''}
                  `}
                >
                  <span>{heading.text}</span>
                  {hasChildren && (
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${
                        activeH2Id === heading.id ? 'rotate-90' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {recentPosts.length > 0 && (
          <div className="mt-8 pt-6 border-t border-white/10">
            <h4 className="text-xs text-brand-blue font-bold uppercase tracking-widest mb-4">
              Read More
            </h4>
            <div className="space-y-3">
              {recentPosts
                .filter((post) => post._id !== currentPostId)
                .slice(0, 2)
                .map((post) => (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug.current}`}
                    className="block p-3 rounded-lg border border-transparent hover:border-brand-blue/30 hover:bg-white/5 transition-all"
                  >
                    <h5 className="text-sm text-white hover:text-brand-blue transition-colors mb-1 line-clamp-2">
                      {post.title}
                    </h5>
                    <p className="text-xs text-white/50">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
