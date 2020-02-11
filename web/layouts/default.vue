<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="secondary">
      <b-navbar-brand href="#">Northwind</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/employees">Employees</b-nav-item>
          <b-nav-item to="/customers">Customers</b-nav-item>
          <b-nav-item to="/orders">Orders</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->

        <hr />
        <template v-if="this.role != 'guest'">
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-form-input
                size="sm"
                class="mr-sm-2"
                placeholder="Search"
              ></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit"
                >Search</b-button
              >
            </b-nav-form>
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <em>{{userId}}</em>
              </template>

              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </template>
        <template v-else>
          <b-navbar-nav>
            <b-nav-item to="/signin">Sign In</b-nav-item>
            <b-nav-item to="/signup">Sign Up</b-nav-item>
          </b-navbar-nav>
        </template>
      </b-collapse>
    </b-navbar>

    <b-container fluid class="my-2 flex-grow-1"><nuxt /> </b-container>
    <footer class="fixed-bottom">
      <div class="d-flex justify-content-center py-2">
        &mdash; Northwind {{ new Date().getFullYear() }} &mdash;
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: mapState({
    userId: state => state.auth.userId,
    role: state => state.auth.role
  })
};
</script>

<style></style>
