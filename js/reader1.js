// 全局变量 - 已正确配置为加载"三体1：地球往事"
let currentChapterIndex = 0;
let chapterList = [];
let bookTitle = "三体1：地球往事";
let bookAuthor = "刘慈欣";

// DOM元素引用 - 不声明loadingIndicator以避免重复声明
let contentArea = document.getElementById('contentArea');
let content = document.getElementById('content');
// 直接使用window.loadingIndicator，不单独声明
let prevChapterBtn = document.getElementById('prevChapterBtn');
let nextChapterBtn = document.getElementById('nextChapterBtn');
let prevChapterBtnBottom = document.getElementById('prevChapterBtnBottom');
let nextChapterBtnBottom = document.getElementById('nextChapterBtnBottom');
let currentChapterElement = document.getElementById('currentChapter');
let bookTitleElement = document.getElementById('bookTitle');
let bookAuthorElement = document.getElementById('bookAuthor');
let chapterListBtn = document.getElementById('chapterListBtn');
let chapterListModal = document.getElementById('chapterListModal');
let chapterListElement = document.getElementById('chapterList');
let chapterListContainer = document.getElementById('chapterListContainer');
let closeChapterListBtn = document.getElementById('closeChapterListBtn');
let closeModalBtn = document.getElementById('closeModalBtn');

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
            title: '1.疯狂年代',
            filePath: '/book/三体1：地球往事/1.疯狂年代.md'
        },
        {
            id: '1',
            title: '2.寂静的春天',
            filePath: '/book/三体1：地球往事/2.寂静的春天.md'
        },
        {
            id: '2',
            title: '3.红岸之一',
            filePath: '/book/三体1：地球往事/3.红岸之一.md'
        },
        {
            id: '3',
            title: '4.科学边界',
            filePath: '/book/三体1：地球往事/4.科学边界.md'
        },
        {
            id: '4',
            title: '5.台球',
            filePath: '/book/三体1：地球往事/5.台球.md'
        },
        {
            id: '5',
            title: '6.射手和农场主',
            filePath: '/book/三体1：地球往事/6.射手和农场主.md'
        },
        {
            id: '6',
            title: '7.三体、周文王、长夜',
            filePath: '/book/三体1：地球往事/7.三体、周文王、长夜.md'
        },
        {
            id: '7',
            title: '8.叶文洁',
            filePath: '/book/三体1：地球往事/8.叶文洁.md'
        },
        {
            id: '8',
            title: '9.宇宙闪烁',
            filePath: '/book/三体1：地球往事/9.宇宙闪烁.md'
        },
        {
            id: '9',
            title: '10.大史',
            filePath: '/book/三体1：地球往事/10.大史.md'
        },
        {
            id: '10',
            title: '11.三体、墨子、烈焰',
            filePath: '/book/三体1：地球往事/11.三体、墨子、烈焰.md'
        },
        {
            id: '11',
            title: '12.红岸之二',
            filePath: '/book/三体1：地球往事/12.红岸之二.md'
        },
        {
            id: '12',
            title: '13.红岸之三',
            filePath: '/book/三体1：地球往事/13.红岸之三.md'
        },
        {
            id: '13',
            title: '14.红岸之四',
            filePath: '/book/三体1：地球往事/14.红岸之四.md'
        },
        {
            id: '14',
            title: '15.三体、哥白尼、宇宙橄榄球、三日凌空',
            filePath: '/book/三体1：地球往事/15.三体、哥白尼、宇宙橄榄球、三日凌空.md'
        },
        {
            id: '15',
            title: '16.三体问题',
            filePath: '/book/三体1：地球往事/16.三体问题.md'
        },
        {
            id: '16',
            title: '17.三体、牛顿、冯·诺依曼、秦始皇、三日连珠',
            filePath: '/book/三体1：地球往事/17.三体、牛顿、冯·诺依曼、秦始皇、三日连珠.md'
        },
        {
            id: '17',
            title: '18.聚会',
            filePath: '/book/三体1：地球往事/18.聚会.md'
        },
        {
            id: '18',
            title: '19.三体、爱因斯坦、单摆、大撕裂',
            filePath: '/book/三体1：地球往事/19.三体、爱因斯坦、单摆、大撕裂.md'
        },
        {
            id: '19',
            title: '20.三体、远征',
            filePath: '/book/三体1：地球往事/20.三体、远征.md'
        },
        {
            id: '20',
            title: '21.地球叛军',
            filePath: '/book/三体1：地球往事/21.地球叛军.md'
        },
        {
            id: '21',
            title: '22.红岸之五',
            filePath: '/book/三体1：地球往事/22.红岸之五.md'
        },
        {
            id: '22',
            title: '23.红岸之六',
            filePath: '/book/三体1：地球往事/23.红岸之六.md'
        },
        {
            id: '23',
            title: '24.叛乱',
            filePath: '/book/三体1：地球往事/24.叛乱.md'
        },
        {
            id: '24',
            title: '25.雷志成、杨卫宁之死',
            filePath: '/book/三体1：地球往事/25.雷志成、杨卫宁之死.md'
        },
        {
            id: '25',
            title: '26.无人忏悔',
            filePath: '/book/三体1：地球往事/26.无人忏悔.md'
        },
        {
            id: '26',
            title: '27.伊文斯',
            filePath: '/book/三体1：地球往事/27.伊文斯.md'
        },
        {
            id: '27',
            title: '28.第二红岸基地',
            filePath: '/book/三体1：地球往事/28.第二红岸基地.md'
        },
        {
            id: '28',
            title: '29.地球三体运动',
            filePath: '/book/三体1：地球往事/29.地球三体运动.md'
        },
        {
            id: '29',
            title: '30.两个质子',
            filePath: '/book/三体1：地球往事/30.两个质子.md'
        },
        {
            id: '30',
            title: '31.古筝行动',
            filePath: '/book/三体1：地球往事/31.古筝行动.md'
        },
        {
            id: '31',
            title: '32.监听员',
            filePath: '/book/三体1：地球往事/32.监听员.md'
        },
        {
            id: '32',
            title: '33.智子',
            filePath: '/book/三体1：地球往事/33.智子.md'
        },
        {
            id: '33',
            title: '34.虫子',
            filePath: '/book/三体1：地球往事/34.虫子.md'
        },
        {
            id: '34',
            title: '35.尾声、遗址',
            filePath: '/book/三体1：地球往事/35.尾声、遗址.md'
        }
    ];
    
    // 更新章节按钮状态
    updateChapterButtons();
    
    // 生成章节列表（模态框和顶部可见列表）
    generateChapterList();
    generateVisibleChapterList();
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
        .replace(/`(.*?)`/gm, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>')
        // 引用
        .replace(/^> (.*?)$/gm, '<blockquote class="border-l-4 border-accent pl-4 italic text-gray-600 my-4">$1</blockquote>');
    
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
    // 更新顶部按钮
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
    
    // 更新底部按钮
    if (prevChapterBtnBottom) {
        prevChapterBtnBottom.disabled = currentChapterIndex <= 0;
        if (currentChapterIndex <= 0) {
            prevChapterBtnBottom.classList.add('disabled:opacity-50', 'disabled:cursor-not-allowed');
        } else {
            prevChapterBtnBottom.classList.remove('disabled:opacity-50', 'disabled:cursor-not-allowed');
        }
    }
    
    if (nextChapterBtnBottom) {
        nextChapterBtnBottom.disabled = currentChapterIndex >= chapterList.length - 1;
        if (currentChapterIndex >= chapterList.length - 1) {
            nextChapterBtnBottom.classList.add('disabled:opacity-50', 'disabled:cursor-not-allowed');
        } else {
            nextChapterBtnBottom.classList.remove('disabled:opacity-50', 'disabled:cursor-not-allowed');
        }
    }
    
    // 更新可见章节列表
    generateVisibleChapterList();
}

// 生成章节列表（模态框）
function generateChapterList() {
    if (!chapterListElement) return;
    
    // 清空章节列表
    chapterListElement.innerHTML = '';
    
    // 添加章节项
    chapterList.forEach((chapter, index) => {
        const chapterItem = document.createElement('div');
        chapterItem.className = `py-3 px-4 border-b cursor-pointer transition-colors hover:bg-gray-50 ${index === currentChapterIndex ? 'bg-primary/10 text-primary font-medium' : ''}`;
        chapterItem.textContent = chapter.title;
        
        // 添加点击事件
        chapterItem.addEventListener('click', () => {
            loadChapter(index);
            chapterListModal.classList.add('hidden');
        });
        
        chapterListElement.appendChild(chapterItem);
    });
}

// 生成可见的章节列表（页面顶部）
function generateVisibleChapterList() {
    if (!chapterListContainer) return;
    
    // 清空章节列表
    chapterListContainer.innerHTML = '';
    
    // 添加章节项（创建一个水平滚动的章节列表）
    chapterList.forEach((chapter, index) => {
        const chapterItem = document.createElement('div');
        chapterItem.className = `px-3 py-2 rounded-md cursor-pointer whitespace-nowrap transition-all duration-300 ${index === currentChapterIndex ? 'bg-primary text-white font-medium scale-105 shadow-md' : 'bg-white/70 dark:bg-gray-700/70 hover:bg-primary/10 dark:hover:bg-primary/20'}`;
        chapterItem.textContent = `第${parseInt(chapter.id) + 1}章`;
        
        // 添加点击事件
        chapterItem.addEventListener('click', () => {
            loadChapter(index);
        });
        
        chapterListContainer.appendChild(chapterItem);
    });

    // 如果有当前章节，滚动到当前章节位置
    if (currentChapterIndex >= 0 && chapterListContainer.children[currentChapterIndex]) {
        setTimeout(() => {
            chapterListContainer.scrollTo({
                left: chapterListContainer.children[currentChapterIndex].offsetLeft - chapterListContainer.clientWidth / 2 + chapterListContainer.children[currentChapterIndex].clientWidth / 2,
                behavior: 'smooth'
            });
        }, 100);
    }
}

// 添加事件监听
function addEventListeners() {
    // 上一章按钮（顶部）
    if (prevChapterBtn) {
        prevChapterBtn.addEventListener('click', () => {
            if (currentChapterIndex > 0) {
                loadChapter(currentChapterIndex - 1);
            }
        });
    }
    
    // 下一章按钮（顶部）
    if (nextChapterBtn) {
        nextChapterBtn.addEventListener('click', () => {
            if (currentChapterIndex < chapterList.length - 1) {
                loadChapter(currentChapterIndex + 1);
            }
        });
    }
    
    // 上一章按钮（底部）
    if (prevChapterBtnBottom) {
        prevChapterBtnBottom.addEventListener('click', () => {
            if (currentChapterIndex > 0) {
                loadChapter(currentChapterIndex - 1);
            }
        });
    }
    
    // 下一章按钮（底部）
    if (nextChapterBtnBottom) {
        nextChapterBtnBottom.addEventListener('click', () => {
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
