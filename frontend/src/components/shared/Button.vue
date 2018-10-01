<template>
    <button class="v-button btn"
            :class="selectedTable? 'selectTable-animate':''"
            @click="clickAction">
        {{ title }}
    </button>
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
        },
        data() {
    		return {
			    selectedTable: false
		    }
        },
        methods: {
    		clickAction() {
			    this.selectedTable = true;
			    setTimeout(() => {
				    this.selectedTable = false;
			    }, 700);
			    this.action(this.propfn);
            }
        }
    }
</script>
