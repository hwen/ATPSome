var wechat = require('wechat');
var atp = require('./../atp/atpdata');
var config = require('./../../config');
var constant = require('./constant');
var os = require('./../os/');


var List = require('wechat').List;
List.add('stats', setStatsList() );
List.add('tour', setTourList() );

var handler = wechat(config.wechat, wechat.text(wechatText)
        .event(wechatEvent));

module.exports = handler;


function setStatsList() {
    var statsList = [];

    constant.statsList.forEach(function(item) {
        statsList.push([item, statsReply]);
    });

    return statsList;
}

function statsReply(message, req, res) {
    var input = (message.Content || '').trim();
    var url = config.domain + '/#!/stats/';

    var numReg = /[0-9]*/;
    var num = +numReg.exec(input)[0];

    if (num<1||num>10) {
        res.reply('请输入数字1-10');
    } else {

        res.reply([{
            title : constant.statsList[num-1].split('.')[1],
            description: '2016',
            picurl: constant.statsImg[num%5],
            url: url + constant.statsTypeList[num-1]
        }]);

    }
}

function setTourList() {
    var tour = ['{1}.进行中', '{2}.本月比赛', '{3}.年度赛程'];
    var tourList = [];

    tour.forEach(function(item) {
        tourList.push([item, tourReply]);
    });

    return tourList;
}

function tourReply(message, req, res) {
    var input = (message.Content || '').trim();
    var numReg = /[0-9]*/;
    var num = +numReg.exec(input)[0];
    var url = config.domain + '/#!/tournaments/';

    var tourList = ['recent', 'month', 'year'];
    var tourName = ['今日赛事', '本月赛事', '本年赛程'];

    if (num<1||num>3) {
        res.reply('请输入数字1-3');
    } else {
        res.reply([{
            title : tourName[num-1],
            description: tourName[num-1],
            picurl: constant.tourImg[num%2],
            url: url + tourList[num-1]
        }]);
    }
}


function wechatEvent(event, req, res, next) {
    console.log("event\n", event);

    switch (event.Event) {
        case 'subscribe':
            res.reply(constant.intro.join('\n'));
            break;
        case 'unsubscribe':
            res.reply('88~');
            break;
        case 'scan':
            res.reply(constant.intro.join('\n'));
        default :
            res.send('');
	}
}

function wechatText(message, req, res, next) {
    var input = (message.Content || '').trim();

    var numReg = /[0-9]*/;
    var num = numReg.exec(input)[0];

    if (num>0&&num<5) {
    	switch (num) {
    		case '1':
			    res.reply([{
			    	title : '积分排名',
			    	description: '本周积分排名',
			    	picurl: 'http://b.picphotos.baidu.com/album/s%3D550%3Bq%3D90%3Bc%3Dxiangce%2C100%2C100/sign=65026cee90dda144de096cb7828ca19f/902397dda144ad3430574f7ad7a20cf430ad8567.jpg?referer=9a0b49428b5494eede353b29e33d&x=.jpg',
			    	url: config.domain + '/#!/rank'
			    }]);
    			break;
    		case '2':
    			res.wait('tour');
    			break;
    		case '3':
    			res.wait('stats');
    			break;
            case '4':
                res.reply([{
                    title : '直播时间表',
                    description: '今明两天直播时间表',
                    picurl: constant.liveImg,
                    url: config.domain + '/#!/schedule'
                }]);
              break;
    		default:
    			res.reply('请输入数字1-4');
    	}
    } else {

        switch (input) {
            case '积分':
            case '排名':
            case '球员积分排名':
            case '积分排名':
                res.reply([{
                    title : '积分排名',
                    description: '本周积分排名',
                    picurl: 'http://b.picphotos.baidu.com/album/s%3D550%3Bq%3D90%3Bc%3Dxiangce%2C100%2C100/sign=65026cee90dda144de096cb7828ca19f/902397dda144ad3430574f7ad7a20cf430ad8567.jpg?referer=9a0b49428b5494eede353b29e33d&x=.jpg',
        			url: config.domain + '/#!/rank'
                }]);
                break;
            case '赛程':
            case '比赛':
            case '赛事':
                res.wait('tour');
                break;
            case '数据':
            case '数据统计':
            case '统计':
                res.wait('stats');
                break;
            case 'help':
            case '帮助':
                res.reply(constant.help.join('\n'));
                break;
            case '时间表':
            case '直播':
            case '比赛时间':
            case '直播时间表':
                res.reply([{
                    title : '直播时间表',
                    description: '今明两天直播时间表',
                    picurl: constant.liveImg,
                    url: config.domain + '/#!/schedule'
                }]);
                break;
            case '内存':
            case 'memory':
                var attr = os.getMemInfo();
                var content = '总内存:' + Math.floor(attr.total/(1024*1024*1024)) + 'GB' + '\r\n'
                    + '剩余内存:' + Math.floor(attr.free/(1024*1024*1024)) + 'GB' + '\r\n' + '使用率:' + attr.usePercent + '%';
                res.reply({
                  content: content,
                  type: 'text'
                });
                break;
            case '系统':
            case 'system':
                var attr = os.getOsInfo();
                var content = 'type:' + attr.type + '\r\n' + 'platform:' + attr.platform + '\r\n' + 'arch:' + attr.arch + '\r\n'
                  + 'release:' + attr.release;
                res.reply({
                  content: content,
                  type: 'text'
                });
                break;
            case '关于':
            case 'about':
                res.reply([{
                    title : '关于',
                    description: '',
                    picurl: 'http://g.picphotos.baidu.com/album/s%3D550%3Bq%3D90%3Bc%3Dxiangce%2C100%2C100/sign=bfc748c669061d957946373d4bcf7bec/4d086e061d950a7b14ce7f3a0dd162d9f3d3c950.jpg?referer=a8cf6fadf1246b6022198644374e&x=.jpg',
                    url: config.domain + '/#!/about'
                }]);
                break;
            case '尤克里里':
                res.reply([{
                    title : '尤克里里',
                    description: '',
                    picurl: 'http://g.picphotos.baidu.com/album/s%3D550%3Bq%3D90%3Bc%3Dxiangce%2C100%2C100/sign=bfc748c669061d957946373d4bcf7bec/4d086e061d950a7b14ce7f3a0dd162d9f3d3c950.jpg?referer=a8cf6fadf1246b6022198644374e&x=.jpg',
                    url: config.domain + '/#!/ukulele'
                }]);
                break;
            default:
                res.reply('╮(╯_╰)╭ 理解不能\n\n输入‘帮助’试试');
        }


    }
}



