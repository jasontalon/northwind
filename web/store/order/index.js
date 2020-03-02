export const actions = {
  async save(order) {
    const query = `mutation insert_order($order: orders_insert_input!) {
            insert_orders(objects: [$order], on_conflict: {constraint: pk_orders, update_columns: [customer_id, employee_id, freight, order_date, required_date, ship_address, ship_city, ship_city, ship_name, ship_region, ship_postal_code, ship_country, shipped_date]}) {
              affected_rows
            }
          }
          `;
    const variables = { order };

    await this.$hasura(query, variables);
  }
};
