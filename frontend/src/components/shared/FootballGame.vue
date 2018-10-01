<template>
    <div class="football-game__root">
        <div class="table-element football-game" @click="toggleDetail"
             :class="game.winners === 'WHITE' || game.winners === 'YELLOW'? 'football-game__done':''"
        >
            <div class="row">
                <div class="col-md-4 col-sm-12">{{ game._id }}</div>
                <div class="col-md-4 col-sm-6">{{ plannedDate }}</div>
                <div class="col-md-4 col-sm-6">{{ game.winners }}</div>
            </div>
        </div>
        <transition name="showDetail">
            <div class="row" v-show="showDetail">
                <div class="col-10 offset-1">
                    <div class="football-game football-game__additional">
                        <p>Additional info</p>
                        <p>Additional info</p>
                        <p>Additional info</p>
                        <p>Additional info</p>
                        <p>Additional info</p>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    import moment from 'moment'

    export default {
    	name: 'FootballGame',
        props: {
    		game: {
    			type: Object
            }
        },
        data() {
    		return {
			    showDetail: false
            }
        },
        computed: {
    		plannedDate() {
    			return moment(this.game.planned_date).format('DD/MM/YYYY HH:mm');
            }
        },
	    methods: {
		    toggleDetail() {
			    this.showDetail = !this.showDetail
		    }
	    }
    }
</script>
