<template>
  <div>
    <b-row
      ><b-col md="6">
        <customer-name-select-input
          label="Customer"
          required
          v-model="customer.company_name"
          @selected="customerChanged"
        ></customer-name-select-input>
        <employee-name-select-input
          label="Sales Person"
          required
          v-model="employee.name"
          @selected="salesPersonChanged"
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
          @selected="shipperChanged"
        ></shipper-name-select-input>
        <form-text-input
          label="Ship Date"
          v-model="shipped_date"
          type="date"
        ></form-text-input>
        <form-text-input
          label="Freight"
          v-model="freight"
          type="number"
        ></form-text-input>
      </b-col>
      <b-col md="6"
        ><contact-form v-model="contact" no-phone></contact-form> </b-col
    ></b-row>
    <b-row>
      <b-col> <order-details v-model="order_details"></order-details></b-col>
    </b-row>
    <b-row>
      <b-col> <b-button @click="save" block>Save</b-button></b-col>
    </b-row>
  </div>
</template>
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
  defaultData() {
    return {
      customer_id: '',
      employee_id: 5,
      freight: 0,
      order_date: '',
      required_date: '',
      ship_address: '',
      ship_city: '',
      ship_country: '',
      ship_name: '',
      ship_postal_code: '',
      ship_region: '',
      ship_via: 0,
      shipped_date: '',
      order_details: [],
      employee: {
        name: '',
        first_name: '',
        last_name: ''
      },
      shipper: {
        company_name: ''
      },
      customer: {
        company_name: ''
      }
    };
  },
  methods: {
    salesPersonChanged({ employee_id }) {
      this.employee_id = employee_id;
    },
    customerChanged({ customer_id }) {
      this.customer_id = customer_id;
    },
    shipperChanged({ shipper_id }) {
      this.ship_via = shipper_id;
    },
    save() {
      const _ = this.$_,
        data = _.omitBy(this.$data, _.isPlainObject),
        contact = this.$data.contact,
        order_details = this.$data.order_details.map(i =>
          _.omit(i, ['product'])
        );
      const order = {
        ...data,
        ..._.mapKeys(contact, (value, key) => `ship_${key}`)
      };
      this.$emit('save', { ...order, order_details });
    }
  },
  data() {
    const _ = this.$_;
    const order = {
      ...this.$options.defaultData(),
      ...JSON.parse(JSON.stringify(this.value))
    };

    const contact = _.omit(
      _.mapKeys(
        _.pickBy(order, (value, key) => key.includes('ship_')),
        (value, key) => key.replace('ship_', '')
      ),
      ['via', 'ship_name']
    );
    return { ...order, contact };
  },
  mounted() {
    const _ = this.$_;
    this.$watch(
      vm => [..._.values(vm.$data), ..._.values(vm.$data.contact)].join(),
      val => {
        console.log(this.$data);
        this.$emit('input', this.$data);
      }
    );
  }
};
</script>
