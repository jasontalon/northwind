<template>
  <div>
    <b-row>
      <b-col md="6">
        <b-form-row>
          <b-col md="12">
            <form-text-input
            v-if="!create"
              readonly
              label="Customer #"
              required
              type="text"
              v-model="customer_id"
              maxlength="5"
              minlength="5"
              @feedback="setFeedback"
            ></form-text-input>
          </b-col>
          <b-col md="12">
            <form-text-input
              label="Company name"
              required
              type="text"
              v-model="company_name"
              maxlength="10"
              @feedback="setFeedback"
            ></form-text-input>
          </b-col>
          <b-col md="12"
            ><form-text-input
              label="Contact Name"
              required
              type="text"
              v-model="contact_name"
              maxlength="10"
              @feedback="setFeedback"
            ></form-text-input
          ></b-col>
          <b-col md="12"
            ><title-select-input
              required
              v-model="contact_title"
              @feedback="setFeedback"
            ></title-select-input
          ></b-col>
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
    <b-button @click="this.save" block :disabled="this.feedbacks" v-if="canSave"
      >Save</b-button
    >
  </div>
</template>
<script>
import FormTextInput from '~/components/FormTextInput';
import TitleSelectInput from '~/components/TitleSelectInput';
import ContactForm from '~/components/forms/ContactForm';
export default {
  components: { FormTextInput, ContactForm, TitleSelectInput },
  feedbacks: [],  
  props: {
    create: { type: Boolean, default: false },
    update: { type: Boolean, default: false },
    value: {
      type: Object,
      default: function() {
        return { ...this.$options.customer(), ...this.$options.address() };
      }
    }
  },
  methods: {
    setFeedback({ key, message }) {
      this.$options.feedbacks = this.$options.feedbacks.filter(
        p => p.key != key
      );
      if (message) this.$options.feedbacks.push({ key, message });
      this.feedbacks = this.$options.feedbacks.length > 0;

      this.$emit('update:feedbacks', this.$options.feedbacks);
    },
    getData() {
      const _ = this.$_;
      const data = JSON.parse(JSON.stringify(this.$data)),
        customer = _.pick(data, _.keys(this.$options.customer())),
        address = _.pick(data.address, _.keys(this.$options.address()));
      return {
        ...customer,
        ...address
      };
    },
    save() {
      this.$emit('save', this.getData());
    }
  },
  data() {
    const _ = this.$_;

    const customer = _.pick(
        _.isEmpty(this.value) ? this.$options.customer() : this.value,
        _.keys(this.$options.customer())
      ),
      address = _.pick(this.value, _.keys(this.$options.address()));

    return {
      ...customer,
      address,
      feedbacks: false,
      customer_id: this.create ? this.$vnode.key : customer.customer_id
    };
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
      'contact_title',
      'createdBy'
    ].reduce((acc, prop) => {
      acc[prop] = '';
      return acc;
    }, {});
  },
  mounted() {
    this.$watch(
      vm => this.$_.values(this.getData()),
      val => this.$emit('input', this.getData())
    );
  }
};
</script>
