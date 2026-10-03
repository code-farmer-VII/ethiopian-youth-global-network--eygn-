import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

/**
 * react-router's <Link> (real <a href>, client-side navigation -- see F12) wrapped so it also
 * accepts motion props (whileHover, whileTap, etc.) -- frontend-update's animation pass used
 * plain onClick buttons everywhere and had no concept of real routing, so this bridges the two:
 * every primary CTA that's a <Link> in this app can still get the same hover/tap micro-interactions.
 */
export const MotionLink = motion.create(Link);
