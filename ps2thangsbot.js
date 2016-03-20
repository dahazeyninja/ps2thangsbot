var config = require("./config");
var WebSocket = require('ws');
var Twit = require('twit');
var Tbriggs = new Twit({
    consumer_key : config.briggs_ck,
    consumer_secret : config.briggs_cs,
    access_token : config.briggs_at,
    access_token_secret : config.briggs_ats
});
var Tcobalt = new Twit({
    consumer_key : config.cobalt_ck,
    consumer_secret : config.cobalt_cs,
    access_token : config.cobalt_at,
    access_token_secret : config.cobalt_ats
});
var Tconnery = new Twit({
    consumer_key : config.connery_ck,
    consumer_secret : config.connery_cs,
    access_token : config.connery_at,
    access_token_secret : config.connery_ats
});
var Temerald = new Twit({
    consumer_key : config.emerald_ck,
    consumer_secret : config.emerald_cs,
    access_token : config.emerald_at,
    access_token_secret : config.emerald_ats
});
var Tmiller = new Twit({
    consumer_key : config.miller_ck,
    consumer_secret : config.miller_cs,
    access_token : config.miller_at,
    access_token_secret : config.miller_ats
});
var Tceres = new Twit({
    consumer_key : config.ceres_ck,
    consumer_secret : config.ceres_cs,
    access_token : config.ceres_at,
    access_token_secret : config.ceres_ats
});
var Tgenudine = new Twit({
    consumer_key : config.genudine_ck,
    consumer_secret : config.genudine_cs,
    access_token : config.genudine_at,
    access_token_secret : config.genudine_ats
});

var connectpc = function() {
    var ws = new WebSocket('wss://push.planetside2.com/streaming?environment=ps2&service-id=s:' + config.serviceid);
    ws.on('open', function open() {
        ws.send('{"service":"event","action":"subscribe","worlds":["all"],"eventNames":["ContinentLock","ContinentUnlock"]}');
        console.log('Connection to PS2 PC Socket opened');
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
            var newMinutes = (minutes < 10) ? '0' + minutes:minutes;
            var seconds = date.getSeconds();
            var newSeconds = (seconds < 10) ? '0' + seconds:seconds;
            var formattedTime = year + '-' + month + '-' + day + ' ' + hours + ':' + newMinutes + ':' + newSeconds;
            if (world_id == '1') {
                var world_name = 'Connery'
                if (event_name == 'ContinentUnlock') {
                    console.log(zone + ' just unlocked on ' + world_name + '! - ' + formattedTime);
                    Tconnery.post('statuses/update', { status: zone + ' just unlocked on ' + world_name + '! - ' + formattedTime}, function(err, data, response) {
                        if(err){
                            console.log(err);
                        }
                    });
                } else if (event_name == 'ContinentLock') {
                    console.log(trig_faction + ' just locked ' + zone + ' on ' + world_name + '! - ' + formattedTime);
                    Tconnery.post('statuses/update', { status: trig_faction + ' just locked ' + zone + ' on ' + world_name + '! - ' + formattedTime }, function(err, data, response) {
                        if(err){
                            console.log(err);
                        }
                    });
                }
            } else if (world_id == '10') {
                var world_name = 'Miller';
                if (event_name == 'ContinentUnlock') {
                    console.log(zone + ' just unlocked on ' + world_name + '! - ' + formattedTime);
                    Tmiller.post('statuses/update', { status: zone + ' just unlocked on ' + world_name + '! - ' + formattedTime}, function(err, data, response) {
                        if(err){
                            console.log(err);
                        }
                    });
                } else if (event_name == 'ContinentLock') {
                    console.log(trig_faction + ' just locked ' + zone + ' on ' + world_name + '! - ' + formattedTime);
                    Tmiller.post('statuses/update', { status: trig_faction + ' just locked ' + zone + ' on ' + world_name + '! - ' + formattedTime }, function(err, data, response) {
                        if(err){
                            console.log(err);
                        }
                    });
                }
            } else if (world_id == '13') {
                var world_name = 'Cobalt';
                if (event_name == 'ContinentUnlock') {
                    console.log(zone + ' just unlocked on ' + world_name + '! - ' + formattedTime);
                    Tcobalt.post('statuses/update', { status: zone + ' just unlocked on ' + world_name + '! - ' + formattedTime}, function(err, data, response) {
                        if(err){
                            console.log(err);
                        }
                    });
                } else if (event_name == 'ContinentLock') {
                    console.log(trig_faction + ' just locked ' + zone + ' on ' + world_name + '! - ' + formattedTime);
                    Tcobalt.post('statuses/update', { status: trig_faction + ' just locked ' + zone + ' on ' + world_name + '! - ' + formattedTime }, function(err, data, response) {
                        if(err){
                            console.log(err);
                        }
                    });
                }
            } else if (world_id == '17') {
                var world_name = 'Emerald';
                if (event_name == 'ContinentUnlock') {
                    console.log(zone + ' just unlocked on ' + world_name + '! - ' + formattedTime);
                    Temerald.post('statuses/update', { status: zone + ' just unlocked on ' + world_name + '! - ' + formattedTime}, function(err, data, response) {
                        if(err){
                            console.log(err);
                        }
                    });
                } else if (event_name == 'ContinentLock') {
                    console.log(trig_faction + ' just locked ' + zone + ' on ' + world_name + '! - ' + formattedTime);
                    Temerald.post('statuses/update', { status: trig_faction + ' just locked ' + zone + ' on ' + world_name + '! - ' + formattedTime }, function(err, data, response) {
                        if(err){
                            console.log(err);
                        }
                    });
                }
            } else if (world_id == '25') {
                var world_name = 'Briggs';
                if (event_name == 'ContinentUnlock') {
                    console.log(zone + ' just unlocked on ' + world_name + '! - ' + formattedTime);
                    Tbriggs.post('statuses/update', { status: zone + ' just unlocked on ' + world_name + '! - ' + formattedTime}, function(err, data, response) {
                        if(err){
                            console.log(err);
                        }
                    });
                } else if (event_name == 'ContinentLock') {
                    console.log(trig_faction + ' just locked ' + zone + ' on ' + world_name + '! - ' + formattedTime);
                    Tbriggs.post('statuses/update', { status: trig_faction + ' just locked ' + zone + ' on ' + world_name + '! - ' + formattedTime }, function(err, data, response) {
                        if(err){
                            console.log(err);
                        }
                    });
                } else {
                    return;
                }
            }
        }
    });
    ws.on('error', function error(){
        console.log('error')
    });
    ws.on('close', function close() {
        console.log('Connection to PS2 PC Socket closed.');
        setTimeout(connectpc, 10000);
    });
};

var connectps4us = function() {
    var ws = new WebSocket('wss://push.planetside2.com/streaming?environment=ps2ps4us&service-id=s:' + config.serviceid);
    ws.on('open', function open() {
        ws.send('{"service":"event","action":"subscribe","worlds":["all"],"eventNames":["ContinentLock","ContinentUnlock"]}');
        console.log('Connection to PS2 PS4 US Socket opened');
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
            var newMinutes = (minutes < 10) ? '0' + minutes:minutes;
            var seconds = date.getSeconds();
            var newSeconds = (seconds < 10) ? '0' + seconds:seconds;
            var formattedTime = year + '-' + month + '-' + day + ' ' + hours + ':' + newMinutes + ':' + newSeconds;
            if (world_id == '1000') {
                var world_name = 'Genudine'
                if (event_name == 'ContinentUnlock') {
                    console.log(zone + ' just unlocked on ' + world_name + '! - ' + formattedTime);
                    Tgenudine.post('statuses/update', { status: zone + ' just unlocked on ' + world_name + '! - ' + formattedTime}, function(err, data, response) {
                        if(err){
                            console.log(err);
                        }
                    });
                } else if (event_name == 'ContinentLock') {
                    console.log(trig_faction + ' just locked ' + zone + ' on ' + world_name + '! - ' + formattedTime);
                    Tgenudine.post('statuses/update', { status: trig_faction + ' just locked ' + zone + ' on ' + world_name + '! - ' + formattedTime }, function(err, data, response) {
                        if(err){
                            console.log(err);
                        }
                    });
                }
            } else {
                    return;
                }
            }
        }
    );
    ws.on('error', function error(){
        console.log('error')
    });
    ws.on('close', function close() {
        console.log('Connection to PS2 PS4 US Socket closed.');
        setTimeout(connectps4us, 10000);
    });
};

var connectps4eu = function() {
    var ws = new WebSocket('wss://push.planetside2.com/streaming?environment=ps2ps4eu&service-id=s:' + config.serviceid);
    ws.on('open', function open() {
        ws.send('{"service":"event","action":"subscribe","worlds":["all"],"eventNames":["ContinentLock","ContinentUnlock"]}');
        console.log('Connection to PS2 PS4 EU Socket opened');
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
            var newMinutes = (minutes < 10) ? '0' + minutes:minutes;
            var seconds = date.getSeconds();
            var newSeconds = (seconds < 10) ? '0' + seconds:seconds;
            var formattedTime = year + '-' + month + '-' + day + ' ' + hours + ':' + newMinutes + ':' + newSeconds;
            if (world_id == '2000') {
                var world_name = 'Ceres'
                if (event_name == 'ContinentUnlock') {
                    console.log(zone + ' just unlocked on ' + world_name + '! - ' + formattedTime);
                    Tceres.post('statuses/update', { status: zone + ' just unlocked on ' + world_name + '! - ' + formattedTime}, function(err, data, response) {
                        if(err){
                            console.log(err);
                        }
                    });
                } else if (event_name == 'ContinentLock') {
                    console.log(trig_faction + ' just locked ' + zone + ' on ' + world_name + '! - ' + formattedTime);
                    Tceres.post('statuses/update', { status: trig_faction + ' just locked ' + zone + ' on ' + world_name + '! - ' + formattedTime }, function(err, data, response) {
                        if(err){
                            console.log(err);
                        }
                    });
                }
            } else {
                    return;
                }
            }
        }
    );
    ws.on('error', function error(){
        console.log('error')
    });
    ws.on('close', function close() {
        console.log('Connection to PS2 PS4 EU Socket closed.');
        setTimeout(connectps4eu, 10000);
    });
};

connectpc();
connectps4us();
connectps4eu();
