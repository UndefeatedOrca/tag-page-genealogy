export default {
  pages: {
    tagContent: {
          tag: "Тег",
          tagIndex: "Индекс тегов",
          itemsUnderTag: ({ count }) => `с этим тегом ${count} элемент${getForm(count, "", "а", "ов")}`,
          showingFirst: ({ count }) =>
            `Показыва${getForm(count, "ется", "ются", "ются")} ${count} тег${getForm(count, "", "а", "ов")}`,
          totalTags: ({ count }) => `Всего ${count} тег${getForm(count, "", "а", "ов")}`,
        },
  },
  components: {},
};
