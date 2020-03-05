<template>
  <div>
    <b-container>
      <b-form-row>
        <b-col md="6"
          ><form-text-input
            type="text"
            label="Company"
            v-model="company_name"
          ></form-text-input
        ></b-col>
        <b-col md="6"
          ><form-text-input
            type="text"
            label="Contact"
            v-model="contact_name"
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
            <b-button
              variant="link"
              :to="'/customers/' + data.item.customer_id"
            >
              View
            </b-button>
            <b-button v-if="data.item.createdBy == userId" variant="danger" @click="remove(data.item.customer_id)">
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
    { key: 'customer_id', label: '#', sortable: true },
    { key: 'company_name', label: 'Company', sortable: true },
    { key: 'contact_name', label: 'Contact', sortable: true },
    'createdBy',
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
      company_name: '',
      contact_name: '',
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
        [this.company_name, this.contact_name].filter(Boolean).join().length > 0
      );
    },
    where() {
      if (!this.hasFilters)
        return {
          customer_id: { _is_null: false }
        };
      const _ = this.$_;

      const filters = _.pick(this.$data, ['company_name', 'contact_name']),
        _where = _.keys(filters).reduce((acc, filter) => {
          acc[filter] = {
            _ilike: `%${filters[filter]}%`
          };
          return acc;
        }, {});
      return _where;
    }
  },

  methods: {
    async remove(customerId) {
      await this.$store.dispatch('customer/remove', customerId);
      await this.search();
    },
    async sortingChanged({ sortBy, sortDesc }) {
      this.order_by = { [sortBy]: sortDesc ? 'asc' : 'desc' };
      await this.search();
    },
    async search() {
      this.isBusy = true;
      const query = `query ($offset : Int, $limit: Int, $where: customers_bool_exp! $order_by :[customers_order_by!]) {
                    customers_aggregate(where: $where) {
                      aggregate {
                        count
                      }
                    }
                    customers(offset: $offset, limit: $limit, order_by: $order_by, where: $where) {
                      customer_id
                      company_name
                      contact_name
                      createdBy
                    }
                  }
                  `,
        variables = {
          order_by: this.$_.isEmpty(this.order_by)
            ? { company_name: 'asc' }
            : this.order_by,
          where: this.where,
          limit: this.perPage,
          offset: (this.currentPage - 1) * this.perPage
        };

      const {
        data: {
          customers = [],
          customers_aggregate: { aggregate: { count = 0 } = {} } = {}
        } = {},
        errors = null
      } = await this.$hasura(query, variables);

      this.items = customers;
      this.itemCount = count;
      this.isBusy = false;
    }
  },
  mounted() {
    if (this.$props.showOnLoad) this.search();
  }
};
</script>
