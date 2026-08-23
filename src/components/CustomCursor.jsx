import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);

  useEffect(() => {
    // Don't show on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const dot = dotRef.current;
    if (!dot) return;

    let visible = false;

    const onMove = (e) => {
      // Direct DOM transform — zero React re-renders, zero lag
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      if (!visible) {
        dot.style.opacity = '1';
        visible = true;
      }
    };

    const onEnter = (e) => {
      const clickable = e.target.closest('a, button, [role="button"], .cursor-pointer');
      dot.style.width = clickable ? '12px' : '8px';
      dot.style.height = clickable ? '12px' : '8px';
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onEnter, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onEnter);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: 'var(--jelly, #c3f53c)',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: 0,
        willChange: 'transform',
        transition: 'width 0.15s, height 0.15s',
        // offset so the dot centre is at the cursor tip
        marginLeft: '-4px',
        marginTop: '-4px',
      }}
    />
  );
}
