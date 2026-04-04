export default {
  pages: {
    tagContent: {
          tag: "Thẻ",
          tagIndex: "Danh sách thẻ",
          itemsUnderTag: ({ count }) => `Có ${count} trang gắn thẻ này.`,
          showingFirst: ({ count }) => `Đang hiển thị ${count} trang đầu tiên.`,
          totalTags: ({ count }) => `Có tổng cộng ${count} thẻ.`,
        },
  },
  components: {},
};
