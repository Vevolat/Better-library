

[![GitHub stars](https://img.shields.io/github/stars/Vevolat/Orange-Isle)](https://github.com/Vevolat/Orange-Isle/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Vevolat/Orange-Isle)](https://github.com/Vevolat/Orange-Isle/network)
[![GitHub license](https://img.shields.io/github/license/Vevolat/Orange-Isle)](https://github.com/Vevolat/Orange-Isle/blob/master/LICENSE)

## 项目简介

这是一个功能强大的基于Three.js的3D模型本地查看器，支持直接从本地文件系统加载和查看大型3D模型，无需后端服务器支持。该项目特别优化了大型3D模型（超过2.5GB）的加载性能，通过分块加载、智能缓存和设备自适应技术，提供流畅的模型查看体验。

## 功能特点

- 🚀 **多格式支持**：兼容GLB、GLTF等主流3D模型格式
- 📁 **灵活的文件加载方式**：支持文件选择器和拖放上传功能
- 🔄 **分块加载技术**：针对大型模型（2.5GB+）实现高效的分块加载和渲染
- 🎮 **丰富的交互功能**：提供模型旋转、缩放、平移等完整交互体验
- 📊 **实时状态监控**：显示FPS、加载进度、网络速度和剩余时间
- 💾 **智能缓存系统**：本地缓存已加载资源，大幅提升重复访问速度
- 📱 **跨设备兼容**：自动检测设备性能并优化渲染策略
- ⚡ **性能优化**：包含多种渲染和加载优化技术，确保流畅体验
- 🔧 **调试支持**：内置加载日志和错误处理机制

## 快速开始

### 本地使用

1. 无需安装任何依赖，直接在现代浏览器中打开 `index.html` 文件
2. 系统将自动检测并加载 `mx2` 文件夹中的预分块模型
3. 使用鼠标或触摸屏与模型进行交互

### 在线访问

项目支持部署到GitHub Pages，可通过以下步骤进行部署：

1. 将项目推送到您的GitHub仓库
2. 在仓库设置中启用GitHub Pages功能
3. 选择主分支作为源
4. 等待几分钟后，即可通过生成的URL访问3D模型查看器

## 使用指南

### 交互控制

- **左键/单指拖动**：旋转模型视角
- **中键拖动**：平移模型位置
- **右键/滚轮**：缩放模型视图
- **加载进度界面**：显示详细的加载统计信息

### 文件组织

项目使用以下文件结构组织代码和资源：

```
├── index.html      # 主页面文件，包含所有JS和CSS代码
├── mx2/            # 预加载模型文件夹
│   ├── ______0000000.glb       # 模型分块文件（共40个）
│   ├── ______0000000.glb.rcInfo # 模型分块元数据
│   └── ...
├── .gitignore      # Git忽略配置文件
└── LICENSE         # 许可证文件
```

## 技术栈

- **前端核心**：HTML5, CSS3, JavaScript (ES6+)
- **3D渲染引擎**：[Three.js](https://threejs.org/) - 强大的WebGL库
- **模型加载器**：
  - [GLTFLoader](https://threejs.org/docs/#examples/en/loaders/GLTFLoader) - 加载GLB/GLTF格式
  - [DracoLoader](https://threejs.org/docs/#examples/en/loaders/DRACOLoader) - 压缩模型加载优化
- **交互控制**：[OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls) - 提供平滑的模型操作体验

## 性能优化特性

项目内置多种性能优化技术，特别是针对大型3D模型的加载和渲染：

1. **分块加载系统**：
   - 自动将大型模型分割为40个独立块进行并行加载
   - 基于几何中心计算加载优先级，优先加载可见区域
   - 动态调整并发加载数，充分利用浏览器性能

2. **智能缓存机制**：
   - 资源本地缓存，缓存时间24小时
   - 智能缓存过期策略，确保使用最新资源
   - 高效的缓存查找和管理

3. **渲染优化**：
   - 加载过程中动态调整渲染频率
   - 根据设备性能自动调整模型质量
   - 资源池管理，减少内存分配开销
   - 定期资源清理，防止内存泄漏

4. **设备自适应**：
   - 自动检测移动设备和低性能设备
   - 针对不同设备优化模型加载和渲染策略
   - 内存使用监控和优化

## 浏览器兼容性

| 浏览器 | 版本要求 | 支持程度 |
|--------|---------|---------|
| Chrome | 68+ | ✅ 完全支持 |
| Firefox | 60+ | ✅ 完全支持 |
| Safari | 14+ | ✅ 完全支持 |
| Edge | 79+ | ✅ 完全支持 |
| IE | 不支持 | ❌ 不兼容 |

> **注意**：由于大型3D模型对性能要求较高，建议使用最新版本的Chrome或Firefox浏览器获得最佳体验。

## 配置选项

项目支持通过修改 `index.html` 文件中的配置参数来调整性能和行为：

```javascript
// 性能优化设置
let maxConcurrentChunkLoads = 6; // 最大并发加载数
const maxRetries = 3; // 最大重试次数

// 资源缓存设置
const CACHE_ENABLED = true; // 是否启用缓存
const CACHE_EXPIRE_TIME = 24 * 60 * 60 * 1000; // 缓存过期时间（毫秒）

// 预加载设置
const PRELOAD_CHUNK_COUNT = 8; // 预加载的块数量
const PREFETCH_ENABLED = true; // 是否启用资源预获取
```

## 常见问题解答

### Q: 为什么模型加载速度很慢？
**A**: 大型3D模型（2.5GB+）需要一定时间加载。您可以尝试：
- 使用高速网络连接
- 关闭其他占用带宽的应用程序
- 首次加载后，后续访问将利用缓存大幅提升速度

### Q: 浏览器提示内存不足怎么办？
**A**: 这是由于模型过大导致的，系统会自动切换到低内存模式：
- 减少模型细节
- 降低材质质量
- 简化几何体

### Q: 模型显示不完整或有错误怎么办？
**A**: 系统会自动重试加载失败的模型块，如多次尝试后仍失败：
- 检查网络连接
- 刷新页面重新加载
- 对于关键块，系统会创建替代几何体确保基本显示

## 开发说明

如果您想进一步开发或定制此项目，请遵循以下指南：

1. 保留核心文件结构
2. 如需添加新功能，建议在现有代码结构基础上扩展
3. 优化修改时，请确保兼容不同性能的设备
4. 添加新的3D模型时，需要按照现有分块格式进行处理

## 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 致谢

感谢以下开源项目和库的支持：

- [Three.js](https://threejs.org/) - 提供强大的WebGL渲染能力
- [GitHub](https://github.com/) - 代码托管和协作平台
- [所有贡献者](https://github.com/Vevolat/Orange-Isle/graphs/contributors) - 感谢您的支持和贡献

## 联系我们

如有任何问题或建议，欢迎通过以下方式联系：

- GitHub Issues: [提交问题](https://github.com/Vevolat/Orange-Isle/issues)
- GitHub Discussions: [参与讨论](https://github.com/Vevolat/Orange-Isle/discussions)
