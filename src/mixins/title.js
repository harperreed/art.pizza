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
  created() {
    const site = 'art dot pizza';
    const title = getTitle(this);
    if (title) {
      document.title = `${title} · ${site}`;
    }
  },
};
