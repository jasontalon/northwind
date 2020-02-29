<template>
  <div>
    <b-container>
      <b-form-row>
        <b-col md="6"
          ><form-text-input
            type="text"
            label="Customer"
            v-model="customer"
          ></form-text-input
        ></b-col>
        <b-col md="6"
          ><form-text-input
            type="text"
            label="Sales Person"
            v-model="salesPerson"
          ></form-text-input
        ></b-col>
      </b-form-row>
      <b-row
        ><b-col class="d-flex justify-content-center">
          <b-button
            block
            @click="search"
            :disabled="isBusy"
            class=""
            style="max-width:400px;"
            >Search</b-button
          ></b-col
        ></b-row
      >
      <b-row>
        <b-table
          class="mt-3"
          no-local-sorting
          :items="items"
          :fields="fields"
          @sort-changed="sortingChanged"
          :busy.sync="isBusy"
        >
          <template v-slot:cell(actions)="data">
            <b-button variant="link" :to="'/orders/' + data.item.order_id">
              View
            </b-button>
            <b-button variant="danger" @click="remove(data.item.order_id)">
              Delete
            </b-button>
          </template>
        </b-table></b-row
      >
      <b-row>
        <b-col class="d-flex justify-content-end ">
          <div>Total Count : {{ itemCount }}</div>
          <b-form-select
            class="ml-2"
            style="max-width:80px;"
            v-model="perPage"
            @input="search"
            :options="[10, 50, 100]"
          ></b-form-select>
          <b-pagination
            class="ml-2"
            v-model="currentPage"
            :total-rows="itemCount"
            :per-page="perPage"
            aria-controls="my-table"
            @input="search"
          ></b-pagination
        ></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import FormTextInput from '~/components/FormTextInput';
export default {
  components: { FormTextInput },
  columns: [
    { key: 'order_id', label: '#', sortable: true },
    { key: 'customer.company_name', label: 'Customer', sortable: true },
    { key: 'employee.name', label: 'Sales Person', sortable: true },
    { key: 'actions', label: 'Actions' }
  ],
  props: {
    showOnLoad: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      customer: '',
      salesPerson: '',
      fields: this.$options.columns,
      items: [],
      itemCount: 0,
      perPage: 10,
      currentPage: 1,
      order_by: {},
      isBusy: false
    };
  },
  computed: {
    hasFilters() {
      return (
        [this.salesPerson, this.customer].filter(Boolean).join().length > 0
      );
    },
    where() {
      if (!this.hasFilters)
        return {
          order_id: { _gt: 0 }
        };
      const { customer, salesPerson } = JSON.parse(JSON.stringify(this.$data));

      const _customerQuery =
        customer.length > 0
          ? {
              customer: { company_name: { _ilike: `%${customer}%` } }
            }
          : null;

      const _employeeQuery =
        salesPerson.length > 0
          ? {
              employee: {
                _or: [
                  { first_name: { _ilike: `%${salesPerson}%` } },
                  { last_name: { _ilike: `%${salesPerson}%` } }
                ]
              }
            }
          : null;

      const _where = {
        _and: [_customerQuery, _employeeQuery].filter(Boolean)
      };
      return _where;
    }
  },

  methods: {
    async remove(orderId) {
      await this.$store.dispatch('orders/remove', orderId);
      await this.search();
    },
    async sortingChanged({ sortBy, sortDesc }) {
      this.order_by = { [sortBy]: sortDesc ? 'asc' : 'desc' };
      await this.search();
    },
    async search() {
      this.isBusy = true;
      const query = `query ($offset : Int, $limit: Int, $where: orders_bool_exp! $order_by :[orders_order_by!]) {
                    orders_aggregate(where: $where) {
                      aggregate {
                        count
                      }
                    }
                    orders(offset: $offset, limit: $limit, order_by: $order_by, where: $where) {
                      order_id
                      customer {
                        company_name
                        }
                        employee {
                            first_name
                            last_name
                        }
                    }
                  }
                  `,
        variables = {
          order_by: this.$_.isEmpty(this.order_by)
            ? { order_id: 'desc' }
            : this.order_by,
          where: this.where,
          limit: this.perPage,
          offset: (this.currentPage - 1) * this.perPage
        };
      console.log(query, variables);
      const {
        data: {
          orders = [],
          orders_aggregate: { aggregate: { count = 0 } = {} } = {}
        } = {},
        errors = null
      } = await this.$hasura(query, variables);

      this.items = orders.map(o => ({
        ...o,
        employee: {
          ...o.employee,
          name: o.employee.first_name + ' ' + o.employee.last_name
        }
      }));
      this.itemCount = count;
      this.isBusy = false;
    }
  },
  mounted() {
    if (this.$props.showOnLoad) this.search();
  }
};
</script>
