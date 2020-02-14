<template>
  <b-form-group
    :label="this.label"
    :readonly="this.readonly"
    :invalid-feedback="this.feedback"
    :state="this.feedback.length == 0"
    :type="this.type"
    :description="this.description"
    :label-for="this.textId"
  >
    <b-form-input
      :id="this.textId"
      :value="this.value"
      @input="value => $emit('input', value)"
      :state="this.feedback.length == 0"
      trim
    ></b-form-input>
  </b-form-group>
</template>

<script>
export default {
  props: {
    type: { type: String, default: '' },
    label: { type: String, default: '' },
    required: { type: Boolean, default: false },
    value: { type: String },
    readonly: { type: Boolean, default: false },
    description: { type: String, default: '' }
  },

  data() {
    return {
      textId: this.$shortid()
    };
  },

  computed: {
    feedback() {
      let feedback = '';
      if (!this.required || this.readonly) feedback = '';
      else if (this.value.length == 0) feedback = `${this.label} is required.`;
      //make regex validations
      //other type support
      this.$emit('update:feedback', feedback);
      return feedback;
    }
  }
};
</script>
