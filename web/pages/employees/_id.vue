<template>
  <employee-form @save="save"></employee-form>
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
  async created() {},

  methods: {
    async load(employeeId) {},
    async save(employee) {
      const _emp = this.$_.omit(this.employee, ['employee_id']);
      console.log(_emp);
      await this.$store.dispatch('employee/save', _emp);
    }
  }
};
</script>

<style></style>
