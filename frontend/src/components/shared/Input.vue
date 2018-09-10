<template>
    <div class="input-group d-flex justify-content-between mb-3 mb-0">
        <label class="control-label mr-5 align-self-center" :for="data.name">{{ data.label }}</label><i class="bar"></i>
        <input :type="data.type" :id="data.name" v-model="inputData" :required="data.required" :class="valid" class="border-25" />
        <div class="valid-feedback">
            {{ data.validFeedback }}
        </div>
    </div>
</template>
<script>
    export default {
        name: 'v-input',
        props: {
            data: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                inputData: ''
            }
        },
        computed: {
            valid() {
                return this.data.valid? 'is-valid' : 'is-invalid';
            }
        },
        watch: {
            'inputData': function (val) {
                this.$emit('change', val);
            }
        }
    }
</script>
