<template>
    <div class="football-want-game">
        <h2 class="ti-0 my-5">{{ $t('football.wantGame') }}</h2>
        <datepicker v-model="selectDate"
                    :language="currentLanguage"
                    class="datepicker"
                    name="selectGameDate"
                    :disabled-dates="disabledDates"
                    :placeholder="$t('football.selectDate')"
                    @opened="toggleDatepickerStatus(true)"
                    @closed="toggleDatepickerStatus(false)"
        >
        </datepicker>
        <span class="ti-0 my-3" :class="checkDate? 'text-success' : 'text-danger'">
            {{ $t(`football.${checkDate ? 'timeAvailable' : 'timeDeny'}`,
            checkDate ? {time: gameTime} : null) }}
        </span>
        <v-button :title="$t('buttons.football.writeTime')" :disabled="!checkDate"
                  :action="writeTime" class="my-5" :class="!checkDate? 'btn-secondary':'btn-success'">
        </v-button>
    </div>
</template>
<script>
	import Vue from 'vue'
    import moment from 'moment'
	import {en, ru} from 'vuejs-datepicker/dist/locale'

	export default {
    	name: 'FootballWantGame',
        data() {
    		return {
    			selectDate: ''
            }
        },
        computed: {
	        currentLanguage() {
    			const lang = Vue.i18n.locale() === 'gb' ? 'en' : 'ru';
    			moment.locale(lang);
                return lang === 'en' ? en : ru;
	        },
	        checkDate () {
		        /* check time for available on server */
		        return true;
            },
            disabledDates() {
	            return {
		            to: new Date(moment().add(-1, 'days'))
	            }
            },
	        gameTime() {
	        	/* get time next game from server */
	        	return moment().format()
            }
        },
        methods: {
	        writeTime() {
		        this.$store.dispatch('FOOTBALL_REGISTER_IN_GAME', this.selectDate);
	        },
	        toggleDatepickerStatus(status) {
	        	console.log(status)
            }
        }
    }
</script>
