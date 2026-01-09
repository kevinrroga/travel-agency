import { useEffect, useState, useCallback, useMemo } from "react";

interface TypewriterTextProps {
  text: string | string[];
  className?: string;
  showCursor?: boolean;
  cursorCharacter?: string;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  onComplete?: () => void;
}

const TypewriterText = ({
  text,
  className = "",
  showCursor = true,
  cursorCharacter = "|",
  typingSpeed = 50,
  initialDelay = 500,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = false,
  onComplete,
}: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const textArray = useMemo(
    () => (Array.isArray(text) ? text : [text]),
    [text]
  );

  // Reset state when text changes (for language switching)
  useEffect(() => {
    setDisplayedText("");
    setCurrentCharIndex(0);
    setIsDeleting(false);
    setCurrentTextIndex(0);
    setHasStarted(false);
  }, [text]);

  useEffect(() => {
    if (!hasStarted) {
      const startTimeout = setTimeout(() => {
        setHasStarted(true);
      }, initialDelay);
      return () => clearTimeout(startTimeout);
    }

    let timeout: ReturnType<typeof setTimeout>;
    const currentText = textArray[currentTextIndex];

    if (isDeleting) {
      if (displayedText === "") {
        setIsDeleting(false);

        if (currentTextIndex === textArray.length - 1 && !loop) {
          if (onComplete) onComplete();
          return;
        }

        setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
        setCurrentCharIndex(0);
        timeout = setTimeout(() => {}, pauseDuration);
      } else {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, -1));
        }, deletingSpeed);
      }
    } else {
      if (currentCharIndex < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + currentText[currentCharIndex]);
          setCurrentCharIndex((prev) => prev + 1);
        }, typingSpeed);
      } else if (textArray.length > 1 || loop) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      } else {
        if (onComplete) onComplete();
      }
    }

    return () => clearTimeout(timeout);
  }, [
    currentCharIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    textArray,
    currentTextIndex,
    loop,
    initialDelay,
    hasStarted,
    onComplete,
  ]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && (
        <span className="inline-block animate-cursor-blink ml-1">
          {cursorCharacter}
        </span>
      )}
    </span>
  );
};

export default TypewriterText;
