// DOM元素引用
const navbar = document.getElementById('navbar');
const menuBtn = document.getElementById('menuBtn');
const scrollToTopBtn = document.getElementById('backToTop');
const heroTitle = document.getElementById('heroTitle');
const heroDesc = document.getElementById('heroDesc');
const heroBtn = document.getElementById('heroBtn');
const homeSection = document.getElementById('home');
const introScreen = document.getElementById('introScreen');
const scrollIndicator = document.getElementById('scrollIndicator');
const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');
const mobileMenu = document.getElementById('mobileMenu');
const bookshelfSection = document.getElementById('bookshelf');
const bookshelfTitle = document.getElementById('bookshelfTitle');

// Bookshelf 页面特定元素
const booksGrid = document.getElementById('booksGrid');
const loadingIndicator = document.getElementById('loadingIndicator');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const categoryButtons = document.querySelectorAll('.category-btn');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');

// 检查元素是否存在的辅助函数
function getElement(id) {
    return document.getElementById(id);
}

// 获取可能不存在的元素
const articleCards = document.querySelectorAll('.article-card') || [];
const bookCards = document.querySelectorAll('.book-card') || [];
const articlesTitle = getElement('articlesTitle');
const loadMoreBtn = getElement('loadMoreBtn');
const aboutImage = getElement('aboutImage');
const aboutContent = getElement('aboutContent');
const contactTitle = getElement('contactTitle');
const contactForm = getElement('contactForm');
const contactFormElement = contactForm ? contactForm.querySelector('form') : null;

// 创建进度条
const progressContainer = document.createElement('div');
progressContainer.className = 'progress-container';
const progressBar = document.createElement('div');
progressBar.className = 'progress-bar';
progressContainer.appendChild(progressBar);
document.body.appendChild(progressContainer);

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    // 处理初始欢迎页面和英雄区域的显示/隐藏
    if (introScreen && scrollPosition > 10) {
        introScreen.classList.add('fade-out');
        if (homeSection) {
            setTimeout(() => {
                homeSection.classList.remove('intro-hidden');
                homeSection.classList.add('intro-visible');
                // 显示英雄区域的元素
                if (heroTitle) heroTitle.classList.add('animate-fade-in');
                setTimeout(() => {
                    if (heroDesc) heroDesc.classList.add('animate-fade-in');
                }, 300);
                setTimeout(() => {
                    if (heroBtn) heroBtn.classList.add('animate-fade-in');
                }, 600);
            }, 500);
        }
        // 移除滚动事件监听，只处理一次
        window.removeEventListener('scroll', arguments.callee);
    }
    
    // 导航栏背景变化
    if (scrollPosition > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
    
    // 进度条更新
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
    
    // 滚动到顶部按钮显示/隐藏
    if (scrollPosition > 300) {
        scrollToTopBtn.classList.remove('opacity-0', 'invisible');
        scrollToTopBtn.classList.add('opacity-100', 'visible');
    } else {
        scrollToTopBtn.classList.remove('opacity-100', 'visible');
        scrollToTopBtn.classList.add('opacity-0', 'invisible');
    }
    
    // 检查元素是否在视口中并触发动画（只对存在的元素进行操作）
    if (bookshelfTitle) checkVisibility(bookshelfTitle, 'animate-slide-in');
    if (articlesTitle) checkVisibility(articlesTitle, 'animate-slide-in');
    if (loadMoreBtn) checkVisibility(loadMoreBtn, 'animate-slide-in');
    if (aboutImage) checkVisibility(aboutImage, 'animate-slide-in');
    if (aboutContent) checkVisibility(aboutContent, 'animate-slide-in', 300);
    if (contactTitle) checkVisibility(contactTitle, 'animate-slide-in');
    if (contactForm) checkVisibility(contactForm, 'animate-slide-in', 300);
    
    // 文章卡片交错动画（只对存在的元素进行操作）
    if (articleCards.length > 0) {
        articleCards.forEach((card, index) => {
            if (isInViewport(card, 200)) {
                setTimeout(() => {
                    card.classList.add('animate-scale-in');
                    card.style.opacity = '1';
                }, index * 100);
            }
        });
    }
    
    // 书籍卡片交错动画（只对存在的元素进行操作）
    if (bookCards.length > 0) {
        bookCards.forEach((card, index) => {
            if (isInViewport(card, 200)) {
                setTimeout(() => {
                    card.classList.add('animate-scale-in');
                    card.style.opacity = '1';
                }, index * 100);
            }
        });
    }
});

// 移动端菜单切换
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
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 平滑滚动功能
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // 关闭移动端菜单（如果打开）
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                const icon = menuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            // 平滑滚动到目标位置
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 检查元素是否在视口中
function isInViewport(element, offset = 100) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
        rect.left >= 0 &&
        rect.bottom >= 0 &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// 检查可见性并触发动画
function checkVisibility(element, animationClass, delay = 0) {
    if (!element.classList.contains(animationClass) && isInViewport(element)) {
        setTimeout(() => {
            element.classList.add(animationClass);
            element.style.opacity = '1';
        }, delay);
    }
}

// 加载更多按钮点击事件（只对存在的元素进行操作）
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
        this.innerHTML = '<div class="loading-spinner mx-auto"></div>';
        
        // 模拟加载延迟
        setTimeout(() => {
            this.innerHTML = '加载更多';
            
            // 这里可以添加实际加载更多文章的逻辑
            alert('已加载所有文章');
        }, 1500);
    });
}

// 表单提交处理（只对存在的元素进行操作）
if (contactFormElement) {
    contactFormElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 简单的表单验证
        const name = getElement('name')?.value || '';
        const email = getElement('email')?.value || '';
        const message = getElement('message')?.value || '';
        
        if (!name || !email || !message) {
            alert('请填写所有必填字段');
            return;
        }
        
        // 模拟提交成功
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<div class="loading-spinner mx-auto"></div>';
        
        setTimeout(() => {
            this.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            alert('消息发送成功！感谢您的留言。');
        }, 1500);
    });
}

// 设置阅读模式
function setupReadingMode() {
    // 为BookReader.html页面自动应用阅读模式
    if (window.location.pathname.includes('BookReader01.html')) {
        const mainElement = document.querySelector('main');
        const contentArea = document.getElementById('contentArea');
        const navbar = document.getElementById('navbar');
        
        if (mainElement) mainElement.classList.add('reading-mode');
        if (contentArea) contentArea.classList.add('reading-mode');
        if (navbar) navbar.classList.add('reading-mode');
    }
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', () => {
    // 触发一次滚动事件以初始化状态
    window.dispatchEvent(new Event('scroll'));
    
    // 为文章卡片添加非线性动画（只对存在的元素进行操作）
    if (articleCards.length > 0) {
        articleCards.forEach(card => {
            const index = card.getAttribute('data-index');
            card.style.transitionDelay = `${index * 0.1}s`;
        });
    }
    
    // 为书籍卡片添加非线性动画（只对存在的元素进行操作）
    if (bookCards.length > 0) {
        bookCards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
        });
    }
    
    // 给图片添加加载动画
    document.querySelectorAll('img').forEach(img => {
        img.classList.add('img-loader');
        
        img.addEventListener('load', function() {
            setTimeout(() => {
                this.classList.remove('img-loader');
            }, 300);
        });
        
        // 如果图片已经加载完成
        if (img.complete) {
            setTimeout(() => {
                img.classList.remove('img-loader');
            }, 300);
        }
    });
    
    // 添加鼠标跟随效果
    const cursor = document.createElement('div');
    cursor.className = 'hidden md:block fixed w-4 h-4 rounded-full bg-primary/30 pointer-events-none z-50 transition-transform duration-150';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX - 8}px`;
        cursor.style.top = `${e.clientY - 8}px`;
    });
    
    // 为链接和按钮添加交互效果
    document.querySelectorAll('a, button').forEach(element => {
        element.classList.add('ripple');
        
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.backgroundColor = 'rgba(74, 85, 104, 0.5)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.backgroundColor = 'rgba(74, 85, 104, 0.3)';
        });
    });
    
    // 为滚动指示器添加点击事件，快速进入主内容
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            window.scrollTo({
                top: 50,
                behavior: 'smooth'
            });
        });
    }
    
    // 模拟获取书籍数据的函数
function fetchBooks() {
    // 由于浏览器安全限制，无法直接读取本地文件系统
    // 这里模拟从 /book/ 目录下获取书籍数据
    return new Promise((resolve) => {
        // 模拟异步加载
        setTimeout(() => {
            // 这里硬编码一些书籍数据作为示例
            // 实际应用中，这些数据应该通过服务器API获取
            const books = [
                {
                    id: '1',
                    title: '乔布斯传',
                    author: '沃尔特·艾萨克森',
                    category: 'biography',
                    coverPath: '/book/乔布斯传/qiaobusi.jpg', // 留空将显示默认图标
                    description: '史蒂夫·乔布斯唯一授权的官方传记，讲述了从苹果公司创立到皮克斯动画的传奇一生。',
                    filePath: '/book/乔布斯传/序 前言 本书是如何诞生的.md',
                    rating: 4.8,
                    reviewCount: 1254
                },
                {
                    id: '2',
                    title: '三体1：地球往事',
                    author: '刘慈欣',
                    category: 'fiction', // 修改为已有的分类
                    coverPath: '/book/三体1：地球往事/santi-1.jpg',
                    description: '刘慈欣的科幻代表作三体系列第一部，讲述了人类文明与三体文明的首次接触。',
                    filePath: '/book/三体1：地球往事/1.疯狂年代.md',
                    rating: 4.9,
                    reviewCount: 2351
                }
            ];
            resolve(books);
        }, 1000);
    });
}

// 渲染书籍到页面
function renderBooks(books) {
    if (!booksGrid || !loadingIndicator || !emptyState) return;
    
    // 清空加载状态
    loadingIndicator.innerHTML = '';
    
    // 如果没有书籍，显示空状态
    if (books.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    }
    
    // 隐藏空状态
    emptyState.classList.add('hidden');
    
    // 渲染书籍卡片
    books.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl opacity-0 transform translate-y-4';
        bookCard.style.transitionDelay = `${index * 100}ms`;
        
        // 设置卡片内容
        bookCard.innerHTML = `
            <div class="h-48 bg-primary/10 flex items-center justify-center">
                ${book.coverPath ? 
                    `<img src="${book.coverPath}" alt="${book.title}" class="max-h-full max-w-full object-contain p-4">` : 
                    `<i class="fa fa-book text-6xl text-primary/50"></i>`
                }
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold mb-2 line-clamp-1">${book.title}</h3>
                <p class="text-accent mb-4 line-clamp-1">${book.author}</p>
                <div class="flex items-center mb-4">
                    <div class="text-yellow-500">
                        ${generateStarRating(book.rating)}
                    </div>
                    <span class="ml-2 text-sm text-accent">${book.rating}</span>
                    <span class="mx-2 text-gray-300">•</span>
                    <span class="text-sm text-accent">${book.reviewCount} reviews</span>
                </div>
                <p class="text-gray-600 mb-4 line-clamp-2 dark:text-gray-300">${book.description}</p>
                <button data-filepath="${book.filePath}" data-booktitle="${book.title}" class="read-book-btn inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-accent transition-all duration-300 w-full text-center">
                    Read Now
                </button>
            </div>
        `;
        
        // 存储书籍信息到卡片元素
        bookCard.dataset.filepath = book.filePath;
        bookCard.dataset.booktitle = book.title;
        
        booksGrid.appendChild(bookCard);
        
        // 添加动画
        setTimeout(() => {
            bookCard.classList.remove('opacity-0', 'translate-y-4');
        }, 100);
    });
    
    // 添加书籍卡片点击事件监听
    document.querySelectorAll('.book-card').forEach(card => {
        card.addEventListener('click', function() {
            const filePath = this.getAttribute('data-filepath');
            const bookTitle = this.getAttribute('data-booktitle');
            openBookReader(filePath, bookTitle);
        });
    });
    
    // 确保按钮点击时也能正常工作（阻止冒泡避免重复触发）
    document.querySelectorAll('.read-book-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // 阻止事件冒泡到卡片
            const filePath = this.getAttribute('data-filepath');
            const bookTitle = this.getAttribute('data-booktitle');
            openBookReader(filePath, bookTitle);
        });
    });
}

// 简单的Markdown渲染函数
function renderMarkdown(text) {
    // 这是一个简化版的Markdown渲染器
    // 在实际应用中，你可以使用专门的Markdown库如marked.js
    return text
        .replace(/# (.*?)$/gm, '<h1 class="text-2xl font-bold mt-6 mb-4">$1</h1>')
        .replace(/## (.*?)$/gm, '<h2 class="text-xl font-bold mt-5 mb-3">$1</h2>')
        .replace(/### (.*?)$/gm, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
        .replace(/\*\*(.*?)\*\*/gm, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/gm, '<em>$1</em>')
        .replace(/\n/g, '<br>');
}

// 打开书籍阅读器 - 根据书籍类型跳转到相应的阅读器页面
function openBookReader(filePath, bookTitle) {
    // 根据书籍标题选择不同的阅读器页面
    let readerPage = '/BookReader02.html'; // 默认使用BookReader02.html作为后备页面
    
    if (bookTitle === '三体1：地球往事') {
        readerPage = '/BookReader01.html';
    } else if (bookTitle === '乔布斯传') {
        readerPage = '/BookReader02.html';
    }
    
    // 跳转到相应的阅读器页面，并通过URL参数传递书籍信息
    window.location.href = `${readerPage}?bookTitle=${encodeURIComponent(bookTitle)}&chapter=0`;
}

// 生成星级评分
function generateStarRating(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fa fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fa fa-star-half-o"></i>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="fa fa-star-o"></i>';
    }
    
    return stars;
}

// 初始化 Bookshelf 页面
async function initBookshelf() {
    console.log('initBookshelf() 函数被调用');
    console.log('booksGrid 元素:', booksGrid);
    if (!booksGrid) return; // 不是 Bookshelf 页面，不执行
    
    try {
        // 先获取DOM中已有的手动添加的书籍卡片
        const existingBookCards = Array.from(document.querySelectorAll('.book-card:not(#loadingIndicator)'));
        console.log('DOM中已有的书籍卡片数量:', existingBookCards.length);
        
        // 获取书籍数据
        const books = await fetchBooks();
        console.log('fetchBooks() 返回的数据:', books);
        
        // 存储原始书籍数据用于过滤
        let allBooks = [...books];
        console.log('allBooks 数据:', allBooks);
        
        // 显示调试信息
        const booksDataOutput = document.getElementById('booksDataOutput');
        if (booksDataOutput) {
            booksDataOutput.innerHTML = `<pre>${JSON.stringify(books, null, 2)}</pre>`;
        }
        
        // 只在没有手动添加的书籍卡片时才清空和渲染
        // 这样可以保留用户手动添加的书籍，比如三体1
        if (existingBookCards.length === 0) {
            renderBooks(books);
        } else {
            console.log('保留DOM中已有的书籍卡片，不重新渲染');
            // 为保留的书籍卡片添加事件监听
            document.querySelectorAll('.book-card').forEach(card => {
                card.addEventListener('click', function() {
                    const filePath = this.getAttribute('data-filepath');
                    const bookTitle = this.getAttribute('data-booktitle');
                    openBookReader(filePath, bookTitle);
                });
            });
            
            // 为保留的阅读按钮添加事件监听
            document.querySelectorAll('.read-book-btn').forEach(button => {
                button.addEventListener('click', function(e) {
                    e.stopPropagation(); // 阻止事件冒泡到卡片
                    const filePath = this.getAttribute('data-filepath');
                    const bookTitle = this.getAttribute('data-booktitle');
                    openBookReader(filePath, bookTitle);
                });
            });
            
            // 隐藏加载指示器
            const loadingIndicator = document.getElementById('loadingIndicator');
            if (loadingIndicator) {
                loadingIndicator.innerHTML = '';
            }
        }
        
        // 添加搜索功能
        if (searchInput) {
            searchInput.addEventListener('input', () => {
                const searchTerm = searchInput.value.toLowerCase().trim();
                filterBooks(allBooks, searchTerm);
            });
        }
        
        // 添加分类过滤功能
        if (categoryButtons.length > 0) {
            categoryButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // 更新按钮样式
                    categoryButtons.forEach(btn => {
                        btn.classList.remove('bg-primary', 'text-white');
                        btn.classList.add('bg-white', 'text-accent');
                    });
                    button.classList.remove('bg-white', 'text-accent');
                    button.classList.add('bg-primary', 'text-white');
                    
                    // 过滤书籍
                    const category = button.getAttribute('data-category');
                    let filteredBooks = allBooks;
                    
                    if (category !== 'all') {
                        filteredBooks = allBooks.filter(book => book.category === category);
                    }
                    
                    // 应用搜索过滤（如果有）
                    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
                    if (searchTerm) {
                        filteredBooks = filteredBooks.filter(book => 
                            book.title.toLowerCase().includes(searchTerm) ||
                            book.author.toLowerCase().includes(searchTerm) ||
                            book.description.toLowerCase().includes(searchTerm)
                        );
                    }
                    
                    // 清空并重新渲染书籍
                    booksGrid.innerHTML = '';
                    renderBooks(filteredBooks);
                });
            });
        }
        
    } catch (error) {
        console.error('Failed to load books:', error);
        if (loadingIndicator) {
            loadingIndicator.innerHTML = '<p class="text-red-500">Failed to load books. Please try again later.</p>';
        }
    }
}

// 根据搜索词过滤书籍
function filterBooks(books, searchTerm) {
    let filteredBooks = books;
    
    if (searchTerm) {
        filteredBooks = books.filter(book => 
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm) ||
            book.description.toLowerCase().includes(searchTerm)
        );
    }
    
    // 获取当前选中的分类
    let activeCategory = 'all';
    categoryButtons.forEach(button => {
        if (button.classList.contains('bg-primary')) {
            activeCategory = button.getAttribute('data-category');
        }
    });
    
    // 应用分类过滤
    if (activeCategory !== 'all') {
        filteredBooks = filteredBooks.filter(book => book.category === activeCategory);
    }
    
    // 清空并重新渲染书籍
    booksGrid.innerHTML = '';
    renderBooks(filteredBooks);
}

// 当DOM加载完成时初始化页面
document.addEventListener('DOMContentLoaded', function() {
    // 初始化阅读模式
    setupReadingMode();
    
    // 如果是 Bookshelf 页面，初始化书籍功能
    if (booksGrid) {
        initBookshelf();
    }
});
