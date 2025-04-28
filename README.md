<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>昆明 UFO 研究会 - 2025 年特别会议</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
            background-color: #0a192f;
            overflow-x: hidden;
        }
        .container {
            background-color: rgba(255, 255, 255, 0.9);
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            margin-top: 20px;
            margin-bottom: 20px;
            position: relative;
            overflow: hidden;
        }
        .container::before {
            content: '';
            position: absolute;
            top: -50px;
            left: -50px;
            width: 200px;
            height: 200px;
            background: radial-gradient(circle, rgba(71, 170, 255, 0.2) 0%, rgba(255, 255, 255, 0) 70%);
            border-radius: 50%;
            z-index: -1;
        }
        .container::after {
            content: '';
            position: absolute;
            bottom: -80px;
            right: -30px;
            width: 150px;
            height: 150px;
            background: radial-gradient(circle, rgba(124, 58, 237, 0.2) 0%, rgba(255, 255, 255, 0) 70%);
            border-radius: 50%;
            z-index: -1;
        }
        header {
            text-align: center;
            margin-bottom: 30px;
            position: relative;
        }
        h1 {
            color: #4b0082;
            margin-bottom: 10px;
            font-size: 2.5rem;
            text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            animation: glow 3s infinite alternate;
        }
        h2 {
            color: #4b0082;
            margin-bottom: 15px;
            font-size: 1.8rem;
            text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }
        .meeting-info {
            background-color: rgba(226, 226, 226, 0.8);
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
        }
        .meeting-info:hover {
            transform: translateY(-5px);
        }
        .meeting-info h3 {
            margin-top: 0;
            color: #4b0082;
        }
        .ufo-animation {
            position: absolute;
            width: 100px;
            height: 60px;
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60"><path d="M20,30 Q50,10 80,30 L90,50 Q50,70 10,50 Z" fill="%234b0082"/><circle cx="40" cy="35" r="5" fill="%23fff"/><circle cx="60" cy="35" r="5" fill="%23fff"/></svg>');
            background-size: contain;
            background-repeat: no-repeat;
            animation: ufoFly 20s linear infinite;
            z-index: 1;
        }
        .location-map {
            margin-top: 20px;
        }
        .location-map iframe {
            width: 100%;
            height: 350px;
            border: none;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        footer {
            margin-top: 40px;
            text-align: center;
            color: #666;
            font-size: 14px;
        }
        .science-elements {
            display: flex;
            justify-content: space-around;
            margin: 30px 0;
            flex-wrap: wrap;
        }
        .element {
            text-align: center;
            width: 120px;
            margin: 15px;
            padding: 15px;
            border-radius: 8px;
            background-color: rgba(226, 226, 226, 0.8);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
        }
        .element:hover {
            transform: translateY(-5px);
        }
        .element img {
            width: 60px;
            height: 60px;
            margin-bottom: 10px;
        }
        .equation {
            font-size: 1.5rem;
            text-align: center;
            margin: 20px 0;
            color: #4b0082;
            font-weight: bold;
        }
        .stars {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -2;
        }
        .star {
            position: absolute;
            background-color: white;
            border-radius: 50%;
            animation: twinkle 5s infinite alternate;
        }
        @keyframes ufoFly {
            0% {
                left: -100px;
                top: 50px;
                transform: rotate(-10deg);
            }
            25% {
                top: 100px;
            }
            50% {
                left: calc(100% + 100px);
                top: 150px;
                transform: rotate(10deg);
            }
            75% {
                top: 100px;
            }
            100% {
                left: -100px;
                top: 50px;
                transform: rotate(-10deg);
            }
        }
        @keyframes glow {
            from {
                text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #4b0082, 0 0 20px #4b0082;
            }
            to {
                text-shadow: 0 0 10px #fff, 0 0 15px #4b0082, 0 0 20px #4b0082, 0 0 25px #4b0082;
            }
        }
        @keyframes twinkle {
            from {
                opacity: 0.2;
            }
            to {
                opacity: 1;
            }
        }
    </style>
</head>
<body>
    <div class="stars" id="stars"></div>
    
    <div class="ufo-animation" id="ufo"></div>

    <div class="container">
        <header>
            <h1>昆明 UFO 研究会特别会议通知</h1>
            <p>探索宇宙奥秘，传承科学精神</p>
            <div class="equation">E = mc²</div>
        </header>

        <div class="meeting-info">
            <h3>纪念爱因斯坦逝世 70 周年暨昆明 UFO 研究会成立 40 周年</h3>
            <p><strong>时间：</strong>2025 年 5 月 10 日（星期六）</p>
            <p><strong>地点：</strong>桃园社区龙宇大厦（云南省昆明市盘龙区桃源街豆腐厂 4 号）</p>
            <p><strong>交通：</strong>从穿心鼓楼地铁站 B 口步行 330 米即可到达</p>
        </div>

        <section>
            <h2>会议主题</h2>
            <ul>
                <li>爱因斯坦的科学贡献与宇宙探索精神</li>
                <li>昆明 UFO 研究会 40 年发展历程与研究成果回顾</li>
                <li>UFO 现象最新研究进展与讨论</li>
            </ul>
        </section>

        <div class="science-elements">
            <div class="element">
                <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='40' fill='%234b0082'/><circle cx='50' cy='50' r='20' fill='%23fff'/></svg>" alt="UFO">
                <h4>UFO 研究</h4>
            </div>
            <div class="element">
                <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><ellipse cx='50' cy='50' rx='40' ry='20' fill='%234b0082'/><ellipse cx='50' cy='50' rx='20' ry='40' fill='%23fff'/></svg>" alt="宇宙探索">
                <h4>宇宙探索</h4>
            </div>
            <div class="element">
                <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='40' fill='%234b0082'/><circle cx='50' cy='50' r='20' fill='%23fff'/><line x1='50' y1='30' x2='50' y2='70' stroke='%23fff' stroke-width='5'/></svg>" alt="科学理论">
                <h4>科学理论</h4>
            </div>
        </div>

        <section class="location-map">
            <h2>会议地点</h2>
            <iframe src="https://maps.google.com/maps?q=云南省昆明市盘龙区桃源街豆腐厂4号&t=&z=15&ie=UTF8&iwloc=&output=embed"></iframe>
        </section>

        <footer>
            <p>昆明 UFO 研究会 © 2025</p>
            <p>联系我们：info@kunmingufo.org</p>
        </footer>
    </div>

    <script>
        // 创建星星背景
        function createStars() {
            const starsContainer = document.getElementById('stars');
            const starsCount = 100;
            
            for (let i = 0; i < starsCount; i++) {
                const star = document.createElement('div');
                star.classList.add('star');
                
                // 随机大小
                const size = Math.random() * 3;
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;
                
                // 随机位置
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                
                // 随机动画延迟
                star.style.animationDelay = `${Math.random() * 5}s`;
                
                starsContainer.appendChild(star);
            }
        }

        // UFO 飞行动画
        function startUFOAnimation() {
            const ufo = document.getElementById('ufo');
            ufo.style.animation = 'ufoFly 20s linear infinite';
        }

        // 页面加载完成后初始化
        document.addEventListener('DOMContentLoaded', function() {
            createStars();
            startUFOAnimation();
            
            // 页面加载完成后的欢迎消息
            setTimeout(function() {
                alert('欢迎参加昆明 UFO 研究会 2025 年特别会议！');
            }, 1500);
        });
    </script>
</body>
</html>
