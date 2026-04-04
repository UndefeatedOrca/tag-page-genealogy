export default {
  pages: {
    tagContent: {
          tag: "Tag",
          tagIndex: "Sumário de Tags",
          itemsUnderTag: ({ count }) =>
            count === 1 ? "1 item com esta tag." : `${count} items com esta tag.`,
          showingFirst: ({ count }) => `Mostrando as ${count} primeiras tags.`,
          totalTags: ({ count }) => `Encontradas ${count} tags.`,
        },
  },
  components: {},
};
