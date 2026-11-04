/* ==========================================================================
   秋天的旅行 · 内容（v5：黑龙江 → 西安 → 台湾）
   ========================================================================== */
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
      "三种不同的风景。"
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
    "body": "同一个九月，黑龙江先黄，西安正在落，台湾还在等风。秋天从北往南走，一共三个月。",
    "lines": [
      "黑龙江",
      "西安",
      "台湾"
    ],
    "imageKeys": [
      "heilongjiang-birch",
      "xian-ginkgo",
      "taiwan-silver-grass"
    ],
    "alt": [
      "白桦林里发白的树干，叶子还没有落尽。",
      "城墙边的银杏，叶子黄到透光。",
      "台湾山脊上成片泛白的芒花。"
    ]
  },
  {
    "n": 3,
    "id": "guess-order",
    "type": "guess",
    "chapter": "序",
    "title": "谁先入秋？",
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
        "line": "对。九月最后一周，白桦先黄。",
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
    "why": "黑龙江在北纬 48°。纬度越高，太阳高度角越低、白昼越短，西伯利亚的冷空气也先到这里。所以九月最后一周，白桦先黄。"
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
    "body": "大兴安岭的秋天，从白桦林开始，到第一场雪结束。九月最后一周是黄金期；林区铁路一天一班；雪乡的初雪，通常在十月中。",
    "imageKey": "heilongjiang-late-autumn",
    "alt": "大兴安岭的落叶松林，在最后一层光里变成金色。"
  },
  {
    "n": 5,
    "id": "heilongjiang-birch",
    "type": "hero",
    "chapter": "黑龙江",
    "title": "白桦只黄七天",
    "body": "九月的最后一周，白桦从绿到黄只用七天。风一过，叶子落得很快，林子里全是纸的声音。早上出门要穿两件，中午又得脱。地上铺满以后，树就只剩骨头。",
    "imageKey": "heilongjiang-birch",
    "alt": "白桦林里发白的树干，叶子还没有落尽。",
    "scene": {
      "place": "大兴安岭 · 白桦林"
    }
  },
  {
    "n": 6,
    "id": "heilongjiang-time",
    "type": "split",
    "chapter": "黑龙江",
    "title": "林区的时间",
    "body": "林区的小火车一天一班，开得比走路还慢，窗户可以推开。河面早上结一层薄冰，中午又化了。司机在桥上停一会儿，让一群牛先过。",
    "imageKey": "heilongjiang-railway",
    "alt": "一列火车驶过松花江上的铁桥，江面很宽。",
    "scene": {
      "place": "松花江 · 林区铁路"
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
      "place": "雪乡 · 第一场雪"
    },
    "autoLabel": "看它入冬"
  },
  {
    "n": 8,
    "id": "quiz-heilongjiang",
    "type": "quiz",
    "chapter": "黑龙江",
    "question": "黑龙江的白桦，黄起来只要多久？",
    "options": [
      "30 天",
      "7 天",
      "3 个月"
    ],
    "correct": 1,
    "explain": "黑龙江在北纬 48°。白桦对日照和温度最敏感；九月最后一周，白天骤短，夜里接近零度，叶绿素退得很快，整片林子七天就黄。"
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
    "title": "城墙上的银杏",
    "body": "城墙有十二米高，砖缝里长着草，也存着去年的叶子。银杏黄的时候，风把叶子吹上城头，落在走道中间，扫地的工人一天扫三遍。",
    "imageKey": "xian-ginkgo",
    "alt": "城墙边的银杏，叶子黄到透光。",
    "scene": {
      "place": "西安城墙 · 银杏"
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
    "explain": "西安城墙高 12 米，顶宽 12–14 米，走一圈约 13.7 公里，要一个多小时。城墙挡风，城里比城外暖，银杏能多挂几天。"
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
    "body": "台湾的秋天来得晚。十一月，阳明山的芒花先白；一月，落羽松才红；茶山的雾，整个冬天都在。这里的秋天不赶路，它只是慢慢经过。",
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
    "body": "北边的树已经在掉叶子，这里的落羽松还是绿的。它慢半拍，要等到一月才肯变红，那时别处已经在过冬天。水边的膝根从浅水里冒出来，像一排没人坐的凳子。",
    "imageKey": "taiwan-bald-cypress",
    "alt": "落羽松的膝根从草里冒出来，像一排没人坐的凳子。",
    "scene": {
      "place": "落羽松 · 水边"
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
      "place": "阿里山 · 茶山雾"
    }
  },
  {
    "n": 17,
    "id": "quiz-taiwan",
    "type": "quiz",
    "chapter": "台湾",
    "question": "台湾的落羽松，通常几月才红？",
    "options": [
      "十月",
      "一月",
      "十一月"
    ],
    "correct": 1,
    "explain": "落羽松原产北美，喜欢温暖。台湾要等到一月，日照变短、气温够低，针叶才转红。它比北方的秋天慢半拍。"
  },
  {
    "n": 18,
    "id": "vote",
    "type": "vote",
    "chapter": "尾声",
    "title": "秋假，你最想去哪玩？",
    "choices": [
      {
        "label": "黑龙江",
        "line": "去赶九月最后一周的白桦。",
        "imageKey": "heilongjiang-birch",
        "alt": "白桦林里发白的树干。"
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
      }
    ]
  },
  {
    "n": 19,
    "id": "ticket",
    "type": "ticket",
    "chapter": "尾声",
    "title": "秋日机票",
    "variants": [
      {
        "place": "黑龙江",
        "to": "哈尔滨",
        "date": "09.24",
        "dateLabel": "九月最后一周",
        "flight": "秋航 01",
        "gate": "03",
        "seat": "窗边",
        "body": "从哈尔滨往北，先看白桦，再坐一趟慢火车，最后去雪乡等第一场雪。",
        "days": [
          "DAY 1 哈尔滨",
          "DAY 2 林区铁路",
          "DAY 3 雪乡"
        ],
        "imageKey": "heilongjiang-chapter",
        "alt": "大兴安岭的林海与河湾，落日把落叶松照成金色。",
        "tagline": "去追一场只有七天的黄"
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
        "body": "从台北上山，先看芒花，再去茶山等雾，最后在水边看落羽松慢半拍地红。",
        "days": [
          "DAY 1 阳明山",
          "DAY 2 阿里山",
          "DAY 3 落羽松"
        ],
        "imageKey": "taiwan-chapter",
        "alt": "清水断崖下的太平洋，山壁一直落到海里。",
        "tagline": "去等一场不会散的雾"
      }
    ]
  },
  {
    "n": 20,
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
  }
];
  window.DECK = {
    meta: { title: "秋天的旅行", subtitle: "同一个秋天，三种不同的风景。" },
    slides: slides,
    images: images,
    credits: credits
  };
})();
