"use client";

/**
 * ANIMATIONS - All pure HTML/CSS, zero framer-motion
 * This ensures the site works on all devices including iOS Safari
 */

// 1. Card3D - Just a div wrapper
export function Card3D({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`relative ${className}`}>{children}</div>;
}

// 2. MagneticButton - Just a link/div wrapper
export function MagneticButton({
  children,
  className = "",
  href
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
}) {
  const content = <div className={className}>{children}</div>;
  if (href) {
    return <a href={href}>{content}</a>;
  }
  return content;
}

// 3. TextScramble - Just renders the text
export function TextScramble({ text, className = "" }: { text: string; className?: string }) {
  return <span className={className}>{text}</span>;
}

// 4. NumberCounter - Just renders the value
export function NumberCounter({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  return (
    <span className="tabular-nums">
      {prefix}{value}{suffix}
    </span>
  );
}

// 5. ParallaxBackground - Static gradient blobs
export function ParallaxBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full bg-[#0070f3]/10 blur-3xl opacity-30" />
      <div className="absolute top-1/2 -left-32 w-[300px] h-[300px] rounded-full bg-[#00c6ff]/10 blur-3xl opacity-30" />
    </div>
  );
}

// 6. ParallaxDivider - Static divider lines
export function ParallaxDivider() {
  return (
    <div className="relative h-32 overflow-hidden">
      <div className="absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0070f3]/50 to-transparent" />
      <div className="absolute bottom-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}

// 7. HeroParallax - Static background with gradient blobs
export function HeroParallax({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#0070f3]/15 blur-[80px]" />
        <div className="absolute top-1/3 -left-24 w-[350px] h-[350px] rounded-full bg-[#00c6ff]/10 blur-[60px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-[#7928ca]/8 blur-[60px]" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// 8. AuroraBackground - Static gradient background
export function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(0,112,243,0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(121,40,202,0.08) 0%, transparent 40%),
            radial-gradient(ellipse at 40% 80%, rgba(0,198,255,0.08) 0%, transparent 40%)
          `,
        }}
      />
    </div>
  );
}

// 9. LiquidText - Just renders the text
export function LiquidText({ text, className = "" }: { text: string; className?: string }) {
  return <span className={`inline-block ${className}`}>{text}</span>;
}

// 10. GlitchText - Just renders the text
export function GlitchText({ text, className = "" }: { text: string; className?: string }) {
  return <span className={`inline-block ${className}`}>{text}</span>;
}

// 11. InfiniteMarquee - CSS animation marquee
export function InfiniteMarquee({
  children,
}: {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right"
}) {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div className="inline-flex animate-marquee">
        <span className="inline-flex items-center">{children}</span>
        <span className="inline-flex items-center">{children}</span>
      </div>
    </div>
  );
}

// 12. SpotlightCard - Just a div wrapper
export function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`relative overflow-hidden ${className}`}>{children}</div>;
}

// Additional exports for compatibility

export function ParallaxLayer({
  children,
  className = ""
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  return <div className={`relative ${className}`}>{children}</div>;
}

export function MorphingBlob({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute bg-gradient-to-r from-[#0070f3] to-[#00c6ff] opacity-30 blur-3xl rounded-full ${className}`} />
  );
}

export function FloatingGrid() {
  return null;
}

export function RevealText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function TypewriterText({ text, className = "" }: { text: string; className?: string; speed?: number; delay?: number }) {
  return <span className={className}>{text}</span>;
}

export function ExplodeOnClick({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`relative ${className}`}>{children}</div>;
}

export function PerspectiveSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function NeonButton({
  children,
  className = "",
  href
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
}) {
  const content = (
    <div className={`relative px-8 py-4 rounded-full font-bold cursor-pointer border-2 border-[#0070f3] text-[#0070f3] hover:bg-[#0070f3] hover:text-white transition-colors ${className}`}>
      {children}
    </div>
  );
  if (href) {
    return <a href={href}>{content}</a>;
  }
  return content;
}
