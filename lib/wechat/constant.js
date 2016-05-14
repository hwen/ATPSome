var statsList = [
				'{1}.aces数',
				'{2}.一发命中',
				'{3}.一发得分率',
				'{4}.二发得分率',
				'{5}.保发成功率',
				'{6}.挽救破发点',
				'{7}.接一发赢球率',
				'{8}.接二发赢球率',
				'{9}.破发点转化',
				'{10}.接发赢球率'];

var statsTypeList = [
					'aces',
					'1st-serve',
					'1st-serve-points-won',
					'2nd-serve-points-won',
					'service-games-won',
					'break-points-saved',
					'1st-serve-return-points-won',
					'2nd-serve-return-points-won',
					'break-points-converted',
					'return-games-won'
					];


var intro = [
			'感谢关注~',
			'你可以：',
			'----',
			'选择功能菜单：',
			'1.球员积分排名',
			'2.赛程',
			'3.数据统计',
			'4.直播时间表',
			'eg. 回复‘1’或‘排名’或‘直播’或‘尤克里里’即可获得相关信息'];

var help = [
				'----',
				'选择功能菜单：',
				'1.球员积分排名',
				'2.赛程',
				'3.数据统计',
				'4.直播时间表',
				'eg. 回复‘1’或‘赛程’或‘数据’即可获得相关信息',
				'----',
				'辅助功能：',
				'内存：查看服务器内存',
				'系统：查看服务器系统',
				'关于：查看关于信息',
				'尤克里里：查看尤克里里',
				'----',
				'note: ',
				'一级菜单可输数字或文字',
				'二级只可以输入数字'];

var tourImg = [
			'http://e.picphotos.baidu.com/album/s%3D550%3Bq%3D90%3Bc%3Dxiangce%2C100%2C100/sign=1f5db20fd262853596e0d224a0d407fb/4ec2d5628535e5dd631c6d2271c6a7efce1b621f.jpg?referer=9dd541f3b63533faaca1a71ecef5&x=.jpg',
            'http://f.picphotos.baidu.com/album/s%3D550%3Bq%3D90%3Bc%3Dxiangce%2C100%2C100/sign=673d149d322ac65c63056676cbc9c32c/e850352ac65c10380ef9063fb5119313b17e894c.jpg?referer=127828af8235e5ddc93b91eff742&x=.jpg'];

var statsImg = [
	'http://c.picphotos.baidu.com/album/s%3D550%3Bq%3D90%3Bc%3Dxiangce%2C100%2C100/sign=d1ab7f178a1001e94a3c140a88350ad1/7dd98d1001e939015358bbc07cec54e737d196f1.jpg?referer=3b330aedda54564ebc72d009d2af&x=.jpg',
	'http://a.picphotos.baidu.com/album/s%3D550%3Bq%3D90%3Bc%3Dxiangce%2C100%2C100/sign=d019c94e62380cd7e21ea2e8917fdc09/cb8065380cd79123f7baa28aaa345982b3b780f1.jpg?referer=fd71fe34a851f3de9aa58d54e0af&x=.jpg',
	'http://h.picphotos.baidu.com/album/s%3D550%3Bq%3D90%3Bc%3Dxiangce%2C100%2C100/sign=397c7a4799510fb37c197792e908b9a8/7a899e510fb30f249d16d8fdcf95d143ac4b03bb.jpg?referer=27a887d6317adab464c72f736d5a&x=.jpg',
	'http://c.picphotos.baidu.com/album/s%3D550%3Bq%3D90%3Bc%3Dxiangce%2C100%2C100/sign=b39834e4c15c1038207ecec7822ae22e/342ac65c10385343a13ab3df9413b07ecb808852.jpg?referer=8faa84fbe2dde711bec577c6e830&x=.jpg',
	'http://c.picphotos.baidu.com/album/s%3D550%3Bq%3D90%3Bc%3Dxiangce%2C100%2C100/sign=c9adada0dac451daf2f60cee86c6235b/ac6eddc451da81cbeba3b6335566d01608243182.jpg?referer=653d43678526cffc303d8b827f81&x=.jpg'];

var liveImg = 'http://e.picphotos.baidu.com/album/s%3D550%3Bq%3D90%3Bc%3Dxiangce%2C100%2C100/sign=1918fa34a851f3dec7b2b961a4d58122/fcfaaf51f3deb48f085a9320f71f3a292df57818.jpg?referer=b44022d192cad1c889acc817b8f6&x=.jpg';

var constant = {
	statsList: statsList,
	statsTypeList: statsTypeList,
	intro: intro,
	help: help,
	tourImg: tourImg,
	statsImg: statsImg,
	liveImg: liveImg
};

module.exports = constant;
