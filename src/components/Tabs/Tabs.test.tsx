import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Tabs } from "./Tabs";

describe("Tabs", () => {
  it("renders the selected tab and its panel", () => {
    render(
      <Tabs defaultValue="emails">
        <Tabs.List>
          <Tabs.Tab value="emails">Emails</Tabs.Tab>
          <Tabs.Tab value="files">Files</Tabs.Tab>
          <Tabs.Tab value="documents">Documents</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="emails">Emails content</Tabs.Panel>
        <Tabs.Panel value="files">Files content</Tabs.Panel>
        <Tabs.Panel value="documents">Documents content</Tabs.Panel>
      </Tabs>,
    );

    expect(screen.getByRole("tab", { name: "Emails" })).toHaveAttribute("aria-selected", "true");

    expect(screen.getByRole("tabpanel")).toHaveTextContent("Emails content");
  });

  it("changes the selected tab when clicked", () => {
    render(
      <Tabs defaultValue="emails">
        <Tabs.List>
          <Tabs.Tab value="emails">Emails</Tabs.Tab>
          <Tabs.Tab value="files">Files</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="emails">Emails content</Tabs.Panel>
        <Tabs.Panel value="files">Files content</Tabs.Panel>
      </Tabs>,
    );

    fireEvent.click(screen.getByRole("tab", { name: "Files" }));

    expect(screen.getByRole("tab", { name: "Files" })).toHaveAttribute("aria-selected", "true");

    expect(screen.getByRole("tabpanel")).toHaveTextContent("Files content");
  });

  it("supports controlled state", () => {
    const onChange = vi.fn();

    render(
      <Tabs value="emails" onChange={onChange}>
        <Tabs.List>
          <Tabs.Tab value="emails">Emails</Tabs.Tab>
          <Tabs.Tab value="files">Files</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="emails">Emails content</Tabs.Panel>
        <Tabs.Panel value="files">Files content</Tabs.Panel>
      </Tabs>,
    );

    fireEvent.click(screen.getByRole("tab", { name: "Files" }));

    expect(onChange).toHaveBeenCalledWith("files");

    expect(screen.getByRole("tab", { name: "Emails" })).toHaveAttribute("aria-selected", "true");
  });

  it("moves focus with ArrowRight and ArrowLeft", () => {
    render(
      <Tabs defaultValue="emails">
        <Tabs.List>
          <Tabs.Tab value="emails">Emails</Tabs.Tab>
          <Tabs.Tab value="files">Files</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="emails">Emails content</Tabs.Panel>
        <Tabs.Panel value="files">Files content</Tabs.Panel>
      </Tabs>,
    );

    const emailsTab = screen.getByRole("tab", { name: "Emails" });
    const filesTab = screen.getByRole("tab", { name: "Files" });

    emailsTab.focus();

    fireEvent.keyDown(emailsTab, { key: "ArrowRight" });

    expect(filesTab).toHaveFocus();

    fireEvent.keyDown(filesTab, { key: "ArrowLeft" });

    expect(emailsTab).toHaveFocus();
  });

  it("does not select a disabled tab", () => {
    render(
      <Tabs defaultValue="emails">
        <Tabs.List>
          <Tabs.Tab value="emails">Emails</Tabs.Tab>
          <Tabs.Tab value="files" disabled>
            Files
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="emails">Emails content</Tabs.Panel>
        <Tabs.Panel value="files">Files content</Tabs.Panel>
      </Tabs>,
    );

    const filesTab = screen.getByRole("tab", { name: "Files" });

    expect(filesTab).toBeDisabled();
    expect(filesTab).toHaveAttribute("aria-selected", "false");
  });

  it("renders the badge with its label", () => {
    render(
      <Tabs defaultValue="emails">
        <Tabs.List>
          <Tabs.Tab
            value="emails"
            badge={{
              label: "New",
              variant: "positive",
            }}
          >
            Emails
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="emails">Emails content</Tabs.Panel>
      </Tabs>,
    );

    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("connects tabs and panels with ARIA attributes", () => {
    render(
      <Tabs defaultValue="emails">
        <Tabs.List>
          <Tabs.Tab value="emails">Emails</Tabs.Tab>
          <Tabs.Tab value="files">Files</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="emails">Emails content</Tabs.Panel>
        <Tabs.Panel value="files">Files content</Tabs.Panel>
      </Tabs>,
    );

    const emailsTab = screen.getByRole("tab", { name: "Emails" });
    const emailsPanel = screen.getByRole("tabpanel");

    expect(emailsTab).toHaveAttribute("aria-controls", emailsPanel.getAttribute("id"));

    expect(emailsPanel).toHaveAttribute("aria-labelledby", emailsTab.getAttribute("id"));
  });
});
