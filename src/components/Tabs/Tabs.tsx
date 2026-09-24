import {
  createContext,
  useContext,
  useId,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

type TabsVariant = "underline" | "pill";

type BadgeVariant = "neutral" | "positive" | "negative";

interface TabsProps {
  children: ReactNode;
  variant?: TabsVariant;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
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
  value: string | undefined;
  variant: TabsVariant;
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
    <div role="tablist" aria-orientation="horizontal">
      {children}
    </div>
  );
}

function TabsTab({ children, value, badge, disabled = false }: TabProps) {
  const { value: activeValue, onChange, baseId } = useTabsContext();

  const selected = activeValue === value;

  const tabId = `${baseId}-tab-${value}`;
  const panelId = `${baseId}-panel-${value}`;

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const tabList = event.currentTarget.closest('[role="tablist"]');

    if (!tabList) {
      return;
    }

    const tabs =
      Array.from(
        tabList.querySelectorAll<HTMLButtonElement>(
          '[role="tab"]:not(:disabled)',
        ),
      ) ?? [];

    const currentIndex = tabs.indexOf(event.currentTarget);

    if (currentIndex === -1) {
      return;
    }

    let nextIndex: number | undefined;

    if (event.key === "ArrowRight") {
      nextIndex = currentIndex + 1;
    } else if (event.key === "ArrowLeft") {
      nextIndex = currentIndex - 1;
    } else {
      nextIndex = undefined;
      return;
    }

    event.preventDefault();

    const nextTab = tabs[nextIndex];

    if (!nextTab) {
      return;
    }

    const nextValue = nextTab.getAttribute("data-value");
    console.log("nextValue", nextValue);

    if (!nextValue) {
      return;
    }

    onChange(nextValue);
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
      data-value={value}
      onClick={() => onChange(value)}
      onKeyDown={handleKeyDown}
    >
      {children}

      {badge && <span>{badge.label}</span>}
    </button>
  );
}

function TabsPanel({ children, value }: TabPanelProps) {
  const { value: activeValue, baseId } = useTabsContext();

  const selected = activeValue === value;

  const tabId = `${baseId}-tab-${value}`;
  const panelId = `${baseId}-panel-${value}`;

  return (
    <div
      id={panelId}
      role="tabpanel"
      aria-labelledby={tabId}
      hidden={!selected}
    >
      {children}
    </div>
  );
}

function TabsBase({
  children,
  variant = "underline",
  defaultValue,
  onChange,
}: TabsProps) {
  const [value, setValue] = useState(defaultValue);
  const baseId = useId();

  const handleChange = (nextValue: string) => {
    setValue(nextValue);
    onChange?.(nextValue);
  };

  const contextValue = {
    value,
    variant,
    onChange: handleChange,
    baseId,
  };

  return (
    <TabsContext.Provider value={contextValue}>{children}</TabsContext.Provider>
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
