<template>
    <div class="input-group d-flex justify-content-between mb-3 mb-0">
        <b-row class="my-1 w-100" :key="data.name">
            <b-col sm="3" class="align-self-center"><label class="control-label mr-5" :for="data.name">{{ data.label }}</label></b-col>
            <b-col :sm="data.valid? 9 : 6" class="text-center align-self-center">
                <b-form-input v-model="inputData"
                                        :type="data.type" :id="data.name"
                                        :required="data.required"
                                        :class="valid" class="border-25"></b-form-input>
            </b-col>
            <b-col sm="3" v-if="!data.valid"><span class="input-helper">{{ data.validFeedback }}</span></b-col>
        </b-row>
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
