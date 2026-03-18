import { jsxs, jsx, Fragment } from 'preact/jsx-runtime';
import { htmlToJsx } from '@quartz-community/utils/jsx';

// src/util/path.ts
function joinSegments(...args) {
  if (args.length === 0) return "";
  let joined = args.filter((segment) => segment !== "" && segment !== "/").map((segment) => stripSlashes(segment)).join("/");
  const first = args[0];
  const last = args[args.length - 1];
  if (first?.startsWith("/")) joined = "/" + joined;
  if (last?.endsWith("/")) joined = joined + "/";
  return joined;
}
function stripSlashes(s, onlyStripPrefix) {
  if (s.startsWith("/")) s = s.substring(1);
  if (!onlyStripPrefix && s.endsWith("/")) s = s.slice(0, -1);
  return s;
}
function simplifySlug(fp) {
  const res = stripSlashes(trimSuffix(fp, "index"), true);
  return res.length === 0 ? "/" : res;
}
function trimSuffix(s, suffix) {
  if (endsWith(s, suffix)) s = s.slice(0, -suffix.length);
  return s;
}
function endsWith(s, suffix) {
  return s === suffix || s.endsWith("/" + suffix);
}
function pathToRoot(slug) {
  let rootPath = slug.split("/").filter((x) => x !== "").slice(0, -1).map((_) => "..").join("/");
  if (rootPath.length === 0) rootPath = ".";
  return rootPath;
}
function resolveRelative(current, target) {
  return joinSegments(pathToRoot(current), simplifySlug(target));
}
function isFolderPath(fplike) {
  return fplike.endsWith("/") || endsWith(fplike, "index") || endsWith(fplike, "index.md") || endsWith(fplike, "index.html");
}
function getAllSegmentPrefixes(tags) {
  const segments = tags.split("/");
  const results = [];
  for (let i = 0; i < segments.length; i++) {
    results.push(segments.slice(0, i + 1).join("/"));
  }
  return results;
}
function getDate(cfg, data) {
  const type = cfg?.defaultDateType ?? "created";
  return data.dates?.[type];
}
function byDateAndAlphabeticalFolderFirst(cfg) {
  return (f1, f2) => {
    const f1IsFolder = isFolderPath(f1.slug ?? "");
    const f2IsFolder = isFolderPath(f2.slug ?? "");
    if (f1IsFolder && !f2IsFolder) return -1;
    if (!f1IsFolder && f2IsFolder) return 1;
    if (f1.dates && f2.dates) {
      return (getDate(cfg, f2)?.getTime() ?? 0) - (getDate(cfg, f1)?.getTime() ?? 0);
    } else if (f1.dates && !f2.dates) {
      return -1;
    } else if (!f1.dates && f2.dates) {
      return 1;
    }
    const f1Title = f1.frontmatter?.title?.toLowerCase() ?? "";
    const f2Title = f2.frontmatter?.title?.toLowerCase() ?? "";
    return f1Title.localeCompare(f2Title);
  };
}
function DateDisplay({ date, locale }) {
  return /* @__PURE__ */ jsx("time", { dateTime: date.toISOString(), children: date.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit"
  }) });
}
var PageList = ({
  cfg,
  fileData,
  allFiles,
  limit,
  sort
}) => {
  const sorter = sort ?? byDateAndAlphabeticalFolderFirst(cfg);
  let list = [...allFiles].sort(sorter);
  if (limit) {
    list = list.slice(0, limit);
  }
  const fileSlug = fileData?.slug;
  return /* @__PURE__ */ jsx("ul", { class: "section-ul", children: list.map((page) => {
    const title = page.frontmatter?.title;
    const tags = page.frontmatter?.tags ?? [];
    return /* @__PURE__ */ jsx("li", { class: "section-li", children: /* @__PURE__ */ jsxs("div", { class: "section", children: [
      /* @__PURE__ */ jsx("p", { class: "meta", children: page.dates && /* @__PURE__ */ jsx(
        DateDisplay,
        {
          date: getDate(cfg, page),
          locale: cfg?.locale ?? "en-US"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { class: "desc", children: /* @__PURE__ */ jsx("h3", { children: /* @__PURE__ */ jsx(
        "a",
        {
          href: resolveRelative(fileSlug ?? "", page.slug),
          class: "internal",
          children: title
        }
      ) }) }),
      /* @__PURE__ */ jsx("ul", { class: "tags", children: tags.map((tag) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        "a",
        {
          class: "internal tag-link",
          href: resolveRelative(
            fileSlug ?? "",
            `tags/${tag}`
          ),
          children: tag
        }
      ) })) })
    ] }) });
  }) });
};
PageList.css = `
.section h3 {
  margin: 0;
}

.section > .tags {
  margin: 0;
}
`;

// src/i18n/locales/en-US.ts
var en_US_default = {
  pages: {
    tagContent: {
      tag: "Tag",
      tagIndex: "Tag Index",
      itemsUnderTag: ({ count }) => count === 1 ? "1 item with this tag." : `${count} items with this tag.`,
      showingFirst: ({ count }) => `Showing first ${count} tags.`,
      totalTags: ({ count }) => `Found ${count} total tags.`
    }
  },
  components: {}
};

// src/i18n/index.ts
var locales = {
  "en-US": en_US_default
};
function i18n(locale) {
  return locales[locale] || en_US_default;
}

// src/components/styles/listPage.scss
var listPage_default = "ul.section-ul {\n  list-style: none;\n  margin-top: 2em;\n  padding-left: 0;\n}\n\nli.section-li {\n  margin-bottom: 1em;\n}\nli.section-li > .section {\n  display: grid;\n  grid-template-columns: fit-content(8em) 3fr 1fr;\n}\n@media all and (max-width: 600px) {\n  li.section-li > .section > .tags {\n    display: none;\n  }\n}\nli.section-li > .section > .desc > h3 > a {\n  background-color: transparent;\n}\nli.section-li > .section .meta {\n  margin: 0 1em 0 0;\n  opacity: 0.6;\n}\n\n.popover .section {\n  grid-template-columns: fit-content(8em) 1fr !important;\n}\n.popover .section > .tags {\n  display: none;\n}";
var defaultOptions = {
  numPages: 10
};
function concatenateResources(...resources) {
  const result = resources.filter((r) => r !== void 0).flat();
  return result.length === 0 ? void 0 : result;
}
var TagContent_default = ((opts) => {
  const options = { ...defaultOptions, ...opts };
  const TagContent = (props) => {
    const { tree, fileData, allFiles, cfg } = props;
    const fd = fileData;
    const slug = fd.slug;
    const locale = cfg?.locale ?? "en-US";
    if (!(slug?.startsWith("tags/") || slug === "tags")) {
      throw new Error(`Component "TagContent" tried to render a non-tag page: ${slug}`);
    }
    const tag = simplifySlug(slug.slice("tags/".length));
    const allPagesWithTag = (t) => allFiles.filter(
      (file) => (file.frontmatter?.tags ?? []).flatMap(getAllSegmentPrefixes).includes(t)
    );
    const hastRoot = tree;
    const content = hastRoot.children.length === 0 ? fd.description : htmlToJsx(hastRoot);
    const cssClasses = fd.frontmatter?.cssclasses ?? [];
    const classes = cssClasses.join(" ");
    if (tag === "/") {
      const tags = [
        ...new Set(
          allFiles.flatMap((data) => data.frontmatter?.tags ?? []).flatMap(getAllSegmentPrefixes)
        )
      ].sort((a, b) => a.localeCompare(b));
      const tagItemMap = /* @__PURE__ */ new Map();
      for (const t of tags) {
        tagItemMap.set(t, allPagesWithTag(t));
      }
      return /* @__PURE__ */ jsxs("div", { class: "popover-hint", children: [
        /* @__PURE__ */ jsx("article", { class: classes, children: /* @__PURE__ */ jsx("p", { children: content }) }),
        /* @__PURE__ */ jsx("p", { children: i18n(locale).pages.tagContent.totalTags({ count: tags.length }) }),
        /* @__PURE__ */ jsx("div", { children: tags.map((t) => {
          const pages = tagItemMap.get(t);
          const listProps = {
            ...props,
            allFiles: pages
          };
          const pageListContent = PageList({
            ...listProps,
            limit: options.numPages,
            sort: options?.sort
          });
          const contentPage = allFiles.find(
            (file) => file.slug === `tags/${t}`
          );
          const root = contentPage?.htmlAst;
          const tagDesc = !root || root.children.length === 0 ? contentPage?.description : htmlToJsx(root);
          const tagListingPage = `/tags/${t}`;
          const href = resolveRelative(slug, tagListingPage);
          return /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { children: /* @__PURE__ */ jsx("a", { class: "internal tag-link", href, children: t }) }),
            tagDesc && /* @__PURE__ */ jsx("p", { children: tagDesc }),
            /* @__PURE__ */ jsxs("div", { class: "page-listing", children: [
              /* @__PURE__ */ jsxs("p", { children: [
                i18n(locale).pages.tagContent.itemsUnderTag({ count: pages.length }),
                pages.length > options.numPages && /* @__PURE__ */ jsxs(Fragment, { children: [
                  " ",
                  /* @__PURE__ */ jsx("span", { children: i18n(locale).pages.tagContent.showingFirst({
                    count: options.numPages
                  }) })
                ] })
              ] }),
              pageListContent
            ] })
          ] });
        }) })
      ] });
    } else {
      const pages = allPagesWithTag(tag);
      const listProps = {
        ...props,
        allFiles: pages
      };
      const pageListContent = PageList({
        ...listProps,
        sort: options?.sort
      });
      return /* @__PURE__ */ jsxs("div", { class: "popover-hint", children: [
        /* @__PURE__ */ jsx("article", { class: classes, children: content }),
        /* @__PURE__ */ jsxs("div", { class: "page-listing", children: [
          /* @__PURE__ */ jsx("p", { children: i18n(locale).pages.tagContent.itemsUnderTag({ count: pages.length }) }),
          /* @__PURE__ */ jsx("div", { children: pageListContent })
        ] })
      ] });
    }
  };
  TagContent.css = concatenateResources(listPage_default, PageList.css);
  return TagContent;
});

// src/pageType.ts
var tagMatcher = ({ slug }) => {
  return slug.startsWith("tags/") || slug === "tags";
};
var TagPage = (opts) => ({
  name: "TagPage",
  priority: 10,
  match: tagMatcher,
  generate({ content, cfg }) {
    const allFiles = content.map((c) => c[1].data);
    const locale = cfg?.locale ?? "en-US";
    const tags = new Set(
      allFiles.flatMap((data) => data.frontmatter?.tags ?? []).flatMap(getAllSegmentPrefixes)
    );
    tags.add("index");
    const existingTagSlugs = /* @__PURE__ */ new Set();
    for (const [, file] of content) {
      const slug = file.data?.slug;
      if (slug && slug.startsWith("tags/")) {
        existingTagSlugs.add(slug);
      }
    }
    const virtualPages = [];
    for (const tag of tags) {
      const slug = joinSegments("tags", tag);
      if (existingTagSlugs.has(slug)) continue;
      const title = tag === "index" ? i18n(locale).pages.tagContent.tagIndex : opts?.prefixTags ? `${i18n(locale).pages.tagContent.tag}: ${tag}` : tag;
      virtualPages.push({
        slug,
        title,
        data: {}
      });
    }
    return virtualPages;
  },
  layout: "tag",
  body: TagContent_default
});

export { TagContent_default as TagContent, TagPage };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map