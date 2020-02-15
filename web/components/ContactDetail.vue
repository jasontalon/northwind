<template>
  <div>
    <div>
      <text-input
        label="Address"
        required
        type="text"
        maxlength="60"
        v-model="dtAddress"
        @input="value => $emit('update:address', value)"
        @feedback="message => setFeedback('address', message)"
      ></text-input>
    </div>
    <div>
      <text-input
        label="City"
        required
        type="text"
        maxlength="15"
        v-model="dtCity"
        @input="value => $emit('update:city', value)"
        @feedback="message => setFeedback('city', message)"
      ></text-input>
    </div>
    <div>
      <text-input
        label="Region"
        required
        type="text"
        maxlength="15"
        v-model="dtRegion"
        @input="value => $emit('update:region', value)"
        @feedback="message => setFeedback('region', message)"
      ></text-input>
    </div>
    <div>
      <text-input
        label="Postal Code"
        required
        type="text"
        maxlength="10"
        v-model="dtPostalCode"
        @input="value => $emit('update:postal-code', value)"
        @feedback="message => setFeedback('postal-code', message)"
      ></text-input>
    </div>
    <div>
      <country-select
        v-model="dtCountry"
        required
        maxlength="15"
        @input="value => $emit('update:country', value)"
        @feedback="message => setFeedback('country', message)"
      ></country-select>
    </div>
    <div>
      <text-input
        label="Phone"
        required
        type="text"
        v-model="dtPhone"
        @input="value => $emit('update:phone', value)"
        @feedback="message => setFeedback('phone', message)"
      ></text-input>
    </div>
  </div>
</template>

<script>
import CountrySelect from '~/components/CountrySelect';
import TextInput from '~/components/TextInput';

export default {
  feedbacks: [],
  components: {
    CountrySelect,
    TextInput
  },
  props: {
    address: { type: String, default: '' },
    city: { type: String, default: '' },
    region: { type: String, default: '' },
    postalCode: { type: String, default: '' },
    country: { type: String, default: '' },
    phone: { type: String, default: '' },
    fax: { type: String, default: '' },
    hasFax: { type: Boolean, default: false }
  },
  data() {
    return {
      dtAddress: this.address,
      dtCity: this.city,
      dtRegion: this.region,
      dtPostalCode: this.postalCode,
      dtCountry: this.country,
      dtPhone: this.phone,
      dtFax: this.fax
    };
  },
  methods: {
    setFeedback(key, message) {
      this.$options.feedbacks = this.$options.feedbacks.filter(
        p => p.key != key
      );
      this.$options.feedbacks.push({ key, message });
      this.$emit('feedbacks', this.$options.feedbacks);
    }
  }
};
</script>
