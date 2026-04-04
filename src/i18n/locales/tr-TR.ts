export default {
  pages: {
    tagContent: {
          tag: "Etiket",
          tagIndex: "Etiket Sırası",
          itemsUnderTag: ({ count }) =>
            count === 1 ? "Bu etikete sahip 1 öğe." : `Bu etiket altındaki ${count} öğe.`,
          showingFirst: ({ count }) => `İlk ${count} etiket gösteriliyor.`,
          totalTags: ({ count }) => `Toplam ${count} adet etiket bulundu.`,
        },
  },
  components: {},
};
