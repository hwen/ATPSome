/**
 * Created by tsq on 14-8-11.
 */
var os = require('os');
var prettySeconds = require('pretty-seconds');
var exec = require('exec');
var _ = require('underscore');
var numeral = require('numeral');

exports.getOsInfo = function(){
    var attr = {
        uptime: prettySeconds(os.uptime()),
        type: os.type(),
        platform: os.platform(),
        arch: os.arch(),
        release: os.release(),
        // hostname: os.hostname(),
        tmp: os.tmpdir()
    };
    return attr;
};
exports.getNetworkInfo = function(){
    return _.extend(os.networkInterfaces(), {hostname : os.hostname()});
};
exports.getCpuInfo = function(){
    var avg = os.loadavg();
    var loadavg = {
        '1': avg[0],
        '5': avg[1],
        '10': avg[2]
    };
    var attr = {
        cpus: os.cpus(),
        loadavg: loadavg
    }
    return attr;
};

exports.getMemInfo = function(){
    var total = os.totalmem(), free = os.freemem(), remainPercent = (free / total)*100 , usePercent = ((total-free)/total)*100;
    var attr = {
        total: total,
        free: free,
        used: total-free,
        usePercent: Number(usePercent).toFixed(2),
        remainPercent: Number(remainPercent).toFixed(2)
    };
    return attr;
};

function getCommand() {
    switch (os.platform().toLowerCase()) {
        case'darwin':
            return 'df -k';
            break;
        case'linux':
        default:
            return 'df';
    };

}

function formatDrive(drive) {
    var map;
    map = {
        used: drive[1] * 1024,
        available: drive[2] * 1024,
        percent: drive[3],
        mounted: drive[4]
    };
    return map;
}

function formatDrives(drives) {
    var map = {}, num = drives.length;
    for(var i=0; i < num; i++)
        map[drives[i].shift()] = formatDrive(drives[i]);
    return map;
}

exports.getHddInfo = function(cb){
    var cmd = getCommand();
    exec(cmd, function(err, out, code) {
        if(err){
            console.log("err", err);
            cb(err);
        }
        var drives = out.split('\n');

        drives.splice(0, 1);
        drives.splice(-1, 1);
        var num = drives.length;
        while(num--)
            drives[num] = drives[num].split(/\s+/g);

        drives = _.reject(drives, function(v) { return v[0].indexOf('tmpfs') !== -1 || v[0] == 'rootfs'});
        var attr = formatDrives(drives);
        var max = 0;
        var key = '';
        _.each(attr, function(value, k){
            if (value.used>max) {
                max = value.used;
                key = k;
            }
        });
        var v = {
            used: parseInt((attr[key].used/1024/1024/1024)),
            free: parseInt((attr[key].available/1024/1024/1024))
        };
        cb(null, v);
    });
};
