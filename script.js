var rares =
[
    {
        id: 174065,
        name: "Blood Queen Lana'thel",
        coords: "49,7, 32,7",
        items: [183646, 183648, 183647],
    },
    {
        id: 174064,
        name: "Professor Putricide",
        coords: "57,1, 30,3",
        items: [183649, 183651, 183650],
    },
    {
        id: 174063,
        name: "Lady Deathwhisper",
        coords: "51,1, 78,5",
        items: [183641, 183653, 183655],
    },
    {
        id: 174062,
        name: "Skadi the Ruthless",
        coords: "57,8, 56,1",
        items: [183670, 183656, 183657],
        drop:
        {
            id: 44151,
            name: "Reins of the Blue Proto-Drake",
        },
        bgColor: "#abfffc",
    },
    {
        id: 174061,
        name: "Ingvar the Plunderer",
        coords: "52,4, 52,6",
        items: [183668, 183659, 183658],
    },
    {
        id: 174060,
        name: "Prince Keleseth",
        coords: "54,0, 44,7",
        items: [183680, 183661, 183678],
    },
    {
        id: 174059,
        name: "The Black Knight",
        coords: "64,8, 22,1",
        items: [183638, 183637, 183636],
    },
    {
        id: 174058,
        name: "Bronjahm",
        coords: "70,7, 38,4",
        items: [183675, 183639, 183635],
        drop:
        {
            id: 183634,
            name: "Papa's Mint Condition Bag",
        },
        bgColor: "#f6d6ff",
    },
    {
        id: 174057,
        name: "Scourgelord Tyrannus",
        coords: "47,2, 66,1",
        items: [183674, 183633, 183632],
    },
    {
        id: 174056,
        name: "Forgemaster Garfrost",
        coords: "58,6, 72,5",
        items: [183666, 183631, 183630],
    },
    {
        id: 174055,
        name: "Marwyn",
        coords: "58,2, 83,4",
        items: [183687, 183663, 183662],
    },
    {
        id: 174054,
        name: "Falric",
        coords: "50,2, 87,9",
        items: [183664, 183665, 183666],
    },
    {
        id: 174053,
        name: "The Prophet Tharon'ja",
        coords: "80,1, 61,2",
        items: [183686, 183685, 183684],
    },
    {
        id: 174052,
        name: "Novos the Summoner",
        coords: "77,8, 66,1",
        items: [183671, 183672, 183627],
    },
    {
        id: 174051,
        name: "Trollgore",
        coords: "58,3, 39,4",
        items: [183669, 183626, 183640],
    },
    {
        id: 174050,
        name: "Krik'thir the Gatewatcher",
        coords: "67,5, 58,0",
        items: [183682, 183683, 183681],
    },
    {
        id: 174049,
        name: "Prince Taldaram",
        coords: "29,6, 62,2",
        items: [183625, 183679, 183677],
    },
    {
        id: 174048,
        name: "Elder Nadox",
        coords: "44,2, 49,1",
        items: [183673, 183641, 183624],
    },
    {
        id: 174067,
        name: "Noth the Plaguebringer",
        coords: "31,6, 70,5",
        items: [183642, 183676, 183654],
    },
    {
        id: 174066,
        name: "Patchwerk",
        coords: "36,5, 67,4",
        items: [183645, 183644, 183643],
    },
];

var syncEu = { id: 174059, dt: "2020-11-16T20:20:00Z" };
var syncNa = { id: 174067, dt: "2020-11-16T20:20:00Z" };
var spawnIntervalMinutes = 10;

if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength, padString) {
        targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
        padString = String(typeof padString !== 'undefined' ? padString : ' ');
        if (this.length > targetLength) {
            return String(this);
        } else {
            targetLength = targetLength - this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0, targetLength) + String(this);
        }
    };
}

function playSound(name)
{
    var snd = new Audio(getSoundPath(name));
    snd.play();
}

function getSoundPath(name)
{
    return "sound/" + name + ".mp3";
}

function getRareIndex(id)
{
    for (var i = 0; i < rares.length; i++)
    {
        if (rares[i].id === id)
        {
            return i;
        }
    }
    throw new Error("Invalid rare by id: " + id);
}

function getNextRareIndex(id)
{
    var index = getRareIndex(id) + 1;
    return index > rares.length - 1 ? 0 : index;
}

function getNextRares(firstId, num)
{
    var res = [];
    var index = getRareIndex(firstId);

    for (var i = 0; i < num; i++)
    {
        res.push(rares[index]);

        index++;

        if (index > rares.length - 1)
        {
            index = 0;
        }
    }

    return res;
}

function getWowheadUrl(type, id)
{
    return "https://www.wowhead.com/" + type + "=" + id;
}

function getTimeLeftString(ts)
{
    var nowTs = moment().unix();
    var diff = ts - nowTs;

    if (diff < 0)
    {
        return null;
    }
    else
    {
        var hours = Math.floor(diff / 3600);
        var minutes = Math.floor(diff / 60) % 60;
        var seconds = diff % 60;

        var str = "";

        if (hours > 0)
        {
            str += hours + "h";
        }

        if (minutes > 0)
        {
            if (hours > 0)
            {
                str += minutes.toString().padStart(2, "0") + "m";
            }
            else
            {
                str += minutes + "m";
            }
        }

        if (hours > 0 || minutes > 0)
        {
            str += seconds.toString().padStart(2, "0") + "s";
        }
        else
        {
            str += seconds + "s";
        }

        return str;
    }
}

function calculateTimeLeft()
{
    var isFuture = false;

    $("#table-rares .item").removeClass("highlight");

    $("#table-rares .item").each(function()
    {
        var $timeLeft = $(this).find(".time-left");
        
        var ts = parseInt($timeLeft.attr("data-ts"));
        var name = $(this).find(".rare-name").attr("data-name");
        var str = getTimeLeftString(ts);

        if (str)
        {
            if (!isFuture)
            {
                isFuture = true;
                $(this).addClass("highlight");
            }

            $timeLeft.text(str);
            $(this).css("opacity", 1);
        }
        else
        {
            $timeLeft.text("SPAWNED");
            $(this).css("opacity", 0.4);

            var spawned = $(this).attr("data-spawned");
            if (spawned === "0")
            {
                if ($(this).find(".check-sound").prop("checked"))
                {
                    playSound(name);
                }
                
                $(this).attr("data-spawned", "1");
            }
        }
    });
}

function detectRegion()
{
    var tz = -(new Date()).getTimezoneOffset() / 60;

    var naTz = [13, 14, -11, -10, -9, -8, -7, -6, -5, -4];
    var euTz = [-1, 0, 1, 2, 3, 4, 5];

    if (naTz.indexOf(tz) >= 0)
    {
        return "na";
    }
    else if (euTz.indexOf(tz) >= 0)
    {
        return "eu";
    }
    else
    {
        return null;
    }
}

function getClassColumnCache(addItem)
{
    var cache = localStorage.getItem("classCache");
    if (cache)
    {
        cache = JSON.parse(cache);
    }
    else
    {
        cache = {};
    }

    if (addItem)
    {
        cache[addItem.id] = addItem.class;
    }

    return cache;
}

function getSoundColumnCache(addItem)
{
    var cache = localStorage.getItem("soundCache");
    if (cache)
    {
        cache = JSON.parse(cache);
    }
    else
    {
        cache = {};
    }

    if (addItem)
    {
        cache[addItem.id] = addItem.enabled ? "1" : "0";
    }

    return cache;
}

function showClassColumn(enabled)
{
    localStorage.setItem("showClassColumn", enabled ? "1" : "0");

    if (enabled)
    {
        var cache = getClassColumnCache(null);

        $(".item").each(function()
        {
            var rareId = parseInt($(this).attr("data-id"));
            var className = cache[rareId] || null;

            $(this).find(".select-class").attr("class", "select-class").val(className ? className : "");

            if (className)
            {
                $(this).find(".select-class").addClass("bold bg-" + className);
            }
        });
    }

    var f = enabled ? "removeClass" : "addClass";
    $("#table-rares .class-header")[f]("hide");
    $("#table-rares .class")[f]("hide");
}

function showSoundColumn(enabled)
{
    localStorage.setItem("showSoundColumn", enabled ? "1" : "0");

    if (enabled)
    {
        var cache = getSoundColumnCache(null);

        $(".item").each(function()
        {
            var rareId = parseInt($(this).attr("data-id"));
            var soundEnabled = cache[rareId] || null;

            $(this).find(".check-sound").prop("checked", soundEnabled === "1");
        });

        var enabledCount = 0;
        var totalCount = 0;
    
        $(".check-sound").each(function()
        {
            totalCount++;
    
            if ($(this).prop("checked"))
            {
                enabledCount++;
            }
        });
    
        $("#check-sound-all").prop("checked", enabledCount === totalCount);
    }
    
    var f = enabled ? "removeClass" : "addClass";
    $("#table-rares .sound-header")[f]("hide");
    $("#table-rares .sound")[f]("hide");
}

function setup()
{
    var lastKilledRareId = parseInt($("#select-last-rare").val());
    var lastKilledAt = $("#input-last-at").val();
    var showNum = parseInt($("#input-show-num").val());

    if (!lastKilledRareId || !lastKilledAt || !showNum)
    {
        return;
    }

    if (showNum > 50)
    {
        showNum = 50;
    }

    lastKilledAt = moment(lastKilledAt, "HH:mm");

    if (!lastKilledAt.isValid())
    {
        return;
    }

    var rareIndex = getNextRareIndex(lastKilledRareId);

    var dt = lastKilledAt.clone();
    var now = moment();
    var nextRares = getNextRares(rares[rareIndex].id, showNum);

    $("#table-rares tr.item").remove();

    for (var i = 0; i < nextRares.length; i++)
    {
        dt.add(spawnIntervalMinutes, "minutes");

        var nextRare = nextRares[i];
        var alreadySpawned = now.unix() >= dt.unix();

        var $item = $($("#template-item").html());

        $item.attr("data-id", nextRare.id).attr("data-spawned", alreadySpawned ? "1" : "0");
        $item.find(".spawn-at").text(dt.format("HH:mm"));
        $item.find(".time-left").attr("data-ts", dt.unix());
        $item.find(".rare-name").attr("data-name", nextRare.name)
            .html("<a href=\"" + getWowheadUrl("npc", nextRare.id) + "\" target=\"_blank\">" + nextRare.name + "</a>");
        $item.find(".coords span").text(nextRare.coords);

        var dropHtml = "";

        if (nextRare.drop)
        {
            dropHtml += dropHtml = "<a href=\"" + getWowheadUrl("item", nextRare.drop.id) + "\" target=\"_blank\">" + nextRare.drop.name + "</a>";
        }

        if (nextRare.items)
        {
            if (nextRare.drop)
            {
                dropHtml += "<br>";
            }

            for (var j = 0; j < nextRare.items.length; j++)
            {
                var itemId = nextRare.items[j];
                dropHtml += "<a href=\"" + getWowheadUrl("item", itemId) + "\" target=\"_blank\">i" + itemId + "</a> ";
            }
        }

        if (dropHtml != "")
        {
            $item.find(".drop").html(dropHtml);
        }

        if (nextRare.bgColor)
        {
            $item.css("background-color", nextRare.bgColor);
        }
        
        $("#table-rares").append($item);
    }

    $("#check-show-class").prop("checked", localStorage.getItem("showClassColumn") === "1").trigger("change");
    $("#check-show-sound").prop("checked", localStorage.getItem("showSoundColumn") === "1").trigger("change");

    try
    {
        $WowheadPower.init();
    }
    catch (err)
    {
        console.log("err:", err);
    }
}

$(document).on("change", "#select-last-rare", function(e)
{
    setup();
});

$(document).on("input", "#input-last-at, #input-show-num", function(e)
{
    setup();
});

$(document).on("click", ".link-copy-coords", function(e)
{
    e.preventDefault();

    var $item = $(this).parent().parent();

    // /run C_Map.SetUserWaypoint(UiMapPoint.CreateFromCoordinates(118,x/100,y/100))

    var coords = $item.find(".coords span").text().split(", ");
    var x = coords[0].replace(",", ".");
    var y = coords[1].replace(",", ".");
    
    var str = "/run C_Map.SetUserWaypoint(UiMapPoint.CreateFromCoordinates(118," + x + "/100," + y + "/100))";

    navigator.clipboard.writeText(str);
});

$(document).on("click", "#btn-sync-eu, #btn-sync-na", function(e)
{
    var btnId = $(this).attr("id");
    var data;

    if (btnId === "btn-sync-eu")
    {
        data = syncEu;
    }
    else if (btnId === "btn-sync-na")
    {
        data = syncNa;
    }
    else
    {
        throw new Error("Invalid button id: " + btnId);
    }
    var dt = moment(data.dt).add(spawnIntervalMinutes, "minutes");
    var now = moment();

    var index = getRareIndex(data.id);
    var rare = rares[index];

    while (dt.unix() < now.unix())
    {
        dt.add(spawnIntervalMinutes, "minutes");
        index = getNextRareIndex(rare.id);
        rare = rares[index];
    }

    dt.subtract(spawnIntervalMinutes, "minutes");

    $("#select-last-rare").val(rare.id);
    $("#input-last-at").val(dt.format("HH:mm"));

    setup();
});

$(document).on("click", "#link-help", function(e)
{
    e.preventDefault();

    $("#help-section")[0].scrollIntoView();
});

$(document).on("change", "#check-show-class", function(e)
{
    var checked = $(this).prop("checked");
    showClassColumn(checked);
});

$(document).on("change", "#check-show-sound", function(e)
{
    var checked = $(this).prop("checked");
    showSoundColumn(checked);
});

$(document).on("change", "#check-sound-all", function(e)
{
    var checked = $(this).prop("checked");
    
    $(".check-sound").each(function()
    {
        $(this).prop("checked", checked).trigger("change");
    });
});

$(document).on("change", ".check-sound", function(e)
{
    var soundEnabled = $(this).prop("checked");
    var $item = $(this).parent().parent();
    var rareId = parseInt($item.attr("data-id"));

    var cache = getSoundColumnCache({ id: rareId, enabled: soundEnabled });
    localStorage.setItem("soundCache", JSON.stringify(cache));

    var enabledCount = 0;
    var totalCount = 0;

    $(".check-sound").each(function()
    {
        totalCount++;

        if ($(this).prop("checked"))
        {
            enabledCount++;
        }
    });

    $("#check-sound-all").prop("checked", enabledCount === totalCount);
});

$(document).on("change", ".select-class", function(e)
{
    var className = $(this).val();
    var $item = $(this).parent().parent();
    var rareId = parseInt($item.attr("data-id"));

    $(this).attr("class", "select-class");

    if (className)
    {
        $(this).addClass("bold bg-" + className);
    }

    var cache = getClassColumnCache({ id: rareId, class: className });
    localStorage.setItem("classCache", JSON.stringify(cache));
});

$(document).ready(function()
{
    // Populate last killed rare
    for (var i = 0; i < rares.length; i++)
    {
        var rare = rares[i];

        var $opt = $("<option></option>").text(rare.name).val(rare.id);
        $("#select-last-rare").append($opt);
    }

    var now = moment();
    var modMins = now.minutes() % 20;
    now.subtract(modMins, "minutes");

    $("#input-last-at").val(now.format("HH:mm"));

    setInterval(calculateTimeLeft, 1000);

    var region = detectRegion();
    if (region)
    {
        $("#btn-sync-" + region).trigger("click");
        console.log("autosync:", region);
    }
    else
    {
        setup();
    }
});