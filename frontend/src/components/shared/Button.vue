<template>
    <button class="v-button btn btn-success">{{ title }}</button>
</template>
<script>
    export default {
    	name: 'v-button',
        props: {
    		title: {
    			type: String
            }
        }
    }
</script>
