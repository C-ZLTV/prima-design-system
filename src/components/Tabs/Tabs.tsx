import {
  createContext,
  useContext,
  useId,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import styles from "./Tabs.module.scss";

import { Badge, type BadgeVariant } from "./Badge";

type TabsVariant = "underline" | "pill";

interface TabsCommonProps {
  children: ReactNode;
  variant?: TabsVariant;
}

interface ControlledTabsProps extends TabsCommonProps {
  value: string;
  onChange: (value: string) => void;
  defaultValue?: never;
}

interface UncontrolledTabsProps extends TabsCommonProps {
  defaultValue: string;
  value?: never;
  onChange?: (value: string) => void;
}

type TabsProps = ControlledTabsProps | UncontrolledTabsProps;

function isControlledTabs(props: TabsProps): props is ControlledTabsProps {
  return props.value !== undefined;
}

interface TabProps {
  children: ReactNode;
  value: string;
  badge?: {
    label: string;
    variant: BadgeVariant;
  };
  disabled?: boolean;
}

interface TabPanelProps {
  children: ReactNode;
  value: string;
}

interface TabsContextValue {
  value: string;
  onChange: (value: string) => void;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

export function useTabsContext() {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("Context missing for Tabs component");
  }

  return context;
}

interface TabsListProps {
  children: ReactNode;
}

function TabsList({ children }: TabsListProps) {
  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className={styles.tabs__list}
    >
      {children}
    </div>
  );
}

function TabsTab({ children, value, badge, disabled = false }: TabProps) {
  const { value: activeValue, onChange, baseId } = useTabsContext();

  const selected = activeValue === value;

  const tabId = `${baseId}-tab-${encodeURIComponent(value)}`;
  const panelId = `${baseId}-panel-${encodeURIComponent(value)}`;

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const tabList = event.currentTarget.closest('[role="tablist"]');

    if (!tabList) {
      return;
    }

    const tabs = Array.from(
      tabList.querySelectorAll<HTMLButtonElement>(
        '[role="tab"]:not(:disabled)',
      ),
    );

    const currentIndex = tabs.indexOf(event.currentTarget);

    if (currentIndex === -1) {
      return;
    }

    let nextIndex: number;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = (currentIndex + 1) % tabs.length;
        break;

      case "ArrowLeft":
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;

      case "Home":
        nextIndex = 0;
        break;

      case "End":
        nextIndex = tabs.length - 1;
        break;

      default:
        return;
    }

    const nextTab = tabs[nextIndex];

    if (!nextTab) {
      return;
    }

    event.preventDefault();
    nextTab.focus();
  };

  return (
    <button
      id={tabId}
      type="button"
      role="tab"
      aria-selected={selected}
      aria-controls={panelId}
      tabIndex={selected ? 0 : -1}
      disabled={disabled}
      className={styles.tabs__tab}
      onClick={() => onChange(value)}
      onKeyDown={handleKeyDown}
    >
      {children}

      {badge && <Badge variant={badge.variant}>{badge.label}</Badge>}
    </button>
  );
}

function TabsPanel({ children, value }: TabPanelProps) {
  const { value: activeValue, baseId } = useTabsContext();

  const selected = activeValue === value;

  const tabId = `${baseId}-tab-${encodeURIComponent(value)}`;
  const panelId = `${baseId}-panel-${encodeURIComponent(value)}`;

  return (
    <div
      id={panelId}
      role="tabpanel"
      aria-labelledby={tabId}
      hidden={!selected}
      className={styles.tabs__panel}
    >
      {children}
    </div>
  );
}

function TabsBase(props: TabsProps) {
  const { children, variant = "underline" } = props;

  const baseId = useId();

  const isControlled = isControlledTabs(props);

  const [internalValue, setInternalValue] = useState<string>(
    isControlled ? props.value : props.defaultValue,
  );

  const value = isControlled ? props.value : internalValue;

  const handleChange = (nextValue: string) => {
    if (!isControlled) {
      setInternalValue(nextValue);
    }

    props.onChange?.(nextValue);
  };

  const contextValue: TabsContextValue = {
    value,
    onChange: handleChange,
    baseId,
  };

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={`${styles.tabs} ${styles[`tabs--${variant}`]}`}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

type TabsComponent = typeof TabsBase & {
  List: typeof TabsList;
  Tab: typeof TabsTab;
  Panel: typeof TabsPanel;
};

export const Tabs = Object.assign(TabsBase, {
  List: TabsList,
  Tab: TabsTab,
  Panel: TabsPanel,
}) satisfies TabsComponent;
