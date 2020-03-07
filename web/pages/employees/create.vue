<template>
  <div>
    <employee-form @save="save"></employee-form>
  </div>
</template>
<script>
import EmployeeForm from '~/components/employee/forms/EmployeeForm';
export default {
  components: {
    EmployeeForm
  },
  methods: {
    async save(employee) {
      const response = await this.$hasura(
        'query { employees(limit: 1, order_by: {employee_id: desc}) { employee_id } }'
      );

      const latestEmployeeId = this.$_.get(
        response,
        'data.employees[0].employee_id',
        0
      );

      const record = { ...employee, employee_id: latestEmployeeId + 1 };

      await this.$store.dispatch('employee/save', record);
      this.$router.push('/employees');
    }
  }
};
</script>
