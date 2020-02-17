<template>
  <div>
    <div>
      <form-input
        label="Address"
        required
        type="text"
        maxlength="60"
        v-model="address"
        @feedback="setFeedback"
      ></form-input>
    </div>
    <div>
      <form-input
        label="City"
        required
        type="text"
        maxlength="15"
        v-model="city"
        @feedback="setFeedback"
      ></form-input>
    </div>
    <div>
      <form-input
        label="Region"
        required
        type="text"
        maxlength="15"
        v-model="region"
        @feedback="setFeedback"
      ></form-input>
    </div>
    <div>
      <form-input
        label="Postal Code"
        required
        type="text"
        maxlength="10"
        v-model="postal_code"
        @feedback="setFeedback"
      ></form-input>
    </div>
    <div>
      <country-select
        v-model="country"
        required
        maxlength="15"
        @feedback="setFeedback"
      ></country-select>
    </div>
    <div>
      <form-input
        label="Phone"
        required
        type="text"
        v-model="home_phone"
        @feedback="setFeedback"
      ></form-input>
    </div>
  </div>
</template>

<script>
import CountrySelect from '~/components/CountrySelect';
import FormInput from '~/components/FormInput';

export default {
  feedbacks: [],
  components: {
    CountrySelect,
    FormInput
  },
  initFields() {
    const fields = [
      'address',
      'city',
      'region',
      'postal_code',
      'country',
      'home_phone'
    ];
    return fields.reduce((acc, field) => {
      acc[field] = '';
      return acc;
    }, {});
  },
  props: {
    value: {
      type: Object,
      default: function() {
        return this.$options.initFields();
      }
    }
  },
  data() {
    const data = _.pick(
      { ...this.$options.initFields(), ...this.value },
      this.$_.keys(this.$options.initFields())
    );
    return data;
  },
  methods: {
    setFeedback({ key, message }) {
      this.$options.feedbacks = this.$options.feedbacks.filter(
        p => p.key != key
      );
      this.$options.feedbacks.push({ key, message });
      this.$emit('feedbacks', this.$options.feedbacks);
    }
  },
  mounted() {
    this.$watch(
      vm => vm.$_.values(vm.$data),
      val => this.$emit('input', this.$data)
    );
  }
};
</script>
