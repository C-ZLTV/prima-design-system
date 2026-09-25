import type { Meta, StoryObj } from "@storybook/react-vite";

import { Tabs } from "./Tabs";

import "../../index.css";

type TabValue = "emails" | "files" | "edits" | "dashboard" | "messages";

type TabsStoryArgs = {
  variant: "underline" | "pill";
  defaultValue: string;
  showBadge: boolean;
  badgeTab: TabValue;
  badgeLabel: string;
  badgeVariant: "neutral" | "positive" | "negative";
  disabledTabs: TabValue[];
};

const meta = {
  title: "Components/Tabs",
  parameters: {
    layout: "padded",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["underline", "pill"],
    },
    showBadge: {
      control: "boolean",
    },
    badgeTab: {
      control: "select",
      options: ["emails", "files", "edits", "dashboard", "messages"],
    },
    badgeLabel: {
      control: "text",
    },
    badgeVariant: {
      control: "select",
      options: ["neutral", "positive", "negative"],
    },
    disabledTabs: {
      control: "multi-select",
      options: ["emails", "files", "edits", "dashboard", "messages"],
    },
  },
} satisfies Meta<TabsStoryArgs>;

export default meta;

type Story = StoryObj<TabsStoryArgs>;

function PanelContent({ title }: { title: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "100%",
      }}
    >
      <div>
        <h3
          style={{
            margin: 0,
            fontSize: "18px",
            fontWeight: 700,
          }}
        >
          {title}
        </h3>

        <div
          style={{
            width: "180px",
            height: "10px",
            marginTop: "8px",
            borderRadius: "6px",
            background: "#e8e8ee",
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "12px",
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
          <div
            key={item}
            style={{
              height: "90px",
              minWidth: "90px",
              padding: "16px",
              border: "1px solid #e1e1e8",
              borderRadius: "10px",
              background: "#ffffff",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                marginBottom: "12px",
                borderRadius: "8px",
                background: "#f1f1f7",
              }}
            />

            <div
              style={{
                width: "70%",
                height: "8px",
                borderRadius: "4px",
                background: "#e8e8ee",
              }}
            />
          </div>
        ))}
      </div>
      <button
        style={{
          alignSelf: "flex-end",
          padding: "10px 18px",
          border: "none",
          borderRadius: "999px",
          background: "#1b2134",
          color: "#ffffff",
          fontSize: "14px",
          fontWeight: 700,
          lineHeight: 1.5,
          cursor: "pointer",
        }}
      >
        View all
      </button>
    </div>
  );
}

export const Playground: Story = {
  args: {
    defaultValue: "emails",
    variant: "underline",
    showBadge: true,
    badgeTab: "messages",
    badgeLabel: "New",
    badgeVariant: "positive",
    disabledTabs: [],
  },
  render: (args) => {
    const getBadge = (tabValue: TabValue) => {
      if (!args.showBadge || args.badgeTab !== tabValue) {
        return undefined;
      }

      return {
        label: args.badgeLabel,
        variant: args.badgeVariant,
      };
    };

    const isDisabled = (tabValue: TabValue) =>
      args.disabledTabs.includes(tabValue);

    return (
      <Tabs defaultValue={args.defaultValue} variant={args.variant}>
        <Tabs.List>
          <Tabs.Tab
            value="emails"
            badge={getBadge("emails")}
            disabled={isDisabled("emails")}
          >
            Emails
          </Tabs.Tab>

          <Tabs.Tab
            value="files"
            badge={getBadge("files")}
            disabled={isDisabled("files")}
          >
            Files
          </Tabs.Tab>

          <Tabs.Tab
            value="edits"
            badge={getBadge("edits")}
            disabled={isDisabled("edits")}
          >
            Edits
          </Tabs.Tab>

          <Tabs.Tab
            value="dashboard"
            badge={getBadge("dashboard")}
            disabled={isDisabled("dashboard")}
          >
            Dashboard
          </Tabs.Tab>

          <Tabs.Tab
            value="messages"
            badge={getBadge("messages")}
            disabled={isDisabled("messages")}
          >
            Messages
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="emails">
          <PanelContent title="Emails" />
        </Tabs.Panel>

        <Tabs.Panel value="files">
          <PanelContent title="Files" />
        </Tabs.Panel>

        <Tabs.Panel value="edits">
          <PanelContent title="Edits" />
        </Tabs.Panel>

        <Tabs.Panel value="dashboard">
          <PanelContent title="Dashboard" />
        </Tabs.Panel>

        <Tabs.Panel value="messages">
          <PanelContent title="Messages" />
        </Tabs.Panel>
      </Tabs>
    );
  },
};

export const Default: Story = {
  args: {
    defaultValue: "emails",
    variant: "underline",
    showBadge: true,
    badgeTab: "edits",
    badgeLabel: "Warning",
    badgeVariant: "negative",
    disabledTabs: [],
  },
  render: (args) => (
    <Tabs defaultValue={args.defaultValue} variant={args.variant}>
      <Tabs.List>
        <Tabs.Tab value="emails">Emails</Tabs.Tab>

        <Tabs.Tab
          value="files"
          badge={{
            label: "Warning",
            variant: "negative",
          }}
        >
          Files
        </Tabs.Tab>

        <Tabs.Tab value="edits">Edits</Tabs.Tab>

        <Tabs.Tab value="dashboard">Dashboard</Tabs.Tab>

        <Tabs.Tab value="messages">Messages</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="emails">
        <PanelContent title="Emails" />
      </Tabs.Panel>

      <Tabs.Panel value="files">
        <PanelContent title="Files" />
      </Tabs.Panel>

      <Tabs.Panel value="edits">
        <PanelContent title="Edits" />
      </Tabs.Panel>

      <Tabs.Panel value="dashboard">
        <PanelContent title="Dashboard" />
      </Tabs.Panel>

      <Tabs.Panel value="messages">
        <PanelContent title="Messages" />
      </Tabs.Panel>
    </Tabs>
  ),
};

export const Pill: Story = {
  args: {
    defaultValue: "emails",
    variant: "pill",
    showBadge: true,
    badgeTab: "files",
    badgeLabel: "Warning",
    badgeVariant: "negative",
    disabledTabs: [],
  },
  render: (args) => (
    <Tabs defaultValue={args.defaultValue} variant={args.variant}>
      <Tabs.List>
        <Tabs.Tab value="emails">Emails</Tabs.Tab>

        <Tabs.Tab
          value="files"
          badge={{
            label: "Warning",
            variant: "negative",
          }}
        >
          Files
        </Tabs.Tab>

        <Tabs.Tab value="edits">Edits</Tabs.Tab>

        <Tabs.Tab value="dashboard">Dashboard</Tabs.Tab>

        <Tabs.Tab value="messages">Messages</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="emails">
        <PanelContent title="Emails" />
      </Tabs.Panel>

      <Tabs.Panel value="files">
        <PanelContent title="Files" />
      </Tabs.Panel>

      <Tabs.Panel value="documents">
        <PanelContent title="Documents" />
      </Tabs.Panel>

      <Tabs.Panel value="dashboard">
        <PanelContent title="Dashboard" />
      </Tabs.Panel>

      <Tabs.Panel value="messages">
        <PanelContent title="Messages" />
      </Tabs.Panel>
    </Tabs>
  ),
};
