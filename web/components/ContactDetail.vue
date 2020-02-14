<template>
  <div>
    <div>
      <text-input
        label="Address"
        required
        type="text"
        v-model="dtAddress"
        @input="value => $emit('update:address', value)"
        :feedback.sync="feedback.address"
      ></text-input>
    </div>
    <div>
      <text-input
        label="City"
        required
        type="text"
        v-model="dtCity"
        @input="value => $emit('update:city', value)"
      ></text-input>
    </div>
    <div>
      <text-input
        label="Region"
        required
        type="text"
        v-model="dtRegion"
        @input="value => $emit('update:region', value)"
      ></text-input>
    </div>
    <div>
      <text-input
        label="Postal Code"
        required
        type="text"
        v-model="dtPostalCode"
        @input="value => $emit('update:postal-code', value)"
      ></text-input>
    </div>
    <div>
      <country-select
        v-model="dtCountry"
        required
        @input="value => $emit('update:country', value)"
      ></country-select>
    </div>
    <div>
      <text-input
        label="Phone"
        required
        type="text"
        v-model="dtPhone"
        @input="value => $emit('update:phone', value)"
      ></text-input>
    </div>
  </div>
</template>

<script>
import CountrySelect from '~/components/CountrySelect';
import TextInput from '~/components/TextInput';

export default {
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
      dtFax: this.fax,
      feedback: {
        address: ''
      }
    };
  }
};
</script>
