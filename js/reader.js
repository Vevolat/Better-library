// 全局变量
let currentChapterIndex = 0;
let chapterList = [];
let bookTitle = "乔布斯传";
let bookAuthor = "沃尔特·艾萨克森";

// DOM元素引用
const contentArea = document.getElementById('contentArea');
const content = document.getElementById('content');
const loadingIndicator = document.getElementById('loadingIndicator');
const prevChapterBtn = document.getElementById('prevChapterBtn');
const nextChapterBtn = document.getElementById('nextChapterBtn');
const currentChapterElement = document.getElementById('currentChapter');
const bookTitleElement = document.getElementById('bookTitle');
const bookAuthorElement = document.getElementById('bookAuthor');
const chapterListBtn = document.getElementById('chapterListBtn');
const chapterListModal = document.getElementById('chapterListModal');
const chapterListElement = document.getElementById('chapterList');
const closeChapterListBtn = document.getElementById('closeChapterListBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', async () => {
    // 从URL参数获取书籍信息
    const urlParams = new URLSearchParams(window.location.search);
    const urlBookTitle = urlParams.get('bookTitle');
    const urlChapterIndex = urlParams.get('chapter');
    
    if (urlBookTitle) {
        bookTitle = urlBookTitle;
    }
    
    if (urlChapterIndex && !isNaN(parseInt(urlChapterIndex))) {
        currentChapterIndex = parseInt(urlChapterIndex);
    }
    
    // 设置书籍信息
    if (bookTitleElement) bookTitleElement.textContent = bookTitle;
    if (bookAuthorElement) bookAuthorElement.textContent = bookAuthor;
    
    // 获取章节列表
    await initializeChapterList();
    
    // 加载当前章节
    loadChapter(currentChapterIndex);
    
    // 添加事件监听
    addEventListeners();
});

// 获取章节列表
async function initializeChapterList() {
    // 注意：由于浏览器的安全限制，我们不能直接读取本地文件系统的文件列表
    // 这里我们硬编码章节列表，实际应用中应该通过服务器API获取
    chapterList = [
        {
            id: '0',
            title: '序 前言 本书是如何诞生的',
            filePath: '/book/乔布斯传/序 前言 本书是如何诞生的.md'
        },
        {
            id: '1',
            title: '第一章 童年 被遗弃和被选择',
            filePath: '/book/乔布斯传/第一章 童年 被遗弃和被选择.md'
        },
        {
            id: '2',
            title: '第二章 奇特的一对 两个史蒂夫',
            filePath: '/book/乔布斯传/第二章 奇特的一对 两个史蒂夫.md'
        },
        {
            id: '3',
            title: '第三章 出离 顿悟，修行……',
            filePath: '/book/乔布斯传/第三章 出离 顿悟，修行…….md'
        },
        {
            id: '4',
            title: '第四章 雅达利与印度 禅宗与游戏设计艺术',
            filePath: '/book/乔布斯传/第四章 雅达利与印度 禅宗与游戏设计艺术.md'
        },
        {
            id: '5',
            title: '第五章 Apple I 开机，启动，接入',
            filePath: '/book/乔布斯传/第五章 Apple I 开机，启动，接入.md'
        },
        {
            id: '6',
            title: '第六章 Apple II 新时代的曙光',
            filePath: '/book/乔布斯传/第六章 Apple II 新时代的曙光.md'
        },
        {
            id: '7',
            title: '第七章 克里斯安和丽萨 被遗弃者…… 被遗弃者……',
            filePath: '/book/乔布斯传/第七章 克里斯安和丽萨 被遗弃者…… 被遗弃者…….md'
        },
        {
            id: '8',
            title: '第八章 施乐和丽萨 图形用户界面',
            filePath: '/book/乔布斯传/第八章 施乐和丽萨 图形用户界面.md'
        },
        {
            id: '9',
            title: '第九章 上市 名利双收',
            filePath: '/book/乔布斯传/第九章 上市 名利双收.md'
        },
        {
            id: '10',
            title: '第十章 Mac诞生了 你说你想要一场革命……',
            filePath: '/book/乔布斯传/第十章 Mac诞生了 你说你想要一场革命…….md'
        },
        {
            id: '11',
            title: '第十一章 现实扭曲力场 以自己的游戏规则行事',
            filePath: '/book/乔布斯传/第十一章 现实扭曲力场 以自己的游戏规则行事.md'
        },
        {
            id: '12',
            title: '第十二章 设计 大道至简',
            filePath: '/book/乔布斯传/第十二章 设计 大道至简.md'
        },
        {
            id: '13',
            title: '第十三章 制造Mac 过程就是奖励',
            filePath: '/book/乔布斯传/第十三章 制造Mac 过程就是奖励.md'
        },
        {
            id: '14',
            title: '第十四章 斯卡利来了 百事挑战',
            filePath: '/book/乔布斯传/第十四章 斯卡利来了 百事挑战.md'
        },
        {
            id: '15',
            title: '第十五章麦 金塔电脑的发布 在宇宙中留下印迹',
            filePath: '/book/乔布斯传/第十五章麦 金塔电脑的发布 在宇宙中留下印迹.md'
        }
    ];
    
    // 更新章节按钮状态
    updateChapterButtons();
    
    // 生成章节列表
    generateChapterList();
}

// 加载章节内容
async function loadChapter(index) {
    if (!chapterList || index < 0 || index >= chapterList.length) return;
    
    // 更新当前章节索引
    currentChapterIndex = index;
    const chapter = chapterList[index];
    
    // 更新当前章节显示
    if (currentChapterElement) {
        currentChapterElement.textContent = `正在阅读: ${chapter.title}`;
    }
    
    // 显示加载状态
    content.classList.add('hidden');
    loadingIndicator.classList.remove('hidden');
    
    try {
        // 读取Markdown文件内容
        const markdownContent = await readMarkdownFile(chapter.filePath);
        
        // 将Markdown转换为HTML
        const htmlContent = renderMarkdown(markdownContent);
        
        // 更新内容显示
        if (content) {
            content.innerHTML = htmlContent;
        }
        
        // 隐藏加载状态，显示内容
        content.classList.remove('hidden');
        loadingIndicator.classList.add('hidden');
        
        // 添加淡入效果
        contentArea.classList.add('opacity-0');
        setTimeout(() => {
            contentArea.classList.remove('opacity-0');
        }, 10);
        
        // 滚动到页面顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // 更新章节按钮状态
        updateChapterButtons();
        
        // 更新进度条
        updateProgressBar();
        
        // 记录阅读进度
        saveReadingProgress();
    } catch (error) {
        console.error('加载章节失败:', error);
        if (content) {
            content.innerHTML = `
                <div class="text-center py-10">
                    <i class="fa fa-exclamation-circle text-4xl text-red-500 mb-4"></i>
                    <h3 class="text-xl font-bold mb-2">加载章节失败</h3>
                    <p>无法加载章节内容，请检查网络连接或文件路径是否正确。</p>
                </div>
            `;
            content.classList.remove('hidden');
            loadingIndicator.classList.add('hidden');
        }
    }
}

// 读取Markdown文件内容
async function readMarkdownFile(filePath) {
    try {
        // 在实际环境中，由于浏览器安全限制，我们无法直接读取本地文件
        // 这里我们使用fetch API尝试获取文件内容
        // 注意：这在本地文件系统（file://）中会因为CORS策略失败
        // 必须通过HTTP服务器（如python -m http.server）来访问
        const response = await fetch(filePath);
        
        if (!response.ok) {
            throw new Error(`HTTP错误! 状态码: ${response.status}`);
        }
        
        return await response.text();
    } catch (error) {
        console.error('读取文件失败:', error);
        
        // 在实际应用中，这里可以返回一个友好的错误消息或者模拟内容
        // 由于安全限制，我们提供一个示例内容
        return `# ${filePath.split('/').pop().replace('.md', '')}\n\n由于浏览器的安全限制，无法直接读取本地文件。请通过HTTP服务器访问本页面，例如使用Python的http.server模块：\n\n1. 打开命令行\n2. 进入项目目录\n3. 运行命令：python -m http.server 8000\n4. 在浏览器中访问：http://localhost:8000/BookReader.html\n\n这样就可以正常加载和阅读本地Markdown文件了。`;
    }
}

// 简单的Markdown渲染函数
function renderMarkdown(text) {
    // 这是一个简化版的Markdown渲染器
    // 在实际应用中，你可以使用专门的Markdown库如marked.js
    let html = text
        // 标题
        .replace(/# (.*?)$/gm, '<h1 class="text-2xl font-bold mt-6 mb-4">$1</h1>')
        .replace(/## (.*?)$/gm, '<h2 class="text-xl font-bold mt-5 mb-3">$1</h2>')
        .replace(/### (.*?)$/gm, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
        // 强调
        .replace(/\*\*(.*?)\*\*/gm, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/gm, '<em>$1</em>')
        // 删除线
        .replace(/~~(.*?)~~/gm, '<del>$1</del>')
        // 代码行
        .replace(/`(.*?)`/gm, '<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">$1</code>')
        // 引用
        .replace(/^> (.*?)$/gm, '<blockquote class="border-l-4 border-accent pl-4 italic text-gray-600 dark:text-gray-400 my-4">$1</blockquote>');
    
    // 处理列表
    html = html.replace(/^\* (.*?)$/gm, '<li>$1</li>')
               .replace(/^\d+\. (.*?)$/gm, '<li>$1</li>')
               .replace(/<li>(.*?)<\/li>\s*(?=<li>|$)/gs, '<ul class="list-disc pl-6 my-4">$&</ul>')
               .replace(/<ul>(.*?)<\/ul>/gs, (match, content) => {
                   // 确保有序列表被正确识别
                   if (content.includes('<li>') && /^\s*\d+\./.test(content.split('<li>')[1])) {
                       return match.replace('ul', 'ol').replace('list-disc', 'list-decimal');
                   }
                   return match;
               });
    
    // 处理段落（确保不在标题、列表、引用等标签内）
    html = html.replace(/^(?!<h\d>|<li>|<blockquote>|<ul>|<ol>|<code>)(.*?)$/gm, '<p>$1</p>');
    
    // 修复换行
    html = html.replace(/\n\s*\n/g, '</p><p>');
    
    // 清理多余的标签
    html = html.replace(/<p><\/(h\d|blockquote|ul|ol)>/g, '</$1>')
               .replace(/<(h\d|blockquote|ul|ol)><p>/g, '<$1>')
               .replace(/<p><\/li>/g, '</li>')
               .replace(/<li><p>/g, '<li>');
    
    return html;
}

// 更新章节按钮状态
function updateChapterButtons() {
    if (prevChapterBtn) {
        prevChapterBtn.disabled = currentChapterIndex <= 0;
        if (currentChapterIndex <= 0) {
            prevChapterBtn.classList.add('disabled:opacity-50', 'disabled:cursor-not-allowed');
        } else {
            prevChapterBtn.classList.remove('disabled:opacity-50', 'disabled:cursor-not-allowed');
        }
    }
    
    if (nextChapterBtn) {
        nextChapterBtn.disabled = currentChapterIndex >= chapterList.length - 1;
        if (currentChapterIndex >= chapterList.length - 1) {
            nextChapterBtn.classList.add('disabled:opacity-50', 'disabled:cursor-not-allowed');
        } else {
            nextChapterBtn.classList.remove('disabled:opacity-50', 'disabled:cursor-not-allowed');
        }
    }
}

// 生成章节列表
function generateChapterList() {
    if (!chapterListElement) return;
    
    // 清空章节列表
    chapterListElement.innerHTML = '';
    
    // 添加章节项
    chapterList.forEach((chapter, index) => {
        const chapterItem = document.createElement('div');
        chapterItem.className = `py-3 px-4 border-b dark:border-gray-800 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${index === currentChapterIndex ? 'bg-primary/10 text-primary font-medium' : ''}`;
        chapterItem.textContent = chapter.title;
        
        // 添加点击事件
        chapterItem.addEventListener('click', () => {
            loadChapter(index);
            chapterListModal.classList.add('hidden');
        });
        
        chapterListElement.appendChild(chapterItem);
    });
}

// 添加事件监听
function addEventListeners() {
    // 上一章按钮
    if (prevChapterBtn) {
        prevChapterBtn.addEventListener('click', () => {
            if (currentChapterIndex > 0) {
                loadChapter(currentChapterIndex - 1);
            }
        });
    }
    
    // 下一章按钮
    if (nextChapterBtn) {
        nextChapterBtn.addEventListener('click', () => {
            if (currentChapterIndex < chapterList.length - 1) {
                loadChapter(currentChapterIndex + 1);
            }
        });
    }
    
    // 章节列表按钮
    if (chapterListBtn && chapterListModal) {
        chapterListBtn.addEventListener('click', () => {
            chapterListModal.classList.remove('hidden');
            generateChapterList(); // 确保列表是最新的
        });
    }
    
    // 关闭章节列表按钮
    if (closeChapterListBtn && chapterListModal) {
        closeChapterListBtn.addEventListener('click', () => {
            chapterListModal.classList.add('hidden');
        });
    }
    
    // 关闭模态框按钮
    if (closeModalBtn && chapterListModal) {
        closeModalBtn.addEventListener('click', () => {
            chapterListModal.classList.add('hidden');
        });
    }
    
    // 点击模态框外部关闭
    if (chapterListModal) {
        chapterListModal.addEventListener('click', (e) => {
            if (e.target === chapterListModal) {
                chapterListModal.classList.add('hidden');
            }
        });
    }
    
    // 滚动事件 - 更新进度条
    window.addEventListener('scroll', updateProgressBar);
}

// 更新进度条
function updateProgressBar() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
}

// 保存阅读进度
function saveReadingProgress() {
    try {
        const progress = {
            bookTitle: bookTitle,
            chapterIndex: currentChapterIndex,
            chapterTitle: chapterList[currentChapterIndex]?.title,
            timestamp: new Date().getTime()
        };
        localStorage.setItem('readingProgress', JSON.stringify(progress));
    } catch (error) {
        console.error('保存阅读进度失败:', error);
    }
}

// 加载阅读进度
function loadReadingProgress() {
    try {
        const savedProgress = localStorage.getItem('readingProgress');
        if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            if (progress.bookTitle === bookTitle && progress.chapterIndex >= 0 && progress.chapterIndex < chapterList.length) {
                currentChapterIndex = progress.chapterIndex;
                return true;
            }
        }
    } catch (error) {
        console.error('加载阅读进度失败:', error);
    }
    return false;
}

// 移动端菜单切换（从script.js复制，确保功能一致）
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        // 切换图标
        const icon = mobileMenuToggle.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// 滚动到顶部按钮点击事件
const scrollToTopBtn = document.getElementById('backToTop');

if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
