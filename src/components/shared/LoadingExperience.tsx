"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function LoadingExperience() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-ink"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          aria-hidden="true"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="font-display text-2xl font-semibold uppercase tracking-[0.5em] text-paper sm:text-3xl"
          >
            World Atlas
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-8 flex flex-col items-center gap-3"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-mist">
              Loading Nation
            </span>
            <div className="flex gap-1.5">
              {["0", "0", "1"].map((c, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0.2 }}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.12 }}
                  className="font-display text-3xl font-semibold text-accent"
                >
                  {c}
                </motion.span>
              ))}
            </div>
            <span className="font-mono text-[10px] tracking-[0.3em] text-mist/60">
              IDN
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
