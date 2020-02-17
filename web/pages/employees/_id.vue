<template>
  <employee-form v-model="employee" @save="save"></employee-form>
</template>

<script>
import EmployeeForm from '~/components/forms/EmployeeForm';
export default {
  components: {
    EmployeeForm
  },
  data() {
    return {
      feedbacks: [],
      employee: { first_name: '' }
    };
  },
  validate({ params }) {
    const id = params.id;

    return /\d{1,5}/.test(id);
  },
  async mounted() {
    await this.load(this.$route.params.id);
  },
  watch: {
    employee(val) {
      console.log(val);
    }
  },

  methods: {
    async load(employeeId) {
      const query = `query  {
  employees(where: {employee_id: {_eq: ${employeeId}}}) {
    address
    birth_date
    city
    country
    createdBy
    employee_id
    first_name
    hire_date
    home_phone
    last_name
    notes
    postal_code
    region
    reports_to
    title
    title_of_courtesy
  }
}
`;
      const {
        data: { employees }
      } = await this.$axios.$post('/gql', { query });

      const employee = employees[0];
      const _ = this.$_;
      const employeeProps = _.keys(employee);
      for (let i = 0; employeeProps.length > i; i++) {
        const propName = employeeProps[i];
        this.employee[propName] = employee[propName];
        //this.$set(this.employee, propName, employee[propName]);
      }
    },
    async save(employee) {
      const _emp = this.$_.omit(this.employee, ['employee_id']);
      console.log(_emp);
      await this.$store.dispatch('employee/save', _emp);
    }
  }
};
</script>

<style></style>
