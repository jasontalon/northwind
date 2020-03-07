<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="secondary">
      <b-navbar-brand to="/">Northwind</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/employees">Employees</b-nav-item>
          <b-nav-item to="/customers">Customers</b-nav-item>
          <b-nav-item to="/orders">Orders</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->

        <hr />
        
          <template v-if="userRole != 'guest'">
            <b-navbar-nav class="ml-auto">
              <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->

                <template v-slot:button-content>
                  <em>Hi, {{ userId }}</em>
                </template>

                <b-dropdown-item @click="$store.dispatch('auth/signOut')"
                  >Sign Out</b-dropdown-item
                >
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

    <b-container fluid class="my-2 flex-grow-1 pb-5"><nuxt /> </b-container>
  </div>
</template>

<script>
export default {};
</script>
