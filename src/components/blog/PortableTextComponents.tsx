import Image from 'next/image';
import Link from 'next/link';
import { PortableTextComponents as PortableTextComponentsType } from '@portabletext/react';
import { urlForImage } from '@/sanity/lib/image';

// Helper function to generate slug from text
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

export const PortableTextComponents: PortableTextComponentsType = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <figure className="my-8">
          <Image
            src={urlForImage(value.asset)?.width(1200).height(675).url() || ''}
            alt={value.alt || 'Blog image'}
            width={1200}
            height={675}
            className="rounded-xl w-full"
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-white/50 mt-3 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    code: ({ value }) => {
      return (
        <pre className="bg-white/5 border border-white/10 rounded-xl p-6 overflow-x-auto my-6 max-w-full">
          {value.filename && (
            <div className="text-sm text-brand-blue mb-3 border-b border-white/10 pb-2">
              {value.filename}
            </div>
          )}
          <code className="text-sm text-white font-mono block">{value.code}</code>
        </pre>
      );
    },
  },
  block: {
    h2: ({ children }) => {
      const extractText = (node: unknown): string => {
        if (typeof node === 'string') return node;
        if (Array.isArray(node)) return node.map(extractText).join('');
        if (node && typeof node === 'object' && 'props' in node) {
          const props = (node as { props?: { children?: unknown } }).props;
          if (props?.children) return extractText(props.children);
        }
        return '';
      };
      const text = extractText(children);
      const id = slugify(text);
      return (
        <h2 id={id} className="text-3xl text-white mt-12 mb-5 font-bold scroll-mt-24">
          {children}
        </h2>
      );
    },
    h3: ({ children }) => {
      const extractText = (node: unknown): string => {
        if (typeof node === 'string') return node;
        if (Array.isArray(node)) return node.map(extractText).join('');
        if (node && typeof node === 'object' && 'props' in node) {
          const props = (node as { props?: { children?: unknown } }).props;
          if (props?.children) return extractText(props.children);
        }
        return '';
      };
      const text = extractText(children);
      const id = slugify(text);
      return (
        <h3 id={id} className="text-2xl text-white mt-10 mb-4 font-semibold scroll-mt-24">
          {children}
        </h3>
      );
    },
    h4: ({ children }) => (
      <h4 className="text-xl text-white mt-8 mb-3 font-semibold">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-lg leading-relaxed text-white/60 mb-6">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-brand-blue pl-6 my-8 italic text-lg text-white/80">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-8 mb-6 text-lg leading-relaxed text-white/60 space-y-2">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-8 mb-6 text-lg leading-relaxed text-white/60 space-y-2">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-brand-blue/10 text-brand-blue px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const target = value?.blank ? '_blank' : undefined;
      const rel = value?.blank ? 'noopener noreferrer' : undefined;
      return (
        <Link
          href={value?.href || '#'}
          target={target}
          rel={rel}
          className="text-brand-blue border-b border-brand-blue/30 hover:border-brand-blue transition-all"
        >
          {children}
        </Link>
      );
    },
  },
};
