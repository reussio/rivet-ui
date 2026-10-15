# Manual accessibility review

Run this checklist for every new component and before a stable release. Automated Axe and
Playwright checks intentionally cover only issues that can be asserted reliably.

## Keyboard

- Reach every interactive control in a logical order with `Tab` and `Shift+Tab`.
- Confirm every focused control has a clearly visible focus indicator in light and dark themes.
- Operate buttons and links with `Enter`; operate native toggle controls with `Space`.
- Use Arrow, Home, End, Page Up, and Page Down where the component pattern supports them.
- Open and close menus, popovers, dialogs, sheets, and drawers without a pointer.
- Confirm `Escape` closes dismissible overlays and returns focus to the opening control.
- Confirm modal focus stays inside the overlay without producing a keyboard trap.
- Repeat the flow with reduced motion enabled.

## Screen reader

- Read the component with VoiceOver or NVDA from its preceding label or heading.
- Confirm controls announce a useful name, role, current value, and state.
- Confirm disabled, checked, selected, expanded, required, busy, and invalid states are announced.
- Confirm descriptions and validation messages are associated with the relevant control.
- Confirm dynamic loading, success, error, and empty feedback is announced once at the right time.
- Confirm decorative icons and duplicated visual labels stay out of the accessibility tree.
- Confirm tab, menu, listbox, grid, and dialog structures remain understandable in browse mode.

Record the browser, screen reader, operating system, component scenario, and result in the release
report. Axe findings remain supporting evidence rather than a substitute for this review.
