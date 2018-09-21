<template>
    <div class="football">
        <div class="row">
            <div class="col-12">
                <div class="custom-title__wrapper football-title">
                    <h1 class="custom-title ti-0">{{ $t('main.footballTitle') }}</h1>
                </div>
                <div class="football-bg football-bg__shadow">
                    <div class="football-bg__top"></div>
                    <div class="football-bg__white"></div>
                    <div class="football-bg__body"></div>
                </div>
                <img class="football__ball point" src="@/assets/football_ball.png" @click="showSecret" />
            </div>
        </div>
    </div>
</template>
<script>
    export default {
    	name: 'footballTournament',
        methods: {
    		showSecret() {
			    console.log('secret')
            }
        }
    }
</script>
