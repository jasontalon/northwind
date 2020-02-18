<template> </template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: function() {
        return { ...this.$options.customer(), ...this.$options.address() };
      }
    }
  },
  methods: {
    getData() {
      const data = JSON.parse(JSON.stringify(this.$data)),
        customer = this.$_.pick(data, this.$options.customer()),
        address = this.$_.pick(data, this.$options.address()),

      return { ...customer, ...address }
    },
    save() {}
  },
  data() {
    const customer = this.$_.pick(
        this.value,
        this.$_.keys(this.$options.customer())
      ),
      address = this.$_.pick(this.value, this.$_.keys(this.$options.address()));
    return { ...customer, address };
  },
  address() {
    return [
      'address',
      'city',
      'region',
      'postal_code',
      'country',
      'phone',
      'fax'
    ].reduce((acc, prop) => {
      acc[prop] = '';
      return acc;
    }, {});
  },
  customer() {
    return [
      'customer_id',
      'company_name',
      'contact_name',
      'contact_title'
    ].reduce((acc, prop) => {
      acc[prop] = '';
      return acc;
    }, {});
  },
  mounted() {
    this.$watch(
      vm =>
        [...vm.$_.values(vm.$data), ...vm.$_.values(vm.$data.address)].join(),
      val => this.$emit('input', this.getData())
    );
  }
};
</script>

<style></style>
