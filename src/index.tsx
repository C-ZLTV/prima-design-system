import React from "react";
import ReactDOM from "react-dom/client";

import { Tabs } from "./components/Tabs/Tabs";

import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <main>
      <Tabs defaultValue="emails" variant="underline">
        <Tabs.List>
          <Tabs.Tab value="emails">Emails</Tabs.Tab>
          <Tabs.Tab
            value="files"
            badge={{
              label: "warning",
              variant: "negative",
            }}
          >
            Files
          </Tabs.Tab>

          <Tabs.Tab value="documents">Edits</Tabs.Tab>

          <Tabs.Tab value="dashboard">Dashboard</Tabs.Tab>
          <Tabs.Tab value="messages">Messages</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="emails">
          <p>Emails content</p>
        </Tabs.Panel>

        <Tabs.Panel value="files">
          <p>Files content</p>
          <button>Click me</button>
        </Tabs.Panel>

        <Tabs.Panel value="documents">
          <p>Edits content</p>
        </Tabs.Panel>

        <Tabs.Panel value="dashboard">
          <p>Dashboard content</p>
        </Tabs.Panel>
        <Tabs.Panel value="messages">
          <p>Messages content</p>
        </Tabs.Panel>
      </Tabs>
    </main>
  </React.StrictMode>,
);
