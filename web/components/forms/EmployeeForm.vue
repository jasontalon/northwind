<template>
  <div>
    <div>
      <form-input
        label="Employee #"
        required
        type="number"
        v-model="employee_id"
        max="32727"
        :readonly="this.createNew"
        @feedback="message => setFeedback('employee_id', message)"
      ></form-input>
    </div>
    <div>
      <form-input
        label="First Name"
        required
        type="text"
        v-model="first_name"
        maxlength="10"
        @feedback="message => setFeedback('first_name', message)"
      ></form-input>
    </div>
    <div>
      <form-input
        label="Last Name"
        required
        type="text"
        maxlength="20"
        v-model="last_name"
        @feedback="message => setFeedback('last_name', message)"
      ></form-input>
    </div>
    <div>
      <form-input
        label="Job Title"
        required
        type="text"
        maxlength="30"
        v-model="title"
        @feedback="message => setFeedback('title', message)"
      ></form-input>
    </div>
    <div>
      <select-input
        label="Salutations"
        :selections="['Mr.', 'Ms.', 'Mrs.']"
        maxlength="25"
        v-model="title_of_courtesy"
        @feedback="message => setFeedback('title_of_courtesy', message)"
      ></select-input>
    </div>
    <div>
      <form-input
        label="Birth Date"
        required
        type="date"
        v-model="birth_date"
        @feedback="message => setFeedback('birth_date', message)"
      ></form-input>
    </div>
    <div>
      <form-input
        label="Hire Date"
        required
        type="date"
        v-model="hire_date"
        @feedback="message => setFeedback('hire_date', message)"
      ></form-input>
    </div>
    <contact-form
      :address.sync="address"
      :city.sync="city"
      :region.sync="region"
      :postal-code.sync="postal_code"
      :country.sync="country"
      :phone.sync="home_phone"
      @feedbacks="value => value.forEach(v => setFeedback(v.key, v.message))"
    ></contact-form>
    <div>
      <form-input
        label="Notes"
        required
        type="text"
        v-model="notes"
        @feedback="message => setFeedback('notes', message)"
      ></form-input>
    </div>
    <div>
      <form-input
        label="Reports To"
        required
        type="number"
        max="32000"
        v-model="reports_to"
        @feedback="message => setFeedback('reports_to', message)"
      ></form-input>
    </div>
    <b-button @click="this.save" block :disabled="this.feedbacks"
      >Save</b-button
    >
  </div>
</template>

<script>
import ContactForm from '~/components/forms/ContactForm';
import SelectInput from '~/components/SelectInput';
import FormInput from '~/components/FormInput';
export default {
  components: { FormInput, ContactForm, SelectInput },
  feedbacks: [],
  props: {
    createNew: { type: Boolean, default: false },
    value: {
      type: Object,
      default: function() {
        return this.initFields();
      }
    }
  },
  data() {
    const data = { ...this.initFields(), ...this.value };
    return {
      ...data,
      feedbacks: false
    };
  },
  methods: {
    initFields() {
      const fields = [
        'hire_date',
        'reports_to',
        'birth_date',
        'employee_id',
        'address',
        'city',
        'region',
        'postal_code',
        'country',
        'home_phone',
        'extension',
        'notes',
        'last_name',
        'first_name',
        'title',
        'title_of_courtesy'
      ];
      return fields.reduce((acc, field) => {
        acc[field] = '';
        return acc;
      }, {});
    },
    setFeedback(key, message) {
      this.$options.feedbacks = this.$options.feedbacks.filter(
        p => p.key != key
      );
      if (message) this.$options.feedbacks.push({ key, message });
      this.feedbacks = this.$options.feedbacks.length > 0;
      this.$emit('update:feedbacks', this.$options.feedbacks);
    },
    getData() {
      return this.$_.omit(JSON.parse(JSON.stringify(this._data)), [
        'feedbacks'
      ]);
    },
    async save() {
      this.$emit('save', this.getData());
    }
  },
  mounted() {
    this.$watch(
      vm => vm.$_.values(vm.$data).join(),
      val => this.$emit('input', this.getData())
    );
  }
};
</script>
