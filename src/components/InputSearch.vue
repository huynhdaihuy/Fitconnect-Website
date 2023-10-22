<script>
export default {
  props: {
    modelValue: { type: String, default: "" },
  },
  emits: ["submit", "update:modelValue"],
  methods: {
    updateModelValue(e) {
      this.$emit("update:modelValue", e.target.value);
    },
    submit() {
      this.$emit("submit-recommend");
    },
  },
};
</script>
<template>
  <div class="input-group">
    <input
      type="text"
      class="form-control"
      placeholder="Nhập số tiền bạn cần mua sắm !"
      :value="modelValue"
      @input="updateModelValue"
      @keyup.enter="submit"
    />
    <div class="input-group-append">
      <button class="btn-recommend" type="button" @click="submit">
        <i class="fas fa-search"></i> Nhận tư vấn
      </button>
    </div>
  </div>
</template>
<style scoped>
.btn-recommend {
  background-color: var(--color-btn-red);
  color: white;
  border: none;
  border-radius: 4px;
  outline: none;
}
</style>