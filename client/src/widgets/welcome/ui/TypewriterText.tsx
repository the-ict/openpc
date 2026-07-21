"use client";

import { useMemo, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface TypewriterTextProps {
  scrollProgress: number;
  text: string;
  highlightWord?: string;
  className?: string;
}

export default function TypewriterText({
  scrollProgress,
  text,
  highlightWord,
  className = "",
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [highlightedParts, setHighlightedParts] = useState<{ text: string; highlight: boolean }[]>([]);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!textRef.current) return;

    const targetLength = Math.floor(text.length * Math.max(0, Math.min(1, scrollProgress)));
    const targetText = text.slice(0, targetLength);

    gsap.to({ val: displayText.length }, {
      val: targetLength,
      duration: 0.3,
      ease: "power2.out",
      onUpdate: function () {
        const currentLength = Math.floor(this.targets()[0].val);
        const currentText = text.slice(0, currentLength);
        setDisplayText(currentText);
      },
    });
  }, [scrollProgress]);

  useEffect(() => {
    if (!highlightWord) {
      setHighlightedParts([{ text: displayText, highlight: false }]);
      return;
    }

    const parts: { text: string; highlight: boolean }[] = [];
    let remaining = displayText;
    const lowerHighlight = highlightWord.toLowerCase();

    while (remaining.length > 0) {
      const lowerRemaining = remaining.toLowerCase();
      const idx = lowerRemaining.indexOf(lowerHighlight);

      if (idx === -1) {
        parts.push({ text: remaining, highlight: false });
        break;
      }

      if (idx > 0) {
        parts.push({ text: remaining.slice(0, idx), highlight: false });
      }

      const highlightEnd = Math.min(idx + highlightWord.length, remaining.length);
      parts.push({ text: remaining.slice(idx, highlightEnd), highlight: true });
      remaining = remaining.slice(highlightEnd);
    }

    setHighlightedParts(parts);
  }, [displayText, highlightWord]);

  return (
    <div className={`max-w-2xl px-6 text-center ${className}`}>
      <h3 className="text-[#C4D335] text-sm md:text-base font-semibold tracking-widest uppercase mb-3">
        KOMPYUTERNI YIG'ISH JARAYONI
      </h3>
      <h2 ref={textRef} className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
        {highlightedParts.map((part, i) => (
          <span key={i} className={part.highlight ? "text-[#C4D335]" : ""}>
            {part.text}
          </span>
        ))}
      </h2>
    </div>
  );
}