export default {
  computed: {
    userId() {
      return this.$store.state.auth.userId;
    },
    userRole() {
      return this.$store.state.auth.role;
    },
    isRecordOwner() {
      return this.createdBy == this.userId;
    },
    canSave() {
      const id = (
          this.order_id ??
          this.customer_id ??
          this.employee_id ??
          ''//issue with orders.
        ).toString(),
        state = id.length > 0 ? 'UPDATE' : 'CREATE',
        isRegisteredUser = ['user', 'admin'].includes(this.userRole),
        canUpdate = state == 'UPDATE' && this.isRecordOwner,
        canCreate = state == 'CREATE' && isRegisteredUser;
      console.log({ state, isRegisteredUser, canUpdate, canCreate });
      return canUpdate || canCreate;
    }
  }
};
