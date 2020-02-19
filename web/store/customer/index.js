export const actions = {
  async save(store, customer) {
    const query = `mutation insert_customer($customer: customers_insert_input!) { insert_customers(objects: [$customer], on_conflict: {constraint: pk_customers, update_columns: [address, city, company_name, contact_name, contact_title, country, region, postal_code, phone]}) { affected_rows } }`;
    const variables = {
      customer
    };

    await this.$hasura(query, variables);
  },
  async remove(store, customerId) {
    const query = `mutation { delete_customers(where: {customer_id: {_eq: "${customerId}"}}){affected_rows} }`;
    await this.$hasura(query);
  }
};
