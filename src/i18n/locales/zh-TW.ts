export default {
  pages: {
    tagContent: {
          tag: "標籤",
          tagIndex: "標籤索引",
          itemsUnderTag: ({ count }) => `此標籤下有 ${count} 條筆記。`,
          showingFirst: ({ count }) => `顯示前 ${count} 個標籤。`,
          totalTags: ({ count }) => `總共有 ${count} 個標籤。`,
        },
  },
  components: {},
};
