<template>
  <b-form-group
    :label="this.label"
    :readonly="this.readonly"
    :invalid-feedback="this.feedback"
    :state="this.feedback.length == 0"
    :description="this.description"
    :label-for="this.textId"
  >
    <b-form-input
      :id="this.textId"
      :value="this.value"
      @input="value => $emit('input', value)"
      :state="this.feedback.length == 0"
      :type="this.type"
      trim
      :minlength="this.minlength"
      :maxlength="this.maxlength"
      :min="this.min"
      :max="this.max"
    ></b-form-input>
  </b-form-group>
</template>

<script>
export default {
  props: {
    type: { type: String, default: '' },
    label: { type: String, default: '' },
    required: { type: Boolean, default: false },
    value: { type: String | Number },
    readonly: { type: Boolean, default: false },
    description: { type: String, default: '' },
    minlength: String,
    maxlength: String,
    min: String,
    max: String,
    regex: String
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
      else if (this.value?.length == 0) feedback = `${this.label} is required.`;
      else if (
        this.type == 'number' &&
        parseInt(this.value) > parseInt(this.max)
      )
        feedback = 'Max number reached.';
      //make regex validations
      this.$emit('feedback', { label: this.label || '', message: feedback });
      return feedback;
    }
  }
};
</script>
