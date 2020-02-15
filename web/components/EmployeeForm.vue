<template>
  <div>
    <div>
      <text-input
        label="Employee #"
        required
        type="number"
        v-model="employee_id"
        max="32727"
        :readonly="this.pCreateNew"
        @feedback="message => setFeedback('employee_id', message)"
        @input="value => $emit('update:employee-id', value)"
      ></text-input>
    </div>
    <div>
      <text-input
        label="First Name"
        required
        type="text"
        v-model="first_name"
        maxlength="10"
        @feedback="message => setFeedback('first_name', message)"
        @input="value => $emit('update:first-name', value)"
      ></text-input>
    </div>

    <div>
      <text-input
        label="Last Name"
        required
        type="text"
        maxlength="20"
        v-model="last_name"
        @feedback="message => setFeedback('last_name', message)"
        @input="value => $emit('update:last-name', value)"
      ></text-input>
    </div>

    <div>
      <text-input
        label="Job Title"
        required
        type="text"
        maxlength="30"
        v-model="title"
        @feedback="message => setFeedback('title', message)"
        @input="value => $emit('update:title', value)"
      ></text-input>
    </div>
    <div>
      <select-input
        label="Salutations"
        :selections="['Mr.', 'Ms.', 'Mrs.']"
        v-model="title_of_courtesy"
        @feedback="message => setFeedback('title_of_courtesy', message)"
        @input="value => $emit('update:title-of-courtesy', value)"
      ></select-input>
    </div>

    <div>
      <text-input
        label="Birth Date"
        required
        type="date"
        v-model="birth_date"
        @feedback="message => setFeedback('birth_date', message)"
        @input="value => $emit('update:birth-date', value)"
      ></text-input>
    </div>
    <div>
      <text-input
        label="Hire Date"
        required
        type="date"
        v-model="hire_date"
        @feedback="message => setFeedback('hire_date', message)"
        @input="value => $emit('update:hire-date', value)"
      ></text-input>
    </div>
    <contact-detail
      :address.sync="address"
      :city.sync="city"
      :region.sync="region"
      :postal-code.sync="postal_code"
      :country.sync="country"
      :phone.sync="home_phone"
      @feedbacks="value => value.forEach(v => setFeedback(v.key, v.message))"
    ></contact-detail>

    <div>
      <text-input
        label="Notes"
        required
        type="text"
        v-model="notes"
        @feedback="message => setFeedback('notes', message)"
        @input="value => $emit('update:notes', value)"
      ></text-input>
    </div>
    <div>
      <text-input
        label="Reports To"
        required
        type="number"
        max="32000"
        v-model="reports_to"
        @feedback="message => setFeedback('reports_to', message)"
        @input="value => $emit('update:reports-to', value)"
      ></text-input>
    </div>
    <b-button @click="this.save" block :disabled="this.feedbacks"
      >Save</b-button
    >
  </div>
</template>

<script>
import ContactDetail from '~/components/ContactDetail';
import SelectInput from '~/components/SelectInput';
import TextInput from '~/components/TextInput';
export default {
  components: { TextInput, ContactDetail, SelectInput },
  feedbacks: [],
  props: {
    pReadonly: { type: Boolean, default: false },
    pCreateNew: { type: Boolean, default: false },
    pHireDate: { type: String, default: '' },
    pReportsTo: { type: String, default: '' },
    pBirthDate: { type: String, default: '' },
    pEmployeeId: { type: String, default: '' },
    pAddress: { type: String, default: '' },
    pCity: { type: String, default: '' },
    pRegion: { type: String, default: '' },
    pPostalCode: { type: String, default: '' },
    pCountry: { type: String, default: '' },
    pPhone: { type: String, default: '' },
    pNotes: { type: String, default: '' },
    pFirstName: { type: String, default: '' },
    pLastName: { type: String, default: '' },
    pTitle: { type: String, default: '' },
    pTitleOfCourtesy: { type: String, default: '' },
    pFeedbacks: { type: Array, default: () => [] }
  },
  data() {
    return {
      hire_date: this.pHireDate,
      reports_to: this.pReportsTo,
      birth_date: this.pBirthDate,
      employee_id: this.pEmployeeId,
      address: this.pAddress,
      city: this.pCity,
      region: this.pRegion,
      postal_code: this.pPostalCode,
      country: this.pCountry,
      home_phone: this.pPhone,
      extension: '',
      notes: this.pNotes,
      last_name: this.pLastName,
      first_name: this.pFirstName,
      title: this.pTitle,
      title_of_courtesy: this.pTitleOfCourtesy,
      feedbacks: false
    };
  },
  watch: {
    address(val) {
      this.$emit('update:address', val);
    },
    city(val) {
      this.$emit('update:city', val);
    },
    region(val) {
      this.$emit('update:region', val);
    },
    postal_code(val) {
      this.$emit('update:postal-code', val);
    },
    country(val) {
      this.$emit('update:country', val);
    },
    home_phone(val) {
      this.$emit('update:phone', val);
    }
  },
  methods: {
    setFeedback(key, message) {
      this.$options.feedbacks = this.$options.feedbacks.filter(
        p => p.key != key
      );
      if (message) this.$options.feedbacks.push({ key, message });
      this.feedbacks = this.$options.feedbacks.length > 0;
      this.$emit('update:feedbacks', this.$options.feedbacks);
    },
    async save() {
      const data = this.$_.omit(JSON.parse(JSON.stringify(this._data)), [
        'feedback'
      ]);
      console.log(data);
      await this.$store.dispatch('employee/save', data);
    }
  }
};
</script>
