import type { ReactNode } from "react";

import styles from "./Tabs.module.scss";

export type BadgeVariant = "neutral" | "positive" | "negative";

interface BadgeProps {
  children: ReactNode;
  variant: BadgeVariant;
}

export function Badge({ children, variant }: BadgeProps) {
  return (
    <span
      className={`${styles.tabs__badge} ${styles[`tabs__badge--${variant}`]}`}
    >
      {children}
    </span>
  );
}
