export default {
  pages: {
    tagContent: {
          tag: "标签",
          tagIndex: "标签索引",
          itemsUnderTag: ({ count }) => `此标签下有${count}条笔记。`,
          showingFirst: ({ count }) => `显示前${count}个标签。`,
          totalTags: ({ count }) => `总共有${count}个标签。`,
        },
  },
  components: {},
};
