<template>
  <employee-form
    :p-first-name.sync="firstName"
    :p-feedbacks.sync="feedbacks"
    :p-title.sync="title"
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
      title: 'Mr.',
      firstName: '',
      feedbacks: []
    };
  },
  validate({ params }) {
    const id = params.id;

    return id == 'create' || /\d{1,5}/.test(id);
  },
  mounted() {
    console.log(this.$route);
  },
  watch: {
    firstName(upd) {
      console.log(upd);
    },
    feedbacks(val){
      console.log(val);
    }
  }
};
</script>

<style></style>
