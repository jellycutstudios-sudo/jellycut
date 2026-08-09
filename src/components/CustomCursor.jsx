import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [hasMoved, setHasMoved] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Initialize motion values OFF-SCREEN so there's no flash at (0,0)
  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  // Outer ring follows with a spring lag; inner dot follows instantly
  const springConfig = { damping: 28, stiffness: 450, mass: 0.4 };
  const springX = useSpring(rawX, springConfig);
  const springY = useSpring(rawY, springConfig);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const handleMove = (e) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!hasMoved) setHasMoved(true);
    };

    const handleOver = (e) => {
      const target = e.target;
      const isCard = target.closest('.group.cursor-pointer');
      const isClickable = target.closest('a, button, [role="button"]');

      if (isCard) {
        setIsHovering(true);
        setHoverText('VIEW');
      } else if (isClickable) {
        setIsHovering(true);
        setHoverText('');
      } else {
        setIsHovering(false);
        setHoverText('');
      }
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseover', handleOver);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleOver);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isTouchDevice || !hasMoved) return null;

  const size = isHovering ? 48 : 20;
  const offset = size / 2;

  return (
    <>
      {/* Outer ring — spring-lagged, blend-difference for contrast on any bg */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: size,
          height: size,
          backgroundColor: isHovering ? '#ffffff' : 'transparent',
          border: '2px solid #ffffff',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {isHovering && hoverText && (
          <span className="text-[10px] font-bold tracking-wider text-black mix-blend-normal">
            {hoverText}
          </span>
        )}
      </motion.div>

      {/* Inner dot — follows instantly, hides on hover */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-1.5 h-1.5 rounded-full"
        style={{
          x: rawX,
          y: rawY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: 'var(--jelly, #c3f53c)',
        }}
        animate={{ opacity: isHovering ? 0 : 1, scale: isHovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
