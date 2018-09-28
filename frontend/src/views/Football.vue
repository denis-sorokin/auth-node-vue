<template>
    <div class="football">
        <div class="row">
            <div class="col">
                <div class="custom-title__wrapper football-title">
                    <h1 class="custom-title ti-0">{{ $t('main.footballTitle') }}</h1>
                </div>
                <div class="football-bg football-bg__shadow">
                    <div class="football-bg__top"></div>
                    <div class="football-bg__white"></div>
                    <div class="football-bg__body"></div>
                </div>
                <div class="content">
                    <nav class="nav justify-content-around p-3">
                        <v-button v-for="el in tables"
                                  :title="el.title"
                                  :propfn="el.table"
                                  :action="setActiveTable"
                                  class="nav-item col-lg-5 my-1 btn-success">
                        </v-button>
                    </nav>
                </div>
                <WantGame v-if="activeTable === 'wantGame'" />
                <WantReferee v-if="activeTable === 'wantReferee'" />
                <CancelApplication v-if="activeTable === 'cancelApplication'" />
                <PlayersList v-if="activeTable === 'playersList'" />
                <img class="football__ball point" src="@/assets/football_ball.png" @click="showSecret" />
            </div>
        </div>
    </div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import WantGame from '../components/feature/football/WantGame'
	import WantReferee from '../components/feature/football/WantReferee'
	import CancelApplication from '../components/feature/football/CancelApplication'
	import PlayersList from '../components/feature/football/PlayersList'

    export default {
    	name: 'footballTournament',
        components: { WantGame, WantReferee, CancelApplication, PlayersList },
        data() {
    		return {
    			tables: [
                    {
                    	title: this.$t('buttons.football.wantGame'),
	                    table: 'wantGame'
                    },
                    {
	                    title: this.$t('buttons.football.wantReferee'),
	                    table: 'wantReferee'
				    },
                    {
	                    title: this.$t('buttons.football.cancelGame'),
	                    table: 'cancelApplication'
                    },
                    {
	                    title: this.$t('buttons.football.players'),
	                    table: 'playersList'
				    }
                ]
            }
        },
	    computed: {
		    ...mapGetters({
			    activeTable: 'football/getActiveTable'
		    }),
	    },
        methods: {
    		showSecret() {
			    console.log('secret')
            },
	        setActiveTable (table) {
    			this.$store.dispatch('football/SET_FOOTBALL_ACTIVE_TABLE', table)
            }
        }
    }
</script>
