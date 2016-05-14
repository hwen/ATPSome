<template>
	<center v-if="isLoading"><strong>Loading...</strong></center>
	<div class="schedule" v-for="item in schedule">
		<h3>{{item.title}}</h3>
		<div class="list-item" v-for="detail in item.data">
			<p><strong>{{detail.name}}</strong></p>
			<p>比赛时间：<strong class="time">{{detail.startTime}}</strong></p>
			<p>直播链接: <a :href="detail.link">前去观看</a></p>
			<p class="status"><span>{{detail.status}}</span></p>
			<div class="player player-{{index}}" v-for="(index, player) in detail.competitors">
				<div class="player-box">
					<img class="player-logo img-{{index}}" :src="formatImg(player.logo)" alt="logo">
					<p>{{player.name}}</p>
				</div>
				<span v-if="index==1&&player.score">&nbsp;</span>
				<strong class="score lg">{{player.score}}</strong>
				<strong class="lg" v-if="index == 0 && player.score"> &nbsp;: </strong>
			</div>
		</div>
	</div>
</template>
<script>
	import scheduleService from '../schedule';

	export default {
		name: 'schedule',

		data() {
			return {
				schedule: [],
				isLoading: true
			}
		},

		ready() {
			scheduleService.fetch( (data) => {
				this.schedule = data;
				this.isLoading = false;
			});
		},

		methods: {
			formatImg: (imgLink) => imgLink.replace('.jpg', '') 
					+ '/11_70_70.jpg'
		}
	}
</script>
<style lang="sass">
	@import '../variables';

	.schedule {
		height: auto;
		.list-item {
			height: auto;
			p {
				text-align: center;
			}
			.time {
				color: $green;
			}
			.player {
				width: 48%;
				display: inline-block;
				.player-logo {
					border-radius: 35px;
					height: 70px;
					width: 70px;
				}
				.player-box {
					text-align: center;
				}
			}
			.player-0 {
				text-align: right;
			}
			.player-1 {
				text-align: left;
			}
			.score {
				color: $green;
			}
			.status {
				text-align: center;
				span {
					display: inline-block;
					background: $green;
					color: white;
					font-weight: bold;
					padding: .3rem;
					border-radius: 4px;
				}
			}
		}
		.lg {
			font-size: 1.5rem;
		}
	}
</style>