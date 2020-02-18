<template>
  <employee-form
    :key="employee.employee_id"
    v-model="employee"
    @save="save"
  ></employee-form>
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
      employee: {}
    };
  },
  validate({ params }) {
    const id = params.id;

    return /\d{1,5}/.test(id);
  },
  async mounted() {
    await this.load(this.$route.params.id);
  },
  methods: {
    async load(employeeId) {
      const query = `query { employees(where: {employee_id: {_eq: ${employeeId}}}) { address birth_date city country employee_id first_name hire_date home_phone last_name notes postal_code region reports_to title title_of_courtesy } }`;

      const employee = this.$_.get(
        await this.$axios.$post('/gql', { query }),
        'data.employees[0]',
        {}
      );

      this.employee = employee;
    },
    async save(employee) {
      await this.$store.dispatch('employee/save', this.employee);
    }
  }
};
</script>

<style></style>
