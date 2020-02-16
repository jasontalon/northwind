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

    return id == 'create' || /\d{1,5}/.test(id);
  },
  created() {
    this.employee = {
      first_name: 'jason',
      last_name: 'talon',
      address: '77 parada'
    };
  },

  methods: {
    async save(employee) {
      console.log(this.employee);
      await this.$store.dispatch('employee/save', employee);
    }
  }
};
</script>

<style></style>
