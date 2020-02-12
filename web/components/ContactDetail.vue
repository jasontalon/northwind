<template>
  <div>
    <div>
      <b-form-group
        description=""
        label="Address"
        label-for="txtAddress"
        :invalid-feedback="this.fbAddress"
        :state="this.fbAddress.length == 0"
      >
        <b-form-input
          id="txtAddress"
          v-model="address"
          :state="this.fbAddress.length == 0"
          trim
        ></b-form-input>
      </b-form-group>
    </div>
    <div>
      <b-form-group
        description=""
        label="City"
        label-for="txtCity"
        :invalid-feedback="this.fbCity"
        :state="this.fbCity.length == 0"
      >
        <b-form-input
          id="txtCity"
          v-model="city"
          :state="this.fbCity.length == 0"
          trim
        ></b-form-input>
      </b-form-group>
    </div>
    <div>
      <b-form-group
        description=""
        label="Region"
        label-for="txtRegion"
        :invalid-feedback="this.fbRegion"
        :state="this.fbRegion.length == 0"
      >
        <b-form-input
          id="txtRegion"
          v-model="region"
          :state="this.fbRegion.length == 0"
          trim
        ></b-form-input>
      </b-form-group>
    </div>
    <div>
      <b-form-group
        description=""
        label="Postal Code"
        label-for="txtPostalCode"
        :invalid-feedback="this.fbPostalCode"
        :state="this.fbPostalCode.length == 0"
      >
        <b-form-input
          id="txtPostalCode"
          v-model="postalCode"
          :state="this.fbPostalCode.length == 0"
          trim
        ></b-form-input>
      </b-form-group>
    </div>
    <div>
      <b-form-group
        description=""
        label="Country"
        label-for="txtCountry"
        :invalid-feedback="this.fbCountry"
        :state="this.fbCountry.length == 0"
      >
        <b-form-input
          id="txtCountry"
          v-model="country"
          :state="this.fbCountry.length == 0"
          trim
        ></b-form-input>
      </b-form-group>
    </div>
    <div>
      <b-form-group
        description=""
        label="Phone"
        label-for="txtPhone"
        :invalid-feedback="this.fbPhone"
        :state="this.fbPhone.length == 0"
      >
        <b-form-input
          id="txtPhone"
          v-model="phone"
          :state="this.fbPhone.length == 0"
          trim
        ></b-form-input>
      </b-form-group>
    </div>
    <div v-if="this.hasFax">
      <b-form-group
        description=""
        label="Fax"
        label-for="txtFax"
        :invalid-feedback="this.fbFax"
        :state="this.fbFax.length == 0"
      >
        <b-form-input
          id="txtFax"
          v-model="fax"
          :state="this.fbFax.length == 0"
          trim
        ></b-form-input>
      </b-form-group>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pAddress: String,
    pCity: String,
    pRegion: String,
    pPostalCode: String,
    pCountry: String,
    pPhone: String,
    pFax: String,

    pHasFax: Boolean
  },
  data() {
    return {
      address: this.pAddress ?? '',
      city: this.pCity ?? '',
      region: this.pRegion ?? '',
      postalCode: this.pPostalCode ?? '',
      country: this.pCountry ?? '',
      phone: this.pPhone ?? '',
      fax: this.pFax ?? '',
      hasFax: this.pHasFax
    };
  },
  watch: {
    address: function(upd, old) {
      this.$emit('update:p-address', upd);
    },
    city: function(upd, old) {
      this.$emit('update:p-city', upd);
    },
    region: function(upd, old) {
      this.$emit('update:p-region', upd);
    },
    postalCode: function(upd, old) {
      this.$emit('update:p-postal-code', upd);
    },
    country: function(upd, old) {
      this.$emit('update:p-country', upd);
    },
    phone: function(upd, old) {
      this.$emit('update:p-phone', upd);
    },
    fax: function(upd, old) {
      this.$emit('update:p-fax', upd);
    }
  },
  computed: {
    fbAddress() {
      return '';
    },
    fbCity() {
      return '';
    },
    fbRegion() {
      return '';
    },
    fbPostalCode() {
      return '';
    },
    fbCountry() {
      return '';
    },
    fbPhone() {
      return '';
    },
    fbFax() {
      if (!this.hasFax) return '';
      return '';
    }
  }
};
</script>
