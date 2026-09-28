# Tabs — Design System Component

A reusable Tabs component built in React and TypeScript, based on the provided Prima Design System design.

## Figma file

The figma file of the home test is available [here](https://www.figma.com/design/OclakAGLSXDoMKLFvwLNMP/%F0%9F%92%BB-Design-System-Home-Test---Tabs-Component?node-id=0-1&t=4pG7NN6HKxgxroDz-1).

The component supports two visual variants, badges, controlled and uncontrolled usage, keyboard navigation, and accessible tab/panel relationships.

## Features

- **Underline** and **Pill** variants
- Controlled and uncontrolled state
- Optional badges with **Neutral**, **Positive**, and **Negative** variants
- Disabled tabs
- Keyboard navigation with `ArrowLeft`, `ArrowRight`, `Home`, and `End`
- Roving `tabIndex` for keyboard focus management
- Accessible `tablist`, `tab`, and `tabpanel` semantics
- Responsive styling for mobile and desktop
- SCSS Modules with CSS variables for component colors
- Storybook stories with interactive controls
- Unit tests covering the main interaction and accessibility behavior

## Tech Stack

- React 19
- TypeScript
- SCSS Modules
- Storybook
- Vitest
- Testing Library
- Vite
- Biome

No CSS framework or component library is used.

## Usage

```tsx
import { Tabs } from "./components/Tabs";

export function Example() {
  return (
    <Tabs defaultValue="emails" variant="underline">
      <Tabs.List>
        <Tabs.Tab value="emails">Emails</Tabs.Tab>
        <Tabs.Tab value="files">Files</Tabs.Tab>
        <Tabs.Tab value="documents">Documents</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="emails">Emails content</Tabs.Panel>

      <Tabs.Panel value="files">Files content</Tabs.Panel>

      <Tabs.Panel value="documents">Documents content</Tabs.Panel>
    </Tabs>
  );
}
```

### Controlled usage

The component can also be controlled externally:

```tsx
const [activeTab, setActiveTab] = useState("emails");

<Tabs value={activeTab} onChange={setActiveTab}>
  ...
</Tabs>;
```

This keeps the component usable both as a self-contained UI component and in cases where the selected tab needs to be managed by the parent.

## Variants

The visual variant can be changed through the `variant` prop:

```tsx
<Tabs defaultValue="emails" variant="underline">
  ...
</Tabs>

<Tabs defaultValue="emails" variant="pill">
  ...
</Tabs>
```

`underline` is the default variant.

## Badges

A badge can be added directly through the `Tab` API:

```tsx
<Tabs.Tab
  value="files"
  badge={{
    label: "Warning",
    variant: "negative",
  }}
>
  Files
</Tabs.Tab>
```

Available badge variants:

- `neutral`
- `positive`
- `negative`

The badge is part of the tab content, so its label is also available to assistive technologies.

## Accessibility

The component follows the standard ARIA tabs pattern:

- `role="tablist"` identifies the tab container
- Each tab uses `role="tab"`
- The selected state is exposed through `aria-selected`
- Each tab is connected to its panel with `aria-controls`
- Each panel uses `role="tabpanel"` and `aria-labelledby`
- Only the selected tab is in the normal tab order
- Disabled tabs are removed from keyboard navigation
- `ArrowLeft` and `ArrowRight` move focus between tabs
- `Home` and `End` move focus to the first and last available tab
- The active panel can receive focus

The tabs use manual activation for keyboard navigation: arrow keys move focus, while `Enter` or `Space` activates the focused tab.

## Testing

The test suite focuses on behavior rather than implementation details.

It covers:

- Initial selected tab and panel
- Tab switching
- Controlled state
- Arrow key navigation
- Disabled tabs
- Badge rendering
- Tab/panel ARIA relationships

Run the tests with:

```bash
pnpm test
```

## Storybook

The component is documented and demonstrated in Storybook.

Run Storybook locally:

```bash
pnpm storybook
```

The stories include controls for:

- Tab variant
- Badge visibility
- Badge label
- Badge variant
- Disabled tabs

This makes it possible to test the component in different states without changing the implementation.

## Styling

The component uses SCSS Modules, with the main colors exposed as CSS variables:

```css
--tabs-selected
--tabs-selected-hover
--tabs-selected-active
--tabs-border
--tabs-border-hover
--tabs-positive
--tabs-negative
```

The styling is implemented from scratch without Tailwind or another CSS framework.

The layout is mobile-first, with desktop-specific sizing applied from the `769px` breakpoint.

## Project Structure

```text
src/
└── components/
    └── Tabs/
        ├── Tabs.tsx
        ├── Tabs.module.scss
        ├── Tabs.stories.tsx
        ├── Tabs.test.tsx
        └── index.ts
```

`Tabs.tsx` contains the component and its internal context/state management.

`Tabs.module.scss` contains the visual variants and responsive styles.

`Tabs.stories.tsx` contains the Storybook examples and interactive controls.

`Tabs.test.tsx` covers the component behavior and accessibility-related interactions.

## Development

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Start Storybook:

```bash
pnpm storybook
```

Run tests:

```bash
pnpm test
```

Run TypeScript checks:

```bash
pnpm tsc
```

Run formatting and linting checks:

```bash
pnpm check
```

Build Storybook:

```bash
pnpm build-storybook
```

## Design Decisions

The component API is intentionally small:

```tsx
<Tabs>
  <Tabs.List>
    <Tabs.Tab />
  </Tabs.List>

  <Tabs.Panel />
</Tabs>
```

The compound component structure keeps the relationship between tabs and panels explicit while allowing the component to manage shared state internally.

The implementation also keeps the controlled/uncontrolled distinction at the type level, so invalid combinations such as providing both `value` and `defaultValue` are rejected by TypeScript.

The component is kept deliberately focused on the requirements of the design rather than adding behavior that is not needed by the current use case.
