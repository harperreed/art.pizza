function getTitle(vm) {
  const { title } = vm.$options;
  if (title) {
    return typeof title === 'function'
      ? title.call(vm)
      : title;
  }
  return title;
}
export default {
  data: () => ({
    pageTitle: '',
    site: 'art dot pizza',
  }),
  created() {
    const title = getTitle(this);
    if (title) {
      // document.title = `${title} · ${this.site}`;
      this.pageTitle = `${title} · ${this.site}`;
    }
  },
  watch: {
    pageTitle() {
      // const title = getTitle(this);
      document.title = `${this.pageTitle} · ${this.site}`;
    },
  },
};
