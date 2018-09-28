<template>
    <button class="v-button btn" @click="action(propfn)">{{ title }}</button>
</template>
<script>
    export default {
    	name: 'v-button',
        props: {
    		title: {
    			type: String
            },
            action: {
    			type: Function
            },
            propfn: {
    			type: String
            }
        }
    }
</script>
