'use client';

import type { Transition } from 'framer-motion';
import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode, useSyncExternalStore } from 'react';

import styles from './Animation.module.scss';
import type { AnimationVariant } from './types';

type AnimationProps = {
  children: ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  distance?: number;
  ease?: Transition['ease'];
  className?: string;
  amount?: number;
};

const MOBILE_MEDIA_QUERY = '(max-width: 768px)';

const mobileViewportSubscribers = new Set<() => void>();
let mobileViewportMediaQuery: MediaQueryList | undefined;

const notifyMobileViewportSubscribers = () => {
  mobileViewportSubscribers.forEach(subscriber => subscriber());
};

const getMobileViewportMediaQuery = () => {
  if (typeof window === 'undefined') return undefined;

  mobileViewportMediaQuery ??= window.matchMedia(MOBILE_MEDIA_QUERY);

  return mobileViewportMediaQuery;
};

const getMobileViewportSnapshot = () =>
  getMobileViewportMediaQuery()?.matches ?? false;

const subscribeToMobileViewport = (subscriber: () => void) => {
  const mediaQuery = getMobileViewportMediaQuery();

  if (!mediaQuery) return () => {};

  mobileViewportSubscribers.add(subscriber);

  if (mobileViewportSubscribers.size === 1) {
    mediaQuery.addEventListener('change', notifyMobileViewportSubscribers);
  }

  return () => {
    mobileViewportSubscribers.delete(subscriber);

    if (mobileViewportSubscribers.size === 0) {
      mediaQuery.removeEventListener('change', notifyMobileViewportSubscribers);
      mobileViewportMediaQuery = undefined;
    }
  };
};

const useMobileViewport = () =>
  useSyncExternalStore(
    subscribeToMobileViewport,
    getMobileViewportSnapshot,
    () => false
  );

const createVariant = (variant: AnimationVariant, distance?: number) => {
  switch (variant) {
    case 'fade':
      return {
        hidden: { opacity: 0, y: distance ?? 30 },
        visible: { opacity: 1, y: 0 },
      };
    case 'fadeUp':
      return {
        hidden: { opacity: 0, y: distance ?? 40 },
        visible: { opacity: 1, x: 0, y: 0 },
      };
    case 'fadeLeft':
      return {
        hidden: { opacity: 0, x: -(distance ?? 50) },
        visible: { opacity: 1, x: 0 },
      };
    case 'fadeRight':
      return {
        hidden: { opacity: 0, x: distance ?? 50 },
        visible: { opacity: 1, x: 0 },
      };
    case 'fadeDown':
      return {
        hidden: { opacity: 0, y: -(distance ?? 40) },
        visible: { opacity: 1, y: 0 },
      };
    case 'zoom':
      return {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
      };
  }
};

type MotionAnimationProps = AnimationProps & {
  animationVariant: AnimationVariant;
  fullSize?: boolean;
};

const MotionAnimation = ({
  children,
  delay = 0,
  duration = 0.6,
  distance,
  ease,
  className,
  amount = 0.2,
  animationVariant,
  fullSize = false,
}: MotionAnimationProps) => {
  const variants = createVariant(animationVariant, distance);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={fullSize ? { width: '100%', height: '100%' } : undefined}
      initial={shouldReduceMotion ? false : 'hidden'}
      animate={shouldReduceMotion ? 'visible' : undefined}
      whileInView={shouldReduceMotion ? undefined : 'visible'}
      viewport={shouldReduceMotion ? undefined : { once: true, amount }}
      variants={variants}
      transition={
        shouldReduceMotion ? { duration: 0 } : { duration, delay, ease }
      }
    >
      {children}
    </motion.div>
  );
};

const HorizontalAnimation = (props: AnimationProps) => {
  const isMobile = useMobileViewport();
  const animationVariant = isMobile ? 'fadeUp' : (props.variant ?? 'fade');

  return (
    <div className={`${styles.horizontalAnimation} ${props.className ?? ''}`}>
      <MotionAnimation
        {...props}
        className={undefined}
        animationVariant={animationVariant}
        fullSize
      />
    </div>
  );
};

export const Animation = (props: AnimationProps) => {
  const { variant = 'fade' } = props;

  if (variant === 'fadeLeft' || variant === 'fadeRight') {
    return <HorizontalAnimation {...props} />;
  }

  return (
    <MotionAnimation
      {...props}
      animationVariant={variant}
    />
  );
};
