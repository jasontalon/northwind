<template>
  <div>
    <h1>Employees</h1>
    <b-button to="/employees/create">Create</b-button>
    <employee-lookup-form show-on-load></employee-lookup-form>
  </div>
</template>

<script>
import EmployeeLookupForm from '~/components/forms/EmployeeLookupForm';
export default {
  components: {
    EmployeeLookupForm
  }
};
</script>

<style></style>
