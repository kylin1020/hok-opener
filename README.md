# 王者荣耀开局助手

这是一个基于 [Next.js](https://nextjs.org) 开发的王者荣耀自定义开局工具。

## 功能特点

- 支持多种游戏模式选择(5v5标准、征召等)
- 英雄禁用功能
- 自定义游戏参数:
  - 英雄属性(等级、攻击力、冷却等)
  - 兵线/野怪属性
  - 防御塔/水晶属性
- 支持按阵营或单个英雄配置
- 配置方案本地保存
- 响应式界面设计

## 开始使用

首先,运行开发服务器:

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
# 或
bun dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

## 技术栈

- [Next.js](https://nextjs.org/) - React 框架
- [Tailwind CSS](https://tailwindcss.com) - CSS 框架
- [shadcn/ui](https://ui.shadcn.com) - UI 组件库
- TypeScript - 类型安全
- LocalStorage - 本地数据持久化

## 项目结构

```
.
├── app/                # Next.js 应用目录
│   ├── page.tsx       # 主页面
│   └── layout.tsx     # 布局组件
├── components/        # React 组件
├── types/            # TypeScript 类型定义
└── public/           # 静态资源
```

## 贡献

欢迎提交 Issue 和 Pull Request!

## 许可

MIT License
