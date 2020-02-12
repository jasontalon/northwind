<template>
  <div>
    <div>
      <b-form-group
        description=""
        label="First name"
        label-for="txtFirstName"
        :invalid-feedback="this.fbFirstName"
        :state="this.fbFirstName.length == 0"
      >
        <b-form-input
          id="txtFirstName"
          v-model="firstName"
          :state="this.fbFirstName.length == 0"
          trim
        ></b-form-input>
      </b-form-group>
    </div>

    <div>
      <b-form-group
        description=""
        label="Last name"
        label-for="txtLastName"
        :invalid-feedback="this.fbLastName"
        :state="this.fbLastName.length == 0"
      >
        <b-form-input
          id="txtLastName"
          v-model="lastName"
          :state="this.fbLastName.length == 0"
          trim
        ></b-form-input>
      </b-form-group>
    </div>

    <div>
      <b-form-group
        description=""
        label="Job Title"
        label-for="txtJobTitle"
        :invalid-feedback="this.fbJobTitle"
        :state="this.fbJobTitle.length == 0"
      >
        <b-form-input
          id="txtJobTitle"
          v-model="jobTitle"
          :state="this.fbJobTitle.length == 0"
          trim
        ></b-form-input>
      </b-form-group>
    </div>
    <div>
      <b-form-group
        description=""
        label="Salutations"
        label-for="txtSalutations"
        :invalid-feedback="this.fbSalutations"
        :state="this.fbSalutations.length == 0"
      >
        <b-form-input
          id="txtSalutations"
          v-model="salutations"
          :state="this.fbSalutations.length == 0"
          trim
        ></b-form-input>
      </b-form-group>
    </div>

    <div>
      <b-form-group
        description=""
        label="Birth Date"
        label-for="txtBirthDate"
        :invalid-feedback="this.fbBirthDate"
        :state="this.fbBirthDate.length == 0"
      >
        <b-form-input
          id="txtBirthDate"
          v-model="birthDate"
          :state="this.fbBirthDate.length == 0"
          trim
        ></b-form-input>
      </b-form-group>
    </div>
    <div>
      <b-form-group
        description=""
        label="Hire Date"
        label-for="txtHireDate"
        :invalid-feedback="this.fbHireDate"
        :state="this.fbHireDate.length == 0"
      >
        <b-form-input
          id="txtHireDate"
          v-model="hireDate"
          :state="this.fbHireDate.length == 0"
          trim
        ></b-form-input>
      </b-form-group>
    </div>
    <contact-detail
      :p-address.sync="address"
      :p-city.sync="city"
      :p-region.sync="region"
      :p-postal-code.sync="postalCode"
      :p-country.sync="country"
      :p-phone.sync="phone"
    ></contact-detail>

    <div>
      <b-form-group
        description=""
        label="Notes"
        label-for="txtNotes"
        :invalid-feedback="this.fbNotes"
        :state="this.fbNotes.length == 0"
      >
        <b-form-input
          id="txtNotes"
          v-model="notes"
          :state="this.fbNotes.length == 0"
          trim
        ></b-form-input>
      </b-form-group>
    </div>
    <div>
      <b-form-group
        description=""
        label="Reports to"
        label-for="txtReportsTo"
        :invalid-feedback="this.fbReportsTo"
        :state="this.fbReportsTo.length == 0"
      >
        <b-form-input
          id="txtReportsTo"
          v-model="reportsTo"
          :state="this.fbReportsTo.length == 0"
          trim
        ></b-form-input>
      </b-form-group>
    </div>
    <b-button @click="this.save" block>Save</b-button>
  </div>
</template>

<script>
import ContactDetail from '~/components/ContactDetail';
export default {
  components: { ContactDetail },
  data() {
    return {
      firstName: '',
      lastName: '',
      jobTitle: '',
      salutations: '',
      birthDate: '',
      hireDate: '',
      address: '',
      city: '',
      region: '',
      postalCode: '',
      country: '',
      phone: '',
      notes: '',
      reportsTo: ''
    };
  },
  computed: {
    fbFirstName() {
      return '';
    },
    fbLastName() {
      return '';
    },
    fbJobTitle() {
      return '';
    },
    fbSalutations() {
      return '';
    },
    fbBirthDate() {
      return '';
    },
    fbHireDate() {
      return '';
    },
    fbNotes() {
      return '';
    },
    fbReportsTo() {
      return '';
    }
  },
  methods: {
    async save() {
      const data = JSON.parse(JSON.stringify(this._data));
      this.$store.dispatch('employee/save', data);
    }
  }
};
</script>
