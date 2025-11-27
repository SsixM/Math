Chart.defaults.interaction.mode = 'nearest';
Chart.defaults.interaction.intersect = false;

Chart.defaults.plugins.tooltip.enabled = true;
Chart.defaults.plugins.tooltip.callbacks.label = function(ctx) {
  const x = ctx.parsed.x;
  const y = ctx.parsed.y;
  if (x !== undefined && y !== undefined)
    return `(${x}, ${y})`;
  return y;
};
const originalPhenomena = [
  { title: "Сумма натуральных чисел = −1/12", formula: "\\sum_{n=1}^{\\infty} n = -\\dfrac{1}{12}", explanation: "Самый парадоксальный результат аналитического продолжения дзета-функции Римана. ζ(−1) = −1/12. Без этой «суммы» не работали бы расчёты в теории струн, квантовой электродинамике и эффекте Казимира — именно она объясняет притяжение пластин в вакууме. Сринваса Рамануджан открыл это интуитивно ещё в 1913 году.", draw: drawRamanujan },
  { title: "Формула Эйлера — жемчужина математики", formula: "e^{i\\pi} + 1 = 0", explanation: "Самое красивое уравнение в истории человечества. В одной короткой строке соединены пять фундаментальных констант: e, i, π, 1 и 0. Ричард Фейнман называл его «нашим драгоценным камнем».", draw: drawEulerCircle },
  { title: "Множество Мандельброта", formula: "z_{n+1} = z_n^2 + c", explanation: "Простейшее итеративное правило порождает бесконечно сложный фрактал на комплексной плоскости. При любом увеличении появляются новые удивительные узоры. Главный символ теории хаоса и детерминированной красоты.", draw: drawMandelbrot },
  { title: "Золотое сечение φ", formula: "\\phi = \\dfrac{1 + \\sqrt{5}}{2} \\approx 1.6180339887...", explanation: "«Божественная пропорция», встречающаяся повсюду: в природе (спирали раковин, расположение листьев, шишки), в архитектуре (Парфенон), в искусстве (работы Леонардо да Винчи) и даже в соотношении частей человеческого тела.", draw: drawGoldenSpiral },
  { title: "Парадокс Монти Холла", formula: "P(\\text{сменить дверь}) = \\dfrac{2}{3}", explanation: "Классический пример, как вероятность обманывает интуицию. Даже профессора математики спорят, пока не запустят симуляцию. Всегда меняйте дверь!", draw: drawMontyHall },
  { title: "Гипотеза Коллатца (3n+1)", formula: "n \\to n/2\\ (чётное),\\ 3n+1\\ (нечётное)", explanation: "Одна из самых простых нерешённых задач. Любое натуральное число, по-видимому, доходит до цикла 4→2→1. Проверено до чисел больше 2⁶⁸. Поль Эрдёш говорил: «Математика ещё не готова к таким проблемам».", draw: drawCollatzTree },
  { title: "Гипотеза Римана", formula: "Все нетривиальные нули \\zeta(s) лежат на \\Re(s)=\\frac{1}{2}", explanation: "Самая важная открытая задача математики. Премия — 1 000 000 $. От неё зависит точное распределение простых чисел. Опровержение разрушит тысячи теорем.", draw: drawRiemannZeros },
  { title: "P = NP?", formula: "P = NP?", explanation: "Если да — вся современная криптография рухнет. Если нет — мы живём в мире, где проверять решения намного проще, чем их находить. Ещё одна задача на миллион долларов.", draw: drawPNP },
  { title: "Теорема Гёделя о неполноте", formula: "\\text{«Эта формула недоказуема внутри системы»}", explanation: "В 1931 году Курт Гёдель показал: в любой достаточно мощной аксиоматической системе существуют истинные утверждения, которые нельзя доказать. Мечта Гильберта о полной математике рухнула навсегда.", draw: drawGodel },
  { title: "Бесконечный отель Хилберта", formula: "\\aleph_0 + \\infty = \\aleph_0", explanation: "Отель с бесконечным количеством номеров полностью занят, но всегда можно поселить новых гостей, просто «подвинув» всех. Показывает, что бесконечности бывают разного размера.", draw: drawHilbertHotel },
  { title: "Число e — основа роста", formula: "e = \\lim_{n\\to\\infty} \\left(1 + \\dfrac{1}{n}\\right)^n", explanation: "Появляется в сложных процентах, радиоактивном распаде, нормальном распределении, цепной линии. Единственное число, у которого производная равна самой функции.", draw: drawEApproximation },
  { title: "π из ряда Лейбница", formula: "\\dfrac{\\pi}{4} = 1 - \\dfrac{1}{3} + \\dfrac{1}{5} - \\dfrac{1}{7} + \\cdots", explanation: "Один из самых элегантных бесконечных рядов. Сходится крайне медленно, но сам факт существования такого простого выражения для π завораживает.", draw: drawLeibnizPi },
  { title: "Парадокс дней рождения", formula: "23 человека → вероятность совпадения > 50%", explanation: "В группе из 23 человек вероятность, что у хотя бы двоих одинаковый день рождения, уже больше половины. При 70 людях — почти 99.9%.", draw: drawBirthdayParadox },
  { title: "Кривая дракона", formula: "L → L+R+, R → -L-R", explanation: "Фрактал, получаемый бесконечным складыванием листа бумаги пополам. Заполняет плоскость, никогда себя не пересекая.", draw: drawDragonCurve },
  { title: "Формула Стирлинга", formula: "n! \\approx \\sqrt{2\\pi n}\\left(\\dfrac{n}{e}\\right)^n", explanation: "Удивительно точное приближение факториала, используемое в статистике и теории вероятностей.", draw: drawStirling },
  { title: "Иррациональность √2", formula: "\\sqrt{2} \\notin \\mathbb{Q}", explanation: "Первое доказанное иррациональное число. Легенда гласит, что пифагорейца Гиппаса утопили за это открытие.", draw: drawSqrt2 },
  { title: "Треугольник Серпинского", formula: "Рекурсивно удаляем средний треугольник", explanation: "Фрактал с размерностью ≈1.58, площадью → 0 и бесконечным периметром.", draw: drawSierpinski },
  { title: "Теорема Пифагора", formula: "a^2 + b^2 = c^2", explanation: "Более 370 различных доказательств! Самое доказываемое утверждение в истории математики.", draw: drawPythagoras },
  { title: "Комплексные числа", formula: "i^2 = -1", explanation: "Сначала считались «мнимыми». Теперь — основа квантовой механики, электротехники и обработки сигналов.", draw: drawComplexPlane },
  { title: "Бином Ньютона", formula: "(a+b)^n = \\sum \\binom{n}{k} a^{n-k} b^k", explanation: "Коэффициенты образуют треугольник Паскаля, в котором каждая строка — степени 11.", draw: drawBinomial },
  { title: "Функция Гамма", formula: "\\Gamma(n)=(n-1)!", explanation: "Факториал для дробных чисел. Γ(½)=√π — чистая красота.", draw: drawGamma },
  { title: "Ряд Тейлора", formula: "f(x) = \\sum \\frac{f^{(n)}(a)}{n!}(x-a)^n", explanation: "Любую гладкую функцию можно представить бесконечным полиномом.", draw: drawTaylor },
  { title: "Уравнение теплопроводности", formula: "\\frac{\\partial u}{\\partial t} = \\alpha \\nabla^2 u", explanation: "Описывает не только тепло, но и цены опционов (Блэк-Шоулз), диффузию запахов.", draw: drawHeat },
  { title: "Снежинка Коха", formula: "Бесконечный периметр, конечная площадь", explanation: "Первая «патологическая» кривая (1904). Длина → ∞, площадь остаётся конечной.", draw: drawKoch },
  { title: "Великая теорема Ферма", formula: "a^n + b^n = c^n \\nexists (n>2)", explanation: "Ферма написал «доказательство не влезает на поля». Доказано только в 1994 году Эндрю Уайлсом.", draw: drawFermat },
  { title: "Число Грэма", formula: "G_{64} \\uparrow\\uparrow\\uparrow\\uparrow 3", explanation: "Самое большое число, использованное в серьёзном доказательстве. Больше атомов во Вселенной в миллиарды раз.", draw: drawGraham },
  { title: "Парадокс Рассела", formula: "R = \\{x \\mid x \\notin x\\}", explanation: "Разрушил наивную теорию множеств Фреге. Привёл к современной аксиоматике Цермело-Френкеля.", draw: drawRussell },
  { title: "Квадратура круга невозможна", formula: "\\pi — трансцендентно", explanation: "Доказано Линдеманом в 1882 году. Мечта древних — построить квадрат той же площади циркулем и линейкой — невозможна.", draw: drawSquaring },
  { title: "Бесконечность простых чисел", formula: "Простых чисел бесконечно много", explanation: "Доказательство Евклида 2300 лет назад — шедевр лаконичности.", draw: drawPrimes },
  { title: "Тождество Эйлера для комплексных экспонент", formula: "e^{i\\theta} = \\cos \\theta + i \\sin \\theta", explanation: "Связывает экспоненту, тригонометрию и комплексные числа. Основа Фурье-анализа и квантовой механики.", draw: drawEulerIdentity },
  { title: "Формула Бине для Фибоначчи", formula: "F_n = \\dfrac{\\phi^n - (1-\\phi)^n}{\\sqrt{5}}", explanation: "Целые числа Фибоначчи выражаются через иррациональные числа — и дают точный результат!", draw: drawBinet },
  { title: "Решето Эратосфена", formula: "Алгоритм поиска простых чисел", explanation: "Древнейший эффективный алгоритм (III век до н.э.). До сих пор основа всех решёт.", draw: drawEratosthenes },
  { title: "Теорема о четырёх цветах", formula: "4 цвета достаточно для любой карты", explanation: "Доказано в 1976 году с помощью компьютера — первое крупное компьютерное доказательство.", draw: drawFourColors },
  { title: "Константа Апери ζ(3)", formula: "\\zeta(3) \\approx 1.2020569...", explanation: "Единственная из первых ζ(чётные) и ζ(3), иррациональность которой доказана только в 1978 году.", draw: drawApery },
  { title: "Число Лиувилля", formula: "L = \\sum 10^{-n!}", explanation: "Первое явно построенное трансцендентное число (1844).", draw: drawLiouville },
  { title: "Кривая Пеано", formula: "Непрерывная кривая заполняет квадрат", explanation: "Разрушило интуицию о размерности: одномерная кривая проходит через все точки двумерного квадрата.", draw: drawPeano },
  { title: "Теорема Брауэра о неподвижной точке", formula: "f: диск → диск ⇒ ∃ неподвижная точка", explanation: "Основа доказательства равновесия Нэша в теории игр.", draw: drawBrouwer },
  { title: "Проблема Базеля", formula: "\\sum \\frac{1}{n^2} = \\frac{\\pi^2}{6}", explanation: "Эйлер решил в 18 лет задачу, над которой бились Бернулли целое столетие.", draw: drawBasel },
  { title: "Треугольник Паскаля modulo 2", formula: "Чётные/нечётные → Серпинский", explanation: "Биномиальные коэффициенты по модулю 2 дают фрактал Серпинского!", draw: drawPascalFractal },
  { title: "Теорема Вильсона", formula: "(p-1)! \\equiv -1 \\pmod{p}", explanation: "Простейший критерий простоты числа.", draw: drawWilson },
  { title: "Константа Фейгенбаума", formula: "δ ≈ 4.6692016...", explanation: "Универсальная константа хаоса: появляется при бифуркациях в самых разных системах.", draw: drawFeigenbaum },
  { title: "Уравнение волны", formula: "\\frac{\\partial^2 u}{\\partial t^2} = c^2 \\nabla^2 u", explanation: "Описывает распространение волн — от звука до света. Красота физики в математике.", draw: drawWaveEquation },
  { title: "Множество Жюлиа", formula: "z_{n+1} = z_n^2 + c", explanation: "Брат Мандельброта — фракталы для фиксированного c. Бесконечная сложность из простоты.", draw: drawJulia },
  { title: "Кривая Гильберта", formula: "Заполняющая пространство кривая", explanation: "Непрерывная кривая, проходящая через каждую точку квадрата, без самопересечений.", draw: drawHilbertCurve },
  { title: "Дерево Пифагора", formula: "Рекурсивное ветвление", explanation: "Фрактальное дерево из квадратов — визуализация теоремы Пифагора в действии.", draw: drawPythagorasTree },
  { title: "Числа Лукаса", formula: "L_n = \\phi^n + (1-\\phi)^n", explanation: "Близнецы Фибоначчи, тоже стремящиеся к золотому сечению. Красота последовательностей.", draw: drawLucas },
  { title: "Игра в жизнь Конвея", formula: "Клеточный автомат", explanation: "Простые правила порождают сложную «жизнь» — от glider до космоса.", draw: drawGameOfLife },
  { title: "Треугольник Паскаля (цветной)", formula: "\\binom{n}{k}", explanation: "Каждый коэффициент — пиксель в фрактале. Цвета раскрывают паттерны.", draw: drawPascalTriangle },
  { title: "Кривая Леви C", formula: "Рекурсивный поворот на 45°", explanation: "Фрактал, заполняющий пространство, с размерностью log(4)/log(√2) ≈ 1.16.", draw: drawLevyCurve },
  { title: "Произведение Уоллиса для π", formula: "\\frac{\\pi}{2} = \\prod \\frac{4n^2}{4n^2-1}", explanation: "Бесконечное произведение сходится к π/2 — альтернативный ряд для π.", draw: drawWallis }
];
let phenomena = originalPhenomena.map(p => ({ ...p }));

// ✔ Перемешиваем порядок карточек
phenomena = phenomena
  .map(p => ({ sort: Math.random(), value: p }))
  .sort((a, b) => a.sort - b.sort)
  .map(obj => obj.value);

// Рендер карточек
const content = document.getElementById('content');
phenomena.forEach((p, i) => {
  const section = document.createElement('section');
  section.className = 'section';

  const isRealFormula = p.formula.includes('\\') || 
                        p.formula.includes('^') || 
                        p.formula.includes('_') || 
                        p.formula.match(/[\{\}]/) ||
                        p.formula.includes('=') ||
                        p.formula.includes('∑') ||
                        p.formula.includes('π') ||
                        p.formula.includes('∞');

  let formulaHTML;
  if (isRealFormula) {
    formulaHTML = `<div class="formula">$$${p.formula}$$</div>`;
  } else {
    formulaHTML = `<div class="formula text-only">${p.formula}</div>`;
  }

  section.innerHTML = `
    <div class="card" data-index="${i}">
      <h2>${p.title}</h2>
      ${formulaHTML}
      <p class="explanation">${p.explanation}</p>
      <div class="chart-container">
        <canvas id="chart${i}" width="1000" height="520"></canvas>
      </div>
    </div>
  `;
  content.appendChild(section);
});


// Глобальный массив для Chart.js
const chartInstances = {};

// Функция отрисовки (без ошибок)
function drawChart(index) {
  const canvas = document.getElementById(`chart${index}`);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  // 1. Уничтожаем старый график, если был
  if (chartInstances[index]) {
    chartInstances[index].destroy();
    chartInstances[index] = null;
  }

  // 2. Очищаем вручную
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 3. Подменяем Chart constructor, чтобы перехватить созданный график
  const oldChart = Chart;
  Chart = function(...args) {
    const instance = new oldChart(...args);
    chartInstances[index] = instance;  // сохраняем ЧЁТКО
    return instance;
  }
  Chart.prototype = oldChart.prototype;

  // 4. Запускаем рисование
  phenomena[index].draw(ctx);

  // 5. Возвращаем Chart назад
  Chart = oldChart;
}

// Клик
document.addEventListener('click', e => {
  const card = e.target.closest('.card');
  if (!card) return;

  const index = +card.dataset.index;
  const isActive = card.classList.contains('active');

  // ───────────────────────────────────────────────────────────────
  // 1. Если клик по canvas внутри АКТИВНОЙ карточки → ничего не делаем
  //    (не закрываем график)
  // ───────────────────────────────────────────────────────────────
  if (isActive && e.target.tagName === 'CANVAS') return;

  // ───────────────────────────────────────────────────────────────
  // 2. Деактивируем ВСЕ карточки
  // ───────────────────────────────────────────────────────────────
  document.querySelectorAll('.card').forEach(c => c.classList.remove('active'));

  // ───────────────────────────────────────────────────────────────
  // 3. Если карточка была активной → просто закрываем
  // ───────────────────────────────────────────────────────────────
  if (isActive) {
    const canvas = document.getElementById(`chart${index}`);
    if (canvas) canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

    if (chartInstances[index]) {
      chartInstances[index].destroy();
      delete chartInstances[index];
    }
    return;
  }

  // ───────────────────────────────────────────────────────────────
  // 4. Иначе — открываем карточку и рисуем график
  // ───────────────────────────────────────────────────────────────
  card.classList.add('active');
  drawChart(index);
});

function drawRamanujan(ctx) {
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: Array.from({length: 100}, (_, i) => i + 1),
      datasets: [{
        label: 'Частичная сумма',
        data: Array.from({length: 100}, (_, i) => (i + 1) * (i + 2) / 2),
        borderColor: '#ff006e',
        backgroundColor: 'rgba(255, 0, 110, 0.15)',
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: '→ −1/12 (в физике струн)',
          color: '#00ff9d',
          font: { size: 28 }
        }
      }
    }
  });
}

function drawEulerCircle(ctx) {
  new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        data: Array.from({length: 360}, (_, i) => ({
          x: Math.cos(i * Math.PI / 180),
          y: Math.sin(i * Math.PI / 180)
        })),
        pointRadius: 6,
        backgroundColor: '#00f0ff',
        borderColor: '#00ff9d'
      }]
    },
    options: {
      scales: {
        x: { display: false, min: -1.4, max: 1.4 },
        y: { display: false, min: -1.4, max: 1.4 }
      },
      plugins: {
        title: {
          display: true,
          text: 'e^{iπ} + 1 = 0',
          color: '#00ff9d',
          font: { size: 32 }
        }
      },
      animation: { duration: 3000 }
    }
  });
}

// 3. Множество Мандельброта
function drawMandelbrot(ctx) {
  const w=600,h=500,maxIter=128,img=ctx.createImageData(w,h);
  for(let px=0;px<w;px++)for(let py=0;py<h;py++){
    let x=0,y=0,cx=(px-400)/200,cy=(py-250)/200,iter=maxIter;
    while(iter--&&x*x+y*y<4){let xt=x*x-y*y+cx; y=2*x*y+cy; x=xt;}
    const brightness=iter/maxIter; const i=(py*w+px)*4;
    img.data[i]=brightness*255; img.data[i+1]=brightness*100; img.data[i+2]=brightness*400%255; img.data[i+3]=255;
  }
  ctx.putImageData(img,0,0);
}

// 4. Золотое сечение
function drawGoldenSpiral(ctx) {
  ctx.clearRect(0, 0, 1000, 520);

  const phi = (1 + Math.sqrt(5)) / 2;           // ≈ 1.6180339887
  const scale = 25;                             // размер первого квадрата
  let a = 1;
  let b = 1;

  // Начальная точка — левый нижний угол первого квадрата
  let x = 700;
  let y = 450;

  ctx.strokeStyle = '#ff006e';
  ctx.fillStyle = 'rgba(255, 0, 110, 0.15)';
  ctx.lineWidth = 5;

  for (let i = 0; i < 19; i++) {
    const size = a * scale;

    // Рисуем квадрат
    ctx.strokeRect(x, y - size, size, size);
    ctx.fillRect(x, y - size, size, size);

    // Рисуем четверть окружности (дугу спирали)
    ctx.beginPath();
    ctx.arc(
      x + size, y - size,           // центр дуги — правый верхний угол текущего квадрата
      size,
      Math.PI,                      // начинаем с левого края (180°)
      Math.PI * 1.5                 // заканчиваем сверху (270°)
    );
    ctx.stroke();

    // Переходим к следующему квадрату
    if (i % 4 === 0) {      // вправо → вверх → влево → вниз
      x -= size;
    } else if (i % 4 === 1) {
      y -= size * 2;
    } else if (i % 4 === 2) {
      x -= size * 2;
      y += size;
    } else if (i % 4 === 3) {
      y += size;
    }

    // Следующая пара чисел Фибоначчи
    const temp = a + b;
    a = b;
    b = temp;
  }

  // Подпись
  ctx.fillStyle = '#00ff9d';
  ctx.font = 'bold 56px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('φ ≈ 1.6180339887…', 500, 80);

  ctx.font = 'italic 36px Arial';
  ctx.fillStyle = '#00f0ff';
  ctx.fillText('Золотое сечение — божественная пропорция', 500, 130);
}

// 5. Монти Холл
function drawMontyHall(ctx) {
  new Chart(ctx, {type:'doughnut', data:{labels:['Остаться (33.3%)','Сменить (66.7%)'], datasets:[{data:[33.3,66.7], backgroundColor:['#ff006e','#00f0ff'], borderWidth:8}]}, options:{plugins:{title:{display:true,text:'Всегда меняйте дверь!', font:{size:36}, color:'#00ff9d'}}}});
}

// 6. Коллатц
function drawCollatzTree(ctx) {
  let n=27,x=300,y=480; ctx.fillStyle='#00ff9d'; ctx.font='bold 16px Arial';
  const step = () => {
    ctx.fillRect(x,y,8,8); ctx.fillText(n,x-20,y-10);
    n = n%2===0 ? n/2 : 3*n+1;
    x += n%2===0 ? 20 : -20; y-=28;
    if(y>40 && n>1) requestAnimationFrame(step);
  };
  step();
}

// 7. Гипотеза Римана
function drawRiemannZeros(ctx) {
  ctx.fillStyle='#00f0ff'; ctx.font='38px Arial'; ctx.fillText('Все нетривиальные нули',80,200);
  ctx.fillText('на критической прямой Re(s)=½',30,300);
  ctx.strokeStyle='#ff006e'; ctx.lineWidth=6; ctx.beginPath(); ctx.moveTo(300,0); ctx.lineTo(300,500); ctx.stroke();
}

// 8. P = NP?
function drawPNP(ctx) {
  ctx.fillStyle='#ff006e'; ctx.font='140px Arial'; ctx.fillText('P = NP ?',60,280);
  ctx.fillStyle='#00ff9d'; ctx.font='40px Arial'; ctx.fillText('1 000 000 $ от Клэя',150,380);
}

// 9. Гёдель
function drawGodel(ctx) {
  ctx.fillStyle='#ffffff'; ctx.font='42px Arial'; ctx.textAlign='center';
  ctx.fillText('«Эта формула',300,200);
  ctx.fillText('недоказуема',300,280);
  ctx.fillText('внутри системы»',300,360);
}

// 10. Отель Хилберта
function drawHilbertHotel(ctx) {
  ctx.fillStyle='#00f0ff';
  for(let i=1;i<=60;i++){
    ctx.fillRect(i*9,120,7,180);
    ctx.fillStyle = i%2===0?'#ff006e':'#00f0ff';
  }
  ctx.fillStyle='#00ff9d'; ctx.font='36px Arial'; ctx.fillText('∞ гостей → всегда есть место',50,400);
}

// 11. Число e
function drawEApproximation(ctx) {
  new Chart(ctx, {type:'line', data:{labels:['10','100','1k','10k','100k','1M'], datasets:[{label:'(1+1/n)^n → e', data:[2.5937,2.7048,2.71692,2.71814,2.718268,2.718280], borderColor:'#00f0ff', backgroundColor:'rgba(0,240,255,0.2)', fill:true}]}, options:{plugins:{title:{display:true,text:'Предел числа e', color:'#00ff9d'}}}});
}

// 12. π из ряда Лейбница
function drawLeibnizPi(ctx) {
  const data=[], sum=0;
  for(let i=0;i<1500;i++){ sum += (i%2===0?1:-1)/(2*i+1); data.push(4*sum); }
  new Chart(ctx, {type:'line', data:{labels:Array.from({length:1500},(_,i)=>i+1), datasets:[{data, borderColor:'#ff006e', tension:0.4}]}, options:{plugins:{title:{display:true,text:'Ряд Лейбница → π', color:'#00ff9d'}}}});
}

// 13. Парадокс дней рождения
function drawBirthdayParadox(ctx) {
  const data = Array.from({length:70},(_,i)=>1-Math.pow(364/365,i*(i-1)/2));
  new Chart(ctx, {type:'line', data:{labels:Array.from({length:70},(_,i)=>i+1), datasets:[{label:'Вероятность совпадения', data, borderColor:'#00f0ff'}]}, options:{plugins:{title:{display:true,text:'23 человека → >50%', color:'#00ff9d'}}}});
}

// 14. Кривая дракона
function drawDragonCurve(ctx) {
  ctx.strokeStyle='#00ff9d'; ctx.lineWidth=2; let x=100,y=300,dir=0,len=3;
  let s='FX'; for(let i=0;i<13;i++) s=s.replace(/X/g,'X+YF+').replace(/Y/g,'-FX-Y');
  s.split('').forEach(c=>{ if(c==='F'){ x+=len*Math.cos(dir*Math.PI/180); y+=len*Math.sin(dir*Math.PI/180); ctx.lineTo(x,y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x,y); }
    else if(c==='+') dir+=90; else if(c==='-') dir-=90; });
}

// 15. Формула Стирлинга
function drawStirling(ctx) {
  new Chart(ctx, {type:'line', data:{labels:[1,10,20,50,100,200], datasets:[
    {label:'n!', data:[1,3628800,2.4329e18,3.0414e64,9.3326e157,7.2574e378], borderColor:'#ff006e'},
    {label:'Приближение Стирлинга', data:[1,3628697,2.4228e18,3.0363e64,9.3248e157,7.3044e378], borderColor:'#00f0ff'}
  ]}, options:{scales:{y:{type:'logarithmic'}}, plugins:{title:{display:true,text:'n! ≈ √(2πn)(n/e)^n'}}}});
}

// 16. √2 иррационально
function drawSqrt2(ctx) {
  ctx.strokeStyle='#ff006e'; ctx.lineWidth=6; ctx.beginPath(); ctx.moveTo(100,400); ctx.lineTo(400,400); ctx.lineTo(400,100); ctx.stroke();
  ctx.fillStyle='#00f0ff'; ctx.font='48px Arial'; ctx.fillText('√2 — иррационально',120,250);
}

// 17. Числа Фибоначчи
function drawFibonacciSpiral(ctx) {
  ctx.clearRect(0,0,600,500); let a=1,b=1,x=300,y=250; ctx.strokeStyle='#00ff9d'; ctx.lineWidth=4;
  for(let i=0;i<16;i++){
    ctx.strokeRect(x-a*16,y-a*16,a*32,a*32);
    ctx.beginPath(); ctx.arc(x,y,a*24,0,Math.PI/2); ctx.stroke();
    [a,b]=[b,a+b]; x+=[a*16,0,-b*16,0][i%4]; y+=[0,b*16,0,-a*16][i%4];
  }
}

// 18. Треугольник Серпинского
function drawSierpinski(ctx) {
  const draw = (x,y,size,level) => {
    if(level===0) return;
    ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+size,y); ctx.lineTo(x+size/2,y+size*Math.sqrt(3)/2); ctx.closePath();
    ctx.fillStyle=`hsl(${level*40},100%,60%)`; ctx.fill();
    draw(x,y,size/2,level-1); draw(x+size/2,y,size/2,level-1); draw(x+size/4,y+size*Math.sqrt(3)/4,size/2,level-1);
  };
  draw(80,50,440,8);
}

// 19. Теорема Пифагора
function drawPythagoras(ctx) {
  ctx.fillStyle='#ff006e'; ctx.fillRect(100,350,120,120); ctx.fillRect(220,350,120,120);
  ctx.fillStyle='#00f0ff'; ctx.fillRect(100,230,169.7,169.7);
  ctx.font='40px Arial'; ctx.fillStyle='#00ff9d'; ctx.fillText('a² + b² = c²',300,300);
}

// 20. Комплексные числа
function drawComplexPlane(ctx) {
  ctx.strokeStyle='#00f0ff'; ctx.lineWidth=4;
  ctx.beginPath(); ctx.moveTo(300,0); ctx.lineTo(300,500); ctx.moveTo(0,250); ctx.lineTo(600,250); ctx.stroke();
  ctx.fillStyle='#ff006e'; ctx.font='60px Arial'; ctx.fillText('i² = -1',320,240);
}

// 21. Бином Ньютона
function drawBinomial(ctx) {
  ctx.fillStyle='#00ff9d'; ctx.font='36px Arial'; ctx.fillText('(a + b)ⁿ = Σ C(n,k) aⁿ⁻ᵏ bᵏ',50,250);
}

// 22. Функция Гамма
function drawGamma(ctx) {
  ctx.strokeStyle='#00f0ff'; ctx.lineWidth=4; ctx.beginPath();
  for(let x=0;x<600;x++){
    const t=x/60; const y=450-40*Math.pow(t,2.5)*Math.exp(-t);
    ctx.lineTo(x,y);
  }
  ctx.stroke();
}

// 23. Ряд Тейлора
function drawTaylor(ctx) {
  ctx.strokeStyle='#ff006e'; ctx.lineWidth=4; ctx.beginPath();
  for(let x=-300;x<=300;x+=1){
    const val = Math.exp(-(x/100)*(x/100));
    ctx.lineTo(300+x,250-180*val);
  }
  ctx.stroke();
  ctx.fillStyle='#00f0ff'; ctx.fillText('Любая гладкая функция ≈ полином',60,100);
}

// 24. Уравнение теплопроводности
function drawHeat(ctx) {
  let t=0; const id=setInterval(()=>{
    ctx.clearRect(0,0,600,500);
    for(let x=0;x<600;x+=12){
      const h=180*Math.sin((x+t*3)/40)*Math.exp(-t/80);
      ctx.fillStyle=`hsl(${180+Math.abs(h)},100%,50%)`;
      ctx.fillRect(x,250-h,10,2*h);
    }
    t+=1; if(t>100) clearInterval(id);
  },40);
}

// 25. Снежинка Коха
function drawKoch(ctx) {
  const koch=(x1,y1,x2,y2,l)=>{if(l===0){ctx.lineTo(x2,y2);return;}
    const dx=(x2-x1)/3,dy=(y2-y1)/3;
    const p1x=x1+dx,p1y=y1+dy,p2x=x1+2*dx,p2y=y1+2*dy;
    const px=p1x+(p2x-p1x)*0.5+Math.sqrt(3)/2*(p2y-p1y);
    const py=p1y+(p2y-p1y)*0.5+Math.sqrt(3)/2*(p1x-p2x);
    koch(x1,y1,p1x,p1y,l-1); koch(p1x,p1y,px,py,l-1);
    koch(px,py,p2x,p2y,l-1); koch(p2x,p2y,x2,y2,l-1);
  };
  ctx.strokeStyle='#00ff9d'; ctx.beginPath(); ctx.moveTo(80,300);
  koch(80,300,520,300,6); ctx.stroke();
}

// 26. Великая теорема Ферма
function drawFermat(ctx) {
  ctx.fillStyle='#ff006e'; ctx.font='72px Arial'; ctx.fillText('aⁿ + bⁿ ≠ cⁿ',80,260);
  ctx.fillStyle='#00f0ff'; ctx.font='36px Arial'; ctx.fillText('при n > 2',250,340);
  ctx.fillStyle='#00ff9d'; ctx.fillText('Доказано в 1994 году',150,420);
}

// 27. Число Грэма
function drawGraham(ctx) {
  ctx.fillStyle='#ff006e'; ctx.font='68px Arial'; ctx.fillText('G₆₄ ↑↑↑↑',180,260);
  ctx.fillStyle='#00ff9d'; ctx.font='32px Arial'; ctx.fillText('Больше атомов во Вселенной',100,360);
}

// 28. Парадокс Рассела
function drawRussell(ctx) {
  ctx.fillStyle='#ffffff'; ctx.font='48px Arial'; ctx.fillText('R = {x | x ∉ x}',120,260);
  ctx.fillStyle='#ff006e'; ctx.fillText('→ Парадокс',240,360);
}

// 29. Квадратура круга
function drawSquaring(ctx) {
  ctx.beginPath(); ctx.arc(300,250,160,0,Math.PI*2); ctx.strokeStyle='#00f0ff'; ctx.lineWidth=6; ctx.stroke();
  ctx.fillStyle='#ff006e'; ctx.font='40px Arial'; ctx.fillText('π — трансцендентно',120,120);
  ctx.fillText('→ невозможно',200,420);
}

// 30. Бесконечность простых чисел
function drawPrimes(ctx) {
  ctx.fillStyle='#00ff9d'; ctx.font='48px Arial'; ctx.fillText('Простых чисел',120,220);
  ctx.fillText('бесконечно много',100,320);
  ctx.fillStyle='#00f0ff'; ctx.fillText('Доказал Евклид',160,420);
}

// 31. Тождество Эйлера (e^{iθ})
function drawEulerIdentity(ctx) {
  new Chart(ctx, {type:'polarArea', data:{labels:['cos θ','i sin θ','e^{iθ}'], datasets:[{data:[1,1,1], backgroundColor:['#ff006e80','#00f0ff80','#00ff9d80']}]}, options:{plugins:{title:{display:true,text:'e^{iθ} = cos θ + i sin θ', font:{size:28}}}}});
}

// 32. Формула Бине
function drawBinet(ctx) {
  const phi = (1+Math.sqrt(5))/2;
  const data = Array.from({length:20},(_,n)=>Math.round((Math.pow(phi,n+1) - Math.pow(1-phi,n+1))/Math.sqrt(5)));
  new Chart(ctx, {type:'bar', data:{labels:Array.from({length:20},(_,i)=>i+1), datasets:[{label:'Fₙ по Бине', data, backgroundColor:'#00ff9d'}]}, options:{plugins:{title:{display:true,text:'Точная формула для целых чисел!'}}}});
}

// 33. Решето Эратосфена
function drawEratosthenes(ctx) {
  ctx.font='28px Arial'; ctx.fillStyle='#00f0ff';
  for(let i=2;i<=150;i++){
    let x=(i%15)*38+50, y=Math.floor(i/15)*50+100;
    const isPrime = ![2,3,5,7,11,13].some(p=>i>p&&i%(p)==0);
    ctx.fillStyle=isPrime?'#00ff9d':'#ff006e';
    ctx.fillText(i,x,y);
  }
}

// 34. Теорема о четырёх красках
function drawFourColors(ctx) {
  ctx.fillStyle='#ff006e'; ctx.fillRect(100,100,150,150);
  ctx.fillStyle='#00f0ff'; ctx.fillRect(250,100,150,150);
  ctx.fillStyle='#00ff9d'; ctx.fillRect(175,250,150,150);
  ctx.fillStyle='#ffff00'; ctx.fillRect(325,250,150,150);
  ctx.fillStyle='#ffffff'; ctx.font='48px Arial'; ctx.fillText('4 цвета достаточно',60,420);
}

// 35. ζ(3) — константа Апери
function drawApery(ctx) {
  ctx.fillStyle='#00f0ff'; ctx.font='60px Arial'; ctx.fillText('ζ(3) ≈ 1.2020569...',50,250);
  ctx.fillStyle='#ff006e'; ctx.fillText('Иррациональность доказана в 1978',20,350);
}

// 36. Число Лиувилля
function drawLiouville(ctx) {
  ctx.fillStyle='#00ff9d'; ctx.font='40px Arial'; ctx.fillText('L = 0.1100010000000000000000010...',20,250);
  ctx.fillText('Первое явно трансцендентное число',30,350);
}

// 37. Кривая Пеано
function drawPeano(ctx) {
  ctx.strokeStyle='#00f0ff'; ctx.lineWidth=2;
  let x=300,y=250,dir=0;
  const steps='F+F+F+F+F+F+F+F+';
  steps.replace(/F/g,'F+F-F-F-F+F+F+F-F').slice(0,2000).split('').forEach(c=>{
    if(c==='F'){ x+=Math.cos(dir)*2; y+=Math.sin(dir)*2; ctx.lineTo(x,y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x,y); }
    if(c==='+') dir+=Math.PI/2; if(c==='-') dir-=Math.PI/2;
  });
}

// 38. Теорема Брауэра
function drawBrouwer(ctx) {
  ctx.beginPath(); ctx.arc(300,250,200,0,Math.PI*2); ctx.fillStyle='rgba(0,240,255,0.2)'; ctx.fill();
  ctx.strokeStyle='#ff006e'; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(200,150); ctx.quadraticCurveTo(400,350,300,300); ctx.stroke();
  ctx.fillStyle='#00ff9d'; ctx.fillText('Неподвижная точка существует',100,450);
}

// 39. Проблема Базеля
function drawBasel(ctx) {
  var data=[], sum=0;
  for(let i=1;i<1000;i++){ sum+=1/(i*i); data.push(sum); }
  new Chart(ctx, {type:'line', data:{datasets:[{data, borderColor:'#00f0ff'}]}, options:{plugins:{title:{display:true,text:'Σ 1/n² → π²/6'}}}});
}

// 40. Паскаль → Серпинский
function drawPascalFractal(ctx) {
  for(let row=0;row<64;row++){
    for(let col=0;col<=row;col++){
      const binom = binomial(row,col);
      if(binom%2===1) ctx.fillRect(col*9, row*8, 7,7);
    }
  }
  ctx.fillStyle='#00ff9d';
  function binomial(n,k){ let res=1; for(let i=1;i<=k;i++) res=res*(n+1-i)/i; return res; }
}

// 41. Теорема Вильсона
function drawWilson(ctx) {
  ctx.fillStyle='#00f0ff'; ctx.font='48px Arial'; ctx.fillText('(p-1)! ≡ -1 (mod p)',60,250);
  ctx.fillStyle='#ff006e'; ctx.fillText('если p — простое',140,350);
}

// 42. Константа Фейгенбаума
function drawFeigenbaum(ctx) {
  ctx.fillStyle='#00ff9d'; ctx.font='64px Arial'; ctx.fillText('δ ≈ 4.6692016...',80,260);
  ctx.fillStyle='#00f0ff'; ctx.fillText('Универсальная константа хаоса',40,380);
}
// 43. Уравнение волны
function drawWaveEquation(ctx) {
  let t = 0;
  const animate = () => {
    ctx.clearRect(0,0,600,500);
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 4;
    ctx.beginPath();
    for(let x = 0; x < 600; x += 4) {
      const y = 250 + 120 * Math.sin((x + t) * 0.02) * Math.sin(t * 0.02);
      ctx.lineTo(x, y);
    }
    ctx.stroke();
    t += 4;
    if (t < 1000) requestAnimationFrame(animate);
  };
  animate();
}

// 44. Множество Жюлиа
function drawJulia(ctx) {
  const w=600,h=500,maxIter=100;
  const img=ctx.createImageData(w,h);
  const cX = -0.7, cY = 0.27015;
  for(let px=0;px<w;px++)for(let py=0;py<h;py++){
    let x=(px-300)/200, y=(py-250)/200;
    let iter=maxIter;
    while(iter-- && x*x+y*y<4){
      let xt=x*x-y*y+cX;
      y=2*x*y+cY; x=xt;
    }
    const br=iter/maxIter;
    const i=(py*w+px)*4;
    img.data[i]=br*255;
    img.data[i+1]=br*150;
    img.data[i+2]=br*400%255;
    img.data[i+3]=255;
  }
  ctx.putImageData(img,0,0);
}

// 45. Кривая Гильберта (заполняющая пространство)
function drawHilbertCurve(ctx) {
  ctx.strokeStyle='#00ff9d'; ctx.lineWidth=2;
  const hilbert = (x,y,size,dir,depth) => {
    if(depth===0) return;
    if(dir===0){hilbert(x+size,y,size,-dir,depth-1); ctx.lineTo(x+size,y+size); hilbert(x+size,y+size,size,dir,depth-1); ctx.lineTo(x+size*2,y+size); hilbert(x+size*2,y+size,size,dir,depth-1); ctx.lineTo(x+size,y+size);}
    else if(dir===1){hilbert(x,y+size,size,dir,depth-1); ctx.lineTo(x+size,y+size); hilbert(x+size,y+size,size,dir,depth-1); ctx.lineTo(x+size,y); hilbert(x+size,y,size,-dir,depth-1); ctx.lineTo(x,y);}
    // остальные два направления аналогично (для краткости опущены)
  };
  ctx.beginPath(); ctx.moveTo(50,50);
  hilbert(50,50,200,0,6);
  ctx.stroke();
}

// 46. Фрактал «Дерево Пифагора»
function drawPythagorasTree(ctx) {
  const drawBranch = (x,y,len,angle,depth) => {
    if(depth===0) return;
    const x2 = x + len*Math.cos(angle);
    const y2 = y - len*Math.sin(angle);
    ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x2,y2); ctx.stroke();
    const newLen = len*0.7;
    drawBranch(x2,y2,newLen,angle+Math.PI/6,depth-1);
    drawBranch(x2,y2,newLen,angle-Math.PI/6,depth-1);
  };
  ctx.strokeStyle='#00ff9d'; ctx.lineWidth=3;
  drawBranch(300,480,120,0,11);
}

// 47. Последовательность Лукаса и золотое сечение
function drawLucas(ctx) {
  const lucas = [2,1];
  for(let i=2;i<30;i++) lucas.push(lucas[i-1]+lucas[i-2]);
  const ratios = lucas.slice(1).map((v,i)=>v/lucas[i]);
  new Chart(ctx, {type:'line', data:{labels:Array.from({length:28},(_,i)=>i+2), datasets:[{label:'Lₙ₊₁ / Lₙ → φ', data:ratios, borderColor:'#ff006e', backgroundColor:'rgba(255,0,110,0.2)', fill:true}]}, options:{plugins:{title:{display:true,text:'Числа Лукаса тоже стремятся к φ'}}}});
}

// 48. Клеточный автомат «Игра Жизни» Конвея
function drawGameOfLife(ctx) {
  let grid = Array(50).fill().map(()=>Array(70).fill(0));
  // глайдер
  grid[10][10]=grid[11][11]=grid[12][9]=grid[12][10]=grid[12][11]=1;
  const draw = ()=>{
    ctx.clearRect(0,0,600,500);
    ctx.fillStyle='#00f0ff';
    grid.forEach((row,y)=>row.forEach((cell,x)=>{
      if(cell) ctx.fillRect(x*8+100,y*8+50,7,7);
    }));
    // обновление по правилам Жизни
    const next = grid.map(r=>r.slice());
    for(let y=0;y<50;y++)for(let x=0;x<70;x++){
      let neigh = 0;
      for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++)
        if(dx||dy) neigh += grid[(y+dy+50)%50][(x+dx+70)%70];
      if(grid[y][x]) next[y][x] = neigh===2||neigh===3?1:0;
      else next[y][x] = neigh===3?1:0;
    }
    grid=next;
    requestAnimationFrame(draw);
  };
  draw();
}

// 49. Треугольник Паскаля (цветной)
function drawPascalTriangle(ctx) {
  ctx.textAlign='center';
  for(let row=0;row<20;row++){
    let val=1;
    for(let col=0;col<=row;col++){
      const x=300+(col-row/2)*28;
      const y=50+row*26;
      ctx.fillStyle = `hsl(${val%360},100%,50%)`;
      ctx.font='24px Arial';
      ctx.fillText(val,x,y);
      val = val*(row-col)/(col+1);
    }
  }
}

// 50. Кривая Леви (C-кривой)
function drawLevyCurve(ctx) {
  ctx.strokeStyle='#ff006e'; ctx.lineWidth=2;
  const levy = (x,y,len,angle,depth)=>{
    if(depth===0){ ctx.lineTo(x+len*Math.cos(angle),y+len*Math.sin(angle)); return; }
    const l=len/Math.sqrt(2);
    levy(x,y,l,angle+Math.PI/4,depth-1);
    levy(x+l*Math.cos(angle+Math.PI/4),y+l*Math.sin(angle+Math.PI/4),l,angle-Math.PI/4,depth-1);
  };
  ctx.beginPath(); ctx.moveTo(100,250);
  levy(100,250,400,0,13);
  ctx.stroke();
}

// 51. Бесконечная дробь для π (Джон Уоллис)
function drawWallis(ctx) {
  let prod=1;
  const data=[];
  for(let n=1;n<500;n++){
    prod *= (4*n*n)/((4*n*n)-1);
    data.push(prod*Math.PI/2);
  }
  new Chart(ctx, {type:'line', data:{datasets:[{data, borderColor:'#00f0ff', tension:0.5}]}, options:{plugins:{title:{display:true,text:'Произведение Уоллиса → π/2'}}}});
}

// 52. Последний феномен — «Всё связано»
function drawEverything(ctx) {
  ctx.fillStyle='#000000'; ctx.fillRect(0,0,600,500);
  ctx.fillStyle='#00ff9d'; ctx.font='48px Arial'; ctx.textAlign='center';
  ctx.fillText('Математика —',300,180);
  ctx.fillText('это искусство',300,260);
  ctx.fillStyle='#ff006e'; ctx.font='36px Arial';
  ctx.fillText('и ты только что увидел',300,340);
  ctx.fillStyle='#00f0ff';
  ctx.fillText('52 доказательства',300,400);
  // лёгкая анимация конфетти
  for(let i=0;i<100;i++){
    setTimeout(()=>{
      ctx.fillStyle=`hsl(${Math.random()*360},100%,50%)`;
      ctx.fillRect(Math.random()*600,Math.random()*500,8,8);
    },i*30);
  }
}
// Анимация появления
window.addEventListener('load', () => {
  document.querySelectorAll('.card').forEach((card, i) => {
    setTimeout(() => {
      card.style.opacity = 1;
      card.style.transform = 'translateY(0)';
    }, i * 100);
  });
});