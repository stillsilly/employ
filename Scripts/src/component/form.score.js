define(function () {
    var list = [
        { chn: "准时性", score: [{ key: 1, on: 0 }, { key: 2, on: 0 }, { key: 3, on: 0 }, { key: 4, on: 0 }, { key: 5, on: 0 }, { key: 6, on: 0 }] },
        { chn: "积极主动", score: [{ key: 1, on: 0 }, { key: 2, on: 0 }, { key: 3, on: 0 }, { key: 4, on: 0 }, { key: 5, on: 0 }, { key: 6, on: 0 }] },
        { chn: "目标达成", score: [{ key: 1, on: 0 }, { key: 2, on: 0 }, { key: 3, on: 0 }, { key: 4, on: 0 }, { key: 5, on: 0 }, { key: 6, on: 0 }] }
    ];
    return {
        template: '<ul>\
            <li v-for="item in list">\
            <em>{{item.chn}}</em>\
            <i v-for="score in item.score" :score="score.key" :class="score.on ? \'on\' : \'\'" @click="action(item.score, score)"></i>\
            </li>\
        </ul>',
        props: ['punctuality', 'proactive', 'completeness'],
        data: function () {
            function set(item, num) {
                if (!item || !item.score || !num) return item;

                var score = item.score || [];
                for (var i = 0; i < score.length; i++) {
                    if (score[i].key <= num) {
                        score[i].on = 1;
                    }
                }
                return item;
            }
            var mylist = [];
            mylist.push(set(list[0], this.punctuality));
            mylist.push(set(list[1], this.proactive));
            mylist.push(set(list[2], this.completeness));
            return {
                list: mylist
            }
        },
        methods: {
            action: function (list, score) {
                for (var item in list) {
                    if (list[item].key <= score.key) {
                        list[item].on = 1;
                    } else {
                        list[item].on = 0;
                    }
                }
            }
        }
    }
});