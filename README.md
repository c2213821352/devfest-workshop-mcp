# Chrome DevTools MCP 服务器

这是一个基于 Node.js 的 Chrome DevTools Model Context Protocol (MCP) 服务器实现。

## 安装

1. 确保您已安装 Node.js
2. 在项目目录中运行：
   ```bash
   npm install
   ```

## 运行服务器

执行以下命令启动服务器：
```bash
npm start
```

服务器将在 9229 端口启动。

## 连接到服务器

1. 在 Chrome 浏览器中打开 DevTools
2. 按 F1 打开设置
3. 在 Experiments 部分启用 "Protocol Monitor"
4. 使用 Chrome DevTools Protocol 连接到 ws://localhost:9229

## VS Code 配置

1. 已安装必要的 VS Code 扩展：
   - JavaScript Debugger Companion
   - Chrome DevTools

2. 使用 VS Code 的调试功能可以直接连接到运行中的服务器。

本仓库还包含一个用于记录本次 Workshop 的静态站点，位于 `site/` 目录。

本地预览静态站点：

```powershell
npm run serve
# 打开 http://localhost:8080
```

网站结构：

- `site/index.html` — 活动首页
- `site/gdg.html` — 介绍 GDG / DevFest
- `site/mcp.html` — 介绍 DevTools MCP
- `site/about.html` — 关于参加者（常乐祺）

如需部署到 GitHub Pages，可将 `site/` 目录的内容推送到 gh-pages 分支或使用 GitHub Actions 自动部署。