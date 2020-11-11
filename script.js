var rares =
[
    {
        id: 174065,
        name: "Blood Queen Lana'thel",
        coords: "49,7, 32,7",
    },
    {
        id: 174064,
        name: "Professor Putricide",
        coords: "57,1, 30,3",
    },
    {
        id: 174063,
        name: "Lady Deathwhisper",
        coords: "51,1, 78,5",
    },
    {
        id: 174062,
        name: "Skadi the Ruthless",
        coords: "57,8, 56,1",
    },
    {
        id: 174061,
        name: "Ingvar the Plunderer",
        coords: "52,4, 52,6",
    },
    {
        id: 174060,
        name: "Prince Keleseth",
        coords: "54,0, 44,7",
    },
    {
        id: 174059,
        name: "The Black Knight",
        coords: "64,8, 22,1",
    },
    {
        id: 174058,
        name: "Bronjahm",
        coords: "70,7, 38,4",
        drop:
        {
            id: 183634,
            name: "Papa's Mint Condition Bag",
        },
    },
    {
        id: 1740657,
        name: "Scourgelord Tyrannus",
        coords: "47,2, 66,1",
    },
    {
        id: 174056,
        name: "Forgemaster Garfrost",
        coords: "58,6, 72,5",
    },
    {
        id: 174055,
        name: "Marwyn",
        coords: "58,2, 83,4",
    },
    {
        id: 174054,
        name: "Falric",
        coords: "50,2, 87,9",
    },
    {
        id: 174053,
        name: "The Prophet Tharon'ja",
        coords: "80,1, 61,2",
    },
    {
        id: 174052,
        name: "Novos the Summoner",
        coords: "77,8, 66,1",
    },
    {
        id: 174051,
        name: "Trollgore",
        coords: "58,3, 39,4",
    },
    {
        id: 174050,
        name: "Krik'thir the Gatewatcher",
        coords: "67,5, 58,0",
    },
    {
        id: 174049,
        name: "Prince Taldaram",
        coords: "29,6, 62,2",
    },
    {
        id: 174048,
        name: "Elder Nadox",
        coords: "44,2, 49,1",
    },
    {
        id: 174067,
        name: "Noth the Plaguebringer",
        coords: "31,6, 70,5",
    },
    {
        id: 174066,
        name: "Patchwerk",
        coords: "36,5, 67,4",
    },
];

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

        var str = minutes.toString().padStart(2, "0") + "m" + seconds.toString().padStart(2, "0") + "s";

        if (hours > 0)
        {
            str = hours + "h" + str;
        }

        return str;
    }
}

function calculateTimeLeft()
{
    var isFuture = false;

    $("#table-rares .item").removeClass("top-border");

    $("#table-rares .item").each(function()
    {
        var $timeLeft = $(this).find(".time-left");
        
        var ts = parseInt($timeLeft.attr("data-ts"));
        var str = getTimeLeftString(ts);

        if (str)
        {
            if (!isFuture)
            {
                isFuture = true;
                $(this).addClass("top-border");
            }

            $timeLeft.text(str);
            $(this).css("opacity", 1);
        }
        else
        {
            $timeLeft.text("00m00s");
            $(this).css("opacity", 0.4);
        }
    });
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
    var nextRares = getNextRares(rares[rareIndex].id, showNum);

    console.log(lastKilledRareId, nextRares);

    $("#table-rares tr.item").remove();

    for (var i = 0; i < nextRares.length; i++)
    {
        dt.add(20, "minutes");

        var nextRare = nextRares[i];

        var $item = $($("#template-item").html());

        $item.attr("data-id", nextRare.id);
        $item.find(".spawn-at").text(dt.format("HH:mm"));
        $item.find(".time-left").attr("data-ts", dt.unix());
        $item.find(".rare-name").attr("data-name", nextRare.name)
            .html("<a href=\"" + getWowheadUrl("npc", nextRare.id) + "\" target=\"_blank\">" + nextRare.name + "</a>");
        $item.find(".coords span").text(nextRare.coords);

        if (nextRare.drop)
        {
            $item.find(".drop").attr("data-name", nextRare.drop.name)
                .html("<a href=\"" + getWowheadUrl("item", nextRare.drop.id) + "\" target=\"_blank\">" + nextRare.drop.name + "</a>");
        }
        
        $("#table-rares").append($item);
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

    var name = $item.find(".rare-name").attr("data-name");
    var coords = $item.find(".coords span").text();

    var str = "/way " + coords + " " + name;
    navigator.clipboard.writeText(str);
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

    setup();

    setInterval(calculateTimeLeft, 1000);
});