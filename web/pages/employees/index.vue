<template>
  <div>
    <h1>Employees</h1>
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
