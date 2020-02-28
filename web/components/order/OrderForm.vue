<template>
  <div>
    <b-row
      ><b-col md="6">
        <customer-name-select-input
          label="Customer"
          required
          v-model="customer.company_name"
        ></customer-name-select-input>
        <employee-name-select-input
          label="Sales Person"
          required
          v-model="employee.name"
        ></employee-name-select-input>
        <form-text-input
          label="Order Date"
          v-model="order_date"
          required
          type="date"
        ></form-text-input>
        <form-text-input
          label="Require Date"
          v-model="required_date"
          required
          type="date"
        ></form-text-input>
        <shipper-name-select-input
          label="Shipper"
          required
          v-model="shipper.company_name"
        ></shipper-name-select-input>
        <form-text-input
          label="Ship Date"
          v-model="shipped_date"
          required
          type="date"
        ></form-text-input>
      </b-col>
      <b-col md="6"><contact-form></contact-form> </b-col
    ></b-row>
    <b-row>
      <b-col> <order-details v-model="order_details"></order-details></b-col>
    </b-row></div
></template>

<script>
import FormTextInput from '~/components/FormTextInput';
import CustomerNameSelectInput from '~/components/customer/CustomerNameSelectInput';
import EmployeeNameSelectInput from '~/components/employee/EmployeeNameSelectInput';
import ShipperNameSelectInput from '~/components/order/ShipperNameSelectInput';
import ContactForm from '~/components/forms/ContactForm';
import OrderDetails from '~/components/order/OrderDetails';
export default {
  components: {
    CustomerNameSelectInput,
    EmployeeNameSelectInput,
    ContactForm,
    FormTextInput,
    ShipperNameSelectInput,
    OrderDetails
  },
  props: {
    value: { type: Object, default: null }
  },
  data() {
    const _ = this.$_;
    const value = JSON.parse(JSON.stringify(this.value));
    console.log(value);
    const isNullOrEmpty =
      _.isEmpty(value) || _.isNull(value) || _.isUndefined(value);

    const order = isNullOrEmpty
      ? {
          order_date: '',
          required_date: '',
          shipped_date: '',
          customer_id: '',
          customer: {
            company_name: ''
          },
          employee: {
            name: '',
            first_name: '',
            last_name: ''
          },
          shipper: {
            company_name: ''
          },
          order_details: []
        }
      : value;

    return order;
  }
};
</script>
