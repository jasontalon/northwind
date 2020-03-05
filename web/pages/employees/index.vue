<template>
  <div>
    <h1>Employees</h1>
    <b-button v-if="userRole != 'guest'" to="/employees/create">Create</b-button>
    <employee-lookup-form show-on-load></employee-lookup-form>
  </div>
</template>

<script>
import EmployeeLookupForm from '~/components/employee/forms/EmployeeLookupForm';
export default {
  components: {
    EmployeeLookupForm
  }  
};
</script>