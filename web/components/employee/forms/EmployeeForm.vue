<template>
  <div>
    <b-form-row>
      <b-col md="3">
        <form-text-input
          label="Hire Date"
          required
          type="date"
          v-model="hire_date"
          @feedback="setFeedback"
        ></form-text-input>
      </b-col>
      <b-col md="5">
        <title-select-input
          label="Job Title"
          required
          maxlength="30"
          v-model="title"
          @feedback="setFeedback"
        ></title-select-input
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
            ><form-text-input
              label="First Name"
              required
              type="text"
              v-model="first_name"
              maxlength="10"
              @feedback="setFeedback"
            ></form-text-input
          ></b-col>
          <b-col md="12"
            ><form-text-input
              label="Last Name"
              required
              type="text"
              maxlength="20"
              v-model="last_name"
              @feedback="setFeedback"
            ></form-text-input
          ></b-col>
          <b-col md="12"
            ><form-text-input
              label="Birth Date"
              required
              type="date"
              v-model="birth_date"
              @feedback="setFeedback"
            ></form-text-input
          ></b-col>
          <b-col>
            <form-text-area-input
              label="Notes"
              v-model="notes"
              rows="5"
              @feedback="setFeedback"
            ></form-text-area-input>
          </b-col>
        </b-form-row>
      </b-col>
      <b-col md="6">
        <b-form-row>
          <b-col>
            <contact-form
              v-model="address"
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
import FormTextInput from '~/components/FormTextInput';
import FormTextAreaInput from '~/components/FormTextAreaInput';
import EmployeeNameSelectInput from '~/components/employee/EmployeeNameSelectInput';
import TitleSelectInput from '~/components/TitleSelectInput';
export default {
  components: {
    FormTextAreaInput,
    FormTextInput,
    ContactForm,
    SelectInput,
    EmployeeNameSelectInput,
    TitleSelectInput
  },
  feedbacks: [],
  address() {
    return [
      'address',
      'city',
      'region',
      'postal_code',
      'country',
      'home_phone'
    ].reduce((acc, field) => {
      acc[field] = '';
      return acc;
    }, {});
  },
  employee() {
    return [
      'hire_date',
      'reports_to',
      'birth_date',
      'employee_id',
      'notes',
      'last_name',
      'first_name',
      'title',
      'title_of_courtesy',
      'reports_to',
      'reports_to_employee'
    ].reduce((acc, field) => {
      acc[field] = '';
      return acc;
    }, {});
  },
  props: {
    value: {
      type: Object,
      default: function() {
        return { ...this.$options.employee(), ...this.$options.address() };
      }
    }
  },
  data() {
    const _ = this.$_,
      value = _.isEmpty(this.value)
        ? { ...this.$options.employee(), ...this.$options.address() }
        : this.value,
      employee = _.pick(value, _.keys(this.$options.employee())),
      address = _.pick(value, _.keys(this.$options.address()));

    return {
      ...employee,
      address: { ...address, phone: address.home_phone },
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
      const _ = this.$_,
        data = _.omit(JSON.parse(JSON.stringify(this.$data)), [
          'reports_to_employee'
        ]),
        parsedData = {
          ..._.pick(data, _.keys(this.$options.employee())),
          ..._.pick(data.address, _.keys(this.$options.address())),
          home_phone: data.address.phone
        };

      return _.omit(parsedData, ['phone']);
    },
    async save() {
      this.$emit('save', this.getData());
    }
  },
  mounted() {
    this.$watch(
      vm => this.$_.values(this.getData()).join(),
      val => this.$emit('input', this.getData())
    );
  }
};
</script>
