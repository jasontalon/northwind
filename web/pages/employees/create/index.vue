<template>
  <div>
    <div>
      <text-input
        label="Employee #"
        required
        type="text"
        v-model="employee_id"
      ></text-input>
    </div>
    <div>
      <text-input
        label="First Name"
        required
        type="text"
        v-model="first_name"
      ></text-input>
    </div>

    <div>
      <text-input
        label="Last Name"
        required
        type="text"
        v-model="last_name"
      ></text-input>
    </div>

    <div>
      <text-input
        label="Job Title"
        required
        type="text"
        v-model="title"
      ></text-input>
    </div>
    <div>
      <select-input
        label="Salutations"
        :selections="['Mr.', 'Ms.', 'Mrs.']"
        v-model="title_of_courtesy"
        
      ></select-input>
    </div>

    <div>
      <text-input
        label="Birth Date"
        required
        type="text"
        v-model="birth_date"
      ></text-input>
    </div>
    <div>
      <text-input
        label="Hire Date"
        required
        type="text"
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
        type="text"
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
    async save() {
      const data = JSON.parse(JSON.stringify(this._data));
      //this.$store.dispatch('employee/save', data);
      console.log(data);
    }
  }
};
</script>
