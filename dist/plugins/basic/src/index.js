"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pretty_ms_1 = __importDefault(require("pretty-ms"));
const discord_js_1 = require("discord.js");
const util_1 = require("util");
const Discord = __importStar(require("discord.js"));
const axios_1 = __importDefault(require("axios"));
const lodash = __importStar(require("lodash"));
const promises_1 = __importDefault(require("fs/promises"));
const snowflake_1 = require("../../../services/snowflake");
const Database_1 = require("../../../core/Database");
const i18n_1 = require("../../../services/i18n");
const admins = ["842757573709922314", "611118369474740244"];
/**
 * @returns void
 */
async function load(client, cm) {
    cm.register({
        command: "say",
        category: "Basic",
        desc: "Say something you want to say -> [json builder](https://glitchii.github.io/embedbuilder/?username=FDYBoT&guitabs=title,fields,description&avatar=https://cdn.discordapp.com/avatars/977542041670152212/cf54c7c185fa433014bfd2ec79df0f21.png&data=JTdCJTIyZW1iZWQlMjIlM0ElN0IlMjJ0aXRsZSUyMiUzQSUyMkxvcmVtJTIwaXBzdW0lMjIlMkMlMjJkZXNjcmlwdGlvbiUyMiUzQSUyMkRvbG9yJTIwc2l0JTIwYW1ldC4uLiUyMiUyQyUyMmNvbG9yJTIyJTNBMzkxMjklN0QlN0Q=))",
        handler: async (msg) => {
            const args = ap(msg.content, true);
            if (!args[1])
                return msg.channel.send({
                    embeds: [
                        {
                            description: i18n.parse(msg.lang, "basic.say.error.noargs"),
                            color: i18n.globe["color"]
                        }
                    ]
                });
            if (!IsJsonString(args[1]))
                return msg.channel.send({
                    embeds: [
                        { description: args[1], color: i18n.globe["color"] }
                    ]
                });
            let data = JSON.parse(args[1]);
            let result = data;
            if (data.embed) {
                const { embed } = data;
                result.embed = {};
                result.embeds = [embed];
            }
            msg.channel
                .send(result)
                .catch(err => msg.channel.send(i18n.parse(msg.lang, "basic.say.error.invaildparams")));
        }
    });
    cm.register({
        command: "random",
        category: "Basic",
        desc: "generate random strings (for test purpose)",
        handler: async (msg) => {
            let member = msg.member;
            let texts = "ABCDEFGHIJKLMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
            //texts = '慧撕撒趣趟撑播撞撤增聪鞋蕉蔬横槽樱橡飘醋醉震霉瞒题暴瞎影踢踏踩踪蝶蝴嘱墨镇靠稻黎稿稼箱箭篇僵躺僻德艘膝膛熟摩颜毅糊遵潜潮懂额慰劈操燕薯薪薄颠橘整融醒餐嘴蹄器赠默镜赞篮邀衡膨雕磨凝辨辩糖糕燃澡激懒壁避缴戴擦鞠藏霜霞瞧蹈螺穗繁辫赢糟糠燥臂翼骤鞭覆蹦镰翻鹰警攀蹲颤瓣爆疆壤耀躁嚼嚷籍魔灌蠢霸露奏春帮珍玻毒型挂封持项垮挎城挠政赴赵挡挺括拴拾挑指垫挣挤拼挖按挥挪某甚革荐巷带草茧茶荒茫荡荣故胡南药标枯柄栋相查柏柳柱柿栏树要咸威歪研砖厘厚砌砍面耐耍牵残殃轻鸦皆背战点临览竖省削尝是盼眨哄显哑冒映星昨畏趴胃贵界虹虾蚁思蚂虽品咽骂哗咱响哈咬咳哪炭峡罚贱贴骨钞钟钢钥钩卸缸拜看矩怎牲选适秒香种秋科重复竿段便俩贷顺修保促侮俭俗俘信皇泉鬼侵追俊盾待律很须叙剑逃食盆胆胜胞胖脉勉狭狮独狡狱狠贸怨急饶蚀饺饼弯将奖哀亭亮度迹庭疮疯疫疤姿亲音帝施闻阀阁差养美姜叛送类迷前首逆总炼炸炮烂剃洁洪洒浇浊洞测洗活派洽染济洋洲浑浓津恒恢恰恼恨举觉宣室宫宪突穿窃客冠语扁袄祖神祝误诱说诵垦退既屋昼费陡眉孩除险院娃姥姨姻娇怒架贺盈勇怠柔垒绑绒结绕骄绘给络骆绝绞统猿凹渦靴稼拐涯垣殻潟喝褐缶頑挟矯襟隅渓蛍嫌洪溝昆崎皿桟傘肢遮蛇酌汁塾尚宵縄壌唇甚据杉斉逝仙栓挿曹槽藻駄濯棚挑眺釣塚漬亭偵泥搭棟洞凸屯把覇漠肌鉢披扉猫頻瓶雰塀泡俸褒朴僕堀磨抹岬妄厄癒悠羅竜戻枠挨曖宛嵐畏萎椅彙茨咽淫唄鬱怨媛艶旺岡臆俺苛牙瓦楷潰諧崖蓋骸柿顎葛釜鎌韓玩伎亀毀畿臼嗅巾僅錦惧串窟熊詣憬稽隙桁拳鍵舷股虎錮勾梗喉乞傲駒頃痕沙挫采塞埼柵刹拶斬恣摯餌鹿叱嫉腫呪袖羞蹴憧拭尻芯腎須裾凄醒脊戚煎羨腺詮箋膳狙遡曽爽痩踪捉遜汰唾堆戴誰旦綻緻酎貼嘲捗椎爪鶴諦溺塡妬賭藤瞳栃頓貪丼那奈梨謎鍋匂虹捻罵剝箸氾汎阪斑眉膝肘訃阜蔽餅璧蔑哺蜂貌頰睦勃昧枕蜜冥麺冶弥闇喩湧妖瘍沃拉辣藍璃慄侶瞭瑠呂賂弄籠麓脇喫茶店'
            const rand = Math.floor(Math.random() * 100);
            let rands = texts.split("");
            rands.sort(() => (Math.random() > 0.5 ? 1 : -1));
            while (rands.join("") == texts)
                rands.sort(() => (Math.random() > 0.5 ? 1 : -1));
            rands.length = Math.floor(Math.random() * rands.length);
            msg.reply(rands.join(""));
        }
    });
    cm.register({
        command: "toggle",
        category: "Basic",
        desc: "toggle commands.",
        force: true,
        hidden: true,
        handler: async (msg) => {
            let args = ap(msg.content);
            if (args[1].toLowerCase() === "category") {
                let used = [[], []], amount = [0, 0];
                client.manager.commands.each((cmd, key) => {
                    if (cmd.force)
                        return;
                    if (cmd.category.toLowerCase() === args[2].toLowerCase()) {
                        client.manager.commands.set(key, {
                            ...cmd,
                            disabled: !cmd.disabled
                        });
                        if (!cmd.disabled) {
                            used[0].push(cmd.command);
                            amount[0]++;
                        }
                        if (cmd.disabled) {
                            used[1].push(cmd.command);
                            amount[1]++;
                        }
                    }
                });
                return msg.reply(`done! enabled ${amount[0]} commands [${used[0].join(", ")}], disabled ${amount[1]} commands [${used[1].join(", ")}].`);
            }
            if (args[1].toLowerCase() === "command") {
                let bool = -1;
                client.manager.commands.each((cmd, key) => {
                    if (cmd.force)
                        return;
                    if (cmd.command.toLowerCase() === args[2].toLowerCase()) {
                        client.manager.commands.set(key, {
                            ...cmd,
                            disabled: !cmd.disabled
                        });
                        bool = !cmd.disabled;
                    }
                });
                if (bool === -1)
                    return msg.reply(i18n.parse(msg.lang, "command.run.notfound"));
                return msg.reply(i18n.parse(msg.lang, "basic.toggle.command.toggled", args[2], bool
                    ? i18n.parse(msg.lang, "basic.toggle.command.disabledText")
                    : i18n.parse(msg.lang, "basic.toggle.command.enabledText")));
            }
            msg.reply(i18n.parse(msg.lang, "command.run.notfound"));
        }
    });
    const ux = (name, value, inline = false) => ({ name, value, inline });
    cm.register({
        command: "botinfo",
        category: "Basic",
        desc: "Display bot information",
        handler: async (msg) => {
            msg.channel.send({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setColor("#CFF2FF")
                        .setTitle(`FDYbot ${"1.6"}`)
                        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                        .setFields(ux("				**❯ Uptime:**", `${(0, pretty_ms_1.default)(client.uptime)}`, true), ux("				**❯ WebSocket Ping:**", `${client.ws.ping}ms`, true), ux("				**❯ Memory:**", `${(process.memoryUsage().rss /
                        1024 /
                        1024).toFixed(2)} MB RSS\n${(process.memoryUsage().heapUsed /
                        1024 /
                        1024).toFixed(2)} MB Heap`, true), ux("				**❯ Guild Count:**", `${client.guilds.cache.size} guilds`, true), ux("				**❯ User Count:**", `${client.guilds.cache.reduce((users, value) => users + value.memberCount, 0)} users`, true), ux("				**❯ Commands:**", `${client.manager.commands.size} cmds`, true), ux("				**❯ Node:**", `${process.version} on ${process.platform} ${process.arch}`, true), ux("				**❯ Cached Data:**", `${client.users.cache.size} users\n${client.emojis.cache.size} emojis`, true), ux("				**❯ Discord.js:**", `${discord_js_1.version}`, true))
                        .setTimestamp()
                ]
            });
        }
    });
    cm.register({
        command: "sus",
        category: "Basic",
        handler: async (msg, { prefix }) => {
            msg.channel.send("https://tenor.com/view/sus-omori-sussy-gif-gif-24107578");
        }
    });
    cm.register({
        command: "expo",
        category: "Basic",
        hidden: true,
        handler: async (msg, { prefix }) => {
            promises_1.default.writeFile("./sb.json", JSON.stringify(Object.keys(require.cache).map(v => v.replaceAll("\\", "/"))));
        }
    });
    cm.register({
        command: "br",
        category: "Basic",
        desc: "Display bot information",
        handler: async (msg) => {
            const messages = await msg.channel.messages.fetch({ limit: 1, after: "0" });
            const msg2 = messages.first();
            msg2.reply(`[Click Me](${msg.url})`);
        }
    });
    cm.register({
        command: "help",
        category: "Basic",
        desc: "Display bot information",
        alias: ["h"],
        force: true,
        handler: async (msg, { prefix }) => {
            // eslint-disable-next-line @typescript-eslint/no-var-requires 
            require("../../../services/helpCommand")(msg, { prefix: prefix, _: lodash }, client.manager.commands);
        }
    });
    cm.register({
        command: "userinfo",
        category: "Basic",
        desc: "Display user information from snowflake.",
        cooldown: 5 * 1000,
        force: true,
        handler: async (msg, { prefix }) => {
            const args = ap(msg.content, true);
            const id = msg.mentions.users.first()?.id || args[1] || msg.author.id;
            let response = await axios_1.default
                .get(`https://discord.com/api/users/${id}`, {
                headers: {
                    Authorization: `Bot ${process.env.TOKEN}`
                }
            })
                .catch(e => {
                throw e;
            });
            let { username, discriminator, banner, avatar, banner_color } = response.data;
            let _0 = "discord.com";
            let embed = new Discord.EmbedBuilder();
            embed.setTitle(`${username}#${discriminator}`);
            if (avatar)
                embed.setThumbnail(`https://cdn.discordapp.com/avatars/${id}/${avatar}${avatar.startsWith("a_") ? ".gif" : ".png"}?size=256`);
            if (banner)
                _0 = `https://cdn.discordapp.com/banners/${id}/${banner}${banner.startsWith("a_") ? ".gif" : ".png"}?size=2048`;
            else
                _0 = `https://serux.pro/rendercolour?hex=${banner_color?.replace("#", "")}&height=200&width=512`;
            embed.setImage(_0);
            embed.setColor(banner_color);
            embed.setDescription(`Account Created on ${(0, snowflake_1.convertSnowflakeToDate)(id).toUTCString()} | [Avatar](${`https://cdn.discordapp.com/avatars/${id}/${avatar}${avatar.startsWith("a_") ? ".gif" : ".png"}?size=256`}) | [Banner](${_0}) | Color: ${banner_color}`);
            //snowflake
            //       .convertSnowflakeToDate(id)
            //       .toDateString()
            msg.channel.send({ embeds: [embed] });
            //if (banner) {
            //    let extension = banner.startsWith("a_") ? ".gif" : ".png";
            //    let url = `https://cdn.discordapp.com/banners/${member.id}/${banner}${extension}?size=2048`;
            //    embed.setImage(url)
            //    return message.channel.send({ embeds: [embed] });
            //}
        }
    });
    cm.register({
        command: "ping",
        category: "Basic",
        desc: "Display bot information",
        handler: async (msg, { prefix }) => {
            await msg.reply(i18n.parse(msg.lang, "basic.ping.pong", `${Math.abs(Date.now() - msg.createdTimestamp)}`));
        }
    });
    cm.register({
        command: "lang",
        category: "Currency",
        desc: "Get how many money you got!",
        handler: async (msg) => {
            let args = ap(msg.content);
            let p = new Database_1.Profile(msg.author.id);
            if (args.length == 1 || !Object.keys(i18n_1.langs).includes(args[1]))
                return msg.channel.send(i18n.parse(msg.lang, "basic.lang.current", msg.lang, Object.keys(i18n_1.langs).length, `\`${Object.keys(i18n_1.langs).join("`,`")}\``));
            p.lang = args[1];
            p.save();
            msg.channel.send(i18n.parse(args[1], "basic.lang.set", args[1]));
        }
    });
    cm.register({
        command: "eval",
        category: "Basic",
        desc: "Display bot information",
        hidden: true,
        handler: async (msg, ext) => {
            if (ext.info.commandInfo.permissionLevel < 2)
                return msg.channel.send("Insuffent permission.");
            let args = ap(msg.content, true);
            const code = args[1];
            if (code.trim() === "")
                return msg.channel.send("Dont give me nothing u dumb!!");
            let msg2 = await msg.channel.send("evaling...");
            try {
                let output = await eval(code);
                if (output instanceof Promise ||
                    (Boolean(output) &&
                        typeof output.then === "function" &&
                        typeof output.catch === "function"))
                    output = await output;
                output = (0, util_1.inspect)(output, {
                    depth: 0,
                    maxArrayLength: null
                });
                msg2.edit({
                    embeds: [
                        {
                            author: {
                                name: "Evaluation Completed!"
                            },
                            description: `**Input**\n\`\`\`js\n${code}\`\`\`\n**Output**\n\`\`\`js\n${output}\`\`\``,
                            color: 0x2f3136
                        }
                    ]
                }).catch(() => { });
            }
            catch (err) {
                msg2.edit({
                    embeds: [
                        {
                            author: {
                                name: "Error!"
                            },
                            description: `**Input**\n\`\`\`js\n${code}\`\`\`\n**Error**\n\`\`\`js\n${err}\`\`\``,
                            color: 0x2f3136
                        }
                    ]
                }).catch(() => { });
            }
        }
    });
    cm.register({
        command: "prefix",
        category: "Basic",
        desc: "Set prefix of the current guild or global.",
        handler: async (msg) => {
            throw new Error("This function is not available yet. in the meantime go loop spd gar for 100 times! (/j)");
        }
    });
}
module.exports = load;
function IsJsonString(str) {
    let o;
    try {
        o = JSON.parse(str);
    }
    catch (e) {
        return false;
    }
    if (o && typeof o === "object")
        return true;
    return false;
}
//# sourceMappingURL=index.js.map