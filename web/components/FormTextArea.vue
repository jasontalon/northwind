<template>
  <b-form-group
    :label="this.label"
    :readonly="this.readonly"
    :invalid-feedback="this.feedback"
    :state="this.feedback.length == 0"
    :description="this.description"
    :label-for="this.textAreaId"
  >
    <b-form-textarea
      :id="this.textAreaId"
      :placeholder="this.placeholder"
      :rows="this.rows"
      :max-rows="this.maxRows"
      :value="this.value"
      :state="this.feedback.length == 0"
      @input="value => $emit('input', value)"
    ></b-form-textarea>
  </b-form-group>
</template>

<script>
export default {
  props: {
    value: { type: String, default: '' },
    label: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    description: { type: String, default: '' },
    readonly: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    rows: { type: String, default: "3" },
    maxRows: { type: String, default: "6" }
  },
  data() {
    return { textAreaId: this.$shortid() };
  },
  computed: {
    feedback() {
      let feedback = '';
      if (!this.required || this.readonly) feedback = '';
      else if (this.value?.length == 0) feedback = `${this.label} is required.`;
      this.$emit('feedback', { label: this.label || '', message: feedback });
      return feedback;
    }
  }
};
</script>