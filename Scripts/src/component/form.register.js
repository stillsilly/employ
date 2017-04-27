define(["header",
    "text",
    "password",
    "code",
    "button",
    "link",
    "label",
    "input",
    "tag",
    "date",
    "radio",
    "tab",
    "card",
    "resume",
    "row",
    "user",
    "task",
    "notice",
    "sign",
    "school",
    "group",
    "evaluate",
    "score",
    "payinfo",
    "item",
    "city",
    "upload",
    "cityselect",
    "system",
    "store"],
    function (header, text, password, code, button, link, label, input, tag, date, radio, tab, card, resume, row, user, task, notice, sign, school, group, evaluate, score, payinfo, item, city, upload, cityselect, system, store) {
        return function (Vue) {
            Vue.component('my-header', header);
            Vue.component('my-text', text);
            Vue.component('my-link', link);
            Vue.component('my-label', label);
            Vue.component('my-input', input);
            Vue.component('my-password', password);
            Vue.component('my-code', code);
            Vue.component('my-button', button);
            Vue.component('my-tag', tag);
            Vue.component('my-date', date);
            Vue.component('my-radio', radio);
            Vue.component('my-tab', tab);
            Vue.component('my-card', card);
            Vue.component('my-resume', resume);
            Vue.component('my-row', row);
            Vue.component('my-user', user);
            Vue.component('my-task', task);
            Vue.component('my-notice', notice);
            Vue.component('my-sign', sign);
            Vue.component('my-school', school);
            Vue.component('my-group', group);
            Vue.component('my-evaluate', evaluate);
            Vue.component('my-score', score);
            Vue.component('my-payinfo', payinfo);
            Vue.component('my-item', item);
            Vue.component('my-city', city);
            Vue.component('my-upload', upload);
            Vue.component('my-system', system);
            Vue.component('my-store', store);
            Vue.component('my-cityselect', cityselect);
        }
    });