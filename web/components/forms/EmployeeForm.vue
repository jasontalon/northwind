<template>
  <div>
    <b-form-row>
      <b-col md="3">
        <form-input
          label="Hire Date"
          required
          type="date"
          v-model="hire_date"
          @feedback="setFeedback"
        ></form-input>
      </b-col>
      <b-col md="5">
        <form-input
          label="Job Title"
          required
          type="text"
          maxlength="30"
          v-model="title"
          @feedback="setFeedback"
        ></form-input
      ></b-col>
      <b-col md="4"
        ><employee-name-select-input
          label="Reports To"
          required
          v-model="reports_to_employee.name"
          @selected="setReportsTo"
          @feedback="setFeedback"
        ></employee-name-select-input
      ></b-col>
    </b-form-row>
    <b-row>
      <b-col md="6">
        <b-form-row>
          <b-col md="12">
            <select-input
              label="Salutations"
              :selections="['Mr.', 'Ms.', 'Mrs.']"
              maxlength="25"
              required
              v-model="title_of_courtesy"
              @feedback="setFeedback"
            ></select-input
          ></b-col>
          <b-col md="12"
            ><form-input
              label="First Name"
              required
              type="text"
              v-model="first_name"
              maxlength="10"
              @feedback="setFeedback"
            ></form-input
          ></b-col>
          <b-col md="12"
            ><form-input
              label="Last Name"
              required
              type="text"
              maxlength="20"
              v-model="last_name"
              @feedback="setFeedback"
            ></form-input
          ></b-col>
          <b-col md="12"
            ><form-input
              label="Birth Date"
              required
              type="date"
              v-model="birth_date"
              @feedback="setFeedback"
            ></form-input
          ></b-col>
          <b-col>
            <form-text-area
              label="Notes"
              v-model="notes"
              rows="5"
              @feedback="setFeedback"
            ></form-text-area>
          </b-col>
        </b-form-row>
      </b-col>
      <b-col md="6">
        <b-form-row>
          <b-col>
            <contact-form
              v-model="contact"
              @feedbacks="value => value.forEach(setFeedback)"
            ></contact-form
          ></b-col>
        </b-form-row>
      </b-col>
    </b-row>
    <b-button @click="this.save" block :disabled="this.feedbacks"
      >Save</b-button
    >
  </div>
</template>

<script>
import ContactForm from '~/components/forms/ContactForm';
import SelectInput from '~/components/SelectInput';
import FormInput from '~/components/FormInput';
import FormTextArea from '~/components/FormTextArea';
import EmployeeNameSelectInput from '~/components/EmployeeNameSelectInput';
export default {
  components: {
    FormTextArea,
    FormInput,
    ContactForm,
    SelectInput,
    EmployeeNameSelectInput
  },
  feedbacks: [],
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
      'title_of_courtesy',
      'reports_to',
      'reports_to_employee'
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
    const data = {
      ...this.$options.initFields(),
      ...this.value
    };
    const contact = this.$_.pick(data, [
      'address',
      'city',
      'region',
      'postal_code',
      'country',
      'home_phone'
    ]);
    return {
      ...data,
      contact,
      feedbacks: false
    };
  },
  methods: {
    setReportsTo({ employee_id = 0 }) {
      this.reports_to = employee_id;
    },
    setFeedback({ key, message }) {
      this.$options.feedbacks = this.$options.feedbacks.filter(
        p => p.key != key
      );
      if (message) this.$options.feedbacks.push({ key, message });
      this.feedbacks = this.$options.feedbacks.length > 0;

      this.$emit('update:feedbacks', this.$options.feedbacks);
    },
    getData() {
      return this.$_.omit(JSON.parse(JSON.stringify(this._data)), [
        'feedbacks',
        'contact',
        'reports_to_employee'
      ]);
    },
    async save() {
      const employee = { ...this.getData(), ...this.$data.contact };
      this.$emit('save', employee);
    }
  },
  mounted() {
    this.$watch(
      vm =>
        [...vm.$_.values(vm.$data), ...vm.$_.values(vm.$data.contact)].join(),
      val => this.$emit('input', this.getData())
    );
  }
};
</script>
