<template>
  <div>
    <b-row
      ><b-col md="6">
        <customer-name-select-input
          label="Customer"
          required
          v-model="customer.company_name"
        ></customer-name-select-input>
      </b-col>
      <b-col md="6">
        <employee-name-select-input
          label="Sales Person"
          required
          v-model="employee.name"
        ></employee-name-select-input> </b-col
    ></b-row>
    <b-row>
      <b-col
        ><form-text-input
          label="Order Date"
          required
          type="date"
        ></form-text-input
      ></b-col>
      <b-col
        ><form-text-input
          label="Require Date"
          required
          type="date"
        ></form-text-input
      ></b-col>
    </b-row>
    <b-row>
      <b-col
        ><shipper-name-select-input
          label="Shipper"
          required
        ></shipper-name-select-input
      ></b-col>
      <b-col
        ><form-text-input
          label="Ship Date"
          required
          type="date"
        ></form-text-input></b-col
    ></b-row>
    <b-row>
      <b-col> <contact-form></contact-form></b-col
    ></b-row>
    <b-row>
      <order-details></order-details>
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
  data() {
    return {
      customer: {
        company_name: ''
      },
      employee: {
        name: ''
      }
    };
  }
};
</script>
