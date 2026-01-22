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
    // Enhanced case study image with SEO fields and size options
    caseStudyImage: ({ value }) => {
      const asset = value?.asset?.asset || value?.asset;
      if (!asset?._ref) return null;

      // Size-based width classes
      const sizeClasses: Record<string, string> = {
        full: 'w-full',
        large: 'w-3/4 mx-auto',
        medium: 'w-1/2 mx-auto',
        small: 'w-1/4',
      };
      const sizeClass = sizeClasses[value.size] || sizeClasses.full;

      return (
        <figure className={`my-8 ${sizeClass}`}>
          <img
            src={urlForImage(asset)?.width(1200).fit('max').url() || ''}
            alt={value.alt || 'Case study image'}
            title={value.alt}
            loading="lazy"
            className="rounded-xl w-full h-auto"
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-white/50 mt-3 italic">
              {value.caption}
            </figcaption>
          )}
          {value.credit && (
            <div className="text-xs text-white/30 text-right mt-1">
              {value.credit}
            </div>
          )}
        </figure>
      );
    },
    // Basic image (backwards compatibility)
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <figure className="my-8">
          <img
            src={urlForImage(value.asset)?.width(1200).fit('max').url() || ''}
            alt={value.alt || 'Blog image'}
            title={value.alt}
            loading="lazy"
            className="rounded-xl w-full h-auto"
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
    videoEmbed: ({ value }) => {
      const { url, caption, orientation } = value;
      const isVertical = orientation === 'vertical';

      // Extract video ID and platform
      let embedUrl = '';

      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        const videoId = url.includes('youtu.be')
          ? url.split('youtu.be/')[1]?.split('?')[0]
          : url.split('v=')[1]?.split('&')[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      } else if (url.includes('vimeo.com')) {
        const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
        embedUrl = `https://player.vimeo.com/video/${videoId}`;
      } else if (url.includes('loom.com')) {
        const videoId = url.split('/share/')[1]?.split('?')[0];
        embedUrl = `https://www.loom.com/embed/${videoId}`;
      } else if (url.includes('wistia.net') || url.includes('wistia.com')) {
        // Wistia embed - extract media ID from various URL formats
        const match = url.match(/(?:embed\/iframe\/|medias\/|embed\/)([a-z0-9]+)/i);
        const mediaId = match?.[1] || '';
        if (mediaId) {
          embedUrl = `https://fast.wistia.net/embed/iframe/${mediaId}?videoFoam=true`;
        }
      }

      if (!embedUrl) {
        return (
          <div className="my-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
            Unsupported video URL: {url}
          </div>
        );
      }

      return (
        <figure className="my-8 flex flex-col items-center">
          <div
            className={`relative rounded-xl overflow-hidden bg-white/5 ${
              isVertical ? 'w-full max-w-sm aspect-[9/16]' : 'w-full max-w-3xl aspect-video'
            }`}
          >
            <iframe
              src={embedUrl}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
          {caption && (
            <figcaption className="text-center text-sm text-white/50 mt-3 italic">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    },
    callout: ({ value }) => {
      const { type, title, content } = value;
      const styles: Record<string, { bg: string; border: string; icon: string }> = {
        tip: { bg: 'bg-brand-blue/10', border: 'border-brand-blue/30', icon: '💡' },
        warning: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', icon: '⚠️' },
        info: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', icon: 'ℹ️' },
        success: { bg: 'bg-green-500/10', border: 'border-green-500/30', icon: '✅' },
      };
      const style = styles[type] || styles.info;

      return (
        <div className={`my-8 p-6 rounded-xl border ${style.bg} ${style.border}`}>
          <div className="flex items-start gap-3">
            <span className="text-2xl">{style.icon}</span>
            <div className="flex-1">
              {title && <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>}
              <p className="text-white/70 leading-relaxed">{content}</p>
            </div>
          </div>
        </div>
      );
    },
    testimonial: ({ value }) => {
      const { quote, author, role } = value;
      const isExecutiveAxiom = author?.toLowerCase().includes('executive axiom');

      return (
        <blockquote className="my-10">
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <p className="text-xl text-white/90 italic leading-relaxed mb-4">&ldquo;{quote}&rdquo;</p>
            {!isExecutiveAxiom && (author || role) && (
              <footer>
                <div>
                  {author && <cite className="text-white font-semibold not-italic block">{author}</cite>}
                  {role && <span className="text-white/50 text-sm">{role}</span>}
                </div>
              </footer>
            )}
          </div>
        </blockquote>
      );
    },
    statsCard: ({ value }) => {
      const { stats } = value;
      if (!stats || stats.length === 0) return null;

      return (
        <div className="my-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat: { value: string; label: string }, idx: number) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-brand-blue mb-1">{stat.value}</div>
              <div className="text-sm text-white/50 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      );
    },
    ctaButton: ({ value }) => {
      const { text, url, style } = value;
      const isPrimary = style === 'primary';

      return (
        <div className="my-8 flex justify-center">
          <Link
            href={url || '#'}
            className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all ${
              isPrimary
                ? 'bg-brand-blue text-white hover:bg-brand-blue/90'
                : 'border-2 border-brand-blue text-brand-blue hover:bg-brand-blue/10'
            }`}
          >
            {text}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      );
    },
    divider: ({ value }) => {
      const { style } = value;

      if (style === 'dots') {
        return (
          <div className="my-12 flex justify-center gap-3">
            <span className="w-2 h-2 rounded-full bg-white/20"></span>
            <span className="w-2 h-2 rounded-full bg-white/20"></span>
            <span className="w-2 h-2 rounded-full bg-white/20"></span>
          </div>
        );
      }

      if (style === 'space') {
        return <div className="my-16"></div>;
      }

      // Default: line
      return <hr className="my-12 border-t border-white/10" />;
    },
    techStack: ({ value }) => {
      const { tools } = value;
      if (!tools || tools.length === 0) return null;

      return (
        <div className="my-8 p-6 rounded-xl border bg-brand-blue/10 border-brand-blue/30">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔧</span>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-white mb-3">Tech Stack</h4>
              <ul className="space-y-2">
                {tools.map((tool: { name: string; url?: string; promo?: string }, idx: number) => (
                  <li key={idx} className="flex items-baseline gap-2">
                    <span className="text-brand-blue">•</span>
                    <div>
                      {tool.url ? (
                        <a
                          href={tool.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-blue hover:underline font-medium"
                        >
                          {tool.name}
                        </a>
                      ) : (
                        <span className="text-white/70">{tool.name}</span>
                      )}
                      {tool.promo && (
                        <span className="text-green-400 text-sm ml-2">({tool.promo})</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
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
