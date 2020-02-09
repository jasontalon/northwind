<template>
  <div>
    <b-button @click="clickHandler">click me</b-button>
  </div>
</template>
<script>
export default {
  methods: {
    async clickHandler() {
      const data = await this.$axios.$get('/api/a/e'); //ok
      console.log(data);
    }
  }
};
</script>
