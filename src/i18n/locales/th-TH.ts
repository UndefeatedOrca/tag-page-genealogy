export default {
  pages: {
    tagContent: {
          tag: "แท็ก",
          tagIndex: "แท็กทั้งหมด",
          itemsUnderTag: ({ count }) => `มี ${count} รายการในแท็กนี้`,
          showingFirst: ({ count }) => `แสดง ${count} แท็กแรก`,
          totalTags: ({ count }) => `มีทั้งหมด ${count} แท็ก`,
        },
  },
  components: {},
};
