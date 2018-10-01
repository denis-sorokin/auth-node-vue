<template>
    <div class="football-players-list">
        <h2 class="ti-0 my-5">{{ $t('football.playersList') }}</h2>
        <football-player v-for="(player, index) in players"
                         :player="player"
                         :key="index+1"/>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex';
    import FootballPlayer from '../../shared/FootballPlayer'

    export default {
    	name: 'FootballPlayersList',
        components: { FootballPlayer },
        computed: {
            ...mapGetters({
                players: 'football/getPlayers'
            })
        }
    }
</script>
