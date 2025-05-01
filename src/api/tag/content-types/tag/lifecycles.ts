export default {
  beforeCreate(event) {
    const { data } = event.params;
    if (data.name) {
      data.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }
  },
  beforeUpdate(event) {
    const { data } = event.params;
    if (data.name) {
      data.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }
  },
}; 