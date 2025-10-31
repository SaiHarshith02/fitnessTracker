import React from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../utils/constants';

interface ShapeProps {
  delay: number;
  duration: number;
  size: number;
  color: string;
  x: number;
  y: number;
  shape: 'circle' | 'square' | 'triangle';
}

const AnimatedShape: React.FC<ShapeProps> = ({ delay, duration, size, color, x, y, shape }) => {
  const variants = {
    animate: {
      x: [0, 20, -20, 0],
      y: [0, -30, 30, 0],
      rotate: [0, 360],
      opacity: [0.1, 0.15, 0.1],
    },
  };

  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-lg',
    triangle: '',
  };

  return (
    <motion.div
      className={`absolute ${shapeClasses[shape]} pointer-events-none`}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        left: `${x}%`,
        top: `${y}%`,
        clipPath: shape === 'triangle' ? 'polygon(50% 0%, 100% 100%, 0% 100%)' : 'none',
      }}
      variants={variants}
      animate="animate"
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

export const AnimatedShapes: React.FC = () => {
  const shapes: ShapeProps[] = [
    {
      delay: 0,
      duration: 20,
      size: 120,
      color: COLORS.primary,
      x: 85,
      y: 10,
      shape: 'circle',
    },
    {
      delay: 0.5,
      duration: 25,
      size: 80,
      color: COLORS.secondary,
      x: 10,
      y: 80,
      shape: 'square',
    },
    {
      delay: 1,
      duration: 22,
      size: 60,
      color: COLORS.primary,
      x: 50,
      y: 5,
      shape: 'triangle',
    },
    {
      delay: 1.5,
      duration: 23,
      size: 100,
      color: COLORS.secondary,
      x: 80,
      y: 60,
      shape: 'square',
    },
    {
      delay: 0.3,
      duration: 21,
      size: 70,
      color: COLORS.primary,
      x: 5,
      y: 30,
      shape: 'circle',
    },
    {
      delay: 0.8,
      duration: 24,
      size: 90,
      color: COLORS.secondary,
      x: 40,
      y: 85,
      shape: 'circle',
    },
    {
      delay: 1.2,
      duration: 26,
      size: 55,
      color: COLORS.primary,
      x: 70,
      y: 20,
      shape: 'square',
    },
    {
      delay: 0.6,
      duration: 19,
      size: 75,
      color: COLORS.secondary,
      x: 25,
      y: 50,
      shape: 'triangle',
    },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      <div className="relative w-full h-full">
        {shapes.map((shape, idx) => (
          <AnimatedShape key={idx} {...shape} />
        ))}
      </div>
    </div>
  );
};
