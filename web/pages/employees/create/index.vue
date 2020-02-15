<template>
  <div>
    <div>
      <text-input
        label="Employee #"
        required
        type="number"
        v-model="employee_id"
        max="32727"
        @feedback="message => setFeedback('employee_id', message)"
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
      ></text-input>
    </div>
    <div>
      <select-input
        label="Salutations"
        :selections="['Mr.', 'Ms.', 'Mrs.']"
        v-model="title_of_courtesy"
        @feedback="message => setFeedback('title_of_courtesy', message)"
      ></select-input>
    </div>

    <div>
      <text-input
        label="Birth Date"
        required
        type="date"
        v-model="birth_date"
      ></text-input>
    </div>
    <div>
      <text-input
        label="Hire Date"
        required
        type="date"
        v-model="hire_date"
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
      ></text-input>
    </div>
    <div>
      <text-input
        label="Reports To"
        required
        type="number"
        max="32000"
        v-model="reports_to"
      ></text-input>
    </div>
    <b-button @click="this.save" block>Save</b-button>
  </div>
</template>

<script>
import ContactDetail from '~/components/ContactDetail';
import SelectInput from '~/components/SelectInput';
import TextInput from '~/components/TextInput';
export default {
  components: { TextInput, ContactDetail, SelectInput },
  feedback: [],
  data() {
    return {
      hire_date: '',
      reports_to: '',
      birth_date: '',
      employee_id: '',
      address: '',
      city: '',
      region: '',
      postal_code: '',
      country: '',
      home_phone: '',
      extension: '',
      notes: '',
      last_name: '',
      first_name: '',
      title: '',
      title_of_courtesy: ''
    };
  },
  methods: {
    setFeedback(key, message) {
      this.$options.feedback = this.$options.feedback.filter(p => p.key != key);
      if (message) this.$options.feedback.push({ key, message });
    },
    async save() {
      if (this.$options.feedback.length > 0)
        console.log('has validation errors', this.$options.feedback);
      const data = JSON.parse(JSON.stringify(this._data));
      await this.$store.dispatch('employee/save', data);
      console.log(data);
    }
  }
};
</script>
