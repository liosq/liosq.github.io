/**
 * quotes-typed.js
 * 80 条名言 | 中外电影/动画台词 · 古代诗歌 · 名著散文经典句子
 * 随机起点 · 逐字打出 · 停留 30 秒 · 退格 · 循环
 *
 * 同时：让整个文章卡片都可点击跳转（不限于标题/摘要链接）
 */
;(function () {

  /* ── ① 80 条名言库 ─────────────────────────────────── */
  var QUOTES = [

    /* ── 中国电影经典台词（18条）── */
    '这个世界上有一种鸟是没有脚的，它只能不停地飞，飞到死为止。 ——《阿飞正传》',
    '念念不忘，必有回响。 ——《一代宗师》',
    '世间所有的相遇，都是久别重逢。 ——《一代宗师》',
    '曾经有一份真诚的爱情放在我面前，我没有珍惜。 ——《大话西游》',
    '做人如果没有梦想，那跟咸鱼有什么区别？ ——《少林足球》',
    '人心中的成见是一座大山，任你怎么努力都休想搬动它。 ——《哪吒之魔童降世》',
    '我命由我不由天！ ——《哪吒之魔童降世》',
    '如果眼泪流尽了，眼睛里剩下的就是强悍。 ——《大鱼海棠》',
    '好的爱情是你通过一个人看到整个世界，坏的爱情是你为了一个人舍弃世界。 ——《北京遇上西雅图》',
    '你只是看起来很努力。 ——《后来的我们》',
    '我不想一个人。 ——《花样年华》',
    '你回来了，只是来不及了。 ——《岁月神偷》',
    '时间会告诉你，什么是真的。 ——《无问西东》',
    '如果可以，我愿意再来一次。 ——《重庆森林》',
    '因为爱过，所以慈悲；因为懂得，所以宽容。 ——《滚滚红尘》',
    '路是走出来的，不是问出来的。 ——《霸王别姬》',
    '人不能两次踏入同一条河流，但人却能在同一个地方跌倒两次。 ——《活着》',
    '这世界最真实的温柔，是好好活着。 ——《入殓师》',

    /* ── 外国电影/动画经典台词（22条）── */
    'Life is like a box of chocolates, you never know what you\'re gonna get. ——《阿甘正传》',
    'All those moments will be lost in time, like tears in rain. ——《银翼杀手》',
    'After all, tomorrow is another day. ——《乱世佳人》',
    'Here\'s looking at you, kid. ——《卡萨布兰卡》',
    'May the Force be with you. ——《星球大战》',
    'Why so serious? ——《蝙蝠侠：黑暗骑士》',
    'Get busy living, or get busy dying. ——《肖申克的救赎》',
    'Remember those who we love, they never truly leave us. ——《寻梦环游记》',
    'The flower that blooms in adversity is the most rare and beautiful of all. ——《花木兰》',
    'Just keep swimming. ——《海底总动员》',
    'Hakuna Matata. ——《狮子王》',
    'Adventure is out there! ——《飞屋环游记》',
    'To infinity and beyond! ——《玩具总动员》',
    'Have courage and be kind. ——《灰姑娘》',
    'Our fate lives within us. You only have to be brave enough to see it. ——《勇敢传说》',
    'I am Groot. ——《银河护卫队》',
    'We are all stories in the end. ——《神秘博士》',
    'The past can hurt. But the way I see it, you can either run from it or learn from it. ——《狮子王》',
    'No matter how your heart is grieving, if you keep on believing, the dream that you wish will come true. ——《灰姑娘》',
    'You\'re only given a little spark of madness. You mustn\'t lose it. ——罗宾·威廉姆斯',
    'I see dead people. ——《第六感》',
    'With great power comes great responsibility. ——《蜘蛛侠》',

    /* ── 古代诗歌（20条）── */
    '大漠孤烟直，长河落日圆。 ——王维《使至塞上》',
    '会当凌绝顶，一览众山小。 ——杜甫《望岳》',
    '但愿人长久，千里共婵娟。 ——苏轼《水调歌头》',
    '人生若只如初见，何事秋风悲画扇。 ——纳兰性德《木兰词》',
    '问君能有几多愁？恰似一江春水向东流。 ——李煜《虞美人》',
    '仰天大笑出门去，我辈岂是蓬蒿人！ ——李白《南陵别儿童入京》',
    '落红不是无情物，化作春泥更护花。 ——龚自珍《己亥杂诗》',
    '采菊东篱下，悠然见南山。 ——陶渊明《饮酒》',
    '海内存知己，天涯若比邻。 ——王勃《送杜少府之任蜀州》',
    '长风破浪会有时，直挂云帆济沧海。 ——李白《行路难》',
    '衣带渐宽终不悔，为伊消得人憔悴。 ——柳永《蝶恋花》',
    '众里寻他千百度，蓦然回首，那人却在灯火阑珊处。 ——辛弃疾《青玉案·元夕》',
    '路漫漫其修远兮，吾将上下而求索。 ——屈原《离骚》',
    '生当作人杰，死亦为鬼雄。 ——李清照《夏日绝句》',
    '春江潮水连海平，海上明月共潮生。 ——张若虚《春江花月夜》',
    '此情可待成追忆？只是当时已惘然。 ——李商隐《锦瑟》',
    '无可奈何花落去，似曾相识燕归来。 ——晏殊《浣溪沙》',
    '今夜月明人尽望，不知秋思落谁家？ ——王建《十五夜望月》',
    '停车坐爱枫林晚，霜叶红于二月花。 ——杜牧《山行》',
    '山重水复疑无路，柳暗花明又一村。 ——陆游《游山西村》',

    /* ── 名著散文经典句子（20条）── */
    '于千万人之中遇见你所遇见的人，没有早一步，也没有晚一步。 ——张爱玲《爱》',
    '生命是一袭华美的袍，爬满了蚤子。 ——张爱玲《天才梦》',
    '满纸荒唐言，一把辛酸泪。都云作者痴，谁解其中味？ ——曹雪芹《红楼梦》',
    '世界以痛吻我，要我回报以歌。 ——泰戈尔《飞鸟集》',
    '真正的平静，不是避开车马喧嚣，而是在心中修篱种菊。 ——林清玄',
    '我们曾如此渴望命运的波澜，到最后才发现：人生最曼妙的风景，竟是内心的淡定与从容。 ——杨绛',
    'It was the best of times, it was the worst of times. ——狄更斯《双城记》',
    'Not all those who wander are lost. ——托尔金《指环王》',
    'So we beat on, boats against the current, borne back ceaselessly into the past. ——菲茨杰拉德《了不起的盖茨比》',
    'All happy families are alike; each unhappy family is unhappy in its own way. ——托尔斯泰《安娜·卡列尼娜》',
    'It does not do to dwell on dreams and forget to live. ——J.K.罗琳《哈利·波特》',
    'No man is an island, entire of itself. ——约翰·多恩《紧急时刻的祈祷》',
    'All that we see or seem is but a dream within a dream. ——爱伦·坡',
    'It was a bright cold day in April, and the clocks were striking thirteen. ——乔治·奥威尔《1984》',
    'We accept the love we think we deserve. ——斯蒂芬·奇波斯基《壁花少年》',
    '人世间，没有什么比时间更有力量，它可以淡化一切，包括悲痛，也包括喜悦。 ——路遥《平凡的世界》',
    '你见，或者不见我，我就在那里，不悲不喜。 ——仓央嘉措',
    'The world is a fine place and worth the fighting for. ——海明威《丧钟为谁而鸣》',
    'One must imagine Sisyphus happy. ——加缪《西西弗神话》',
    'I took a deep breath and listened to the old brag of my heart: I am, I am, I am. ——西尔维娅·普拉斯《钟形罩》'
  ];

  /* ── ② 打字机动画 ─────────────────────────────────── */
  var TYPED_CDN = 'https://cdn.jsdelivr.net/npm/typed.js@2.1.0/dist/typed.umd.js';

  function initTyped() {
    var subtitle = document.getElementById('subtitle');
    if (!subtitle) return;

    function startTyped() {
      /* 清空可能残留的静态文本和旧游标 */
      subtitle.innerHTML = '';
      document.querySelectorAll('.typed-cursor').forEach(function (c) {
        c.parentNode && c.parentNode.removeChild(c);
      });

      var startIdx = Math.floor(Math.random() * QUOTES.length);
      var rotated  = QUOTES.slice(startIdx).concat(QUOTES.slice(0, startIdx));

      new window.Typed('#subtitle', {
        strings   : rotated,
        typeSpeed : 60,
        backSpeed : 15,
        backDelay : 30000,   // 展示完毕后停留 30 秒
        startDelay: 200,
        loop      : true,
        cursorChar: '|'
      });

      /* typed.js 初始化完成后再淡入，彻底避免静态文本闪烁 */
      subtitle.style.opacity = '1';
    }

    if (typeof window.Typed === 'function') {
      startTyped();
    } else {
      var script    = document.createElement('script');
      script.src    = TYPED_CDN;
      script.onload = startTyped;
      script.onerror = function () {
        subtitle.style.opacity = '1'; /* 降级：CDN 失败时也要显示 */
      };
      document.head.appendChild(script);
    }
  }

  /* ── ③ 整张文章卡片可点击跳转 ─────────────────────── */
  function initCardClick() {
    document.querySelectorAll('.index-card').forEach(function (card) {
      /* 找到卡片内第一个文章标题链接作为跳转目标 */
      var titleLink = card.querySelector('.index-header a');
      if (!titleLink) return;

      card.addEventListener('click', function (e) {
        /* 若点击的是卡片内原有链接（如分类/标签），不拦截 */
        if (e.target.closest('a')) return;
        window.location.href = titleLink.href;
      });
    });
  }

  /* ── 入口 ────────────────────────────────────────── */
  function onReady() {
    var isHomePage = !!document.querySelector('.index-card');

    if (isHomePage) {
      /* 首页：启动名言打字动画（initTyped 内部控制 opacity 淡入） */
      initTyped();
    } else {
      /* 非首页（文章/归档/标签等）：直接显示原有标题，不做任何替换 */
      var subtitle = document.getElementById('subtitle');
      if (subtitle) subtitle.style.opacity = '1';
    }

    initCardClick();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }

})();
