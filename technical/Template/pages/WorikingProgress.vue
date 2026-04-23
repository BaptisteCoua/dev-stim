<template>
   <div class="page">
      <div class="shell">
         <header class="topbar">
            <div class="brand">
               <div class="logo">
                  <span></span>
                  <span></span>
                  <span></span>
               </div>
               <div class="brand-text">Dashboard</div>
            </div>
         </header>

         <section class="hero">
            <div class="left-panel">
               <div class="emoji">🚧</div>
               <h1>En cours de<br />construction</h1>
               <p>
                  Nous travaillons dur pour vous offrir un dashboard moderne, performant et
                  intuitif.
               </p>
               <p class="sub">Merci pour votre patience.</p>

               <div class="scene">
                  <div class="crane">
                     <div class="crane-arm"></div>
                     <div class="crane-cable"></div>
                     <div class="crane-hook"></div>
                  </div>

                  <div class="worker">
                     <div class="helmet"></div>
                     <div class="head"></div>
                     <div class="body"></div>
                     <div class="arm left"></div>
                     <div class="arm right"></div>
                     <div class="plan"></div>
                     <div class="leg left"></div>
                     <div class="leg right"></div>
                  </div>

                  <div class="signboard">
                     <div class="sign-text">EN COURS<br />DE CONSTRUCTION</div>
                  </div>
               </div>
            </div>

            <div class="dashboard-card">
               <div class="stats-row">
                  <div class="stat blue">
                     <span>MEP</span>
                     <strong>--/--</strong>
                  </div>
                  <div class="stat green">
                     <span>Ping prod</span>
                     <strong>--s</strong>
                  </div>
                  <div class="chart-card">
                     <div class="chart-title">Evolution du sprint</div>
                     <svg viewBox="0 0 520 180" class="chart-svg" aria-hidden="true">
                        <g class="grid">
                           <line
                              v-for="y in [25, 60, 95, 130, 165]"
                              :key="y"
                              x1="0"
                              :y1="y"
                              x2="520"
                              :y2="y"
                           />
                        </g>
                        <path
                           class="area"
                           d="M 0 45 C 45 42, 70 52, 104 65 S 180 58, 220 73 S 300 76, 340 88 S 420 94, 454 122 S 500 135, 520 140 L 520 180 L 0 180 Z"
                        />
                        <path
                           class="line"
                           d="M 0 45 C 45 42, 70 52, 104 65 S 180 58, 220 73 S 300 76, 340 88 S 420 94, 454 122 S 500 135, 520 140"
                        />
                        <circle
                           v-for="(point, index) in points"
                           :key="index"
                           :cx="point.x"
                           :cy="point.y"
                           r="3.2"
                           class="dot"
                        />
                     </svg>
                     <div class="chart-labels">
                        <span>Mar</span><span>Mer</span><span>Jeu</span><span>Ven</span
                        ><span>Lun</span><span>Mar</span>
                     </div>
                  </div>
               </div>

               <div class="lists-row">
                  <div class="list-card wide">
                     <div class="list-header">Bugs critiques</div>
                     <div v-for="n in 5" :key="`bug-${n}`" class="list-item shimmer-row">
                        <span class="status" :class="statusClass(n)"></span>
                        <span class="line big"></span>
                        <span class="line small"></span>
                     </div>
                  </div>

                  <div class="list-card">
                     <div class="list-header header-right">
                        <span>US prioritaires</span>
                        <span class="pill">TOTAL : --</span>
                     </div>
                     <div v-for="n in 5" :key="`us-${n}`" class="list-item shimmer-row">
                        <span class="status" :class="statusClass(n + 1)"></span>
                        <span class="line big"></span>
                        <span class="line small"></span>
                     </div>
                  </div>
               </div>

               <div class="footer-row">
                  <div v-for="team in teams" :key="team" class="mini-card">
                     <div class="mini-title">{{ team }}</div>
                     <div class="mini-content">
                        <div class="mini-lines">
                           <span></span>
                           <span></span>
                           <span></span>
                           <span></span>
                        </div>
                        <div class="mini-metrics">
                           <i></i>
                           <i></i>
                           <i></i>
                           <i></i>
                        </div>
                     </div>
                     <div class="progress-bar"><b></b></div>
                  </div>

                  <div class="media-card">
                     <div class="media-placeholder">
                        <div class="img-icon">
                           <span class="sun"></span>
                           <span class="mountain left"></span>
                           <span class="mountain right"></span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </div>
   </div>
</template>

<script setup>
   const teams = ['Front', 'Back', 'Agent']

   const points = [
      { x: 0, y: 45 },
      { x: 78, y: 56 },
      { x: 156, y: 64 },
      { x: 238, y: 74 },
      { x: 320, y: 84 },
      { x: 402, y: 94 },
      { x: 454, y: 122 },
      { x: 520, y: 140 },
   ]

   const statusClass = (n) => {
      const map = ['ok', 'ok', 'progress', 'progress', 'todo']
      return map[(n - 1) % map.length]
   }
</script>

<style scoped>
   :global(*) {
      box-sizing: border-box;
   }

   :global(body) {
      margin: 0;
      font-family:
         Inter,
         ui-sans-serif,
         system-ui,
         -apple-system,
         BlinkMacSystemFont,
         'Segoe UI',
         sans-serif;
      background: linear-gradient(180deg, #edf2fb 0%, #e8eef8 100%);
      color: #112247;
   }

   .page {
      min-height: 100vh;
      padding: 24px;
   }

   .shell {
      max-width: 1500px;
      margin: 0 auto;
   }

   .topbar {
      display: flex;
      align-items: center;
      margin-bottom: 18px;
   }

   .brand {
      display: inline-flex;
      align-items: center;
      gap: 14px;
   }

   .logo {
      width: 52px;
      height: 52px;
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.45);
      border: 1px solid rgba(116, 143, 196, 0.28);
      display: flex;
      align-items: end;
      justify-content: center;
      gap: 4px;
      padding: 12px;
      box-shadow: 0 8px 24px rgba(31, 59, 122, 0.08);
   }

   .logo span {
      width: 6px;
      background: linear-gradient(180deg, #7caeff, #4f83f1);
      border-radius: 999px;
      animation: bob 1.6s ease-in-out infinite;
   }

   .logo span:nth-child(1) {
      height: 12px;
      animation-delay: 0s;
   }
   .logo span:nth-child(2) {
      height: 18px;
      animation-delay: 0.15s;
   }
   .logo span:nth-child(3) {
      height: 26px;
      animation-delay: 0.3s;
   }

   .brand-text {
      font-size: 24px;
      font-weight: 800;
   }

   .hero {
      display: grid;
      grid-template-columns: 1.05fr 1.95fr;
      gap: 26px;
      align-items: stretch;
   }

   .left-panel,
   .dashboard-card {
      border-radius: 28px;
      background: rgba(255, 255, 255, 0.42);
      border: 1px solid rgba(133, 154, 201, 0.2);
      box-shadow: 0 18px 50px rgba(42, 67, 129, 0.08);
      backdrop-filter: blur(10px);
   }

   .left-panel {
      position: relative;
      overflow: hidden;
      padding: 34px 30px 24px;
      min-height: 760px;
   }

   .left-panel::before,
   .left-panel::after {
      content: '';
      position: absolute;
      border-radius: 50%;
      background: rgba(163, 188, 247, 0.16);
   }

   .left-panel::before {
      width: 220px;
      height: 220px;
      top: -60px;
      left: -60px;
   }

   .left-panel::after {
      width: 140px;
      height: 140px;
      right: -40px;
      bottom: 160px;
   }

   .emoji {
      font-size: 44px;
      line-height: 1;
      margin-bottom: 14px;
   }

   .left-panel h1 {
      font-size: clamp(44px, 4vw, 78px);
      line-height: 0.96;
      margin: 0 0 20px;
      letter-spacing: -0.04em;
   }

   .left-panel p {
      max-width: 540px;
      font-size: 24px;
      line-height: 1.4;
      color: #4d5f86;
      margin: 0 0 14px;
   }

   .left-panel .sub {
      color: #33466f;
      font-weight: 600;
   }

   .scene {
      position: absolute;
      inset: auto 0 0 0;
      height: 430px;
   }

   .crane {
      position: absolute;
      left: 54%;
      bottom: 60px;
      width: 230px;
      height: 310px;
      opacity: 0.55;
   }

   .crane::before {
      content: '';
      position: absolute;
      left: 24px;
      bottom: 0;
      width: 18px;
      height: 270px;
      border: 4px solid #94b1ea;
      border-radius: 8px;
      background:
         repeating-linear-gradient(45deg, transparent 0 10px, rgba(148, 177, 234, 0.22) 10px 20px),
         rgba(195, 212, 248, 0.16);
   }

   .crane-arm {
      position: absolute;
      left: 42px;
      top: 6px;
      width: 180px;
      height: 16px;
      border: 4px solid #94b1ea;
      border-radius: 8px;
      transform: skewX(24deg);
      background: repeating-linear-gradient(
         45deg,
         transparent 0 12px,
         rgba(148, 177, 234, 0.25) 12px 24px
      );
   }

   .crane-cable {
      position: absolute;
      left: 182px;
      top: 24px;
      width: 4px;
      height: 106px;
      background: #94b1ea;
      animation: cable 2.8s ease-in-out infinite;
      transform-origin: top center;
   }

   .crane-hook {
      position: absolute;
      left: 174px;
      top: 124px;
      width: 22px;
      height: 34px;
      border: 4px solid #94b1ea;
      border-top: none;
      border-radius: 0 0 14px 14px;
      animation: cable 2.8s ease-in-out infinite;
   }

   .worker {
      position: absolute;
      left: 76px;
      bottom: 24px;
      width: 240px;
      height: 280px;
   }

   .helmet {
      position: absolute;
      left: 84px;
      top: 22px;
      width: 74px;
      height: 40px;
      background: linear-gradient(180deg, #ffd766, #f2b333);
      border-radius: 38px 38px 20px 20px;
      box-shadow: inset 0 -5px 0 rgba(204, 139, 17, 0.2);
   }

   .helmet::before {
      content: '';
      position: absolute;
      left: 8px;
      right: 8px;
      top: 12px;
      height: 8px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.25);
   }

   .head {
      position: absolute;
      left: 94px;
      top: 50px;
      width: 54px;
      height: 62px;
      background: #ffd3b1;
      border-radius: 28px;
   }

   .body {
      position: absolute;
      left: 62px;
      top: 100px;
      width: 118px;
      height: 112px;
      background: linear-gradient(180deg, #4d80ec, #2b4f9c);
      border-radius: 28px;
   }

   .body::before,
   .body::after {
      content: '';
      position: absolute;
      top: 4px;
      width: 18px;
      height: 104px;
      background: #ffd766;
   }

   .body::before {
      left: 14px;
      transform: skew(-6deg);
   }
   .body::after {
      right: 14px;
      transform: skew(6deg);
   }

   .arm,
   .leg {
      position: absolute;
      background: #2e4d8e;
      border-radius: 999px;
   }

   .arm.left {
      left: 44px;
      top: 130px;
      width: 34px;
      height: 104px;
      transform: rotate(18deg);
   }

   .arm.right {
      left: 150px;
      top: 130px;
      width: 32px;
      height: 96px;
      transform: rotate(-26deg);
   }

   .plan {
      position: absolute;
      left: 40px;
      top: 146px;
      width: 158px;
      height: 100px;
      background: linear-gradient(180deg, #fefefe, #e9eef9);
      border: 3px solid #cad7f6;
      border-radius: 12px;
      transform: rotate(-8deg);
      box-shadow: 0 10px 20px rgba(54, 84, 151, 0.08);
   }

   .plan::before,
   .plan::after {
      content: '';
      position: absolute;
      left: 18px;
      right: 18px;
      height: 3px;
      background: #d1daf1;
   }

   .plan::before {
      top: 30px;
   }
   .plan::after {
      top: 54px;
   }

   .leg.left {
      left: 86px;
      top: 202px;
      width: 30px;
      height: 76px;
   }

   .leg.right {
      left: 126px;
      top: 202px;
      width: 30px;
      height: 76px;
   }

   .signboard {
      position: absolute;
      left: 244px;
      bottom: 42px;
      width: 220px;
      height: 118px;
      background: linear-gradient(180deg, #ffd24d, #f0b222);
      border: 8px solid #1f2b45;
      border-radius: 12px;
      transform: rotate(-3deg);
      box-shadow: 0 16px 28px rgba(46, 63, 112, 0.14);
   }

   .signboard::before,
   .signboard::after {
      content: '';
      position: absolute;
      width: 18px;
      height: 86px;
      background: #7d889d;
      bottom: -72px;
      border-radius: 10px;
   }

   .signboard::before {
      left: 28px;
      transform: rotate(9deg);
   }
   .signboard::after {
      right: 28px;
      transform: rotate(-8deg);
   }

   .sign-text {
      height: 100%;
      display: grid;
      place-items: center;
      text-align: center;
      font-size: 18px;
      font-weight: 900;
      letter-spacing: 0.03em;
      color: #1f2b45;
   }

   .dashboard-card {
      padding: 18px;
      display: grid;
      gap: 18px;
   }

   .stats-row,
   .lists-row,
   .footer-row {
      display: grid;
      gap: 18px;
   }

   .stats-row {
      grid-template-columns: 160px 160px 1fr;
   }

   .lists-row {
      grid-template-columns: 1.1fr 0.9fr;
   }

   .footer-row {
      grid-template-columns: repeat(3, 1fr) 0.92fr;
   }

   .stat,
   .chart-card,
   .list-card,
   .mini-card,
   .media-card {
      background: rgba(255, 255, 255, 0.68);
      border: 1px solid rgba(160, 176, 216, 0.22);
      border-radius: 22px;
      box-shadow: 0 10px 24px rgba(34, 63, 121, 0.05);
   }

   .stat {
      min-height: 118px;
      padding: 18px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
   }

   .stat span {
      font-size: 15px;
      font-weight: 700;
      color: #2f446d;
   }

   .stat strong {
      font-size: 30px;
      letter-spacing: -0.03em;
   }

   .stat.blue {
      background: linear-gradient(135deg, rgba(199, 221, 255, 0.88), rgba(163, 190, 255, 0.65));
   }
   .stat.green {
      background: linear-gradient(135deg, rgba(220, 239, 206, 0.95), rgba(191, 223, 173, 0.72));
   }

   .chart-card {
      padding: 14px 18px 12px;
   }

   .chart-title,
   .list-header,
   .mini-title {
      font-weight: 800;
      color: #354a75;
   }

   .chart-title {
      margin-bottom: 8px;
      font-size: 18px;
   }

   .chart-svg {
      width: 100%;
      height: 190px;
      display: block;
   }

   .grid line {
      stroke: #d9e2f3;
      stroke-width: 1;
   }

   .line {
      fill: none;
      stroke: #3d67ff;
      stroke-width: 3;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-dasharray: 900;
      stroke-dashoffset: 900;
      animation: draw 3.4s ease forwards;
   }

   .area {
      fill: rgba(102, 124, 255, 0.12);
      animation: fadeIn 1.8s ease forwards;
   }

   .dot {
      fill: #2f5cff;
      opacity: 0;
      animation: dotIn 0.3s ease forwards;
   }

   .dot:nth-child(1) {
      animation-delay: 0.35s;
   }
   .dot:nth-child(2) {
      animation-delay: 0.55s;
   }
   .dot:nth-child(3) {
      animation-delay: 0.75s;
   }
   .dot:nth-child(4) {
      animation-delay: 0.95s;
   }
   .dot:nth-child(5) {
      animation-delay: 1.15s;
   }
   .dot:nth-child(6) {
      animation-delay: 1.35s;
   }
   .dot:nth-child(7) {
      animation-delay: 1.55s;
   }
   .dot:nth-child(8) {
      animation-delay: 1.75s;
   }

   .chart-labels {
      display: flex;
      justify-content: space-between;
      color: #7182a8;
      font-size: 12px;
      padding-top: 4px;
   }

   .list-card {
      padding: 16px;
   }

   .list-card.wide {
      min-height: 250px;
   }

   .list-header {
      margin-bottom: 14px;
      font-size: 17px;
   }

   .header-right {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
   }

   .pill {
      font-size: 12px;
      font-weight: 800;
      padding: 6px 10px;
      border-radius: 999px;
      background: #ecf1fb;
      color: #5c6f96;
   }

   .list-item {
      height: 44px;
      border-radius: 14px;
      display: grid;
      grid-template-columns: 18px 1fr 100px;
      gap: 12px;
      align-items: center;
      padding: 0 12px;
      margin-bottom: 10px;
      background: rgba(244, 248, 255, 0.9);
   }

   .status {
      width: 10px;
      height: 10px;
      border-radius: 50%;
   }

   .status.ok {
      background: #58c78f;
   }
   .status.progress {
      background: #587fff;
   }
   .status.todo {
      background: #f07f65;
   }

   .line.big,
   .line.small,
   .mini-lines span,
   .mini-metrics i,
   .media-placeholder,
   .img-icon {
      position: relative;
      overflow: hidden;
   }

   .line.big,
   .line.small {
      display: block;
      height: 10px;
      border-radius: 999px;
      background: #dfe7f5;
      animation: pulse 1.8s ease-in-out infinite;
   }

   .line.small {
      width: 72px;
      justify-self: end;
   }

   .shimmer-row .line::after,
   .mini-lines span::after,
   .mini-metrics i::after,
   .media-placeholder::after {
      content: '';
      position: absolute;
      inset: 0;
      transform: translateX(-120%);
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.7), transparent);
      animation: shimmer 2.4s linear infinite;
   }

   .mini-card {
      padding: 16px;
   }

   .mini-title {
      font-size: 16px;
      margin-bottom: 14px;
   }

   .mini-content {
      display: grid;
      grid-template-columns: 1fr 70px;
      gap: 14px;
      margin-bottom: 18px;
   }

   .mini-lines,
   .mini-metrics {
      display: grid;
      gap: 12px;
   }

   .mini-lines span,
   .mini-metrics i {
      display: block;
      height: 10px;
      background: #dfe7f5;
      border-radius: 999px;
   }

   .mini-lines span:nth-child(1) {
      width: 68px;
   }
   .mini-lines span:nth-child(2) {
      width: 88px;
   }
   .mini-lines span:nth-child(3) {
      width: 74px;
   }
   .mini-lines span:nth-child(4) {
      width: 98px;
   }

   .mini-metrics i:nth-child(1) {
      width: 42px;
   }
   .mini-metrics i:nth-child(2) {
      width: 54px;
   }
   .mini-metrics i:nth-child(3) {
      width: 36px;
   }
   .mini-metrics i:nth-child(4) {
      width: 50px;
   }

   .progress-bar {
      height: 8px;
      border-radius: 999px;
      background: #e4ebf8;
      overflow: hidden;
   }

   .progress-bar b {
      display: block;
      height: 100%;
      width: 60%;
      border-radius: inherit;
      background: linear-gradient(90deg, #58c78f, #7fd9a8);
      animation: progress 2.8s ease-in-out infinite alternate;
   }

   .media-card {
      padding: 16px;
   }

   .media-placeholder {
      height: 100%;
      min-height: 220px;
      border-radius: 22px;
      border: 3px dashed #d1dcf4;
      background: linear-gradient(180deg, #f8fbff, #eef4ff);
      display: grid;
      place-items: center;
   }

   .img-icon {
      width: 120px;
      height: 90px;
      border: 4px dashed #c6d4f3;
      border-radius: 18px;
      position: relative;
   }

   .sun {
      position: absolute;
      top: 14px;
      left: 18px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #c6d4f3;
   }

   .mountain {
      position: absolute;
      bottom: 14px;
      width: 0;
      height: 0;
      border-style: solid;
   }

   .mountain.left {
      left: 18px;
      border-width: 0 20px 30px 20px;
      border-color: transparent transparent #c6d4f3 transparent;
   }

   .mountain.right {
      left: 46px;
      border-width: 0 24px 40px 24px;
      border-color: transparent transparent #b7c9ef transparent;
   }

   @keyframes draw {
      to {
         stroke-dashoffset: 0;
      }
   }

   @keyframes dotIn {
      to {
         opacity: 1;
         transform: scale(1);
      }
      from {
         opacity: 0;
         transform: scale(0.4);
      }
   }

   @keyframes fadeIn {
      from {
         opacity: 0;
      }
      to {
         opacity: 1;
      }
   }

   @keyframes shimmer {
      to {
         transform: translateX(120%);
      }
   }

   @keyframes pulse {
      0%,
      100% {
         opacity: 0.72;
      }
      50% {
         opacity: 1;
      }
   }

   @keyframes cable {
      0%,
      100% {
         transform: translateY(0);
      }
      50% {
         transform: translateY(12px);
      }
   }

   @keyframes progress {
      from {
         width: 48%;
      }
      to {
         width: 68%;
      }
   }

   @keyframes bob {
      0%,
      100% {
         transform: translateY(0);
      }
      50% {
         transform: translateY(-3px);
      }
   }

   @media (max-width: 1250px) {
      .hero {
         grid-template-columns: 1fr;
      }

      .left-panel {
         min-height: 640px;
      }
   }

   @media (max-width: 980px) {
      .stats-row,
      .lists-row,
      .footer-row {
         grid-template-columns: 1fr;
      }

      .left-panel h1 {
         font-size: 52px;
      }

      .left-panel p {
         font-size: 20px;
      }

      .scene {
         transform: scale(0.88);
         transform-origin: left bottom;
      }
   }

   @media (max-width: 640px) {
      .page {
         padding: 14px;
      }

      .left-panel,
      .dashboard-card {
         border-radius: 22px;
      }

      .left-panel {
         padding: 22px 18px 18px;
         min-height: 580px;
      }

      .left-panel h1 {
         font-size: 42px;
      }

      .left-panel p {
         font-size: 17px;
      }

      .scene {
         transform: scale(0.72);
         left: -22px;
      }
   }
</style>
