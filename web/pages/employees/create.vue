<template>
  <div>
    <employee-form @save="save"></employee-form>
  </div>
</template>

<script>
import EmployeeForm from '~/components/forms/EmployeeForm';
export default {
  components: {
    EmployeeForm
  },
  methods: {
    async save(employee) {
      const response = await this.$axios.$post('/gql', {
        query:
          'query { employees(limit: 1, order_by: {employee_id: desc}) { employee_id } }'
      });

      const latestEmployeeId = this.$_.get(
        response,
        'data.employees[0].employee_id',
        0
      );

      const record = this.$_.omit(employee, ['employee_id']);

      record.employee_id = latestEmployeeId + 1;

      await this.$store.dispatch('employee/save', record);
    }
  }
};
</script>

<style></style>
