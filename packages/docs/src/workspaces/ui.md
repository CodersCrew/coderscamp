---
title: UI workspace
description: Documentation related directly to the UI workspace of the project.
sidebar_position: 1
---

## How to add new icons?

1. Select icons you want to export on the Figma. Remember to export both Solid and Outlined variants of them.
2. Ensure you clicked the entire icon, not only its content. You can do that by checking if your selection size is 24x24px.
3. From the sidebar on the left, choose SVG as a format and click the export button.
4. Place downloaded icons in the `ui/icons` directory.
5. Run `yarn w ui generate:icons` to generate icons as React components.
6. Import your new icons from the `ui/src/icons` directory.