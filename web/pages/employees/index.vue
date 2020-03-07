<template>
  <b-container>
    <h1>Employees</h1>
    <div class="d-flex justify-content-end">
      <action-button to="/employees/create">
        <b-icon-plus /> Create New Employee
      </action-button>
    </div>
    <employee-lookup-form show-on-load></employee-lookup-form
  ></b-container>
</template>
<script>
import EmployeeLookupForm from '~/components/employee/forms/EmployeeLookupForm';

export default {
  components: {
    EmployeeLookupForm
  }
};
</script>
