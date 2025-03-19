# 贪吃蛇游戏

一个使用 HTML5 Canvas 和 JavaScript 开发的现代贪吃蛇游戏。支持电脑和移动设备。

## 特性

- 响应式设计，适配各种屏幕尺寸
- 支持键盘控制（方向键）
- 支持触摸屏控制（滑动）
- 支持虚拟方向键（移动设备）
- 实时得分显示
- 游戏结束提示
- 可重新开始游戏
- 随分数增加逐渐加快游戏速度

## 游戏控制

### 电脑端
- 使用键盘方向键（↑↓←→）控制蛇的移动方向

### 移动设备
- 在屏幕上滑动控制方向
- 使用屏幕底部的虚拟方向键

## 游戏规则

1. 使用方向键控制蛇的移动
2. 吃到红色食物可以增加长度和分数
3. 撞到墙壁或自己会结束游戏
4. 每得 10 分游戏速度会略微加快

## 技术栈

- HTML5 Canvas
- JavaScript
- CSS3

## 在线体验

访问 [https://snake-game-你的vercel域名.vercel.app](https://snake-game-你的vercel域名.vercel.app) 即可开始游戏。

## 本地开发

1. 克隆仓库
```bash
git clone https://github.com/你的用户名/snake-game.git
```

2. 进入项目目录
```bash
cd snake-game
```

3. 使用任意 HTTP 服务器运行项目，例如：
```bash
npx http-server
# 或
python -m http.server
```

## 部署

项目已配置为可以直接部署到 Vercel 平台。只需将代码推送到 GitHub，然后在 Vercel 中导入项目即可。

## 许可证

MIT License