import { Variants, Transition, TargetAndTransition } from 'motion/react';

export const cubicEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const modalEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Premium institutional easing curves
export const transitionSmooth: Transition = {
  duration: 0.55,
  ease: cubicEase,
};

export const transitionFast: Transition = {
  duration: 0.25,
  ease: cubicEase,
};

export const transitionSpring = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 30,
};

// Reusable Viewport Triggers (Sensible, non-intrusive)
export const viewportStandard = {
  once: true,
  amount: 0.15,
};

export const viewportCard = {
  once: true,
  amount: 0.1,
};

// Fade & Slide Presets
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionSmooth,
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionSmooth,
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitionSmooth,
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitionSmooth,
  },
};

export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: transitionSmooth,
  },
};

// Stagger Container Preset
export const staggerContainer = (staggerDelay = 0.08, delayChildren = 0.05): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: delayChildren,
    },
  },
});

// Card Hover & Tap Presets (Refined, no layout displacement)
export const cardHoverProps = {
  whileHover: {
    y: -4,
    transition: { duration: 0.22, ease: cubicEase }
  } as TargetAndTransition,
  whileTap: {
    scale: 0.99,
    transition: { duration: 0.15 }
  } as TargetAndTransition,
};

// Button Micro-interaction Presets
export const buttonHoverProps = {
  whileHover: {
    scale: 1.02,
    y: -1,
    transition: { duration: 0.18, ease: cubicEase }
  } as TargetAndTransition,
  whileTap: {
    scale: 0.98,
    transition: { duration: 0.1 }
  } as TargetAndTransition,
};

// Modal & Lightbox Animation Presets
export const modalBackdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.22, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.18, ease: 'easeIn' } },
};

export const modalDialogVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.28, ease: modalEase }
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 10,
    transition: { duration: 0.18, ease: modalEase }
  },
};
