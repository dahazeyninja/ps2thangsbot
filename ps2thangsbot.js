var config = require("./config");
var WebSocket = require('ws');
var ws = new WebSocket('wss://push.planetside2.com/streaming?environment=ps2&service-id=s:' + config.serviceid);
var Twit = require('twit');
var T = new Twit({
    consumer_key : config.consumer_key,
    consumer_secret : config.consumer_secret,
    access_token : config.access_token,
    access_token_secret : config.access_token_secret
});

ws.on('open', function open() {
    ws.send('{"service":"event","action":"subscribe","worlds":["all"],"eventNames":["ContinentLock","ContinentUnlock"]}');
    //ws.send('{"service":"event","action":"help"}');
});

ws.on('message', function(data, flags) {
    var message = JSON.parse(data);
    if (typeof message.payload != 'undefined') {
        //console.log(message.payload)
        var event_name = message.payload.event_name;
        var world_id = message.payload.world_id;
        var zone_id = message.payload.zone_id;
        var trig_faction_id = message.payload.triggering_faction;
        if (zone_id == '2'){
            var zone = 'Indar';
        } else if (zone_id == '4'){
            var zone = 'Hossin';
        } else if (zone_id == '6'){
            var zone = 'Amerish';
        } else if (zone_id == '8'){
            var zone = 'Esamir';
        } else {
            return;
        }
        if (world_id == '1') {
            var world_name = 'Connery';
        } else if (world_id == '10') {
            var world_name = 'Miller';
        } else if (world_id == '13') {
            var world_name = 'Cobalt';
        } else if (world_id == '17') {
            var world_name = 'Emerald';
        } else if (world_id == '19') {
            var world_name = 'Jaeger';
        } else if (world_id == '25') {
            var world_name = 'Briggs';
        }
        if (trig_faction_id == '1') {
            var trig_faction = 'VS';
        } else if (trig_faction_id == '2') {
            var trig_faction = 'NC';
        } else if (trig_faction_id == '3') {
            var trig_faction = 'TR';
        }
        var unix_timestamp = message.payload.timestamp;
        var date = new Date(unix_timestamp*1000);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var formattedTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
        if (event_name == 'ContinentUnlock') {
            console.log(zone + ' just unlocked on ' + world_name + '! - ' + formattedTime);
            T.post('statuses/update', { status: zone + ' just unlocked on ' + world_name + '! - ' + formattedTime}, function(err, data, response) {
                if(err){
                    console.log(err);
                }
            });
        } else if (event_name == 'ContinentLock') {
            console.log(trig_faction + ' just locked ' + zone + ' on ' + world_name + '! - ' + formattedTime);
            T.post('statuses/update', { status: trig_faction + ' just locked ' + zone + ' on ' + world_name + '! - ' + formattedTime }, function(err, data, response) {
                if(err){
                    console.log(err);
                }
            });
        }
    }
});
