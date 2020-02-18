<template>
  <div>
    <b-container>
      <b-form-row>
        <b-col md="6"
          ><form-text-input
            type="text"
            label="First name"
            v-model="first_name"
          ></form-text-input
        ></b-col>
        <b-col md="6"
          ><form-text-input
            type="text"
            label="Last name"
            v-model="last_name"
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
              :to="'/employees/' + data.item.employee_id"
            >
              View
            </b-button>
            <b-button variant="danger" @click="remove(data.item.employee_id)">
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
    { key: 'employee_id', label: '#', sortable: true },
    { key: 'first_name', label: 'First name', sortable: true },
    { key: 'last_name', label: 'Last name', sortable: true },
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
      first_name: '',
      last_name: '',
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
        [this.first_name, this.last_name].filter(Boolean).join().length > 0
      );
    },
    where() {
      if (!this.hasFilters)
        return {
          employee_id: { _gt: 0 }
        };
      const _ = this.$_;

      const filters = _.pick(JSON.parse(JSON.stringify(this.$data)), [
          'first_name',
          'last_name'
        ]),
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
    async remove(employeeId) {
      await this.$store.dispatch('employee/remove', employeeId);
      await this.search();
    },
    async sortingChanged({ sortBy, sortDesc }) {
      this.order_by = { [sortBy]: sortDesc ? 'asc' : 'desc' };
      await this.search();
    },
    async search() {
      this.isBusy = true;
      const query = `query ($offset : Int, $limit: Int, $where: employees_bool_exp! $order_by :[employees_order_by!]) {
                    employees_aggregate(where: $where) {
                      aggregate {
                        count
                      }
                    }
                    employees(offset: $offset, limit: $limit, order_by: $order_by, where: $where) {
                      employee_id
                      first_name
                      last_name
                    }
                  }
                  `,
        variables = {
          order_by: this.$_.isEmpty(this.order_by)
            ? { employee_id: 'desc' }
            : this.order_by,
          where: this.where,
          limit: this.perPage,
          offset: (this.currentPage - 1) * this.perPage
        };

      const {
        data: {
          employees = [],
          employees_aggregate: { aggregate: { count = 0 } = {} } = {}
        } = {},
        errors = null
      } = await this.$hasura(query, variables);

      this.items = employees;
      this.itemCount = count;
      this.isBusy = false;
    }
  },
  mounted() {
    if (this.$props.showOnLoad) this.search();
  }
};
</script>
