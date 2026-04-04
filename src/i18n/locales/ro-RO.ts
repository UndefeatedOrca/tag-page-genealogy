export default {
  pages: {
    tagContent: {
          tag: "Etichetă",
          tagIndex: "Indexul etichetelor",
          itemsUnderTag: ({ count }) =>
            count === 1 ? "1 articol cu această etichetă." : `${count} articole cu această etichetă.`,
          showingFirst: ({ count }) => `Se afișează primele ${count} etichete.`,
          totalTags: ({ count }) => `Au fost găsite ${count} etichete în total.`,
        },
  },
  components: {},
};
