<template>
    <div class="football-games-list">
        <h2 class="ti-0 my-5">{{ $t('football.gamesList') }}</h2>
        <div class="row football-games-list__header">
            <span class="col-md-4 col-sm-12">ID</span>
            <span class="col-md-4 col-sm-6">{{ this.$t('football.plannedDate') }}</span>
            <span class="col-md-4 col-sm-6">{{ this.$t('football.winners') }}</span>
        </div>
        <football-game v-for="(game, index) in games"
                         :game="game"
                         :key="index+1"/>
    </div>
</template>
<script>
	import { mapGetters } from 'vuex';
	import FootballGame from '../../shared/FootballGame'

    export default {
    	name: 'FootballGamesList',
	    components: { FootballGame },
        computed: {
            ...mapGetters({
                games: 'football/getGames'
            })
        }
    }
</script>
