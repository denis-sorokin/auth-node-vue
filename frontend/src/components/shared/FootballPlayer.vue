<template>
    <div class="table-element football-player">
        <div class="row">
            <div class="col-5">
                <div class="d-flex justify-content-around wp-max-content">
                    <img src="@/assets/avatar.jpeg"
                         class="football-player__photo float-left mr-5"
                         alt="photo"/>
                    <span class="football-player__username float-left">
                        {{ player.username.toUpperCase() }}
                    </span>
                </div>
            </div>
            <div class="col-5 offset-2">
                <div class="d-flex justify-content-around wp-max-content float-right">
                    <span class="football-player__games-count mr-5">
                        {{ $t('football.player.games') }} {{ player.games.length }}
                    </span>
                    <div class="football-player__score mr-3">
                        <img src="@/assets/score.svg" alt="score">
                        <span class="football-player__score__data ti-0">
                            {{ player.football_score }}
                        </span>
                    </div>
                    <div class="football-player__score-number float-right">
                        1
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
    	name: 'FootballPlayer',
        props: {
    		player: {
    			type: Object
            }
        }
    }
</script>
