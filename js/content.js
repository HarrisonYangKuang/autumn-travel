/* 秋天的旅行 · 黑龙江 → 西安 → 台湾 → 香港 */
(function () {
  "use strict";
  const slides = [
  {
    "n": 1,
    "id": "cover",
    "type": "cover",
    "chapter": "序",
    "title": "秋天的旅行",
    "lines": [
      "同一个秋天，",
      "四种不同的风景。"
    ],
    "imageKey": "heilongjiang-chapter",
    "alt": "大兴安岭的林海与河湾，落日把落叶松照成金色。"
  },
  {
    "n": 2,
    "id": "thesis",
    "type": "thesis",
    "chapter": "序",
    "title": "秋天是一种速度",
    "body": "从北方的林海，到西安的城墙，再到台湾的茶山与香港的海港。秋天在不同地方，走出不同的节奏。",
    "lines": [
      "黑龙江",
      "西安",
      "台湾",
      "香港"
    ],
    "imageKeys": [
      "birch-autumn",
      "xian-ginkgo",
      "taiwan-silver-grass",
      "hong-kong-harbour"
    ],
    "alt": [
      "白色树干与金黄叶片交织的白桦秋色示意。",
      "城墙边的银杏，叶子黄到透光。",
      "台湾山脊上成片泛白的芒花。",
      "香港维多利亚港的日落，远处是大屿山。"
    ]
  },
  {
    "n": 3,
    "id": "guess-order",
    "type": "guess",
    "chapter": "序",
    "title": "这三个地方，谁先入秋？",
    "imageKey": "heilongjiang-late-autumn",
    "alt": "大兴安岭的落叶松林，在最后一层光里变成金色。",
    "choices": [
      {
        "label": "西安",
        "line": "不对。西安的秋天在十月。"
      },
      {
        "label": "台湾",
        "line": "也不对。台湾要等到十一月。"
      },
      {
        "label": "黑龙江",
        "line": "对。北方林区往往更早显出秋色。",
        "correct": true
      }
    ],
    "timeline": [
      {
        "month": "09",
        "place": "黑龙江"
      },
      {
        "month": "10",
        "place": "西安"
      },
      {
        "month": "11",
        "place": "台湾"
      }
    ],
    "why": "黑龙江地处我国东北部，入秋后降温较早。纬度、海拔和当年的天气共同影响叶色；图中的月份是观景参考，不是固定的入秋日期。"
  },
  {
    "n": 4,
    "id": "chapter-heilongjiang",
    "type": "chapter",
    "chapter": "黑龙江",
    "lines": [
      "01",
      "黑龙江"
    ],
    "title": "秋是短暂的",
    "body": "大兴安岭的秋天，从层层变色的树林开始。九月前后，白桦与落叶松渐渐染黄；天气一冷，秋色就会加快脚步。想追上最好的颜色，要看当年的天气。",
    "imageKey": "heilongjiang-late-autumn",
    "alt": "大兴安岭的落叶松林，在最后一层光里变成金色。"
  },
  {
    "n": 5,
    "id": "heilongjiang-birch",
    "type": "hero",
    "chapter": "黑龙江",
    "title": "白桦把秋天照亮",
    "body": "秋色到来时，金黄的叶子映着发白的树干。风一过，林子里像有翻纸的声音。叶色会随地点和气温改变，最浓的一刻，需要赶上，也需要运气。",
    "imageKey": "birch-autumn",
    "alt": "金黄叶片与白色树干组成的白桦秋景示意，非大兴安岭实拍。",
    "scene": {
      "place": "白桦秋色 · 示意"
    }
  },
  {
    "n": 6,
    "id": "heilongjiang-time",
    "type": "split",
    "chapter": "黑龙江",
    "title": "林区的时间",
    "body": "铁轨把江水和树林连在一起。坐在窗边，看河面从树影之间露出来，路程就有了另一种节奏。秋天不只在目的地，也在经过的风景里。",
    "imageKey": "heilongjiang-railway",
    "alt": "一列火车驶过松花江上的铁桥，江面很宽。",
    "scene": {
      "place": "松花江 · 铁路意象"
    }
  },
  {
    "n": 7,
    "id": "heilongjiang-snow",
    "type": "snow",
    "chapter": "黑龙江",
    "prompt": "拖一下，看秋天结束。",
    "imageKeys": [
      "heilongjiang-late-autumn",
      "heilongjiang-first-snow"
    ],
    "alt": [
      "落叶松林在最后一层光里，脚下已经落了叶。",
      "第一场雪落在林间小路上，树枝还挂着残叶。"
    ],
    "responses": [
      "叶子还没落完，雪还在路上。",
      "第一场雪落在林间小路上。",
      "雪是夜里来的，没有声音。"
    ],
    "scene": {
      "place": "林间初雪 · 示意"
    },
    "autoLabel": "看它入冬"
  },
  {
    "n": 8,
    "id": "quiz-heilongjiang",
    "type": "quiz",
    "chapter": "黑龙江",
    "question": "追白桦秋色，最该留意什么？",
    "options": [
      "固定七天，年年相同",
      "当地叶色与近期天气",
      "只看日历，不看地点"
    ],
    "correct": 1,
    "explain": "秋色受地点、气温和当年天气影响，没有统一的“只黄七天”。出发前看当地近期照片与预报，比记住一个固定日期更可靠。"
  },
  {
    "n": 9,
    "id": "chapter-xian",
    "type": "chapter",
    "chapter": "西安",
    "lines": [
      "02",
      "西安"
    ],
    "title": "秋是厚重的",
    "body": "西安的秋天压在城墙上。十月，银杏落在砖缝里；十月底，柿子红到发暗；回民街的石榴堆成小山。走路慢一点，才看得见这些颜色。",
    "imageKey": "xian-chapter",
    "alt": "西安城墙下的长街，砖缝里长着草。"
  },
  {
    "n": 10,
    "id": "xian-ginkgo",
    "type": "hero",
    "chapter": "西安",
    "title": "城墙边的秋色",
    "body": "城墙高约十二米，砖缝里长着草。秋色浓起来时，去城头看远处的树，也去树下捡一片落叶。金黄映着旧砖，让这个季节多了一层时间的颜色。",
    "imageKey": "xian-ginkgo",
    "alt": "逆光中的金黄银杏叶，用作秋色示意，非城墙实拍。",
    "scene": {
      "place": "银杏秋色 · 示意"
    }
  },
  {
    "n": 11,
    "id": "xian-persimmon",
    "type": "split",
    "chapter": "西安",
    "title": "柿子红了，城就旧了一层",
    "body": "老院子里的柿子树，叶子掉光以后，只剩果子挂在枝上，没人摘，留给鸟。街边的石榴堆成小山，皮裂开着，露出里面的红。十月底，烧树叶的烟一起，手就凉了。",
    "imageKey": "xian-persimmon",
    "alt": "一枝柿子红在旧院墙前，叶子开始发褐。",
    "scene": {
      "place": "老院子 · 柿子"
    }
  },
  {
    "n": 12,
    "id": "quiz-xian",
    "type": "quiz",
    "chapter": "西安",
    "question": "西安城墙，大约有多高？",
    "options": [
      "32 米",
      "64 米",
      "12 米"
    ],
    "correct": 2,
    "explain": "西安城墙高约12米，顶宽12—14米，周长约13.74公里。按每小时5公里估算，步行一圈约需2.7小时；加上拍照和停留，应留出更多时间。"
  },
  {
    "n": 13,
    "id": "chapter-taiwan",
    "type": "chapter",
    "chapter": "台湾",
    "lines": [
      "03",
      "台湾"
    ],
    "title": "秋是缓慢的",
    "body": "台湾的秋意慢慢显出来。秋天，阳明山的芒花先白；到了秋冬之交，一些地方的落羽松渐渐转色。茶山的雾，又把脚步留住。这里的秋天不赶路，它只是慢慢经过。",
    "imageKey": "taiwan-chapter",
    "alt": "清水断崖下的太平洋，山壁一直落到海里。"
  },
  {
    "n": 14,
    "id": "taiwan-grass",
    "type": "hero",
    "chapter": "台湾",
    "title": "秋天先从芒花开始",
    "body": "十月，山脊先白。芒草比人高，风从坡上过，整面山都在响，声音是干的，像有人翻纸。走进去，裤脚全湿，草籽粘在袜子上。太阳一出来，雾散了，芒花逆着光，白得刺眼。",
    "imageKey": "cover-manghua",
    "alt": "台湾山脊上的芒花，逆光里像一片白色的火。",
    "scene": {
      "place": "阳明山 · 芒花"
    }
  },
  {
    "n": 15,
    "id": "taiwan-cypress",
    "type": "split",
    "chapter": "台湾",
    "title": "落羽松还没有红",
    "body": "北边的树已经落叶，这里的落羽松却还在慢慢换色。不同地点和气温，让绿、黄、红褐色先后出现；不少景点的观赏期跨过十二月和翌年一月。水边冒出的气根，像一排没人坐的凳子。",
    "imageKey": "taiwan-bald-cypress",
    "alt": "植物园内落羽松的气根示意，非台湾景点实拍。",
    "scene": {
      "place": "落羽松 · 气根示意"
    }
  },
  {
    "n": 16,
    "id": "taiwan-mist",
    "type": "fog",
    "chapter": "台湾",
    "prompt": "把雾推开",
    "responses": [
      "茶树的垄，一列一列，比尺子还直。",
      "坡上有人说话，声音被雾吃掉一半。",
      "雾散开的地方，露水还在叶尖上挂着。"
    ],
    "imageKey": "taiwan-tea-mist",
    "alt": "台湾山里的茶园，雾气正在散开。",
    "scene": {
      "place": "台湾 · 茶山雾"
    }
  },
  {
    "n": 17,
    "id": "quiz-taiwan",
    "type": "quiz",
    "chapter": "台湾",
    "question": "落羽松的秋冬色彩，何时值得留意？",
    "options": [
      "每年固定十月一天",
      "常见于十二月至翌年一月",
      "全台同一天变红"
    ],
    "correct": 1,
    "explain": "以桃园南兴落羽松为例，官方观光资料给出的最佳观赏期约为十二月中至一月底。其他地点和年份会随气温变化，出发前应查看当地近期叶况。"
  },
  {
    "id": "chapter-hong-kong",
    "type": "chapter",
    "chapter": "香港",
    "lines": [
      "04",
      "香港"
    ],
    "title": "秋是清爽的",
    "body": "风从维多利亚港吹过，高楼背后，山路通向海。白天去山上看城市，傍晚回到海边等灯亮。香港的秋天，可以在热闹与安静之间，走得很近。",
    "imageKey": "hong-kong-harbour",
    "alt": "香港维多利亚港日落，远眺大屿山。",
    "n": 18
  },
  {
    "n": 19,
    "id": "vote",
    "type": "vote",
    "chapter": "尾声",
    "title": "秋假，你最想去哪玩？",
    "choices": [
      {
        "label": "黑龙江",
        "line": "去赶一场林间的秋色。",
        "imageKey": "birch-autumn",
        "alt": "金黄色的白桦秋色示意。"
      },
      {
        "label": "西安",
        "line": "去看银杏落在城砖上。",
        "imageKey": "xian-ginkgo",
        "alt": "城墙边的银杏。"
      },
      {
        "label": "台湾",
        "line": "去等一场茶山雾。",
        "imageKey": "taiwan-tea-mist",
        "alt": "台湾山里的茶园。"
      },
      {
        "label": "香港",
        "line": "去山上看城市，回海边等灯亮。",
        "imageKey": "hong-kong-harbour",
        "alt": "香港维多利亚港日落，远眺大屿山。"
      }
    ]
  },
  {
    "n": 20,
    "id": "ticket",
    "type": "ticket",
    "chapter": "尾声",
    "title": "秋日机票",
    "variants": [
      {
        "place": "黑龙江",
        "to": "漠河",
        "date": "09.24",
        "dateLabel": "九月最后一周",
        "flight": "秋航 01",
        "gate": "03",
        "seat": "窗边",
        "body": "以漠河为起点，去附近的林间追一场秋色，再到江边看水。把时间留给沿途，行程随当年的叶色调整。",
        "days": [
          "DAY 1 抵达漠河",
          "DAY 2 周边白桦秋色",
          "DAY 3 周边江湾与返程"
        ],
        "imageKey": "heilongjiang-chapter",
        "alt": "大兴安岭的林海与河湾，落日把落叶松照成金色。",
        "tagline": "去赶一场林间的秋色"
      },
      {
        "place": "西安",
        "to": "西安",
        "date": "10.20",
        "dateLabel": "十月下旬",
        "flight": "秋航 02",
        "gate": "08",
        "seat": "窗边",
        "body": "从永宁门上城墙，走到钟楼，再拐进老院子看柿子。三天，刚好把秋天走旧一层。",
        "days": [
          "DAY 1 城墙",
          "DAY 2 古寺银杏",
          "DAY 3 回民街"
        ],
        "imageKey": "xian-chapter",
        "alt": "西安城墙下的长街，砖缝里长着草。",
        "tagline": "去捡一片落在城砖上的银杏"
      },
      {
        "place": "台湾",
        "to": "台北",
        "date": "11.15",
        "dateLabel": "十一月",
        "flight": "秋航 03",
        "gate": "12",
        "seat": "窗边",
        "body": "这次留在台北周边：上阳明山看芒花，回城里散步，再去河岸走一走。茶山雾与落羽松，是留给另一次秋冬旅行的愿望。",
        "days": [
          "DAY 1 阳明山",
          "DAY 2 台北街巷",
          "DAY 3 河岸散步"
        ],
        "imageKey": "taiwan-chapter",
        "alt": "清水断崖下的太平洋，山壁一直落到海里。",
        "tagline": "去等山风，也去慢慢散步"
      },
      {
        "place": "香港",
        "to": "香港",
        "date": "11.20",
        "dateLabel": "十一月",
        "flight": "秋航 04",
        "gate": "16",
        "seat": "窗边",
        "body": "白天去太平山看城市，傍晚回到维港海边。留一天走街巷，留一天看山海，慢慢过一个秋日周末。",
        "days": [
          "DAY 1 太平山",
          "DAY 2 维港与街巷",
          "DAY 3 海边散步"
        ],
        "imageKey": "hong-kong-harbour",
        "alt": "香港维多利亚港日落，远眺大屿山。",
        "tagline": "去山上看城市，回海边等灯亮"
      }
    ]
  },
  {
    "n": 21,
    "id": "end",
    "type": "end",
    "chapter": "尾声",
    "title": "秋天不等人",
    "prompt": "今年，选一个出发。",
    "lines": [
      {
        "month": "09",
        "place": "黑龙江"
      },
      {
        "month": "10",
        "place": "西安"
      },
      {
        "month": "11",
        "place": "台湾"
      },
      {
        "month": "11",
        "place": "香港"
      }
    ],
    "imageKey": "heilongjiang-railway",
    "alt": "一列火车驶过松花江上的铁桥，江面很宽。"
  }
];
  const images = {
  "cover-manghua": {
    "src": "assets/images/cover-manghua.webp",
    "fallback": "assets/images/cover-manghua.jpg",
    "lqip": "data:image/webp;base64,UklGRp4AAABXRUJQVlA4IJIAAAAwBQCdASogABIAPvVqrFAqpiQisBgIAVAeiWQAtOgQ7yWqDj/ip/jDGpN4FX2HNAVQAAD+zWZfVrVczqwZJqMlnTm+wLdyPL03/OapO0WGR/FhT3bifaLFJaWTWjk+LPgF8pSHZ8qtf3Ux79j9YtHB/QRyD0UOmxiqTxB9HeNLngXV56t1DS+ycElygoFZvAAAAA=="
  },
  "taiwan-silver-grass": {
    "src": "assets/images/taiwan-silver-grass.webp",
    "fallback": "assets/images/taiwan-silver-grass.jpg",
    "lqip": "data:image/webp;base64,UklGRrgAAABXRUJQVlA4IKwAAABQBQCdASogABIAPvVurE+qpqQiMBgIAVAeiWcAxn3dbFOeeQg1Jbd3CmMQZzp7FZI0CTQA9hr7saKIJt9XRsZCk9F/++3Ch1LxezxiTSnSj2rcV48L/JsTQC0b9L45Mpmz3AqDGWmENNQgTKeURqnEqS+uuEYmJRmgIac6D7qR9yOK742axWEqSWydSr27JmFD1Vy81/iC+FHHunMguJCkATQFArS6wfJJQAAA"
  },
  "taiwan-bald-cypress": {
    "src": "assets/images/taiwan-bald-cypress.webp",
    "fallback": "assets/images/taiwan-bald-cypress.jpg",
    "lqip": "data:image/webp;base64,UklGRjoBAABXRUJQVlA4IC4BAADQBgCdASoaACAAPvVkqk4qpaOiMAgBUB6JZgC7M2S9ArUx1y1VNVB/frsSLsbGwRyRP59YFV/8QsoIgSoIhAAAyxd086SQMNevNWT/qRO1MjMVX2rynplYu4HG53YSyCgY5v4m4v3+JAR96DrJxKPZ5ealvqqSJcRynFj9tj7SIzwTxv0gGu5kBFk2yehZLP2OBxC6S8L/FW8cJRnT1Pw8hBiFV6vFPsiNcvTtlDq1OREZL5Q/eyupenuq8ySIj4cfCJPkYwCGVzfroq7GSX6bDY/BtPsdtk+py776jnb1BqjRc/rIvJ+wlMLgkVURFgH3/ee9LmGuCe/vyVus6DY6a7SPRaIzWw1I1XlMFgEuJRRyDCuzLDZeVx8M8rWZEuAB4RGtj9a8D0YgjkgAAA=="
  },
  "taiwan-tea-mist": {
    "src": "assets/images/taiwan-tea-mist.webp",
    "fallback": "assets/images/taiwan-tea-mist.jpg",
    "lqip": "data:image/webp;base64,UklGRsQAAABXRUJQVlA4ILgAAACwBACdASogABIAPvVkqE4qpaOiMAgBUB6JZAC/RiAAKTauxvRol2Ueemx64QXQAP7o2s3l/IEWaXlN2Y3AAOfi253WRIBruJgg7jUCT+Djbd/ra/MQnFmQBc0plNIjK6w/X8X1YfcPZRxm3LJe5g9PiCjf9oAYPVMeYOQRBbuZKGeWg4zy0HGeWhV4DsDhUE+uJDypYkCOnQ98sFE0aAfeSE8ERByXScz+TdlzCuS6TmfyIvg04AAA"
  },
  "taiwan-chapter": {
    "src": "assets/images/taiwan-chapter.webp",
    "fallback": "assets/images/taiwan-chapter.jpg",
    "lqip": "data:image/webp;base64,UklGRrwAAABXRUJQVlA4ILAAAABwBQCdASogABIAPvVurVGqpiQiqAqpUB6JaACdL4s+YkCWC6a5GNf/9Ib5pG+2V3Oqo2jAAP7FY3ieHlEF0Y/NqQmkxhs+wEH4+wx8ywnd5MMo3zTzSrYS0QQnKe2SBAS8JpvaddxDYgAECt9/vlstZ0KAUO3C+Luk0aNLDXbZbS9PggMtH1PbmX9RNdj6L7Iab7FhdSbQIa7ooBskq970GoS1FKw+7zQZxQjE8xO4AA=="
  },
  "heilongjiang-birch": {
    "src": "assets/images/heilongjiang-birch.webp",
    "fallback": "assets/images/heilongjiang-birch.jpg",
    "lqip": "data:image/webp;base64,UklGRq4AAABXRUJQVlA4IKIAAAAQBQCdASogABIAPvVwrE8qpyQiMBgIAVAeiWMAvzn9XRfhqCsiuGRL+O4Wkj9lhmJgAP5H5Wi77EVZpBFNOdTeGZ3eurzUNqPdGUj+Q/Ri8zPLuNt1w0xOgqM7uq5pHarHWRtBuVlZThhLfV5V2zqKo8xhVvtxdc/aa9HWdOlevv/VK8tsJ+OEuB3ao5KyIUNpPNfDqkpk4hkrBlaIgYLgAAA="
  },
  "heilongjiang-chapter": {
    "src": "assets/images/heilongjiang-chapter.webp",
    "fallback": "assets/images/heilongjiang-chapter.jpg",
    "lqip": "data:image/webp;base64,UklGRooAAABXRUJQVlA4IH4AAAAQBACdASogABIAPvVkqU4qpSOiMAgBUB6JQBfNHMg/TSGgzSWvpM+WoADw2w9vBz7DcTg7lHiSlJodODV7wgIEsT8wwZ08mvb2eH/oqa5Z+1PedK8exYl1HWLxCr+eRjyX2o2fsJN1R7ygahKZVa7wKwhwENUpXCzVvOgAAAA="
  },
  "heilongjiang-railway": {
    "src": "assets/images/heilongjiang-railway.webp",
    "fallback": "assets/images/heilongjiang-railway.jpg",
    "lqip": "data:image/webp;base64,UklGRtAAAABXRUJQVlA4IMQAAAAQBQCdASoaACAAPvVwsFMqpiSiqAgBUB6JQBOgCtoQL7/XjLZzg2snEDE3swmDonwwAP7zeQY+7aOuQq5BMvBZy2Y+J99VpGdlvzr5iarCNBG0ch8Al5hzFL88zYTTKCBw1iyo/Ik6AcwnQrRrNSUiNM4nKHqcOrp75wspXyXMXGDzM5g5hEdZx3GIc3MflcYsaWDhRmUkEOQKTaZIqXA4Y4q46zyvbsiY08OFvmg7QPezaXWOTO5KoC0vn1B1AYwE2AAA"
  },
  "heilongjiang-late-autumn": {
    "src": "assets/images/heilongjiang-late-autumn.webp",
    "fallback": "assets/images/heilongjiang-late-autumn.jpg",
    "lqip": "data:image/webp;base64,UklGRnwAAABXRUJQVlA4IHAAAAAwBACdASogABIAPvVmqk4qpaOiMAgBUB6JYwCdAB8wVmJM9UBMuCK31IAA/mCahECmKGjcC8EcKQ+K5OHRx2g5fVBhI+rv09DA5OTEppaBhWfC0hwjoczqFkzAjLwheZdq1RGuKxfLIXQZomit9gAA"
  },
  "heilongjiang-first-snow": {
    "src": "assets/images/heilongjiang-first-snow.webp",
    "fallback": "assets/images/heilongjiang-first-snow.jpg",
    "lqip": "data:image/webp;base64,UklGRrQAAABXRUJQVlA4IKgAAABQBQCdASogABIAPvVurE+qpqQiMBgIAVAeiUAY1d5ApAUnN30u7of3fTvq5XrZJ4/wcsAA/u6lYxn7lMFyqPdEP33xPCPILu9KD4Mjc2tQfbrEnGh96k5yLLHU+uRXxHOKQDrG10mecefdHcEkXTVF7S34jVqLENetsPXx5iMg7WEcdYJR70krKqS2jgI5FC3eI24jVBAYeWMT6V/mY4z6kBTR1ww6AAA="
  },
  "xian-chapter": {
    "src": "assets/images/xian-chapter.webp",
    "fallback": "assets/images/xian-chapter.jpg",
    "lqip": "data:image/webp;base64,UklGRoAAAABXRUJQVlA4IHQAAABwBACdASogABIAPvVsr1GqpaQiqAqpUB6JZQAAKxjaqQVYccRjA8cuv4RWSAD+6PFdXIaV5UMBw5Et8o+jAlsTLArJmjpxLgmzv5zZ9hvjAI0x/p89VK3+gsPlTLTjvSpzPZrcKPpF2i9LBqJjo5/kwAAAAA=="
  },
  "xian-ginkgo": {
    "src": "assets/images/xian-ginkgo.webp",
    "fallback": "assets/images/xian-ginkgo.jpg",
    "lqip": "data:image/webp;base64,UklGRsQAAABXRUJQVlA4ILgAAABQBQCdASogABIAPvVqrFAqpaQisBgIAVAeiWwAnTLro6G/zEAB/0PNYzPZhkSQ2qBU2kAA/tjoVNX6qg8iY9YEpCNu/OBu915f8leaKjqPXNVFQ5JPHCzz5hMnN45w9MtWi8elTZf5uS2WLg2n+xfTZ7LxXgQhFS43e1wA4++idS5W//9d26zOaMqcTunFn0nqx/FYy8nuLa8gvD4McEDS4hkkI6K2G8+WlrtZWTftTMst83yegAAA"
  },
  "xian-persimmon": {
    "src": "assets/images/xian-persimmon.webp",
    "fallback": "assets/images/xian-persimmon.jpg",
    "lqip": "data:image/webp;base64,UklGRh4BAABXRUJQVlA4IBIBAACwBgCdASoaACAAPvVurVGqpiQiqAqpUB6JagCxHvU1RrBrTelloBGnGCd+Rw6M19cwprY35EVQmGHADYuAAAD+207GObFTc+mKzOfKvCY+bWeTeUc5HvnpLFRyYnJhJmGU5xQfbWtuazmSlC2S+HL4M83h99GqynzHnSgGReoh0fbeWcP2ObYOT/YV6Es6f0Nq2T3/2r1GKa9MBoDMiahNrlfF6oU4Y1Nv7uSMWPE35ZJFrMcISu25MR8QkX2xT70XO+DlgGmDckUik6e/k2vbpIDZggrwJb3ZBRnonlUiAzXhncS7IMGcgDw2tDdDTgZImeyqT7YaInR62jwr3EBGL1tTMF+YeDwhMERW/JsaAAAA"
  },
  "hong-kong-harbour": {
    "src": "assets/images/hong-kong-harbour.webp",
    "fallback": "assets/images/hong-kong-harbour.jpg"
  },
  "birch-autumn": {
    "src": "assets/images/birch-autumn.webp",
    "fallback": "assets/images/birch-autumn.jpg"
  }
};
  const credits = [
  {
    "id": "cover-manghua",
    "title": "Autumn Miscanthus (15833319956).jpg",
    "artist": "Artemas Liu from Taipei, Taiwan",
    "license": "CC BY 2.0",
    "license_url": "https://creativecommons.org/licenses/by/2.0",
    "source_url": "https://commons.wikimedia.org/wiki/File:Autumn_Miscanthus_(15833319956).jpg",
    "credit_line": "摄影：Artemas Liu from Taipei, Taiwan / CC BY 2.0 / Wikimedia Commons",
    "width": 2400,
    "height": 1350,
    "source_resolution": "1920x1280",
    "crop_box_px": [
      0,
      84,
      1920,
      1164
    ],
    "file_webp_bytes": 614992,
    "file_jpg_bytes": 809362
  },
  {
    "id": "taiwan-silver-grass",
    "title": "Miscanthus 芒花 - panoramio.jpg",
    "artist": "lienyuan lee",
    "license": "CC BY 3.0",
    "license_url": "https://creativecommons.org/licenses/by/3.0",
    "source_url": "https://commons.wikimedia.org/wiki/File:Miscanthus_%E8%8A%92%E8%8A%B1_-_panoramio.jpg",
    "credit_line": "摄影：lienyuan lee / CC BY 3.0 / Wikimedia Commons",
    "width": 2400,
    "height": 1350,
    "source_resolution": "1920x1440",
    "crop_box_px": [
      0,
      180,
      1920,
      1260
    ],
    "file_webp_bytes": 997242,
    "file_jpg_bytes": 1121433
  },
  {
    "id": "taiwan-bald-cypress",
    "title": "Taxodium distichum (3) Meise Nationale Plantentuin.jpg",
    "artist": "Homoarborea",
    "license": "CC0",
    "license_url": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "source_url": "https://commons.wikimedia.org/wiki/File:Taxodium_distichum_(3)_Meise_Nationale_Plantentuin.jpg",
    "credit_line": "摄影：Homoarborea / CC0 / Wikimedia Commons",
    "width": 1600,
    "height": 2000,
    "source_resolution": "1920x1275",
    "crop_box_px": [
      450,
      0,
      1470,
      1275
    ],
    "file_webp_bytes": 902870,
    "file_jpg_bytes": 1042126
  },
  {
    "id": "taiwan-tea-mist",
    "title": "聖峰茶園 Shengfeng Tea Plantation - panoramio.jpg",
    "artist": "lienyuan lee",
    "license": "CC BY 3.0",
    "license_url": "https://creativecommons.org/licenses/by/3.0",
    "source_url": "https://commons.wikimedia.org/wiki/File:%E8%81%96%E5%B3%B0%E8%8C%B6%E5%9C%92_Shengfeng_Tea_Plantation_-_panoramio.jpg",
    "credit_line": "摄影：lienyuan lee / CC BY 3.0 / Wikimedia Commons",
    "width": 2400,
    "height": 1350,
    "source_resolution": "1920x1280",
    "crop_box_px": [
      0,
      110,
      1920,
      1190
    ],
    "file_webp_bytes": 1072872,
    "file_jpg_bytes": 1148727
  },
  {
    "id": "taiwan-chapter",
    "title": "Qingshui Cliff 清水斷崖 - panoramio (3).jpg",
    "artist": "lienyuan lee",
    "license": "CC BY 3.0",
    "license_url": "https://creativecommons.org/licenses/by/3.0",
    "source_url": "https://commons.wikimedia.org/wiki/File:Qingshui_Cliff_%E6%B8%85%E6%B0%B4%E6%96%B7%E5%B4%96_-_panoramio_(3).jpg",
    "credit_line": "摄影：lienyuan lee / CC BY 3.0 / Wikimedia Commons",
    "width": 2400,
    "height": 1350,
    "source_resolution": "1920x1280",
    "crop_box_px": [
      0,
      100,
      1920,
      1180
    ],
    "file_webp_bytes": 787038,
    "file_jpg_bytes": 920117
  },
  {
    "id": "heilongjiang-birch",
    "title": "Nagano's White birch forest (53108290236).jpg",
    "artist": "Raita Futo from Tokyo, Japan",
    "license": "CC BY 2.0",
    "license_url": "",
    "source_url": "https://commons.wikimedia.org/wiki/File:Nagano%27s_White_birch_forest_(53108290236).jpg",
    "credit_line": "摄影：Raita Futo from Tokyo, Japan / CC BY 2.0 / Wikimedia Commons",
    "width": 2400,
    "height": 1350,
    "source_resolution": "1920x1280",
    "crop_box_px": [
      0,
      100,
      1920,
      1180
    ],
    "file_webp_bytes": 797052,
    "file_jpg_bytes": 957544
  },
  {
    "id": "heilongjiang-chapter",
    "title": "A River in Greater Khingan Forest.jpg",
    "artist": "Charlie fong",
    "license": "CC BY-SA 4.0",
    "license_url": "",
    "source_url": "https://commons.wikimedia.org/wiki/File:A_River_in_Greater_Khingan_Forest.jpg",
    "credit_line": "摄影：Charlie fong / CC BY-SA 4.0 / Wikimedia Commons",
    "width": 2400,
    "height": 1350,
    "source_resolution": "1920x1080",
    "crop_box_px": [
      0,
      0,
      1920,
      1080
    ],
    "file_webp_bytes": 514550,
    "file_jpg_bytes": 686136
  },
  {
    "id": "heilongjiang-railway",
    "title": "HXD3D-1886 hauls Z158 on Dehui Songhua River Bridge 20251011.jpg",
    "artist": "高坂千一久",
    "license": "CC BY 4.0",
    "license_url": "",
    "source_url": "https://commons.wikimedia.org/wiki/File:HXD3D-1886_hauls_Z158_on_Dehui_Songhua_River_Bridge_20251011.jpg",
    "credit_line": "摄影：高坂千一久 / CC BY 4.0 / Wikimedia Commons",
    "width": 1600,
    "height": 2000,
    "source_resolution": "1920x1080",
    "crop_box_px": [
      528,
      0,
      1392,
      1080
    ],
    "file_webp_bytes": 637846,
    "file_jpg_bytes": 785745
  },
  {
    "id": "heilongjiang-late-autumn",
    "title": "Gegengol in Greater Khingan forest2017.jpg",
    "artist": "Charlie fong",
    "license": "CC BY-SA 4.0",
    "license_url": "",
    "source_url": "https://commons.wikimedia.org/wiki/File:Gegengol_in_Greater_Khingan_forest2017.jpg",
    "credit_line": "摄影：Charlie fong / CC BY-SA 4.0 / Wikimedia Commons",
    "width": 2400,
    "height": 1350,
    "source_resolution": "1920x1280",
    "crop_box_px": [
      0,
      100,
      1920,
      1180
    ],
    "file_webp_bytes": 583428,
    "file_jpg_bytes": 765713
  },
  {
    "id": "heilongjiang-first-snow",
    "title": "First snow - Flickr - Stiller Beobachter.jpg",
    "artist": "Stiller Beobachter from Ansbach, Germany",
    "license": "CC BY 2.0",
    "license_url": "",
    "source_url": "https://commons.wikimedia.org/wiki/File:First_snow_-_Flickr_-_Stiller_Beobachter.jpg",
    "credit_line": "摄影：Stiller Beobachter from Ansbach, Germany / CC BY 2.0 / Wikimedia Commons",
    "width": 2400,
    "height": 1350,
    "source_resolution": "1920x1440",
    "crop_box_px": [
      0,
      180,
      1920,
      1260
    ],
    "file_webp_bytes": 997024,
    "file_jpg_bytes": 1133984
  },
  {
    "id": "xian-chapter",
    "title": "西安城墙5.JPG",
    "artist": "Fyw321",
    "license": "CC BY-SA 3.0",
    "license_url": "",
    "source_url": "https://commons.wikimedia.org/wiki/File:%E8%A5%BF%E5%AE%89%E5%9F%8E%E5%A2%995.JPG",
    "credit_line": "摄影：Fyw321 / CC BY-SA 3.0 / Wikimedia Commons",
    "width": 2400,
    "height": 1350,
    "source_resolution": "1920x1440",
    "crop_box_px": [
      0,
      180,
      1920,
      1260
    ],
    "file_webp_bytes": 451776,
    "file_jpg_bytes": 666462
  },
  {
    "id": "xian-ginkgo",
    "title": "Ginkgo trees (15649028518).jpg",
    "artist": "白士 李",
    "license": "CC BY 2.0",
    "license_url": "",
    "source_url": "https://commons.wikimedia.org/wiki/File:Ginkgo_trees_(15649028518).jpg",
    "credit_line": "摄影：白士 李 / CC BY 2.0 / Wikimedia Commons",
    "width": 2400,
    "height": 1350,
    "source_resolution": "1920x1281",
    "crop_box_px": [
      0,
      100,
      1920,
      1180
    ],
    "file_webp_bytes": 1628810,
    "file_jpg_bytes": 1674043
  },
  {
    "id": "xian-persimmon",
    "title": "カキノキ(柿の木)(Diospyros kaki Thunb.)-実 (5845080334).jpg",
    "artist": "yamatsu",
    "license": "CC0",
    "license_url": "",
    "source_url": "https://commons.wikimedia.org/wiki/File:%E3%82%AB%E3%82%AD%E3%83%8E%E3%82%AD(%E6%9F%BF%E3%81%AE%E6%9C%A8)(Diospyros_kaki_Thunb.)-%E5%AE%9F_(5845080334).jpg",
    "credit_line": "摄影：yamatsu / CC0 / Wikimedia Commons",
    "width": 1600,
    "height": 2000,
    "source_resolution": "1920x1440",
    "crop_box_px": [
      384,
      0,
      1536,
      1440
    ],
    "file_webp_bytes": 316592,
    "file_jpg_bytes": 560963
  },
  {
    "id": "hong-kong-harbour",
    "title": "Hong Kong Sunset Color.jpg",
    "artist": "Wilfredor",
    "license": "CC0 1.0",
    "license_url": "https://creativecommons.org/publicdomain/zero/1.0/",
    "source_url": "https://commons.wikimedia.org/wiki/File:Hong_Kong_Sunset_Color.jpg",
    "credit_line": "摄影：Wilfredor / CC0 1.0 / Wikimedia Commons；缩小，放映时裁切。"
  },
  {
    "id": "birch-autumn",
    "title": "Autumn Birch Forest (129068501).jpeg",
    "artist": "Valery Kraynov",
    "license": "CC BY 3.0",
    "license_url": "https://creativecommons.org/licenses/by/3.0/",
    "source_url": "https://commons.wikimedia.org/wiki/File:Autumn_Birch_Forest_(129068501).jpeg",
    "credit_line": "摄影：Valery Kraynov / CC BY 3.0 / Wikimedia Commons；缩小，放映时裁切；作为白桦秋色示意，未认定为黑龙江实拍。"
  }
];
  window.DECK = {meta: {"title":"秋天的旅行","subtitle":"同一个秋天，四种不同的风景。"}, slides, images, credits};
})();
