import Vue from "vue";
import Router from "vue-router";
import Resource from "vue-resource";

import rank from './components/rank.vue';
import tournaments from './components/tournaments.vue';
import aces from './components/aces.vue';
import fstServe from './components/1st-serve.vue';
import fstPointWon from './components/1st-serve-points-won.vue';
import sndPointWon from './components/2nd-serve-points-won.vue';
import fstReturnPointWon from './components/1st-serve-return-points-won.vue';
import sndReturnPointWon from './components/2nd-serve-return-points-won.vue';
import breakPointConvert from './components/break-points-converted.vue';
import breakPointSave from './components/break-points-saved.vue';
import returnGameWon from './components/return-games-won.vue';
import serviceGameWon from './components/service-games-won.vue';

import aboutView from './components/about.vue';
import ukuleleView from './components/ukulele.vue';

import schedule from './components/schedule.vue';

Vue.use(Router);
Vue.use(Resource);

Vue.config.debug = true;

let App 	= Vue.extend({});
let router 	= new Router() ;

router.map({
	'/rank': {
		name: 'rank',
		component: rank
	},
	'/tournaments/:type': {
		name: 'tournaments',
		component: tournaments
	},
	'/schedule': {
		name: 'schedule',
		component: schedule
	},
	'/stats/aces': {
		name: 'aces',
		component: aces
	},
	'/stats/1st-serve': {
		name: 'fstServe',
		component: fstServe
	},
	'/stats/1st-serve-points-won': {
		name: 'fstPointWon',
		component: fstPointWon
	},
	'/stats/2nd-serve-points-won': {
		name: 'sndPointWon',
		component: sndPointWon
	},
	'/stats/1st-serve-return-points-won': {
		name: 'fstReturnPointWon',
		component: fstReturnPointWon
	},
	'/stats/2nd-serve-return-points-won': {
		name: 'sndReturnPointWon',
		component: sndReturnPointWon
	},
	'/stats/break-points-converted': {
		name: 'breakPointConvert',
		component: breakPointConvert
	},
	'/stats/break-points-saved': {
		name: 'breakPointSave',
		component: breakPointSave
	},
	'/stats/return-games-won': {
		name: 'returnGameWon',
		component: returnGameWon
	},
	'/stats/service-games-won': {
		name: 'serviceGameWon',
		component: serviceGameWon
	},
	'/about': {
		name: 'about',
		component: aboutView
	},
	'/ukulele': {
		name: 'ukulele',
		component: ukuleleView
	}
});

router.redirect({
	'*': "/index"
});

router.start(App, '#app');
