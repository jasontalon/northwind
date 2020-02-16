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
      title: 'Mr.',
      firstName: '',
      feedbacks: [],
      employee: {}
    };
  },
  validate({ params }) {
    const id = params.id;

    return id == 'create' || /\d{1,5}/.test(id);
  },
  created() {
    this.employee = { first_name: 'jason', last_name: 'talon' };
  },
  mounted() {
    this.$set(this.employee, 'title_of_courtesy', 'Mr.');
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
