export const actions = {
  async save(store, employee) {
    const query = `mutation insert_employee($employee: employees_insert_input!) { insert_employees(on_conflict: {constraint: pk_employees, update_columns: [address, birth_date, city, country, first_name, last_name, title_of_courtesy, title, region, postal_code, home_phone, extension, notes, reports_to]}, objects: [$employee]) { affected_rows
    } } `,
      variables = {
        employee: this.$_.omit(employee, ['createdBy'])
      };

    await this.$hasura(query, variables);
  },

  async remove(store, employeeId) {
    const query = `mutation  {
      delete_employees(where: {employee_id: {_eq: "${employeeId}"}}) { affected_rows
      } } `;

    await this.$hasura(query);
  }
};
