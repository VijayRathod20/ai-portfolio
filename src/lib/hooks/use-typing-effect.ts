"use client";

import { useState, useEffect, useCallback } from "react";

interface UseTypingEffectOptions {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export function useTypingEffect({
  words,
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseDuration = 2000,
}: UseTypingEffectOptions) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const type = useCallback(() => {
    const currentWord = words[currentWordIndex];

    if (!isDeleting) {
      // Typing
      if (currentText.length < currentWord.length) {
        return setTimeout(() => {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        // Finished typing, pause then start deleting
        return setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      // Deleting
      if (currentText.length > 0) {
        return setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, deletingSpeed);
      } else {
        // Finished deleting, move to next word
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        return undefined;
      }
    }
  }, [currentText, currentWordIndex, isDeleting, words, typingSpeed, deletingSpeed, pauseDuration]);

  useEffect(() => {
    const timeout = type();
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [type]);

  return { currentText, isDeleting };
}
