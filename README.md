# AI Portfolio Preview

这是 AI 视觉作品集的本地静态预览版，可直接部署到 GitHub Pages。

## 本地运行

在当前目录执行：

```powershell
python -m http.server 4173
```

然后访问 `http://127.0.0.1:4173/`。

## 正式使用前需要替换

- 将 `assets/` 中的示例 WebP 图片替换为真实作品，建议保持现有文件名与宽高比例。
- 在 `index.html` 中替换姓名、个人介绍、项目说明和工具信息。
- 将 `hello@example.com` 修改为真实邮箱。
- 如需增加作品，在 `.archive-grid` 内复制一个 `figure.archive-item`。
- 项目详情页尚未建立，当前“项目案例”按钮仅显示占位提示。

## 文件说明

- `index.html`：网站内容和页面结构
- `styles.css`：视觉系统、布局与响应式样式
- `script.js`：导航、筛选、图片查看器和滚动动效
- `assets/`：作品图片

站点没有外部框架或运行时依赖，可作为 GitHub Pages 静态网站直接发布。
