export default {
  pages: {
    tagContent: {
          tag: "Мітка",
          tagIndex: "Індекс мітки",
          itemsUnderTag: ({ count }) =>
            count === 1 ? "1 елемент з цією міткою." : `Елементів з цією міткою: ${count}.`,
          showingFirst: ({ count }) => `Показ перших ${count} міток.`,
          totalTags: ({ count }) => `Всього знайдено міток: ${count}.`,
        },
  },
  components: {},
};
