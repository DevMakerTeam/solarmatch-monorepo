import { cn } from '@repo/utils';
import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef, useState } from 'react';

interface MotionSectionProps {
  className?: string;
  children: ((animationComplete: boolean) => ReactNode) | ReactNode;
}

export default function MotionSection({
  children,
  className,
}: MotionSectionProps) {
  const [animationComplete, setAnimationComplete] = useState(false);
  const itemRef = useRef(null);
  const itemInView = useInView(itemRef, {
    once: true,
    amount: 0.1,
    margin: '0px',
  });

  return (
    <motion.div
      ref={itemRef}
      initial={{ y: 80, opacity: 0 }}
      animate={itemInView ? { y: 0, opacity: 1 } : { y: 80, opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      onAnimationComplete={() => {
        // 애니메이션이 위로 올라오는 동작이 완료되었을 때만 true로 설정
        if (itemInView) {
          setAnimationComplete(true);
        }
      }}
      className={cn(className)}
    >
      {typeof children === 'function' ? children(animationComplete) : children}
    </motion.div>
  );
}
