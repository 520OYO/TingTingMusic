/* METADATA
{
  "name": "tingting_music",
  "display_name": { "zh": "听听音乐控制", "en": "TingTing Music" },
  "description": { "zh": "后台静默控制听听音乐，支持本地音乐 / 云端网盘两个独立列表", "en": "Control TingTing Music in background (local & cloud lists)" },
  "enabledByDefault": false,
  "category": "Life",
  "tools": [
    {
      "name": "play_music",
      "description": { "zh": "播放指定曲目（index从0起，或传文件路径）", "en": "Play a song by index or path" },
      "parameters": [
        { "name": "index", "description": { "zh": "歌曲索引", "en": "Song index" }, "type": "integer", "required": false },
        { "name": "path", "description": { "zh": "文件路径 / 网盘直链", "en": "File path or URL" }, "type": "string", "required": false }
      ]
    },
    { "name": "next_song", "description": { "zh": "下一首", "en": "Next" }, "parameters": [] },
    { "name": "prev_song", "description": { "zh": "上一首", "en": "Prev" }, "parameters": [] },
    { "name": "pause_music", "description": { "zh": "暂停", "en": "Pause" }, "parameters": [] },
    { "name": "toggle_music", "description": { "zh": "播放/暂停切换", "en": "Toggle" }, "parameters": [] },
    { "name": "stop_music", "description": { "zh": "停止播放并退出后台", "en": "Stop and exit" }, "parameters": [] },
    { "name": "ensure_unlocked", "description": { "zh": "拉前台一次解锁restricted状态(重启后需要)", "en": "Unlock app after reboot" }, "parameters": [] },
    { "name": "switch_local", "description": { "zh": "切到「本地音乐」页", "en": "Switch to local tab" }, "parameters": [] },
    { "name": "switch_cloud", "description": { "zh": "切到「云端网盘」页", "en": "Switch to cloud tab" }, "parameters": [] },
    { "name": "scan_local", "description": { "zh": "后台重新扫描手机本地音乐", "en": "Rescan local music" }, "parameters": [] },
    { "name": "fetch_cloud", "description": { "zh": "后台重新拉取 WebDAV 网盘歌单", "en": "Refresh WebDAV playlist" }, "parameters": [] },
    {
      "name": "set_timer",
      "description": { "zh": "N 分钟后停止播放并退出（0 取消）", "en": "Stop after N minutes (0 cancels)" },
      "parameters": [
        { "name": "minutes", "description": { "zh": "分钟数", "en": "Minutes" }, "type": "integer", "required": true }
      ]
    },
    {
      "name": "set_mode",
      "description": { "zh": "设置播放模式 0列表循环 1单曲 2随机 3顺序", "en": "Set play mode 0-3" },
      "parameters": [
        { "name": "mode", "description": { "zh": "模式编号", "en": "Mode id" }, "type": "integer", "required": true }
      ]
    }
  ]
}*/

const pkg = (function() {
    // 包名与广播 Action 保持不变：改了就没法覆盖安装、旧指令也会失效
    const ACTION = "com.yuanbao.music.x7k2m9.CMD";
    const COMPONENT = "com.yuanbao.music.x7k2m9/.CmdReceiver";
    const MAIN = "com.yuanbao.music.x7k2m9/com.yuanbao.music.x7k2m9.MainActivity";

    function cmd(s) {
        return `am broadcast -a ${ACTION} -n ${COMPONENT} --es cmd ${s}`;
    }

    async function ensure_unlocked(params = {}) {
        const r = await Tools.System.shell(
            `am start -n ${MAIN} >/dev/null 2>&1; sleep 4; input keyevent 3 >/dev/null 2>&1; sleep 1; echo unlocked`
        );
        return { output: r.output, exitCode: r.exitCode };
    }

    async function play_music(params = {}) {
        let s = cmd("play");
        if (params.index != null) s += ` --ei index ${params.index}`;
        if (params.path) s += ` --es path '${params.path}'`;
        const r = await Tools.System.shell(s);
        return { command: s, output: r.output, exitCode: r.exitCode };
    }

    async function next_song() {
        const r = await Tools.System.shell(cmd("next"));
        return { output: r.output, exitCode: r.exitCode };
    }

    async function prev_song() {
        const r = await Tools.System.shell(cmd("prev"));
        return { output: r.output, exitCode: r.exitCode };
    }

    async function pause_music() {
        const r = await Tools.System.shell(cmd("pause"));
        return { output: r.output, exitCode: r.exitCode };
    }

    async function toggle_music() {
        const r = await Tools.System.shell(cmd("toggle"));
        return { output: r.output, exitCode: r.exitCode };
    }

    async function stop_music() {
        const r = await Tools.System.shell(cmd("stop"));
        return { output: r.output, exitCode: r.exitCode };
    }

    async function switch_local() {
        const r = await Tools.System.shell(cmd("tab_local"));
        return { output: r.output, exitCode: r.exitCode };
    }

    async function switch_cloud() {
        const r = await Tools.System.shell(cmd("tab_cloud"));
        return { output: r.output, exitCode: r.exitCode };
    }

    async function scan_local() {
        const r = await Tools.System.shell(cmd("scan_local"));
        return { output: r.output, exitCode: r.exitCode };
    }

    async function fetch_cloud() {
        const r = await Tools.System.shell(cmd("fetch_cloud"));
        return { output: r.output, exitCode: r.exitCode };
    }

    async function set_timer(params = {}) {
        const m = params.minutes != null ? params.minutes : 0;
        const r = await Tools.System.shell(`${cmd("timer")} --ei extra ${m}`);
        return { output: r.output, exitCode: r.exitCode };
    }

    async function set_mode(params = {}) {
        const m = params.mode != null ? params.mode : 0;
        const r = await Tools.System.shell(`${cmd("set_mode")} --ei extra ${m}`);
        return { output: r.output, exitCode: r.exitCode };
    }

    return {
        play_music, next_song, prev_song, pause_music, toggle_music,
        stop_music, ensure_unlocked, switch_local, switch_cloud,
        scan_local, fetch_cloud, set_timer, set_mode
    };
})();

exports.play_music = pkg.play_music;
exports.next_song = pkg.next_song;
exports.prev_song = pkg.prev_song;
exports.pause_music = pkg.pause_music;
exports.toggle_music = pkg.toggle_music;
exports.stop_music = pkg.stop_music;
exports.ensure_unlocked = pkg.ensure_unlocked;
exports.switch_local = pkg.switch_local;
exports.switch_cloud = pkg.switch_cloud;
exports.scan_local = pkg.scan_local;
exports.fetch_cloud = pkg.fetch_cloud;
exports.set_timer = pkg.set_timer;
exports.set_mode = pkg.set_mode;
