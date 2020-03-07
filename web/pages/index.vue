<template>
  <b-container>
    <b-row>
      <b-col>
        <b-card
          bg-variant="light"
          class="mb-2"
          :title="'Welcome, ' + userName + '!'"
        >
          <div v-if="userName == 'Guest'">
            <p>
              You are not logged-in. please
              <b-link to="/signin">sign-in</b-link> or
              <b-link to="/signup">sign-up</b-link> a new account!
            </p>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-jumbotron
          class="mb-2"
          header-level="4"
          header="Northwind Vue"
          lead="A company database management application"
        >
          <b-button
            variant="primary"
            href="https://www.geeksengine.com/article/northwind.html"
            target="_blank"
            >About Northwind</b-button
          >
          <b-button v-if="role == 'guest'" variant="success" to="/signin"
            >Let's begin!</b-button
          >
        </b-jumbotron>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="4">
        <b-card
          class="mb-2"
          bg-variant="light"
          img-src="/images/customers.jpg"
          title="Customers"
          sub-title="Manage customer records"
        >
          <div class="d-flex flex-row">
            <action-button to="/customers/create" variant="link"
              >Create New</action-button
            >
            <b-button to="/customers" variant="link">View All</b-button>
          </div>
        </b-card>
      </b-col>
      <b-col lg="4">
        <b-card
          class="mb-2"
          bg-variant="light"
          img-src="/images/employees.png"
          title="Employees"
          sub-title="Manage employee records"
        >
          <div class="d-flex flex-row">
            <action-button to="/employees/create" variant="link"
              >Create New</action-button
            >
            <b-button to="/employees" variant="link">View All</b-button>
          </div>
        </b-card>
      </b-col>
      <b-col lg="4">
        <b-card
          class="mb-2"
          bg-variant="light"
          img-src="/images/sales.jpg"
          title="Orders"
          sub-title="Manage sales transaction records"
        >
          <div class="d-flex flex-row">
            <action-button to="/orders/create" variant="link"
              >Create New</action-button
            >
            <b-button to="/orders" variant="link">View All</b-button>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  data() {
    return { userName: '' };
  },

  created() {
    this.userName = this.userRole == 'guest' ? 'Guest' : this.userId;
  }
};
</script>
