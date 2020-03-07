export const actions = {
  async save(store, order) {
    const _ = this.$_;

    const products = _.get(
      await this.$hasura(`query {
        order_details(where :{order_id:{_eq:"${order.order_id}"}})
        {
          product_id	
        }
      }`),
      'data.order_details',
      []
    ).map(p => p.product_id);

    const deletedProducts = products
      .filter(p => !order.order_details.map(p => p.product_id).includes(p))
      .map(product => ({
        product_id: { _eq: product },
        order_id: { _eq: order.order_id }
      }));

    const query = `
            
          mutation insert_order($deleted_products: [order_details_bool_exp!]!, $order: orders_insert_input!, $details: [order_details_insert_input!]!) {
            delete_order_details(where: {_or: $deleted_products}) {
              affected_rows
            }
            insert_orders(objects: [$order], on_conflict: {constraint: pk_orders, update_columns: [customer_id, employee_id, freight, order_date, required_date, ship_address, ship_city, ship_city, ship_name, ship_region, ship_postal_code, ship_country, shipped_date]}) {
              affected_rows
            }
            insert_order_details(objects: $details, on_conflict: {constraint: pk_order_details, update_columns: [quantity, unit_price, discount]}) {
              affected_rows
            }
          }
          `;
    const variables = {
      order: {
        ...this.$_.omit(order, ['order_details', 'ship_phone', 'createdBy'])
      },
      details: order.order_details.map(detail => ({
        ...detail,
        order_id: order.order_id
      })),
      deleted_products: deletedProducts
    };

    await this.$hasura(query, variables);
  },
  async remove(store, orderId) {
    const query = `mutation {
      delete_order_details(where: {order_id: {_eq: "${orderId}"}}){
        affected_rows
      }
      delete_orders(where: {order_id: {_eq: "${orderId}"}}) {
        affected_rows
      }
    }
    `;
    await this.$hasura(query);
  }
};
