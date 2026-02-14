# @quartz-community/tag-page

Renders tag pages showing all content tagged with a specific tag. Automatically generates virtual pages for all tags found across content.

## Installation

```bash
npx quartz plugin add github:quartz-community/tag-page
```

## Usage

```ts
// quartz.config.ts
import * as ExternalPlugin from "./.quartz/plugins";

const config: QuartzConfig = {
  plugins: {
    pageTypes: [ExternalPlugin.TagPage()],
  },
};
```

```ts
// quartz.layout.ts
export const layout = {
  byPageType: {
    tag: {
      beforeBody: [...],
      left: [...],
      right: [...],
    },
  },
}
```

## Configuration

| Option     | Type     | Default     | Description                                |
| ---------- | -------- | ----------- | ------------------------------------------ |
| `sort`     | `SortFn` | `undefined` | A function to sort the pages with the tag. |
| `numPages` | `number` | `undefined` | The number of pages to show per tag page.  |

## Documentation

See the [Quartz documentation](https://quartz.jzhao.xyz/) for more information.

## License

MIT
