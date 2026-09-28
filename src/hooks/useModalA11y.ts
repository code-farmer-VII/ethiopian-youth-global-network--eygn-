import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * Standard modal accessibility behavior, shared by every global modal (ArticleReaderModal,
 * EventRegistrationModal, GlobalSearchModal) rather than reimplemented per component (F18):
 * - Escape closes the modal.
 * - Focus moves into the modal on open (first focusable element, or the panel itself).
 * - Tab/Shift+Tab is trapped within the modal's focusable elements while it's open.
 * - Focus returns to whatever was focused before the modal opened, once it closes.
 *
 * Attach the returned ref to the modal's outer panel element (the one with role="dialog").
 */
export function useModalA11y<T extends HTMLElement>(isOpen: boolean, onClose: () => void) {
  const panelRef = useRef<T>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    (focusable?.[0] ?? panel)?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && panel) {
        const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [isOpen, onClose]);

  return panelRef;
}
