# @quartz-community/tag-page

Renders tag pages showing all content tagged with a specific tag. Automatically generates virtual pages for all tags found across content.

## Installation

```bash
npx quartz plugin add github:quartz-community/tag-page
```

## Usage

```yaml title="quartz.config.yaml"
plugins:
  - source: github:quartz-community/tag-page
    enabled: true
```

For advanced use cases, you can override in TypeScript:

```ts title="quartz.ts (override)"
import * as ExternalPlugin from "./.quartz/plugins";

ExternalPlugin.TagPage({
  numPages: 10,
});
```

## Configuration

| Option     | Type     | Default     | Description                                |
| ---------- | -------- | ----------- | ------------------------------------------ |
| `sort`     | `SortFn` | `undefined` | A function to sort the pages with the tag. |
| `numPages` | `number` | `undefined` | The number of pages to show per tag page.  |

## Documentation

See the [Quartz documentation](https://quartz.jzhao.xyz/plugins/TagPage) for more information.

## License

MIT
