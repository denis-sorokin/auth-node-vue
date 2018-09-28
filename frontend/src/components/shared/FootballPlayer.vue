<template>
    <div class="football-player__root">
        <div class="table-element football-player" @click="toggleDetail">
            <div class="row">
                <div class="col-md-5">
                    <div class="d-flex justify-content-around wp-max-content">
                        <img src="@/assets/avatar.jpeg"
                             class="football-player__photo float-left mr-5"
                             alt="photo"/>
                        <span class="football-player__username float-left">
                        {{ player.username.toUpperCase() }}
                    </span>
                    </div>
                </div>
                <div class="col-md-5 offset-md-2">
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
        <transition name="showDetail">
            <div class="row" v-show="showDetail">
                <div class="col-10 offset-1">
                    <div class="football-player football-player__additional">
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
    export default {
    	name: 'FootballPlayer',
        props: {
    		player: {
    			type: Object
            }
        },
        data() {
    		return {
			    showDetail: false
            }
        },
        methods: {
    		toggleDetail() {
    			this.showDetail = !this.showDetail
            }
        }
    }
</script>
