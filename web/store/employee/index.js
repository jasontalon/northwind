export const actions = {
  async save(store, employee) {
    const query = `mutation insert_employee($employee: employees_insert_input!) { insert_employees(on_conflict: {constraint: pk_employees, update_columns: [address, birth_date, city, country, first_name, last_name, title_of_courtesy, title, region, postal_code, extension, notes, reports_to]}, objects: [$employee]) { affected_rows
    } } `;

    const variables = {
      employee
    };

    const response = await this.$hasura(query, variables);

    console.log(response);
  }
};
