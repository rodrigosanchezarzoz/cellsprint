"use client";
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  FileSpreadsheet,
  Flame,
  Clock,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ShieldCheck,
  Trophy,
  BarChart3,
  ChevronRight,
  Lock,
  Sparkles,
  Copy,
  Check,
  Play,
  Terminal,
  Globe,
  GraduationCap,
  EyeOff,
  Monitor,
  Database,
  Download,
  Filter,
  ArrowUpAZ,
  ArrowDownZA,
  Bold,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Paintbrush,
  Eraser,
  Percent,
  DollarSign,
  Languages,
  Calendar,
  ChevronLeft,
  Rocket,
  Users
} from 'lucide-react';

// ============================================================================
// 5-LANGUAGE INTERNATIONALIZATION (ES, EN, 中文, HI, FR)
// ============================================================================

const LANGUAGES = [
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'zh', label: '中文', name: '中文' },
  { code: 'hi', label: 'HI', name: 'हिन्दी' },
  { code: 'fr', label: 'FR', name: 'Français' }
];

const TRANSLATIONS = {
  es: {
    tagline: 'El reto diario de lógica y agilidad en hojas de cálculo',
    dailyBadge: 'Reto del Día',
    practiceBadge: 'Práctica',
    dailyBtn: 'Reto del Día #042',
    practiceLabel: 'Practicar:',
    streakSuffix: 'd Racha',
    stealthBtn: 'Stealth',
    stealthTitle: 'Modo Trabajo / Clase (Alt+S o F9)',
    resetTitle: 'Reiniciar ejercicio desde 00:00.0',
    avgTimeToday: 'Tiempo medio hoy',
    readyDailyTitle: '¿Listo para el Reto del Día #042?',
    readyPracticeTitle: '¿Listo para iniciar',
    readyBody1: 'Para que la competición sea 100% justa,',
    readyBodyBold: 'el enunciado exacto y los datos de la tabla están ocultos',
    readyBody2: 'En cuanto pulses el botón de inicio, se revelará la pregunta y el cronómetro empezará a correr automáticamente.',
    caseTopic: 'Tema del caso',
    autoStopNote: 'Al completar las celdas objetivo con fórmulas dinámicas, el reloj se detendrá solo y verás en qué percentil estás.',
    startBtn: 'Empezar Reto y Revelar Pregunta',
    competingBanner: 'Todos los usuarios compiten hoy en este mismo problema',
    hintBtn: 'Pista',
    validateBtn: 'Validar Solución',
    antiHardcodingActive: 'Detección Anti-Hardcoding Siempre Activa',
    hintTitle: 'Pista Conceptual (Acepta fórmulas en Español e Inglés):',
    closeBtn: 'Cerrar',
    sortAZ: 'Ordenar A-Z',
    sortZA: 'Z-A',
    fillLabel: 'Relleno',
    noColor: 'Sin color',
    boldTitle: 'Negrita',
    alignLeft: 'Alinear a la izquierda',
    alignCenter: 'Centrar',
    alignRight: 'Alinear a la derecha',
    currencyTitle: 'Formato Moneda',
    percentTitle: 'Formato Porcentaje',
    decimalTitle: 'Formato Decimal (0.00)',
    clearFormatTitle: 'Limpiar formato visual',
    lockedCellBadge: 'Celda de Datos (Fija)',
    targetCellBadge: 'Celda Objetivo',
    auxCellBadge: 'Celda Auxiliar Libre',
    functionsLabel: 'Funciones:',
    fxPlaceholderLocked: 'Celda de datos fija (selecciona una celda verde punteada para escribir)',
    fxPlaceholderActive: 'Escribe tu fórmula empezando por = o arrastra el ratón sobre las celdas...',
    legendData: 'Celdas de Datos (Puedes ordenar o arrastrar para seleccionar rangos)',
    legendTarget: 'Celdas Objetivo (Fórmula con =)',
    modalDailyDone: '¡Reto del Día #042 Completado!',
    modalPracticeDone: '¡Ejercicio Superado!',
    modalSubtitle: 'Cronómetro detenido automáticamente',
    modalBadge: 'VALIDADO',
    kpiTime: 'Tiempo Final',
    kpiTop: 'Tu Porcentaje',
    kpiBeat: 'Superaste al',
    bannerPrefix: 'Estás en el',
    bannerMiddle: '— Has sido más rápido que el',
    bannerSuffix: 'de los jugadores hoy.',
    fxValidated: 'fx validadas',
    gaussTitle: 'Comparativa Global de Tiempos (Campana de Gauss)',
    gaussMean: 'Media',
    gaussYourTime: 'Tu Tiempo',
    gaussLegend: 'Área verde = Jugadores superados →',
    reviewSheetBtn: 'Revisar mi Hoja',
    goToNext: 'Ir a',
    backToDaily: 'Volver al Reto del Día',
    copyResult: 'Copiar Resultado',
    copied: '¡Copiado!',
    alertIncompleteTitle: 'Celda Objetivo Incompleta',
    alertIncompleteMsg: 'Falta completar la celda {tid}. Escribe una fórmula empezando por "=".',
    alertHardcodeTitle: 'Valor Hardcoded Detectado en {tid}',
    alertHardcodeMsg: 'Error de Auditoría: Se requiere una fórmula dinámica con "=", no escribir el resultado fijo a mano.',
    alertStaticTitle: 'Valor Estático Detectado en {tid}',
    alertStaticMsg: 'Error de Auditoría: Has escrito un número fijo detrás del signo "=". Debes referenciar las celdas de la tabla.',
    alertSyntaxTitle: 'Error en Fórmula de {tid}',
    alertSyntaxMsg: 'La fórmula en {tid} devuelve {err}. Revisa el rango seleccionado o los paréntesis.',
    alertMismatchTitle: 'Resultado Incorrecto en {tid}',
    alertMismatchMsg: 'Tu resultado: {got} | Resultado esperado: {exp}.',
    alertDynamicTitle: 'Fórmula Hardcoded Detectada (No Dinámica)',
    alertDynamicMsg: 'Al variar internamente la celda {cell}, tu fórmula en {tid} no recalculó el resultado. Selecciona las celdas de datos en tu fórmula.',
    stealthBack: 'Volver (Alt+S)',
    stealthSubtitle: 'Q4 FY26 · Consolidación Operativa',
    stealthTab1: 'Matriz de Centros de Coste',
    stealthTab2: 'Análisis de Varianza',
    stealthTab3: 'Registro de Auditoría',
    stealthSearch: 'Filtrar por código o departamento...',
    stealthExport: 'Exportar Informe CSV',
    stealthExported: 'CSV generado ✓'
  },
  en: {
    tagline: 'The daily spreadsheet logic & speed challenge',
    dailyBadge: 'Daily Case',
    practiceBadge: 'Practice',
    dailyBtn: 'Daily Case #042',
    practiceLabel: 'Practice:',
    streakSuffix: 'd Streak',
    stealthBtn: 'Stealth',
    stealthTitle: 'Work / Class Stealth Mode (Alt+S or F9)',
    resetTitle: 'Restart challenge from 00:00.0',
    avgTimeToday: 'Market avg today',
    readyDailyTitle: 'Ready for Daily Case #042?',
    readyPracticeTitle: 'Ready to start',
    readyBody1: 'To keep the competition 100% fair,',
    readyBodyBold: 'the exact prompt and spreadsheet data are hidden',
    readyBody2: 'As soon as you click Start, the question will appear and the live stopwatch will begin immediately.',
    caseTopic: 'Case topic',
    autoStopNote: 'Once all target cells are solved with dynamic formulas, the timer stops automatically and shows your percentile.',
    startBtn: 'Start Challenge & Reveal Prompt',
    competingBanner: 'Everyone competes on this exact same problem today',
    hintBtn: 'Hint',
    validateBtn: 'Validate Solution',
    antiHardcodingActive: 'Anti-Hardcoding Detection Always Active',
    hintTitle: 'Concept Hint (Supports English & Spanish formulas):',
    closeBtn: 'Close',
    sortAZ: 'Sort A-Z',
    sortZA: 'Z-A',
    fillLabel: 'Fill',
    noColor: 'No fill',
    boldTitle: 'Bold',
    alignLeft: 'Align left',
    alignCenter: 'Center',
    alignRight: 'Align right',
    currencyTitle: 'Currency format',
    percentTitle: 'Percent format',
    decimalTitle: 'Decimal format (0.00)',
    clearFormatTitle: 'Clear visual formatting',
    lockedCellBadge: 'Data Cell (Locked)',
    targetCellBadge: 'Target Cell',
    auxCellBadge: 'Free Scratch Cell',
    functionsLabel: 'Functions:',
    fxPlaceholderLocked: 'Locked data cell (select a dashed green cell to type)',
    fxPlaceholderActive: 'Type a formula starting with = or drag across cells...',
    legendData: 'Data Cells (Sort or drag to select ranges)',
    legendTarget: 'Target Cells (Formula with =)',
    modalDailyDone: 'Daily Case #042 Completed!',
    modalPracticeDone: 'Practice Level Cleared!',
    modalSubtitle: 'Stopwatch stopped automatically',
    modalBadge: 'VERIFIED',
    kpiTime: 'Final Time',
    kpiTop: 'Your Rank',
    kpiBeat: 'Faster Than',
    bannerPrefix: 'You are in the',
    bannerMiddle: '— Faster than',
    bannerSuffix: 'of players today.',
    fxValidated: 'fx verified',
    gaussTitle: 'Global Time Distribution (Bell Curve)',
    gaussMean: 'Mean',
    gaussYourTime: 'Your Time',
    gaussLegend: 'Green area = Players beaten →',
    reviewSheetBtn: 'Review My Sheet',
    goToNext: 'Go to',
    backToDaily: 'Back to Daily Case',
    copyResult: 'Copy Result',
    copied: 'Copied!',
    alertIncompleteTitle: 'Incomplete Target Cell',
    alertIncompleteMsg: 'Cell {tid} is empty. Enter a dynamic formula starting with "=".',
    alertHardcodeTitle: 'Hardcoded Value Detected in {tid}',
    alertHardcodeMsg: 'Audit Error: A dynamic formula starting with "=" is required, not a static number.',
    alertStaticTitle: 'Static Formula Detected in {tid}',
    alertStaticMsg: 'Audit Error: You typed a fixed number after "=". Reference the table cells dynamically.',
    alertSyntaxTitle: 'Formula Error in {tid}',
    alertSyntaxMsg: 'The formula in {tid} returned {err}. Check your cell ranges and parentheses.',
    alertMismatchTitle: 'Incorrect Result in {tid}',
    alertMismatchMsg: 'Your value: {got} | Expected value: {exp}.',
    alertDynamicTitle: 'Non-Dynamic Formula Detected',
    alertDynamicMsg: 'When {cell} changes, your formula in {tid} did not update automatically. Link directly to the data cells.',
    stealthBack: 'Exit (Alt+S)',
    stealthSubtitle: 'Q4 FY26 · Operational Consolidation',
    stealthTab1: 'Cost Center Matrix',
    stealthTab2: 'Variance Analysis',
    stealthTab3: 'Audit Logs',
    stealthSearch: 'Filter by code or department...',
    stealthExport: 'Export CSV Report',
    stealthExported: 'CSV generated ✓'
  },
  zh: {
    tagline: '每日电子表格逻辑与速度挑战',
    dailyBadge: '每日挑战',
    practiceBadge: '自由练习',
    dailyBtn: '每日挑战 #042',
    practiceLabel: '练习关卡:',
    streakSuffix: '天连胜',
    stealthBtn: '摸鱼模式',
    stealthTitle: '工作/课堂隐藏模式 (Alt+S 或 F9)',
    resetTitle: '重置计时 00:00.0',
    avgTimeToday: '今日平均用时',
    readyDailyTitle: '准备好挑战每日一题 #042 了吗？',
    readyPracticeTitle: '准备开始',
    readyBody1: '为了保证比赛100%公平，',
    readyBodyBold: '具体题目要求与表格数据当前已隐藏',
    readyBody2: '点击“开始挑战”后，题目与表格将立即显示，计时器也会自动开始。',
    caseTopic: '今日主题',
    autoStopNote: '使用动态公式完成所有目标单元格后，计时器会自动停止并显示您的全球百分位排名。',
    startBtn: '开始挑战并显示题目',
    competingBanner: '今天所有玩家都在挑战同一道题目',
    hintBtn: '提示',
    validateBtn: '验证答案',
    antiHardcodingActive: '防作弊动态公式检测已强制开启',
    hintTitle: '思路提示（支持中英文常用函数语法）：',
    closeBtn: '关闭',
    sortAZ: '升序 A-Z',
    sortZA: '降序 Z-A',
    fillLabel: '填充',
    noColor: '无填充',
    boldTitle: '加粗',
    alignLeft: '左对齐',
    alignCenter: '居中',
    alignRight: '右对齐',
    currencyTitle: '货币格式',
    percentTitle: '百分比格式',
    decimalTitle: '小数格式 (0.00)',
    clearFormatTitle: '清除格式',
    lockedCellBadge: '数据单元格（锁定）',
    targetCellBadge: '目标单元格',
    auxCellBadge: '自由辅助单元格',
    functionsLabel: '常用函数:',
    fxPlaceholderLocked: '锁定数据单元格（请选择绿色虚线单元格输入）',
    fxPlaceholderActive: '输入以 = 开头的公式，或用鼠标拖动选择单元格区域...',
    legendData: '数据单元格（可排序或拖动框选区域）',
    legendTarget: '目标单元格（必须输入 = 公式）',
    modalDailyDone: '每日挑战 #042 已完成！',
    modalPracticeDone: '练习关卡已通过！',
    modalSubtitle: '计时器已自动停止',
    modalBadge: '已验证',
    kpiTime: '最终用时',
    kpiTop: '您的排名',
    kpiBeat: '超越玩家',
    bannerPrefix: '您位列前',
    bannerMiddle: '— 比今天',
    bannerSuffix: '的玩家更快。',
    fxValidated: '个公式已验证',
    gaussTitle: '全球用时分布（正态高斯曲线）',
    gaussMean: '均值',
    gaussYourTime: '您的用时',
    gaussLegend: '绿色区域 = 被您超越的玩家 →',
    reviewSheetBtn: '查看我的表格',
    goToNext: '前往',
    backToDaily: '返回每日挑战',
    copyResult: '复制战绩',
    copied: '已复制！',
    alertIncompleteTitle: '目标单元格未完成',
    alertIncompleteMsg: '单元格 {tid} 为空，请输入以 "=" 开头的动态公式。',
    alertHardcodeTitle: '检测到静态硬编码 ({tid})',
    alertHardcodeMsg: '审计错误：必须使用以 "=" 开头的动态公式，不能直接填写固定数字。',
    alertStaticTitle: '检测到静态常量公式 ({tid})',
    alertStaticMsg: '审计错误：等号后不能只写固定数值，请引用表格中的数据单元格。',
    alertSyntaxTitle: '公式语法错误 ({tid})',
    alertSyntaxMsg: '单元格 {tid} 的公式返回 {err}，请检查区域和括号。',
    alertMismatchTitle: '计算结果有误 ({tid})',
    alertMismatchMsg: '当前结果: {got} | 预期结果: {exp}。',
    alertDynamicTitle: '未通过动态联动检测',
    alertDynamicMsg: '当 {cell} 的数值变化时，{tid} 未自动重新计算。请直接引用数据区域。',
    stealthBack: '返回 (Alt+S)',
    stealthSubtitle: 'Q4 FY26 · 运营成本核对系统',
    stealthTab1: '成本中心矩阵',
    stealthTab2: '偏差分析',
    stealthTab3: '审计日志',
    stealthSearch: '按编号或部门筛选...',
    stealthExport: '导出 CSV 报表',
    stealthExported: 'CSV 已生成 ✓'
  },
  hi: {
    tagline: 'दैनिक स्प्रेडशीट लॉजिक और स्पीड चैलेंज',
    dailyBadge: 'दैनिक केस',
    practiceBadge: 'अभ्यास',
    dailyBtn: 'दैनिक केस #042',
    practiceLabel: 'अभ्यास:',
    streakSuffix: 'दिन स्ट्रीक',
    stealthBtn: 'स्टेल्थ',
    stealthTitle: 'वर्क / क्लास स्टेल्थ मोड (Alt+S या F9)',
    resetTitle: '00:00.0 से पुनः शुरू करें',
    avgTimeToday: 'आज का औसत समय',
    readyDailyTitle: 'क्या आप दैनिक केस #042 के लिए तैयार हैं?',
    readyPracticeTitle: 'शुरू करने के लिए तैयार',
    readyBody1: 'प्रतियोगिता को 100% निष्पक्ष रखने के लिए,',
    readyBodyBold: 'सटीक प्रश्न और तालिका का डेटा अभी छिपा हुआ है',
    readyBody2: 'जैसे ही आप स्टार्ट बटन दबाएंगे, प्रश्न दिखाई देगा और टाइमर अपने आप शुरू हो जाएगा।',
    caseTopic: 'विषय',
    autoStopNote: 'डायनामिक फ़ॉर्मूला से सभी लक्ष्य सेल पूरे होते ही टाइमर अपने आप रुक जाएगा और आपका प्रतिशत दिखेगा।',
    startBtn: 'शुरू करें और प्रश्न देखें',
    competingBanner: 'आज सभी खिलाड़ी इसी एक समस्या पर प्रतिस्पर्धा कर रहे हैं',
    hintBtn: 'संकेत',
    validateBtn: 'उत्तर जांचें',
    antiHardcodingActive: 'एंटी-हार्डकोडिंग जांच हमेशा सक्रिय',
    hintTitle: 'संकल्पना संकेत (अंग्रेज़ी और स्पेनिश फ़ॉर्मूला समर्थित):',
    closeBtn: 'बंद करें',
    sortAZ: 'क्रम A-Z',
    sortZA: 'Z-A',
    fillLabel: 'रंग',
    noColor: 'कोई रंग नहीं',
    boldTitle: 'बोल्ड',
    alignLeft: 'बाएं',
    alignCenter: 'केंद्र',
    alignRight: 'दाएं',
    currencyTitle: 'मुद्रा प्रारूप',
    percentTitle: 'प्रतिशत प्रारूप',
    decimalTitle: 'दशमलव (0.00)',
    clearFormatTitle: 'प्रारूप साफ़ करें',
    lockedCellBadge: 'डेटा सेल (लॉक)',
    targetCellBadge: 'लक्ष्य सेल',
    auxCellBadge: 'मुक्त सहायक सेल',
    functionsLabel: 'फ़ंक्शन:',
    fxPlaceholderLocked: 'लॉक डेटा सेल (लिखने के लिए हरे डैश वाले सेल को चुनें)',
    fxPlaceholderActive: '= से शुरू होने वाला फ़ॉर्मूला लिखें या माउस से सेल चुनें...',
    legendData: 'डेटा सेल (रेंज चुनने के लिए ड्रैग या सॉर्ट करें)',
    legendTarget: 'लक्ष्य सेल (= वाला फ़ॉर्मूला अनिवार्य)',
    modalDailyDone: 'दैनिक केस #042 पूरा हुआ!',
    modalPracticeDone: 'अभ्यास स्तर पूरा हुआ!',
    modalSubtitle: 'टाइमर अपने आप रुक गया',
    modalBadge: 'सत्यापित',
    kpiTime: 'अंतिम समय',
    kpiTop: 'आपकी रैंक',
    kpiBeat: 'आपने पीछे छोड़ा',
    bannerPrefix: 'आप शीर्ष',
    bannerMiddle: 'में हैं — आज के',
    bannerSuffix: 'खिलाड़ियों से तेज़।',
    fxValidated: 'फ़ॉर्मूला सत्यापित',
    gaussTitle: 'वैश्विक समय वितरण (गॉसियन बेल कर्व)',
    gaussMean: 'औसत',
    gaussYourTime: 'आपका समय',
    gaussLegend: 'हरा क्षेत्र = आपसे धीमे खिलाड़ी →',
    reviewSheetBtn: 'शीट देखें',
    goToNext: 'अगला:',
    backToDaily: 'दैनिक केस पर लौटें',
    copyResult: 'परिणाम कॉपी करें',
    copied: 'कॉपी हो गया!',
    alertIncompleteTitle: 'अधूरा लक्ष्य सेल',
    alertIncompleteMsg: 'सेल {tid} खाली है। "=" से शुरू होने वाला फ़ॉर्मूला दर्ज करें।',
    alertHardcodeTitle: '{tid} में हार्डकोडेड मान मिला',
    alertHardcodeMsg: 'ऑडिट त्रुटि: सीधा नंबर नहीं, "=" से शुरू होने वाला डायनामिक फ़ॉर्मूला लिखें।',
    alertStaticTitle: '{tid} में स्थिर संख्या मिली',
    alertStaticMsg: 'ऑडिट त्रुटि: "=" के बाद सीधा नंबर न लिखें, तालिका के सेल का संदर्भ दें।',
    alertSyntaxTitle: '{tid} में फ़ॉर्मूला त्रुटि',
    alertSyntaxMsg: '{tid} का फ़ॉर्मूला {err} दे रहा है। रेंज और कोष्ठक जांचें।',
    alertMismatchTitle: '{tid} में गलत परिणाम',
    alertMismatchMsg: 'आपका मान: {got} | अपेक्षित मान: {exp}।',
    alertDynamicTitle: 'डायनामिक जांच विफल',
    alertDynamicMsg: '{cell} बदलने पर {tid} अपडेट नहीं हुआ। कृपया डेटा सेल से लिंक करें।',
    stealthBack: 'वापस (Alt+S)',
    stealthSubtitle: 'Q4 FY26 · परिचालन समेकन',
    stealthTab1: 'लागत केंद्र मैट्रिक्स',
    stealthTab2: 'विचरण विश्लेषण',
    stealthTab3: 'ऑडिट लॉग',
    stealthSearch: 'कोड या विभाग द्वारा फ़िल्टर करें...',
    stealthExport: 'CSV रिपोर्ट निर्यात करें',
    stealthExported: 'CSV तैयार ✓'
  },
  fr: {
    tagline: 'Le défi quotidien de logique et rapidité sur tableur',
    dailyBadge: 'Défi du Jour',
    practiceBadge: 'Pratique',
    dailyBtn: 'Défi du Jour #042',
    practiceLabel: 'Pratiquer :',
    streakSuffix: 'j Série',
    stealthBtn: 'Discret',
    stealthTitle: 'Mode Travail / Cours (Alt+S ou F9)',
    resetTitle: 'Redémarrer à 00:00.0',
    avgTimeToday: 'Temps moyen aujourd’hui',
    readyDailyTitle: 'Prêt pour le Défi du Jour #042 ?',
    readyPracticeTitle: 'Prêt à commencer',
    readyBody1: 'Pour que la compétition soit 100% équitable,',
    readyBodyBold: 'l’énoncé exact et les données sont masqués',
    readyBody2: 'Dès que vous cliquez sur Démarrer, la question s’affiche et le chronomètre démarre automatiquement.',
    caseTopic: 'Thème du cas',
    autoStopNote: 'Dès que toutes les cellules cibles sont résolues avec des formules dynamiques, le chrono s’arrête et affiche votre percentile.',
    startBtn: 'Démarrer et Révéler la Question',
    competingBanner: 'Tout le monde joue sur ce même problème aujourd’hui',
    hintBtn: 'Indice',
    validateBtn: 'Valider',
    antiHardcodingActive: 'Détection Anti-Hardcoding Toujours Active',
    hintTitle: 'Indice conceptuel (Formules EN / ES acceptées) :',
    closeBtn: 'Fermer',
    sortAZ: 'Trier A-Z',
    sortZA: 'Z-A',
    fillLabel: 'Fond',
    noColor: 'Aucun',
    boldTitle: 'Gras',
    alignLeft: 'Aligner à gauche',
    alignCenter: 'Centrer',
    alignRight: 'Aligner à droite',
    currencyTitle: 'Format Monétaire',
    percentTitle: 'Format Pourcentage',
    decimalTitle: 'Format Décimal (0.00)',
    clearFormatTitle: 'Effacer le style',
    lockedCellBadge: 'Cellule de Données (Fixe)',
    targetCellBadge: 'Cellule Cible',
    auxCellBadge: 'Cellule Libre',
    functionsLabel: 'Fonctions :',
    fxPlaceholderLocked: 'Cellule verrouillée (sélectionnez une cellule verte en pointillés)',
    fxPlaceholderActive: 'Saisissez une formule avec = ou glissez sur les cellules...',
    legendData: 'Cellules de Données (Trier ou glisser pour sélectionner)',
    legendTarget: 'Cellules Cibles (Formule avec =)',
    modalDailyDone: 'Défi du Jour #042 Terminé !',
    modalPracticeDone: 'Exercice Réussi !',
    modalSubtitle: 'Chronomètre arrêté automatiquement',
    modalBadge: 'VALIDÉ',
    kpiTime: 'Temps Final',
    kpiTop: 'Classement',
    kpiBeat: 'Devancé',
    bannerPrefix: 'Vous êtes dans le',
    bannerMiddle: '— Plus rapide que',
    bannerSuffix: 'des joueurs aujourd’hui.',
    fxValidated: 'fx validées',
    gaussTitle: 'Distribution Mondiale des Temps (Courbe de Gauss)',
    gaussMean: 'Moyenne',
    gaussYourTime: 'Votre Temps',
    gaussLegend: 'Zone verte = Joueurs dépassés →',
    reviewSheetBtn: 'Revoir ma Feuille',
    goToNext: 'Aller à',
    backToDaily: 'Retour au Défi du Jour',
    copyResult: 'Copier le Résultat',
    copied: 'Copié !',
    alertIncompleteTitle: 'Cellule Cible Incomplète',
    alertIncompleteMsg: 'La cellule {tid} est vide. Saisissez une formule commençant par "=".',
    alertHardcodeTitle: 'Valeur Fixe Détectée en {tid}',
    alertHardcodeMsg: 'Erreur d’Audit : Une formule dynamique avec "=" est requise, pas une valeur fixe.',
    alertStaticTitle: 'Formule Statique en {tid}',
    alertStaticMsg: 'Erreur d’Audit : Référencez les cellules du tableau au lieu d’écrire un nombre fixe.',
    alertSyntaxTitle: 'Erreur de Formule en {tid}',
    alertSyntaxMsg: 'La formule en {tid} renvoie {err}. Vérifiez vos plages et parenthèses.',
    alertMismatchTitle: 'Résultat Incorrect en {tid}',
    alertMismatchMsg: 'Votre valeur : {got} | Valeur attendue : {exp}.',
    alertDynamicTitle: 'Formule Non Dynamique',
    alertDynamicMsg: 'En modifiant {cell}, la cellule {tid} ne s’est pas recalculée. Liez directement les cellules.',
    stealthBack: 'Quitter (Alt+S)',
    stealthSubtitle: 'Q4 FY26 · Consolidation Opérationnelle',
    stealthTab1: 'Matrice des Coûts',
    stealthTab2: 'Analyse de Variance',
    stealthTab3: 'Journal d’Audit',
    stealthSearch: 'Filtrer par code ou service...',
    stealthExport: 'Exporter CSV',
    stealthExported: 'CSV généré ✓'
  }
};

// ============================================================================
// FORMULA ENGINE & GRID UTILITIES
// ============================================================================

const COLS = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const NUM_ROWS = 13;

function parseCellId(cellId) {
  const match = String(cellId).trim().toUpperCase().match(/^([A-Z]+)(\d+)$/);
  if (!match) return null;
  return { col: match[1], row: parseInt(match[2], 10), id: `${match[1]}${match[2]}` };
}

function formatRangeBetween(startId, endId) {
  const s = parseCellId(startId);
  const e = parseCellId(endId);
  if (!s || !e) return startId;
  if (s.id === e.id) return s.id;

  const c1 = COLS.indexOf(s.col);
  const c2 = COLS.indexOf(e.col);
  if (c1 === -1 || c2 === -1) return startId;

  const minCol = COLS[Math.min(c1, c2)];
  const maxCol = COLS[Math.max(c1, c2)];
  const minRow = Math.min(s.row, e.row);
  const maxRow = Math.max(s.row, e.row);

  return `${minCol}${minRow}:${maxCol}${maxRow}`;
}

function isCellInBox(cellId, boxStart, boxEnd) {
  if (!boxStart || !boxEnd) return false;
  const cell = parseCellId(cellId);
  const s = parseCellId(boxStart);
  const e = parseCellId(boxEnd);
  if (!cell || !s || !e) return false;

  const cIdx = COLS.indexOf(cell.col);
  const c1 = COLS.indexOf(s.col);
  const c2 = COLS.indexOf(e.col);
  const minC = Math.min(c1, c2);
  const maxC = Math.max(c1, c2);
  const minR = Math.min(s.row, e.row);
  const maxR = Math.max(s.row, e.row);

  return cIdx >= minC && cIdx <= maxC && cell.row >= minR && cell.row <= maxR;
}

function expandRange(rangeStr, as2D = false) {
  const parts = rangeStr.trim().toUpperCase().split(':');
  if (parts.length !== 2) return [];
  const start = parseCellId(parts[0]);
  const end = parseCellId(parts[1]);
  if (!start || !end) return [];

  const startColIdx = COLS.indexOf(start.col);
  const endColIdx = COLS.indexOf(end.col);
  if (startColIdx === -1 || endColIdx === -1) return [];

  const cMin = Math.min(startColIdx, endColIdx);
  const cMax = Math.max(startColIdx, endColIdx);
  const rMin = Math.min(start.row, end.row);
  const rMax = Math.max(start.row, end.row);

  const matrix = [];
  const flat = [];
  for (let r = rMin; r <= rMax; r++) {
    const rowArr = [];
    for (let c = cMin; c <= cMax; c++) {
      const id = `${COLS[c]}${r}`;
      rowArr.push(id);
      flat.push(id);
    }
    matrix.push(rowArr);
  }
  return as2D ? matrix : flat;
}

function splitArgs(argsStr) {
  const res = [];
  let cur = '';
  let depth = 0;
  let inQuotes = false;

  for (let i = 0; i < argsStr.length; i++) {
    const ch = argsStr[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
      cur += ch;
    } else if (!inQuotes) {
      if (ch === '(') {
        depth++;
        cur += ch;
      } else if (ch === ')') {
        depth--;
        cur += ch;
      } else if ((ch === ',' || ch === ';') && depth === 0) {
        res.push(cur.trim());
        cur = '';
      } else {
        cur += ch;
      }
    } else {
      cur += ch;
    }
  }
  if (cur.trim().length > 0 || argsStr.endsWith(',') || argsStr.endsWith(';')) {
    res.push(cur.trim());
  }
  return res;
}

function toNumber(val) {
  if (typeof val === 'number') return val;
  if (typeof val === 'boolean') return val ? 1 : 0;
  if (val === null || val === undefined || val === '') return 0;
  const cleaned = String(val).replace(/[$,€%\s]/g, '').replace(/,/g, '');
  const num = Number(cleaned);
  return isNaN(num) ? NaN : num;
}

function matchesCriteria(cellVal, criteriaRaw) {
  let crit = String(criteriaRaw).trim();
  if (crit.startsWith('"') && crit.endsWith('"')) {
    crit = crit.slice(1, -1);
  }

  const opMatch = crit.match(/^(>=|<=|<>|!=|>|<|=)(.*)$/);
  if (opMatch) {
    const op = opMatch[1];
    const rhsRaw = opMatch[2].trim();
    const rhsNum = toNumber(rhsRaw);
    const lhsNum = toNumber(cellVal);

    if (!isNaN(rhsNum) && !isNaN(lhsNum) && rhsRaw !== '') {
      if (op === '>') return lhsNum > rhsNum;
      if (op === '<') return lhsNum < rhsNum;
      if (op === '>=') return lhsNum >= rhsNum;
      if (op === '<=') return lhsNum <= rhsNum;
      if (op === '=') return Math.abs(lhsNum - rhsNum) < 1e-9;
      if (op === '<>' || op === '!=') return Math.abs(lhsNum - rhsNum) >= 1e-9;
    } else {
      const lhsStr = String(cellVal ?? '').trim().toUpperCase();
      const rhsStr = rhsRaw.replace(/^"|"$/g, '').trim().toUpperCase();
      if (op === '=') return lhsStr === rhsStr;
      if (op === '<>' || op === '!=') return lhsStr !== rhsStr;
    }
  }

  const numCrit = toNumber(crit);
  const numVal = toNumber(cellVal);
  if (!isNaN(numCrit) && !isNaN(numVal) && crit !== '' && typeof cellVal === 'number') {
    return Math.abs(numVal - numCrit) < 1e-9;
  }

  return String(cellVal ?? '').trim().toUpperCase() === crit.toUpperCase();
}

function evaluateGrid(rawCells) {
  const computed = {};
  const errors = {};
  const visiting = new Set();

  function getCellValue(cellId) {
    const id = cellId.trim().toUpperCase();
    if (computed[id] !== undefined) return computed[id];
    if (visiting.has(id)) {
      errors[id] = '#REF!';
      return '#REF!';
    }

    const cell = rawCells[id];
    if (!cell || cell.raw === '' || cell.raw === undefined || cell.raw === null) {
      computed[id] = '';
      return '';
    }

    const rawStr = String(cell.raw).trim();
    if (!rawStr.startsWith('=')) {
      const asNum = Number(rawStr);
      if (!isNaN(asNum) && rawStr !== '') {
        computed[id] = asNum;
      } else {
        computed[id] = rawStr;
      }
      return computed[id];
    }

    visiting.add(id);
    try {
      const expr = rawStr.slice(1).trim();
      const val = evalExpression(expr);
      if (typeof val === 'string' && val.startsWith('#')) {
        errors[id] = val;
      }
      computed[id] = val;
    } catch (e) {
      errors[id] = '#ERROR!';
      computed[id] = '#ERROR!';
    } finally {
      visiting.delete(id);
    }
    return computed[id];
  }

  function resolveRangeValues(argStr, as2D = false) {
    const clean = argStr.replace(/\$/g, '').trim();
    if (clean.includes(':')) {
      const ids = expandRange(clean, as2D);
      if (as2D) {
        return ids.map(row => row.map(cid => getCellValue(cid)));
      }
      return ids.map(cid => getCellValue(cid));
    }
    const single = parseCellId(clean);
    if (single) {
      const v = getCellValue(single.id);
      return as2D ? [[v]] : [v];
    }
    const evaluated = evalExpression(clean);
    return as2D ? [[evaluated]] : [evaluated];
  }

  function evalFunction(fnName, argsRaw) {
    const name = fnName.trim().toUpperCase().replace(/\./g, '_');
    const args = splitArgs(argsRaw);

    for (const a of args) {
      if (a === '#ERROR!' || a === '#VALOR!' || a === '#REF!') return a;
    }

    if (name === 'SUMA' || name === 'SUM') {
      let total = 0;
      for (const arg of args) {
        const vals = resolveRangeValues(arg, false);
        for (const v of vals) {
          if (typeof v === 'string' && v.startsWith('#')) return v;
          const n = toNumber(v);
          if (!isNaN(n)) total += n;
        }
      }
      return total;
    }

    if (name === 'PROMEDIO' || name === 'AVERAGE' || name === 'AVG') {
      let total = 0;
      let count = 0;
      for (const arg of args) {
        const vals = resolveRangeValues(arg, false);
        for (const v of vals) {
          if (typeof v === 'string' && v.startsWith('#')) return v;
          if (v !== '' && v !== null && v !== undefined) {
            const n = toNumber(v);
            if (!isNaN(n)) {
              total += n;
              count++;
            }
          }
        }
      }
      return count === 0 ? '#DIV/0!' : total / count;
    }

    if (name === 'MEDIANA' || name === 'MEDIAN') {
      const nums = [];
      for (const arg of args) {
        const vals = resolveRangeValues(arg, false);
        for (const v of vals) {
          if (typeof v === 'string' && v.startsWith('#')) return v;
          if (v !== '' && v !== null) {
            const n = toNumber(v);
            if (!isNaN(n)) nums.push(n);
          }
        }
      }
      if (!nums.length) return '#NUM!';
      nums.sort((a, b) => a - b);
      const mid = Math.floor(nums.length / 2);
      return nums.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    }

    if (name === 'MAX' || name === 'MAXIMO') {
      let maxVal = -Infinity;
      for (const arg of args) {
        const vals = resolveRangeValues(arg, false);
        for (const v of vals) {
          if (typeof v === 'string' && v.startsWith('#')) return v;
          if (v !== '' && v !== null) {
            const n = toNumber(v);
            if (!isNaN(n) && n > maxVal) maxVal = n;
          }
        }
      }
      return maxVal === -Infinity ? 0 : maxVal;
    }

    if (name === 'MIN' || name === 'MINIMO') {
      let minVal = Infinity;
      for (const arg of args) {
        const vals = resolveRangeValues(arg, false);
        for (const v of vals) {
          if (typeof v === 'string' && v.startsWith('#')) return v;
          if (v !== '' && v !== null) {
            const n = toNumber(v);
            if (!isNaN(n) && n < minVal) minVal = n;
          }
        }
      }
      return minVal === Infinity ? 0 : minVal;
    }

    if (name === 'CONTAR' || name === 'COUNT') {
      let count = 0;
      for (const arg of args) {
        const vals = resolveRangeValues(arg, false);
        for (const v of vals) {
          if (v !== '' && !isNaN(toNumber(v))) count++;
        }
      }
      return count;
    }

    if (name === 'CONTARA' || name === 'COUNTA') {
      let count = 0;
      for (const arg of args) {
        const vals = resolveRangeValues(arg, false);
        for (const v of vals) {
          if (v !== '' && v !== null && v !== undefined) count++;
        }
      }
      return count;
    }

    if (name === 'CONTAR_SI' || name === 'COUNTIF') {
      if (args.length < 2) return '#ERROR!';
      const rangeVals = resolveRangeValues(args[0], false);
      const critVal = evalCriteriaArg(args[1]);
      let count = 0;
      for (const v of rangeVals) {
        if (matchesCriteria(v, critVal)) count++;
      }
      return count;
    }

    if (name === 'SUMAR_SI' || name === 'SUMIF') {
      if (args.length < 2) return '#ERROR!';
      const rangeVals = resolveRangeValues(args[0], false);
      const critVal = evalCriteriaArg(args[1]);
      const sumVals = args.length >= 3 ? resolveRangeValues(args[2], false) : rangeVals;
      let total = 0;
      for (let i = 0; i < rangeVals.length; i++) {
        if (matchesCriteria(rangeVals[i], critVal)) {
          const n = toNumber(sumVals[i]);
          if (!isNaN(n)) total += n;
        }
      }
      return total;
    }

    if (name === 'PROMEDIO_SI' || name === 'AVERAGEIF') {
      if (args.length < 2) return '#ERROR!';
      const rangeVals = resolveRangeValues(args[0], false);
      const critVal = evalCriteriaArg(args[1]);
      const avgVals = args.length >= 3 ? resolveRangeValues(args[2], false) : rangeVals;
      let total = 0;
      let count = 0;
      for (let i = 0; i < rangeVals.length; i++) {
        if (matchesCriteria(rangeVals[i], critVal)) {
          const n = toNumber(avgVals[i]);
          if (!isNaN(n)) {
            total += n;
            count++;
          }
        }
      }
      return count === 0 ? '#DIV/0!' : total / count;
    }

    if (name === 'SUMAPRODUCTO' || name === 'SUMPRODUCT') {
      if (args.length < 1) return '#ERROR!';
      const arrays = args.map(a => resolveRangeValues(a, false));
      const len = arrays[0].length;
      if (arrays.some(arr => arr.length !== len)) return '#VALOR!';
      let total = 0;
      for (let i = 0; i < len; i++) {
        let prod = 1;
        for (let a = 0; a < arrays.length; a++) {
          const n = toNumber(arrays[a][i]);
          if (isNaN(n)) return '#VALOR!';
          prod *= n;
        }
        total += prod;
      }
      return total;
    }

    if (name === 'BUSCARV' || name === 'VLOOKUP' || name === 'CONSULTAV') {
      if (args.length < 3) return '#ERROR!';
      const lookupVal = evalExpression(args[0]);
      const matrix = resolveRangeValues(args[1], true);
      const colIdx = toNumber(evalExpression(args[2]));
      if (isNaN(colIdx) || colIdx < 1 || !matrix.length || colIdx > matrix[0].length) {
        return '#REF!';
      }
      for (const row of matrix) {
        const key = row[0];
        if (String(key).trim().toUpperCase() === String(lookupVal).trim().toUpperCase()) {
          return row[colIdx - 1];
        }
      }
      return '#N/A';
    }

    if (name === 'SI' || name === 'IF') {
      if (args.length < 2) return '#ERROR!';
      const cond = evalCondition(args[0]);
      if (cond === '#ERROR!' || cond === '#VALOR!') return cond;
      if (cond) {
        return evalExpression(args[1]);
      } else {
        return args.length >= 3 ? evalExpression(args[2]) : 0;
      }
    }

    if (name === 'SI_ERROR' || name === 'IFERROR') {
      if (args.length < 2) return '#ERROR!';
      const val = evalExpression(args[0]);
      if (typeof val === 'string' && val.startsWith('#')) {
        return evalExpression(args[1]);
      }
      return val;
    }

    if (name === 'Y' || name === 'AND') {
      for (const a of args) {
        if (!evalCondition(a)) return false;
      }
      return true;
    }

    if (name === 'O' || name === 'OR') {
      for (const a of args) {
        if (evalCondition(a)) return true;
      }
      return false;
    }

    if (name === 'REDONDEAR' || name === 'ROUND') {
      if (args.length < 1) return '#ERROR!';
      const val = toNumber(evalExpression(args[0]));
      const digits = args.length >= 2 ? toNumber(evalExpression(args[1])) : 0;
      if (isNaN(val) || isNaN(digits)) return '#VALOR!';
      const factor = Math.pow(10, digits);
      return Math.round(val * factor) / factor;
    }

    if (name === 'ABS') {
      if (args.length < 1) return '#ERROR!';
      const val = toNumber(evalExpression(args[0]));
      return isNaN(val) ? '#VALOR!' : Math.abs(val);
    }

    if (name === 'RAIZ' || name === 'SQRT') {
      if (args.length < 1) return '#ERROR!';
      const val = toNumber(evalExpression(args[0]));
      if (isNaN(val)) return '#VALOR!';
      return val < 0 ? '#NUM!' : Math.sqrt(val);
    }

    if (name === 'POTENCIA' || name === 'POWER') {
      if (args.length < 2) return '#ERROR!';
      const base = toNumber(evalExpression(args[0]));
      const exp = toNumber(evalExpression(args[1]));
      if (isNaN(base) || isNaN(exp)) return '#VALOR!';
      return Math.pow(base, exp);
    }

    if (name === 'CONCAT' || name === 'CONCATENAR') {
      let out = '';
      for (const arg of args) {
        const vals = resolveRangeValues(arg, false);
        for (const v of vals) {
          out += String(v ?? '');
        }
      }
      return out;
    }

    if (name === 'LARGO' || name === 'LEN') {
      if (args.length < 1) return '#ERROR!';
      const v = evalExpression(args[0]);
      return String(v ?? '').length;
    }

    if (name === 'MAYUSC' || name === 'UPPER') {
      if (args.length < 1) return '#ERROR!';
      return String(evalExpression(args[0]) ?? '').toUpperCase();
    }

    if (name === 'MINUSC' || name === 'LOWER') {
      if (args.length < 1) return '#ERROR!';
      return String(evalExpression(args[0]) ?? '').toLowerCase();
    }

    return '#NOMBRE?';
  }

  function evalCriteriaArg(arg) {
    const t = arg.trim();
    if (t.startsWith('"') && t.endsWith('"')) return t;
    const cid = parseCellId(t.replace(/\$/g, ''));
    if (cid) return String(getCellValue(cid.id));
    return t;
  }

  function evalCondition(condStr) {
    const clean = condStr.trim();
    let depth = 0;
    let inQuotes = false;
    const ops = ['>=', '<=', '<>', '!=', '=', '>', '<'];

    for (let i = 0; i < clean.length; i++) {
      const ch = clean[i];
      if (ch === '"') inQuotes = !inQuotes;
      else if (!inQuotes) {
        if (ch === '(') depth++;
        else if (ch === ')') depth--;
        else if (depth === 0) {
          for (const op of ops) {
            if (clean.slice(i, i + op.length) === op) {
              const lhs = evalExpression(clean.slice(0, i));
              const rhs = evalExpression(clean.slice(i + op.length));
              const lNum = toNumber(lhs);
              const rNum = toNumber(rhs);
              const bothNumeric =
                !isNaN(lNum) &&
                !isNaN(rNum) &&
                lhs !== '' &&
                rhs !== '' &&
                typeof lhs !== 'string' &&
                typeof rhs !== 'string';
              const lNumClean = !isNaN(lNum) && String(lhs).trim() !== '';
              const rNumClean = !isNaN(rNum) && String(rhs).trim() !== '';

              if (bothNumeric || (lNumClean && rNumClean)) {
                if (op === '>=') return lNum >= rNum;
                if (op === '<=') return lNum <= rNum;
                if (op === '<>' || op === '!=') return Math.abs(lNum - rNum) >= 1e-9;
                if (op === '=') return Math.abs(lNum - rNum) < 1e-9;
                if (op === '>') return lNum > rNum;
                if (op === '<') return lNum < rNum;
              } else {
                const lStr = String(lhs).replace(/^"|"$/g, '').trim().toUpperCase();
                const rStr = String(rhs).replace(/^"|"$/g, '').trim().toUpperCase();
                if (op === '=') return lStr === rStr;
                if (op === '<>' || op === '!=') return lStr !== rStr;
              }
            }
          }
        }
      }
    }
    const val = evalExpression(clean);
    return Boolean(val);
  }

  function evalExpression(exprStr) {
    let s = exprStr.trim();
    if (!s) return 0;

    if (s.startsWith('"') && s.endsWith('"') && s.slice(1, -1).indexOf('"') === -1) {
      return s.slice(1, -1);
    }

    let safety = 0;
    const fnRegex = /([A-Za-z_][A-Za-z0-9_.]*)\s*\(/g;
    while (safety < 60) {
      safety++;
      fnRegex.lastIndex = 0;
      let match;
      let replaced = false;

      while ((match = fnRegex.exec(s)) !== null) {
        const fnName = match[1];
        const openParenIdx = match.index + match[0].length - 1;
        let depth = 0;
        let inQuotes = false;
        let closeIdx = -1;

        for (let i = openParenIdx; i < s.length; i++) {
          const ch = s[i];
          if (ch === '"') inQuotes = !inQuotes;
          else if (!inQuotes) {
            if (ch === '(') {
              depth++;
            } else if (ch === ')') {
              depth--;
              if (depth === 0) {
                closeIdx = i;
                break;
              }
            }
          }
        }

        const innerArgs = closeIdx !== -1 ? s.slice(openParenIdx + 1, closeIdx) : '';
        const containsInnerFn = /[A-Za-z_][A-Za-z0-9_.]*\s*\(/.test(innerArgs);
        if (closeIdx !== -1 && !containsInnerFn) {
          const res = evalFunction(fnName, innerArgs);
          if (typeof res === 'string' && res.startsWith('#')) return res;
          const replacement = typeof res === 'string' ? `"${res}"` : String(res);
          s = s.slice(0, match.index) + replacement + s.slice(closeIdx + 1);
          replaced = true;
          break;
        }
      }
      if (!replaced) break;
    }

    if (s.startsWith('"') && s.endsWith('"') && s.slice(1, -1).indexOf('"') === -1) {
      return s.slice(1, -1);
    }

    let hasError = null;
    s = s.replace(/\$?([A-G])\$?(\d{1,2})\b/gi, (full, col, row) => {
      const id = `${col.toUpperCase()}${parseInt(row, 10)}`;
      const v = getCellValue(id);
      if (typeof v === 'string' && v.startsWith('#')) {
        hasError = v;
        return '0';
      }
      if (v === '' || v === null || v === undefined) return '0';
      if (typeof v === 'string') {
        const n = toNumber(v);
        if (!isNaN(n)) return String(n);
        return `"${v}"`;
      }
      return String(v);
    });

    if (hasError) return hasError;

    s = s.replace(/(\d+(?:\.\d+)?)%/g, '($1*0.01)');

    if (s.startsWith('"') && s.endsWith('"')) {
      return s.slice(1, -1);
    }

    const sanitized = s.replace(/\^/g, '**');
    if (/^[0-9+\-*/().\s*]+$/.test(sanitized)) {
      try {
        // eslint-disable-next-line no-new-func
        const val = Function(`"use strict"; return (${sanitized});`)();
        if (val === Infinity || val === -Infinity || isNaN(val)) return '#DIV/0!';
        return val;
      } catch (e) {
        return '#VALOR!';
      }
    }

    return '#VALOR!';
  }

  for (const r of Array.from({ length: NUM_ROWS }, (_, i) => i + 1)) {
    for (const c of COLS) {
      const id = `${c}${r}`;
      if (rawCells[id] !== undefined) {
        getCellValue(id);
      }
    }
  }

  return { computed, errors };
}

// ============================================================================
// LOCALIZED CHALLENGES (ALL 5 LANGUAGES FULLY TRANSLATED)
// ============================================================================

function getChallengeContent(challengeId, lang) {
  const L = (map) => map[lang] || map.es;

  if (challengeId === 'daily') {
    return {
      shortTab: L({ es: 'Reto del Día', en: 'Daily Case', zh: '每日挑战', hi: 'दैनिक केस', fr: 'Défi du Jour' }),
      level: L({
        es: 'Reto Diario Global — Mismo caso hoy para todos',
        en: 'Global Daily Case — Same problem for everyone today',
        zh: '全球每日挑战 — 今日全员同题竞技',
        hi: 'वैश्विक दैनिक केस — आज सभी के लिए एक ही प्रश्न',
        fr: 'Défi Quotidien Global — Même problème pour tous'
      }),
      title: L({
        es: 'Presupuesto del Viaje de Fin de Curso con Amigos',
        en: 'Friends Weekend Trip Budget',
        zh: '毕业好友周末旅行预算',
        hi: 'दोस्तों की वीकेंड ट्रिप का बजट',
        fr: 'Budget du Week-end entre Amis'
      }),
      teaser: L({
        es: 'Organización del presupuesto de una escapada en grupo con 3 objetivos a resolver en la hoja.',
        en: 'Organize a group weekend getaway budget with 3 target cells to solve.',
        zh: '整理团体周末出游预算，需在表格中完成3个目标单元格。',
        hi: 'ग्रुप ट्रिप का बजट तैयार करें और 3 लक्ष्य सेल हल करें।',
        fr: 'Organisez le budget d’une escapade en groupe avec 3 cellules cibles.'
      }),
      description: L({
        es: '¡El reto oficial de hoy para todos los jugadores! Estás organizando una escapada de fin de semana con tu grupo de amigos. A partir de los datos de la tabla, completa las tres celdas objetivo para conocer el coste base individual, el precio tras aplicar el descuento de estudiante y el presupuesto total del grupo.',
        en: 'Today’s official challenge for all players! You are organizing a weekend getaway with friends. Using the table data, complete the three target cells to find the base cost per person, the price after the student discount, and the total group budget.',
        zh: '今日全网玩家的官方挑战！你正在和朋友们策划周末短途旅行。请根据表格数据完成三个目标单元格：每人基础费用、扣除学生优惠后的最终价格以及全组总支出。',
        hi: 'आज सभी खिलाड़ियों के लिए आधिकारिक चुनौती! आप दोस्तों के साथ वीकेंड ट्रिप प्लान कर रहे हैं। तालिका के डेटा से प्रति व्यक्ति आधार लागत, छात्र छूट के बाद अंतिम मूल्य और पूरे ग्रुप का कुल खर्च निकालें।',
        fr: 'Le défi officiel du jour pour tous les joueurs ! Vous organisez un week-end entre amis. À partir du tableau, complétez les trois cellules cibles pour obtenir le coût de base par personne, le prix après réduction étudiante et le budget total du groupe.'
      }),
      rules: L({
        es: [
          'C10: Coste base total por persona incluyendo todas las partidas del viaje.',
          'C11: Precio final por persona una vez descontada la rebaja del carnet de estudiante.',
          'C12: Presupuesto total que pagará todo el grupo en conjunto.'
        ],
        en: [
          'C10: Base total cost per person including all trip items.',
          'C11: Final price per person after subtracting the student discount.',
          'C12: Total budget paid by the entire group together.'
        ],
        zh: [
          'C10：包含所有旅行项目的每人基础总费用。',
          'C11：扣除学生证优惠后的每人最终价格。',
          'C12：整个团队共同支付的总预算。'
        ],
        hi: [
          'C10: यात्रा के सभी खर्चों को मिलाकर प्रति व्यक्ति कुल आधार लागत।',
          'C11: छात्र छूट घटाने के बाद प्रति व्यक्ति अंतिम मूल्य।',
          'C12: पूरे ग्रुप द्वारा एक साथ दिया जाने वाला कुल बजट।'
        ],
        fr: [
          'C10 : Coût de base total par personne incluant tous les postes du voyage.',
          'C11 : Prix final par personne après déduction de la réduction étudiante.',
          'C12 : Budget total payé par l’ensemble du groupe.'
        ]
      }),
      hint: L({
        es: 'Combina funciones de agregación y operaciones aritméticas básicas vinculadas a las celdas de referencia.',
        en: 'Combine an aggregation function with basic arithmetic operations linked to the reference cells.',
        zh: '将汇总函数与基础算术运算结合，并引用右侧参数单元格。',
        hi: 'संदर्भ सेल से जुड़े योग फ़ंक्शन और बुनियादी अंकगणित का उपयोग करें।',
        fr: 'Combinez une fonction d’agrégation avec des opérations arithmétiques liées aux cellules de référence.'
      }),
      targetLabels: {
        C10: L({ es: 'Coste Base por Persona', en: 'Base Cost / Person', zh: '每人基础费用', hi: 'प्रति व्यक्ति आधार लागत', fr: 'Coût Base / Pers.' }),
        C11: L({ es: 'Precio Final con Descuento', en: 'Final Price w/ Discount', zh: '折后最终价格', hi: 'छूट के बाद अंतिम मूल्य', fr: 'Prix Final Réduit' }),
        C12: L({ es: 'Gasto Total del Grupo', en: 'Total Group Cost', zh: '团队总支出', hi: 'ग्रुप का कुल खर्च', fr: 'Coût Total Groupe' })
      },
      cellsText: {
        A2: L({ es: 'Ítem', en: 'Item', zh: '编号', hi: 'मद', fr: 'N°' }),
        B2: L({ es: 'Concepto del Viaje', en: 'Trip Item', zh: '旅行项目', hi: 'यात्रा मद', fr: 'Poste du Voyage' }),
        C2: L({ es: 'Coste / Persona', en: 'Cost / Person', zh: '每人费用', hi: 'लागत / व्यक्ति', fr: 'Coût / Pers.' }),
        E2: L({ es: 'Datos del Grupo', en: 'Group Info', zh: '团队参数', hi: 'ग्रुप डेटा', fr: 'Infos Groupe' }),
        F2: L({ es: 'Detalle', en: 'Detail', zh: '说明', hi: 'विवरण', fr: 'Détail' }),
        B4: L({ es: 'Tren Alta Velocidad (I/V)', en: 'High-Speed Train (R/T)', zh: '高铁往返车票', hi: 'हाई-स्पीड ट्रेन (आना-जाना)', fr: 'Train Grande Vitesse (A/R)' }),
        B5: L({ es: 'Alojamiento (2 noches)', en: 'Accommodation (2 nights)', zh: '住宿（2晚）', hi: 'आवास (2 रातें)', fr: 'Hébergement (2 nuits)' }),
        B6: L({ es: 'Comidas y Cenas', en: 'Meals & Dinners', zh: '餐饮美食', hi: 'भोजन और डिनर', fr: 'Repas & Dîners' }),
        B7: L({ es: 'Entradas y Actividades', en: 'Tickets & Activities', zh: '门票与活动', hi: 'टिकट और गतिविधियां', fr: 'Billets & Activités' }),
        F4: L({ es: 'Descuento Carnet Estudiante', en: 'Student ID Discount', zh: '学生证立减优惠', hi: 'छात्र आईडी छूट', fr: 'Réduction Étudiante' }),
        F5: L({ es: 'Personas en el grupo', en: 'People in the group', zh: '团队总人数', hi: 'ग्रुप में कुल लोग', fr: 'Personnes dans le groupe' }),
        B10: L({ es: 'Coste Base por Persona', en: 'Base Cost per Person', zh: '每人基础费用', hi: 'प्रति व्यक्ति आधार लागत', fr: 'Coût Base par Pers.' }),
        B11: L({ es: 'Precio Final con Descuento', en: 'Final Price w/ Discount', zh: '折后最终价格', hi: 'छूट के बाद मूल्य', fr: 'Prix Final Réduit' }),
        B12: L({ es: 'Gasto Total del Grupo', en: 'Total Group Cost', zh: '团队总支出', hi: 'ग्रुप का कुल खर्च', fr: 'Total du Groupe' })
      }
    };
  }

  if (challengeId === 'practice-1') {
    return {
      shortTab: L({ es: 'Nivel 1: Básico', en: 'Level 1: Basic', zh: '级别 1：基础', hi: 'स्तर 1: बुनियादी', fr: 'Niveau 1 : Basique' }),
      level: L({
        es: 'Práctica Libre — Nivel 1: Básico (Notas de Clase)',
        en: 'Free Practice — Level 1: Basic (Course Grades)',
        zh: '自由练习 — 级别 1：基础（学期成绩）',
        hi: 'अभ्यास — स्तर 1: बुनियादी (परीक्षा अंक)',
        fr: 'Pratique Libre — Niveau 1 : Basique (Notes)'
      }),
      title: L({
        es: 'Calculadora de Notas de la Universidad',
        en: 'University Gradebook Calculator',
        zh: '大学学期成绩计算器',
        hi: 'विश्वविद्यालय ग्रेड कैलकुलेटर',
        fr: 'Calculateur de Notes Universitaires'
      }),
      teaser: L({
        es: 'Análisis del boletín de calificaciones del semestre y requisito de beca (3 celdas objetivo).',
        en: 'Analyze semester grades and check scholarship cutoff margin (3 target cells).',
        zh: '分析学期五门课程成绩与奖学金分数线差距（3个目标单元格）。',
        hi: 'सेमेस्टर के अंकों का औसत और छात्रवृत्ति कटऑफ अंतर निकालें।',
        fr: 'Analysez vos notes du semestre et la marge pour la bourse (3 cibles).'
      }),
      description: L({
        es: 'Acabas de recibir las calificaciones finales de tus 5 asignaturas del cuatrimestre. Rellena las celdas objetivo para conocer tu rendimiento medio, identificar tu mejor calificación del semestre y comprobar la diferencia respecto a la nota de corte exigida para mantener la beca.',
        en: 'You just received your final grades for 5 courses this term. Fill in the target cells to find your average score, identify your highest grade of the term, and check the difference compared to the minimum scholarship requirement.',
        zh: '你刚收到本学期5门课程的期末成绩。请填写目标单元格，计算平均分、找出最高分，并核对你的平均分与奖学金最低分数线之间的差距。',
        hi: 'आपको अपने 5 विषयों के अंतिम अंक मिल गए हैं। औसत अंक, सबसे अधिक अंक और छात्रवृत्ति के न्यूनतम कटऑफ से अंतर ज्ञात करने के लिए लक्ष्य सेल भरें।',
        fr: 'Vous venez de recevoir vos notes finales pour 5 matières. Complétez les cellules cibles pour connaître votre moyenne, votre meilleure note et l’écart par rapport au seuil de bourse.'
      }),
      rules: L({
        es: [
          'C10: Calificación media obtenida entre las 5 asignaturas cursadas.',
          'C11: La nota más alta lograda en el semestre.',
          'C12: Diferencia exacta entre tu nota media y la nota mínima exigida para la beca.'
        ],
        en: [
          'C10: Average grade across the 5 completed courses.',
          'C11: Highest grade achieved this term.',
          'C12: Exact difference between your average grade and the scholarship cutoff.'
        ],
        zh: [
          'C10：5门已修课程的平均成绩。',
          'C11：本学期获得的最高分数。',
          'C12：平均分与奖学金最低分数线之间的精确差值。'
        ],
        hi: [
          'C10: सभी 5 विषयों का औसत अंक।',
          'C11: इस सेमेस्टर में प्राप्त उच्चतम अंक।',
          'C12: आपके औसत अंक और छात्रवृत्ति कटऑफ के बीच सटीक अंतर।'
        ],
        fr: [
          'C10 : Note moyenne obtenue sur les 5 matières.',
          'C11 : Meilleure note obtenue ce semestre.',
          'C12 : Écart exact entre votre moyenne et le seuil de la bourse.'
        ]
      }),
      hint: L({
        es: 'Revisa las funciones estadísticas básicas de promedio y valor máximo junto con una comparación aritmética.',
        en: 'Use basic statistical functions for mean and maximum value along with a simple subtraction.',
        zh: '使用基础统计函数（平均值与最大值）并结合减法运算。',
        hi: 'औसत और अधिकतम मान वाले बुनियादी सांख्यिकीय फ़ंक्शन और घटाव का उपयोग करें।',
        fr: 'Utilisez les fonctions statistiques de moyenne et de maximum avec une soustraction.'
      }),
      targetLabels: {
        C10: L({ es: 'Nota Media del Semestre', en: 'Term Average', zh: '学期平均分', hi: 'सेमेस्टर औसत', fr: 'Moyenne du Semestre' }),
        C11: L({ es: 'Mejor Calificación', en: 'Highest Grade', zh: '最高分', hi: 'उच्चतम अंक', fr: 'Meilleure Note' }),
        C12: L({ es: 'Margen sobre Corte', en: 'Margin vs Cutoff', zh: '分数线差值', hi: 'कटऑफ से अंतर', fr: 'Écart vs Seuil' })
      },
      cellsText: {
        A2: L({ es: 'Código', en: 'Code', zh: '代码', hi: 'कोड', fr: 'Code' }),
        B2: L({ es: 'Asignatura', en: 'Course', zh: '课程名称', hi: 'विषय', fr: 'Matière' }),
        C2: L({ es: 'Nota Final (0-10)', en: 'Final Grade (0-10)', zh: '期末成绩 (0-10)', hi: 'अंतिम अंक (0-10)', fr: 'Note Finale (0-10)' }),
        E2: L({ es: 'Referencia', en: 'Reference', zh: '参考值', hi: 'संदर्भ', fr: 'Référence' }),
        F2: L({ es: 'Descripción', en: 'Description', zh: '说明', hi: 'विवरण', fr: 'Description' }),
        B4: L({ es: 'Estadística Aplicada', en: 'Applied Statistics', zh: '应用统计学', hi: 'अनुप्रयुक्त सांख्यिकी', fr: 'Statistiques Appliquées' }),
        B5: L({ es: 'Diseño Web & Apps', en: 'Web & App Design', zh: '网页与应用设计', hi: 'वेब और ऐप डिज़ाइन', fr: 'Design Web & Apps' }),
        B6: L({ es: 'Gestión de Proyectos', en: 'Project Management', zh: '项目管理', hi: 'परियोजना प्रबंधन', fr: 'Gestion de Projets' }),
        B7: L({ es: 'Comunicación Oral', en: 'Public Speaking', zh: '口语沟通', hi: 'मौखिक संचार', fr: 'Communication Orale' }),
        B8: L({ es: 'Inglés Académico', en: 'Academic English', zh: '学术英语', hi: 'अकादमिक अंग्रेज़ी', fr: 'Anglais Académique' }),
        F4: L({ es: 'Nota mínima para Beca', en: 'Min. Scholarship Grade', zh: '奖学金最低分数线', hi: 'छात्रवृत्ति न्यूनतम अंक', fr: 'Note min. Bourse' }),
        B10: L({ es: 'Nota Media del Semestre', en: 'Term Average Grade', zh: '学期平均成绩', hi: 'सेमेस्टर औसत अंक', fr: 'Moyenne du Semestre' }),
        B11: L({ es: 'Mejor Calificación del Curso', en: 'Highest Grade', zh: '课程最高分', hi: 'सर्वोच्च अंक', fr: 'Meilleure Note' }),
        B12: L({ es: 'Diferencia vs. Nota Beca', en: 'Difference vs. Cutoff', zh: '与奖学金线差值', hi: 'कटऑफ से अंतर', fr: 'Écart vs. Seuil' })
      }
    };
  }

  if (challengeId === 'practice-2') {
    const sportWord = L({ es: 'Deporte', en: 'Sports', zh: '运动', hi: 'खेल', fr: 'Sport' });
    const studyWord = L({ es: 'Estudio', en: 'Study', zh: '学习', hi: 'पढ़ाई', fr: 'Étude' });
    return {
      shortTab: L({ es: 'Nivel 2: Intermedio', en: 'Level 2: Intermediate', zh: '级别 2：中级', hi: 'स्तर 2: मध्यम', fr: 'Niveau 2 : Intermédiaire' }),
      level: L({
        es: 'Práctica Libre — Nivel 2: Intermedio (Hábitos y Deporte)',
        en: 'Free Practice — Level 2: Intermediate (Habits & Sports)',
        zh: '自由练习 — 级别 2：中级（运动与学习习惯）',
        hi: 'अभ्यास — स्तर 2: मध्यम (खेल और अध्ययन)',
        fr: 'Pratique Libre — Niveau 2 : Intermédiaire (Sport & Étude)'
      }),
      title: L({
        es: 'Registro Semanal de Entrenamiento y Estudio',
        en: 'Weekly Training & Study Log',
        zh: '每周运动与学习时长统计',
        hi: 'साप्ताहिक प्रशिक्षण और अध्ययन लॉग',
        fr: 'Suivi Hebdomadaire Sport & Étude'
      }),
      teaser: L({
        es: 'Balance semanal filtrando horas por actividad y días de alta intensidad (3 celdas objetivo).',
        en: 'Weekly balance filtering hours by activity and high-intensity days (3 target cells).',
        zh: '按类别筛选本周时长并统计高强度天数（3个目标单元格）。',
        hi: 'गतिविधि के अनुसार घंटे फ़िल्टर करें और उच्च-तीव्रता वाले दिन गिनें।',
        fr: 'Bilan hebdomadaire en filtrant les heures par activité (3 cibles).'
      }),
      description: L({
        es: `Has anotado en una tabla tus horas diarias dedicadas a cada actividad de lunes a viernes. Calcula el total de horas dedicadas exclusivamente a "${sportWord}", cuántos días de la semana alcanzaste al menos 5 horas de actividad y el total de puntos acumulados por tu entrenamiento deportivo.`,
        en: `You logged your daily hours spent on each activity from Monday to Friday. Calculate the total hours spent exclusively on "${sportWord}", how many days reached at least 5 hours of activity, and the total points earned from sports.`,
        zh: `你在表格中记录了周一至周五每天的投入时长。请计算专门用于“${sportWord}”的总小时数、达到至少5小时的高强度天数，以及运动挑战获得的累计积分。`,
        hi: `आपने सोमवार से शुक्रवार तक प्रत्येक गतिविधि के दैनिक घंटे दर्ज किए हैं। केवल "${sportWord}" में बिताए गए कुल घंटे, कम से कम 5 घंटे वाले दिनों की संख्या और खेल से अर्जित कुल अंक निकालें।`,
        fr: `Vous avez noté vos heures quotidiennes du lundi au vendredi. Calculez le total d’heures consacrées à « ${sportWord} », le nombre de jours d’au moins 5 heures et le total de points sportifs gagnés.`
      }),
      rules: L({
        es: [
          `C10: Total de horas dedicadas únicamente a la categoría "${sportWord}".`,
          'C11: Número de días en los que se registraron 5 o más horas de actividad.',
          'C12: Puntos totales conseguidos por las horas de deporte según el baremo lateral.'
        ],
        en: [
          `C10: Total hours dedicated exclusively to "${sportWord}".`,
          'C11: Number of days with 5 or more hours logged.',
          'C12: Total points earned from sports hours based on the side rate.'
        ],
        zh: [
          `C10：仅统计类别为“${sportWord}”的总小时数。`,
          'C11：记录时长达到或超过5小时的天数。',
          'C12：根据右侧积分标准计算的运动总积分。'
        ],
        hi: [
          `C10: केवल "${sportWord}" श्रेणी में बिताए गए कुल घंटे।`,
          'C11: 5 या उससे अधिक घंटे वाले दिनों की संख्या।',
          'C12: बगल की तालिका के अनुसार खेल के घंटों से प्राप्त कुल अंक।'
        ],
        fr: [
          `C10 : Total des heures consacrées uniquement à « ${sportWord} ».`,
          'C11 : Nombre de jours avec 5 heures ou plus enregistrées.',
          'C12 : Total des points obtenus pour le sport selon le barème.'
        ]
      }),
      hint: L({
        es: 'Necesitarás funciones condicionales para sumar y contar según un criterio.',
        en: 'You will need conditional functions to sum and count based on a criterion.',
        zh: '需要使用按条件求和与按条件计数的函数。',
        hi: 'किसी शर्त के आधार पर जोड़ने और गिनने वाले फ़ंक्शन का उपयोग करें।',
        fr: 'Utilisez des fonctions conditionnelles pour additionner et compter selon un critère.'
      }),
      targetLabels: {
        C10: L({ es: `Horas de ${sportWord}`, en: `${sportWord} Hours`, zh: `${sportWord}总时长`, hi: `${sportWord} के घंटे`, fr: `Heures de ${sportWord}` }),
        C11: L({ es: 'Días Sesión Larga', en: 'Long Session Days', zh: '长时段天数', hi: 'लंबे सत्र वाले दिन', fr: 'Jours >= 5h' }),
        C12: L({ es: 'Puntos Totales', en: 'Total Points', zh: '运动总积分', hi: 'कुल अंक', fr: 'Total Points' })
      },
      cellsText: {
        A2: L({ es: 'Día', en: 'Day', zh: '星期', hi: 'दिन', fr: 'Jour' }),
        B2: L({ es: 'Categoría', en: 'Category', zh: '类别', hi: 'श्रेणी', fr: 'Catégorie' }),
        C2: L({ es: 'Horas Dedicadas', en: 'Hours Spent', zh: '投入小时', hi: 'घंटे', fr: 'Heures' }),
        E2: L({ es: 'Regla del Reto', en: 'Challenge Rule', zh: '挑战规则', hi: 'चुनौती नियम', fr: 'Règle du Défi' }),
        F2: L({ es: 'Explicación', en: 'Details', zh: '说明', hi: 'विवरण', fr: 'Détails' }),
        A4: L({ es: 'Lunes', en: 'Monday', zh: '周一', hi: 'सोमवार', fr: 'Lundi' }),
        A5: L({ es: 'Martes', en: 'Tuesday', zh: '周二', hi: 'मंगलवार', fr: 'Mardi' }),
        A6: L({ es: 'Miércoles', en: 'Wednesday', zh: '周三', hi: 'बुधवार', fr: 'Mercredi' }),
        A7: L({ es: 'Jueves', en: 'Thursday', zh: '周四', hi: 'गुरुवार', fr: 'Jeudi' }),
        A8: L({ es: 'Viernes', en: 'Friday', zh: '周五', hi: 'शुक्रवार', fr: 'Vendredi' }),
        B4: sportWord,
        B5: studyWord,
        B6: sportWord,
        B7: studyWord,
        B8: sportWord,
        F4: L({ es: `Puntos por cada hora de ${sportWord}`, en: `Points per ${sportWord} hour`, zh: `每小时${sportWord}积分`, hi: `प्रति ${sportWord} घंटे अंक`, fr: `Points par heure de ${sportWord}` }),
        B10: L({ es: `Horas Totales de ${sportWord}`, en: `Total ${sportWord} Hours`, zh: `${sportWord}总小时数`, hi: `कुल ${sportWord} घंटे`, fr: `Total Heures ${sportWord}` }),
        B11: L({ es: 'Días de Sesión Larga', en: 'High-Intensity Days', zh: '高强度天数', hi: 'उच्च-तीव्रता दिन', fr: 'Jours Longue Séance' }),
        B12: L({ es: `Puntos Totales ${sportWord}`, en: `Total ${sportWord} Points`, zh: `${sportWord}总积分`, hi: `कुल ${sportWord} अंक`, fr: `Total Points ${sportWord}` })
      }
    };
  }

  // practice-3
  const item1 = L({ es: 'Camiseta Técnica', en: 'Tech Jersey', zh: '速干运动衫', hi: 'टेक जर्सी', fr: 'Maillot Technique' });
  const item2 = L({ es: 'Mochila', en: 'Backpack', zh: '运动背包', hi: 'बैकपैक', fr: 'Sac à dos' });
  const item3 = L({ es: 'Botella Térmica', en: 'Thermal Bottle', zh: '保温水壶', hi: 'थर्मल बोतल', fr: 'Gourde Isotherme' });
  return {
    shortTab: L({ es: 'Nivel 3: Avanzado', en: 'Level 3: Advanced', zh: '级别 3：高级', hi: 'स्तर 3: उन्नत', fr: 'Niveau 3 : Avancé' }),
    level: L({
      es: 'Práctica Libre — Nivel 3: Avanzado (Pedido de Equipos)',
      en: 'Free Practice — Level 3: Advanced (Club Gear Order)',
      zh: '自由练习 — 级别 3：高级（社团装备采购）',
      hi: 'अभ्यास — स्तर 3: उन्नत (क्लब गियर ऑर्डर)',
      fr: 'Pratique Libre — Niveau 3 : Avancé (Commande Club)'
    }),
    title: L({
      es: 'Equipación del Club Universitario y Envío Gratis',
      en: 'University Club Gear & Free Shipping',
      zh: '大学社团装备采购与免运费判定',
      hi: 'यूनिवर्सिटी क्लब गियर और मुफ्त शिपिंग',
      fr: 'Équipement du Club & Livraison Gratuite'
    }),
    teaser: L({
      es: 'Cálculo del presupuesto de equipación deportiva, consulta de tarifa y gastos de envío (3 celdas objetivo).',
      en: 'Calculate club gear order total, catalog lookup, and conditional shipping (3 target cells).',
      zh: '计算社团装备订单总额、目录查价与免运费条件（3个目标单元格）。',
      hi: 'क्लब गियर ऑर्डर का कुल योग, कैटलॉग खोज और शिपिंग लागत निकालें।',
      fr: 'Calcul du budget d’équipement, recherche tarifaire et frais de port (3 cibles).'
    }),
    description: L({
      es: `El club deportivo va a realizar el pedido de material de la temporada. Rellena las tres celdas objetivo para obtener el importe total de la compra considerando las unidades y precios de cada artículo, extraer del catálogo lateral el precio oficial de "${item2}" y determinar cuánto costará el envío según las condiciones del proveedor.`,
      en: `The university sports club is placing its seasonal gear order. Fill in the three target cells to compute the total order amount from quantities and unit prices, look up the official price of "${item2}" from the side catalog, and determine the shipping cost.`,
      zh: `学校体育社团准备下单本赛季装备。请完成三个目标单元格：根据数量与单价计算订单总金额、从右侧目录表中查询“${item2}”的官方价格，并根据包邮门槛确定最终运费。`,
      hi: `स्पोर्ट्स क्लब सीज़न के सामान का ऑर्डर दे रहा है। मात्रा और मूल्य से कुल ऑर्डर राशि निकालें, कैटलॉग से "${item2}" की कीमत खोजें और शिपिंग शुल्क तय करें।`,
      fr: `Le club sportif passe sa commande de saison. Complétez les trois cellules cibles pour calculer le montant total de la commande, extraire le prix officiel de « ${item2} » du catalogue et déterminer les frais de livraison.`
    }),
    rules: L({
      es: [
        'D9: Importe total de la compra teniendo en cuenta la cantidad y el precio unitario de todos los artículos.',
        `D10: Precio oficial del artículo "${item2}" consultado dinámicamente en la tabla de catálogo.`,
        'D11: Coste de envío aplicable: gratuito ($0) si el pedido alcanza o supera los $300, o tarifa estándar ($25) en caso contrario.'
      ],
      en: [
        'D9: Total purchase amount accounting for units and unit price of all items.',
        `D10: Official catalog price of "${item2}" looked up dynamically from the catalog table.`,
        'D11: Shipping fee: free ($0) if the order reaches $300 or more, otherwise standard fee ($25).'
      ],
      zh: [
        'D9：综合所有商品的数量和单价计算采购总金额。',
        `D10：从目录表中动态查询“${item2}”的官方单价。`,
        'D11：运费判定：若订单总额达到或超过 $300 则免运费 ($0)，否则收取标准运费 ($25)。'
      ],
      hi: [
        'D9: सभी वस्तुओं की मात्रा और इकाई मूल्य के आधार पर कुल खरीद राशि।',
        `D10: कैटलॉग तालिका से "${item2}" का आधिकारिक मूल्य गतिशील रूप से खोजें।`,
        'D11: शिपिंग शुल्क: यदि ऑर्डर $300 या अधिक है तो मुफ्त ($0), अन्यथा मानक शुल्क ($25)।'
      ],
      fr: [
        'D9 : Montant total de la commande selon les quantités et prix unitaires.',
        `D10 : Prix officiel de « ${item2} » extrait dynamiquement du catalogue.`,
        'D11 : Frais de livraison : gratuits ($0) si la commande atteint $300, sinon $25.'
      ]
    }),
    hint: L({
      es: 'Apóyate en funciones de producto de rangos, búsqueda vertical en tablas y condicionales.',
      en: 'Use range-product, vertical table lookup, and conditional logic functions.',
      zh: '可结合数组乘积求和、纵向查找以及条件判断函数。',
      hi: 'रेंज गुणनफल, वर्टिकल टेबल लुकअप और शर्तीय फ़ंक्शन का उपयोग करें।',
      fr: 'Utilisez des fonctions de produit de plages, recherche verticale et logique conditionnelle.'
    }),
    targetLabels: {
      D9: L({ es: 'Importe Total del Pedido', en: 'Total Order Amount', zh: '订单总金额', hi: 'कुल ऑर्डर राशि', fr: 'Montant Total' }),
      D10: L({ es: `Precio "${item2}"`, en: `"${item2}" Price`, zh: `“${item2}”价格`, hi: `"${item2}" मूल्य`, fr: `Prix « ${item2} »` }),
      D11: L({ es: 'Coste de Envío Final', en: 'Final Shipping Cost', zh: '最终运费', hi: 'अंतिम शिपिंग शुल्क', fr: 'Frais de Livraison' })
    },
    cellsText: {
      A2: L({ es: 'Ref', en: 'Ref', zh: '编号', hi: 'कोड', fr: 'Réf' }),
      B2: L({ es: 'Artículo Club', en: 'Club Item', zh: '社团物品', hi: 'क्लब आइटम', fr: 'Article Club' }),
      C2: L({ es: 'Unidades', en: 'Units', zh: '数量', hi: 'मात्रा', fr: 'Unités' }),
      D2: L({ es: 'Precio Unit.', en: 'Unit Price', zh: '单价', hi: 'इकाई मूल्य', fr: 'Prix Unit.' }),
      F2: L({ es: 'Catálogo', en: 'Catalog', zh: '官方目录', hi: 'कैटलॉग', fr: 'Catalogue' }),
      G2: L({ es: 'Tarifa Oficial', en: 'Official Rate', zh: '官方单价', hi: 'आधिकारिक दर', fr: 'Tarif Officiel' }),
      B4: item1,
      B5: item2,
      B6: item3,
      F4: item1,
      F5: item2,
      F6: item3,
      B9: L({ es: 'Importe Total del Pedido', en: 'Total Order Amount', zh: '订单总金额', hi: 'कुल ऑर्डर राशि', fr: 'Montant Total Commande' }),
      C9: L({ es: 'Total facturación', en: 'Total invoice', zh: '总计金额', hi: 'कुल बिल', fr: 'Total facture' }),
      B10: L({ es: `Consulta Precio "${item2}"`, en: `Lookup "${item2}"`, zh: `查询“${item2}”单价`, hi: `"${item2}" मूल्य खोज`, fr: `Prix « ${item2} »` }),
      C10: L({ es: 'Según catálogo oficial', en: 'From official catalog', zh: '依据官方目录', hi: 'कैटलॉग के अनुसार', fr: 'Selon catalogue' }),
      B11: L({ es: 'Coste de Envío Final', en: 'Final Shipping Fee', zh: '最终运费', hi: 'अंतिम शिपिंग शुल्क', fr: 'Frais de Port' }),
      C11: L({ es: 'Según umbral de pedido', en: 'Based on order threshold', zh: '依据免邮门槛', hi: 'ऑर्डर सीमा के अनुसार', fr: 'Selon seuil commande' })
    }
  };
}

const CHALLENGES = [
  {
    id: 'daily',
    mode: 'daily',
    caseNumber: '#042',
    badgeColor: 'bg-[#E6F2EC] text-[#143D30] border-[#B4D8C7]',
    stats: { mean: 45, stdDev: 14 },
    auditMutation: { cellId: 'C4', delta: 20 },
    targets: {
      C10: { expected: 210, format: 'currency', tolerance: 0.01 },
      C11: { expected: 185, format: 'currency', tolerance: 0.01 },
      C12: { expected: 740, format: 'currency', tolerance: 0.01 }
    },
    initialCells: {
      A2: { raw: 'Ítem', locked: true, style: 'header' },
      B2: { raw: 'Concepto', locked: true, style: 'header' },
      C2: { raw: 'Coste', locked: true, style: 'header' },
      E2: { raw: 'Datos', locked: true, style: 'header' },
      F2: { raw: 'Detalle', locked: true, style: 'header' },
      A4: { raw: '01', locked: true },
      B4: { raw: 'Tren', locked: true },
      C4: { raw: 65, locked: true, format: 'currency' },
      A5: { raw: '02', locked: true },
      B5: { raw: 'Alojamiento', locked: true },
      C5: { raw: 80, locked: true, format: 'currency' },
      A6: { raw: '03', locked: true },
      B6: { raw: 'Comidas', locked: true },
      C6: { raw: 45, locked: true, format: 'currency' },
      A7: { raw: '04', locked: true },
      B7: { raw: 'Actividades', locked: true },
      C7: { raw: 20, locked: true, format: 'currency' },
      E4: { raw: 25, locked: true, format: 'currency' },
      F4: { raw: 'Descuento', locked: true, style: 'muted' },
      E5: { raw: 4, locked: true, format: 'integer' },
      F5: { raw: 'Personas', locked: true, style: 'muted' },
      B10: { raw: 'Coste Base', locked: true, style: 'label' },
      C10: { raw: '', target: true, format: 'currency' },
      B11: { raw: 'Precio Final', locked: true, style: 'label' },
      C11: { raw: '', target: true, format: 'currency' },
      B12: { raw: 'Total Grupo', locked: true, style: 'label-bold' },
      C12: { raw: '', target: true, format: 'currency' }
    }
  },
  {
    id: 'practice-1',
    mode: 'practice',
    caseNumber: 'P-01',
    badgeColor: 'bg-[#EAF4F0] text-[#1B4D3E] border-[#BEE0D0]',
    stats: { mean: 38, stdDev: 12 },
    auditMutation: { cellId: 'C4', delta: 1 },
    targets: {
      C10: { expected: 8.2, format: 'number', tolerance: 0.05 },
      C11: { expected: 9.5, format: 'number', tolerance: 0.05 },
      C12: { expected: 0.2, format: 'number', tolerance: 0.05 }
    },
    initialCells: {
      A2: { raw: 'Código', locked: true, style: 'header' },
      B2: { raw: 'Asignatura', locked: true, style: 'header' },
      C2: { raw: 'Nota', locked: true, style: 'header' },
      E2: { raw: 'Ref', locked: true, style: 'header' },
      F2: { raw: 'Desc', locked: true, style: 'header' },
      A4: { raw: 'MAT-1', locked: true },
      B4: { raw: 'Estadística', locked: true },
      C4: { raw: 8.5, locked: true, format: 'number' },
      A5: { raw: 'PRG-2', locked: true },
      B5: { raw: 'Diseño Web', locked: true },
      C5: { raw: 9.5, locked: true, format: 'number' },
      A6: { raw: 'ORG-1', locked: true },
      B6: { raw: 'Proyectos', locked: true },
      C6: { raw: 7.5, locked: true, format: 'number' },
      A7: { raw: 'COM-1', locked: true },
      B7: { raw: 'Comunicación', locked: true },
      C7: { raw: 8.0, locked: true, format: 'number' },
      A8: { raw: 'IDI-3', locked: true },
      B8: { raw: 'Inglés', locked: true },
      C8: { raw: 7.5, locked: true, format: 'number' },
      E4: { raw: 8.0, locked: true, format: 'number' },
      F4: { raw: 'Corte Beca', locked: true, style: 'muted' },
      B10: { raw: 'Media', locked: true, style: 'label' },
      C10: { raw: '', target: true, format: 'number' },
      B11: { raw: 'Máxima', locked: true, style: 'label' },
      C11: { raw: '', target: true, format: 'number' },
      B12: { raw: 'Diferencia', locked: true, style: 'label-bold' },
      C12: { raw: '', target: true, format: 'number' }
    }
  },
  {
    id: 'practice-2',
    mode: 'practice',
    caseNumber: 'P-02',
    badgeColor: 'bg-[#E6F2EC] text-[#143D30] border-[#B4D8C7]',
    stats: { mean: 56, stdDev: 16 },
    auditMutation: { cellId: 'C4', delta: 2 },
    targets: {
      C10: { expected: 12, format: 'integer', tolerance: 0.01 },
      C11: { expected: 3, format: 'integer', tolerance: 0.01 },
      C12: { expected: 180, format: 'integer', tolerance: 0.01 }
    },
    initialCells: {
      A2: { raw: 'Día', locked: true, style: 'header' },
      B2: { raw: 'Categoría', locked: true, style: 'header' },
      C2: { raw: 'Horas', locked: true, style: 'header' },
      E2: { raw: 'Regla', locked: true, style: 'header' },
      F2: { raw: 'Detalle', locked: true, style: 'header' },
      A4: { raw: 'Lunes', locked: true },
      B4: { raw: 'Deporte', locked: true },
      C4: { raw: 5, locked: true, format: 'integer' },
      A5: { raw: 'Martes', locked: true },
      B5: { raw: 'Estudio', locked: true },
      C5: { raw: 6, locked: true, format: 'integer' },
      A6: { raw: 'Miércoles', locked: true },
      B6: { raw: 'Deporte', locked: true },
      C6: { raw: 3, locked: true, format: 'integer' },
      A7: { raw: 'Jueves', locked: true },
      B7: { raw: 'Estudio', locked: true },
      C7: { raw: 4, locked: true, format: 'integer' },
      A8: { raw: 'Viernes', locked: true },
      B8: { raw: 'Deporte', locked: true },
      C8: { raw: 4, locked: true, format: 'integer' },
      E4: { raw: 15, locked: true, format: 'integer' },
      F4: { raw: 'Puntos / h', locked: true, style: 'muted' },
      B10: { raw: 'Horas Deporte', locked: true, style: 'label' },
      C10: { raw: '', target: true, format: 'integer' },
      B11: { raw: 'Días >= 5h', locked: true, style: 'label' },
      C11: { raw: '', target: true, format: 'integer' },
      B12: { raw: 'Puntos', locked: true, style: 'label-bold' },
      C12: { raw: '', target: true, format: 'integer' }
    }
  },
  {
    id: 'practice-3',
    mode: 'practice',
    caseNumber: 'P-03',
    badgeColor: 'bg-[#E1EFE9] text-[#143D30] border-[#A7D3C0]',
    stats: { mean: 68, stdDev: 18 },
    auditMutation: { cellId: 'C4', delta: 2 },
    targets: {
      D9: { expected: 370, format: 'currency', tolerance: 0.01 },
      D10: { expected: 30, format: 'currency', tolerance: 0.01 },
      D11: { expected: 0, format: 'currency', tolerance: 0.01 }
    },
    initialCells: {
      A2: { raw: 'Ref', locked: true, style: 'header' },
      B2: { raw: 'Artículo', locked: true, style: 'header' },
      C2: { raw: 'Unidades', locked: true, style: 'header' },
      D2: { raw: 'Precio', locked: true, style: 'header' },
      F2: { raw: 'Catálogo', locked: true, style: 'header' },
      G2: { raw: 'Tarifa', locked: true, style: 'header' },
      A4: { raw: 'EQ-01', locked: true },
      B4: { raw: 'Camiseta', locked: true },
      C4: { raw: 10, locked: true, format: 'integer' },
      D4: { raw: 20, locked: true, format: 'currency' },
      A5: { raw: 'EQ-02', locked: true },
      B5: { raw: 'Mochila', locked: true },
      C5: { raw: 4, locked: true, format: 'integer' },
      D5: { raw: 30, locked: true, format: 'currency' },
      A6: { raw: 'EQ-03', locked: true },
      B6: { raw: 'Botella', locked: true },
      C6: { raw: 5, locked: true, format: 'integer' },
      D6: { raw: 10, locked: true, format: 'currency' },
      F4: { raw: 'Camiseta', locked: true },
      G4: { raw: 20, locked: true, format: 'currency' },
      F5: { raw: 'Mochila', locked: true },
      G5: { raw: 30, locked: true, format: 'currency' },
      F6: { raw: 'Botella', locked: true },
      G6: { raw: 10, locked: true, format: 'currency' },
      B9: { raw: 'Total Pedido', locked: true, style: 'label' },
      C9: { raw: 'Facturación', locked: true, style: 'muted' },
      D9: { raw: '', target: true, format: 'currency' },
      B10: { raw: 'Precio Mochila', locked: true, style: 'label' },
      C10: { raw: 'Catálogo', locked: true, style: 'muted' },
      D10: { raw: '', target: true, format: 'currency' },
      B11: { raw: 'Envío Final', locked: true, style: 'label-bold' },
      C11: { raw: 'Condición', locked: true, style: 'muted' },
      D11: { raw: '', target: true, format: 'currency' }
    }
  }
];

// Deterministic PRNG (Mulberry32) seeded by YYYY-MM-DD so every day generates a unique daily problem for all users
function hashDateSeed(dateStr) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < dateStr.length; i++) {
    h = Math.imul(h ^ dateStr.charCodeAt(i), 16777619);
  }
  return h >>> 0;
}

function createSeededRng(dateStr) {
  let a = hashDateSeed(dateStr);
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function getTodayIsoString(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function getDailyCaseNumberForDate(dateStr) {
  const epoch = new Date('2026-10-04T00:00:00Z').getTime();
  const cur = new Date(`${dateStr}T00:00:00Z`).getTime();
  const diffDays = Math.max(1, Math.round((cur - epoch) / 86400000));
  return `#${String(diffDays).padStart(3, '0')}`;
}

// Generate dynamic daily numbers & targets deterministically from YYYY-MM-DD
function generateDailyChallengeForDate(baseDaily, dateStr) {
  if (dateStr === '2026-11-15' || dateStr === '2026-11-14') {
    // Keep canonical numbers on base day while assigning the date's case number
    return {
      ...structuredClone(baseDaily),
      caseNumber: getDailyCaseNumberForDate(dateStr),
      dateStr
    };
  }
  const rng = createSeededRng(dateStr);
  const c4 = 45 + Math.floor(rng() * 10) * 5; // 45..90
  const c5 = 60 + Math.floor(rng() * 12) * 5; // 60..115
  const c6 = 30 + Math.floor(rng() * 8) * 5;  // 30..65
  const c7 = 15 + Math.floor(rng() * 6) * 5;  // 15..40
  const discount = 15 + Math.floor(rng() * 5) * 5; // 15..35
  const people = 3 + Math.floor(rng() * 4); // 3..6 friends

  const baseCost = c4 + c5 + c6 + c7;
  const finalPerPerson = baseCost - discount;
  const totalGroup = finalPerPerson * people;

  const mean = 41 + Math.floor(rng() * 11);
  const stdDev = 12 + Math.floor(rng() * 5);

  const cloned = structuredClone(baseDaily);
  cloned.caseNumber = getDailyCaseNumberForDate(dateStr);
  cloned.dateStr = dateStr;
  cloned.stats = { mean, stdDev };
  cloned.initialCells.C4.raw = c4;
  cloned.initialCells.C5.raw = c5;
  cloned.initialCells.C6.raw = c6;
  cloned.initialCells.C7.raw = c7;
  cloned.initialCells.E4.raw = discount;
  cloned.initialCells.E5.raw = people;
  cloned.targets = {
    C10: { expected: baseCost, format: 'currency', tolerance: 0.01 },
    C11: { expected: finalPerPerson, format: 'currency', tolerance: 0.01 },
    C12: { expected: totalGroup, format: 'currency', tolerance: 0.01 }
  };
  return cloned;
}

// Compute live mean, stdDev, and player count combining seeded daily cohort + local recorded submissions
function computeLiveMarketStats(challenge, dateStr, recordedSubmissions) {
  const rng = createSeededRng(`${challenge.id}_${dateStr}`);
  const baseCount = challenge.mode === 'daily' ? 180 + Math.floor(rng() * 140) : 95 + Math.floor(rng() * 60);
  const baseMean = challenge.stats.mean;
  const baseStd = challenge.stats.stdDev;

  const userTimes = recordedSubmissions[`${challenge.id}_${dateStr}`] || [];
  const totalPlayers = baseCount + userTimes.length;
  if (userTimes.length === 0) {
    return { mean: baseMean, stdDev: baseStd, totalPlayers };
  }
  const userSum = userTimes.reduce((a, b) => a + b, 0);
  const combinedMean = Math.round(((baseMean * baseCount + userSum) / totalPlayers) * 10) / 10;
  return { mean: combinedMean, stdDev: baseStd, totalPlayers };
}

function buildLocalizedCells(challenge, lang, existingCells = null) {
  const content = getChallengeContent(challenge.id, lang);
  const base = existingCells ? structuredClone(existingCells) : structuredClone(challenge.initialCells);
  for (const [cid, text] of Object.entries(content.cellsText)) {
    if (base[cid] && base[cid].locked) {
      base[cid].raw = text;
    }
  }
  return base;
}

// ============================================================================
// FORMATTING & MATH UTILITIES
// ============================================================================

function formatCellValue(val, formatType) {
  if (val === '' || val === null || val === undefined) return '';
  if (typeof val === 'string' && val.startsWith('#')) return val;
  const num = Number(val);
  if (isNaN(num)) return String(val);

  if (formatType === 'currency') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: num % 1 === 0 ? 0 : 2
    }).format(num);
  }
  if (formatType === 'percent') {
    return `${(num * 100).toFixed((num * 100) % 1 === 0 ? 0 : 1)}%`;
  }
  if (formatType === 'integer') {
    return Math.round(num).toString();
  }
  if (formatType === 'number') {
    return num % 1 === 0 ? num.toString() : num.toFixed(2);
  }
  if (Math.abs(num) >= 1000 && num % 1 === 0) {
    return new Intl.NumberFormat('en-US').format(num);
  }
  return num % 1 === 0 ? num.toString() : num.toFixed(2);
}

function formatTimer(deciseconds) {
  const totalSeconds = Math.floor(deciseconds / 10);
  const tenths = deciseconds % 10;
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${tenths}`;
}

function normalCDF(x, mean, stdDev) {
  const z = (x - mean) / stdDev;
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp((-z * z) / 2);
  const prob =
    d *
    t *
    (0.3193815 +
      t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return z > 0 ? 1 - prob : prob;
}

// ============================================================================
// ANIMATED ALPINE-GREEN CONFETTI + COUNT-UP + GAUSSIAN CURVE
// ============================================================================

const CONFETTI_PIECES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: `${(i * 3.7 + (i % 5) * 2) % 96 + 2}%`,
  delay: `${(i % 7) * 0.08}s`,
  duration: `${1.8 + (i % 4) * 0.35}s`,
  color: ['#1B4D3E', '#2E7D5B', '#10B981', '#A7F3D0', '#F59E0B'][i % 5],
  size: i % 3 === 0 ? 9 : 7,
  rotate: (i * 37) % 360
}));

function GaussianCurveSVG({ userSeconds, mean, stdDev, t }) {
  const width = 560;
  const height = 210;
  const padLeft = 36;
  const padRight = 36;
  const padTop = 28;
  const padBottom = 38;

  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const minX = Math.max(5, mean - 3.2 * stdDev);
  const maxX = mean + 3.2 * stdDev;
  const clampedUser = Math.max(minX + 2, Math.min(maxX - 2, userSeconds));

  const pdf = (x) => {
    const z = (x - mean) / stdDev;
    return Math.exp(-0.5 * z * z);
  };

  const toSvgX = (x) => padLeft + ((x - minX) / (maxX - minX)) * plotW;
  const toSvgY = (y) => padTop + plotH - y * plotH;

  const steps = 120;
  const points = [];
  const shadedPoints = [];

  for (let i = 0; i <= steps; i++) {
    const xVal = minX + (i / steps) * (maxX - minX);
    const yVal = pdf(xVal);
    const sx = toSvgX(xVal);
    const sy = toSvgY(yVal);
    points.push(`${i === 0 ? 'M' : 'L'} ${sx.toFixed(1)} ${sy.toFixed(1)}`);

    if (xVal >= clampedUser) {
      shadedPoints.push({ x: sx, y: sy });
    }
  }

  const userSvgX = toSvgX(clampedUser);
  const userSvgY = toSvgY(pdf(clampedUser));
  const meanSvgX = toSvgX(mean);
  const baselineY = padTop + plotH;

  let areaPath = '';
  if (shadedPoints.length > 0) {
    areaPath =
      `M ${userSvgX.toFixed(1)} ${baselineY} ` +
      `L ${userSvgX.toFixed(1)} ${userSvgY.toFixed(1)} ` +
      shadedPoints.map((p) => `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') +
      ` L ${shadedPoints[shadedPoints.length - 1].x.toFixed(1)} ${baselineY} Z`;
  }

  const ticks = [
    Math.round(mean - 2 * stdDev),
    Math.round(mean - stdDev),
    Math.round(mean),
    Math.round(mean + stdDev),
    Math.round(mean + 2 * stdDev)
  ];

  return (
    <div className="w-full bg-[#F4F8F6] border border-[#D2E4DB] rounded-xl p-3">
      <div className="flex items-center justify-between text-xs text-slate-600 mb-1 px-1">
        <span className="font-semibold text-[#143D30] flex items-center gap-1.5">
          <BarChart3 className="w-3.5 h-3.5 text-[#1B4D3E]" />
          {t.gaussTitle}
        </span>
        <span className="font-mono text-[11px] text-[#2A5E4B]">
          {t.gaussMean} = {mean}s | σ = {stdDev}s
        </span>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto overflow-visible"
      >
        <defs>
          <linearGradient id="alpineShade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1B4D3E" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#2E7D5B" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        {[0.25, 0.5, 0.75, 1].map((lvl, idx) => (
          <line
            key={idx}
            x1={padLeft}
            y1={toSvgY(lvl)}
            x2={width - padRight}
            y2={toSvgY(lvl)}
            stroke="#DCE9E2"
            strokeDasharray="2 2"
            strokeWidth="1"
          />
        ))}

        {areaPath && (
          <path
            d={areaPath}
            fill="url(#alpineShade)"
            className="animate-alpine-fade"
          />
        )}

        <path
          d={points.join(' ')}
          fill="none"
          stroke="#143D30"
          strokeWidth="2.4"
          strokeLinecap="round"
          className="animate-curve-draw"
        />

        <line
          x1={padLeft}
          y1={baselineY}
          x2={width - padRight}
          y2={baselineY}
          stroke="#7FA896"
          strokeWidth="1.5"
        />

        <line
          x1={meanSvgX}
          y1={padTop}
          x2={meanSvgX}
          y2={baselineY}
          stroke="#5A7D6F"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <text
          x={meanSvgX}
          y={padTop - 8}
          textAnchor="middle"
          className="fill-[#47695B] text-[10px] font-mono"
        >
          {t.gaussMean} ({mean}s)
        </text>

        <line
          x1={userSvgX}
          y1={padTop - 2}
          x2={userSvgX}
          y2={baselineY}
          stroke="#1B4D3E"
          strokeWidth="2.5"
        />
        <circle
          cx={userSvgX}
          cy={userSvgY}
          r="5"
          fill="#1B4D3E"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          className="animate-pulse"
        />

        <g
          transform={`translate(${Math.min(
            Math.max(userSvgX, padLeft + 52),
            width - padRight - 52
          )}, ${Math.max(userSvgY - 26, padTop + 8)})`}
        >
          <rect
            x="-52"
            y="-14"
            width="104"
            height="20"
            rx="5"
            fill="#143D30"
          />
          <text
            x="0"
            y="-1"
            textAnchor="middle"
            className="fill-white text-[10px] font-mono font-semibold"
          >
            {t.gaussYourTime}: {userSeconds.toFixed(1)}s
          </text>
        </g>

        {ticks.map((tk) => {
          const tx = toSvgX(tk);
          return (
            <g key={tk}>
              <line
                x1={tx}
                y1={baselineY}
                x2={tx}
                y2={baselineY + 5}
                stroke="#5A7D6F"
                strokeWidth="1.2"
              />
              <text
                x={tx}
                y={baselineY + 18}
                textAnchor="middle"
                className="fill-[#345447] text-[10px] font-mono"
              >
                {tk}s
              </text>
            </g>
          );
        })}

        <text
          x={width - padRight}
          y={height - 4}
          textAnchor="end"
          className="fill-[#1B4D3E] text-[10px] font-medium"
        >
          {t.gaussLegend}
        </text>
      </svg>
    </div>
  );
}

// ============================================================================
// STEALTH MODE ("BOSS / CLASS MODE" — FAKE PRODUCTIVITY DASHBOARD)
// ============================================================================

const STEALTH_ROWS = [
  { id: 'CC-4012', dept: 'Operations & Logistics EMEA', budget: '€142,800.00', actual: '€139,410.50', varPct: '-2.37%', status: 'OK', owner: 'M. Álvarez' },
  { id: 'CC-4018', dept: 'Cloud & Network Infrastructure', budget: '€88,500.00', actual: '€91,120.00', varPct: '+2.96%', status: 'REV', owner: 'L. Chen' },
  { id: 'CC-4025', dept: 'Tier-2 Technical Support', budget: '€64,200.00', actual: '€63,890.25', varPct: '-0.48%', status: 'OK', owner: 'R. Gómez' },
  { id: 'CC-4031', dept: 'ERP Licenses & Security', budget: '€51,000.00', actual: '€51,000.00', varPct: '0.00%', status: 'OK', owner: 'S. Patel' },
  { id: 'CC-4044', dept: 'Quality Assurance & Audit', budget: '€39,400.00', actual: '€37,915.80', varPct: '-3.77%', status: 'OK', owner: 'E. Navarro' },
  { id: 'CC-4052', dept: 'Preventive Maintenance', budget: '€27,900.00', actual: '€28,450.10', varPct: '+1.97%', status: 'REV', owner: 'J. Morales' },
  { id: 'CC-4060', dept: 'Compliance & Documentation', budget: '€19,500.00', actual: '€19,120.00', varPct: '-1.95%', status: 'OK', owner: 'A. Ruiz' }
];

function StealthWorkspaceView({ onExitStealth, t }) {
  const [activeTab, setActiveTab] = useState('matrix');
  const [regionFilter, setRegionFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [exportMsg, setExportMsg] = useState(false);

  const filteredRows = STEALTH_ROWS.filter((r) => {
    const matchesSearch =
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.dept.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.owner.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (regionFilter === 'OK') return r.status === 'OK';
    if (regionFilter === 'REV') return r.status === 'REV';
    return true;
  });

  const handleFakeExport = () => {
    setExportMsg(true);
    setTimeout(() => setExportMsg(false), 2000);
  };

  return (
    <div
      className="min-h-screen bg-[#F3F4F6] text-slate-800 flex flex-col"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <header className="bg-[#1E293B] text-slate-100 border-b border-slate-700 px-5 py-2.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-slate-700 flex items-center justify-center border border-slate-600">
            <Database className="w-4 h-4 text-sky-300" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm tracking-tight">
              NexusERP Analytics
            </span>
            <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
              {t.stealthSubtitle}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-slate-900/60 p-1 rounded border border-slate-700 text-xs">
          {[
            { id: 'matrix', label: t.stealthTab1 },
            { id: 'variance', label: t.stealthTab2 },
            { id: 'logs', label: t.stealthTab3 }
          ].map((tb) => (
            <button
              key={tb.id}
              onClick={() => setActiveTab(tb.id)}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                activeTab === tb.id
                  ? 'bg-slate-700 text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tb.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
            Sync: 09:42 UTC
          </span>
          <button
            onClick={onExitStealth}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-600 text-[11px] font-mono transition-colors cursor-pointer"
          >
            v4.2.1 · {t.stealthBack}
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-5 py-5 space-y-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'YTD Budget Allocation', val: '€433,300.00', sub: '7 active centers' },
            { label: 'Actual Execution', val: '€430,906.65', sub: '99.45% executed' },
            { label: 'Net Global Variance', val: '-€2,393.35', sub: 'Within threshold (±3%)' },
            { label: 'Reconciliation Index', val: '94.2%', sub: 'Last check: Today' }
          ].map((kpi, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-2xs">
              <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                {kpi.label}
              </p>
              <p
                className="text-lg font-bold text-slate-900 mt-1"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {kpi.val}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">{kpi.sub}</p>
            </div>
          ))}
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mr-1">
              <Filter className="w-3.5 h-3.5" />
            </div>
            {[
              { id: 'ALL', label: 'All (7)' },
              { id: 'OK', label: 'Reconciled' },
              { id: 'REV', label: 'In Review' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setRegionFilter(f.id)}
                className={`px-2.5 py-1 rounded text-xs border cursor-pointer ${
                  regionFilter === f.id
                    ? 'bg-slate-800 text-white border-slate-800'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {f.label}
              </button>
            ))}

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.stealthSearch}
              className="ml-2 px-3 py-1 text-xs border border-slate-300 rounded bg-white focus:outline-none focus:border-slate-500 w-56"
            />
          </div>

          <button
            onClick={handleFakeExport}
            className="px-3 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{exportMsg ? t.stealthExported : t.stealthExport}</span>
          </button>
        </div>

        {activeTab === 'matrix' && (
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 uppercase text-[11px]">
                    <th className="py-2.5 px-4 font-semibold">ID</th>
                    <th className="py-2.5 px-4 font-semibold">Unit</th>
                    <th className="py-2.5 px-4 font-semibold text-right">Budget</th>
                    <th className="py-2.5 px-4 font-semibold text-right">Actual</th>
                    <th className="py-2.5 px-4 font-semibold text-right">Variance</th>
                    <th className="py-2.5 px-4 font-semibold">Status</th>
                    <th className="py-2.5 px-4 font-semibold">Owner</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRows.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-4 font-mono font-semibold text-slate-700">{row.id}</td>
                      <td className="py-2.5 px-4 text-slate-800">{row.dept}</td>
                      <td className="py-2.5 px-4 font-mono text-right text-slate-700">{row.budget}</td>
                      <td className="py-2.5 px-4 font-mono text-right text-slate-900 font-medium">{row.actual}</td>
                      <td className={`py-2.5 px-4 font-mono text-right font-semibold ${row.varPct.startsWith('+') ? 'text-amber-700' : 'text-slate-600'}`}>{row.varPct}</td>
                      <td className="py-2.5 px-4">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${row.status === 'OK' ? 'bg-slate-100 text-slate-700 border-slate-200' : 'bg-amber-50 text-amber-800 border-amber-200'}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 text-slate-500">{row.owner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'variance' && (
          <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4">
            <h2 className="text-sm font-semibold text-slate-800">{t.stealthTab2}</h2>
            <div className="space-y-3">
              {STEALTH_ROWS.map((r) => (
                <div key={r.id} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-700">{r.id} — {r.dept}</span>
                    <span className="font-mono text-slate-600">{r.varPct}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-600 rounded-full" style={{ width: `${Math.min(100, Math.max(18, Math.abs(parseFloat(r.varPct)) * 22 + 40))}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="bg-white border border-slate-200 rounded-lg p-4 font-mono text-xs text-slate-600 space-y-2">
            <p>[09:41:12] INFO  Batch reconciliation job #8842 completed (0 errors)</p>
            <p>[09:41:18] INFO  Validated ledger checksum for CC-4012..CC-4060</p>
            <p>[09:41:45] WARN  CC-4018 variance +2.96% flagged for quarterly sign-off</p>
            <p>[09:42:03] INFO  Export snapshot cached in read-only replica</p>
          </div>
        )}
      </main>
    </div>
  );
}

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================

export default function App() {
  const [lang, setLang] = useState('es');
  const t = TRANSLATIONS[lang] || TRANSLATIONS.es;

  // Daily date rotation (0 = Today, -1 = Yesterday, etc.) so problem changes automatically every day
  const [dailyOffset, setDailyOffset] = useState(0);
  const activeDateStr = useMemo(() => getTodayIsoString(dailyOffset), [dailyOffset]);

  // Persisted submissions & streak in localStorage (safe try/catch for sandbox)
  const [recordedSubmissions, setRecordedSubmissions] = useState(() => {
    try {
      const saved = localStorage.getItem('cellsprint_submissions_v1');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [showDeployModal, setShowDeployModal] = useState(false);

  const [challengeIdx, setChallengeIdx] = useState(0);
  const currentChallenge = useMemo(() => {
    if (challengeIdx === 0) {
      return generateDailyChallengeForDate(CHALLENGES[0], activeDateStr);
    }
    return CHALLENGES[challengeIdx];
  }, [challengeIdx, activeDateStr]);

  const liveStats = useMemo(
    () => computeLiveMarketStats(currentChallenge, activeDateStr, recordedSubmissions),
    [currentChallenge, activeDateStr, recordedSubmissions]
  );
  const challengeContent = useMemo(
    () => getChallengeContent(currentChallenge.id, lang),
    [currentChallenge.id, lang]
  );
  const isDailyMode = currentChallenge.mode === 'daily';

  const [hasStarted, setHasStarted] = useState(false);
  const [stealthMode, setStealthMode] = useState(false);

  const [cells, setCells] = useState(() =>
    buildLocalizedCells(generateDailyChallengeForDate(CHALLENGES[0], getTodayIsoString(0)), 'es')
  );
  const [selectedCell, setSelectedCell] = useState('C10');
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [editingSource, setEditingSource] = useState('cell');

  const [isDraggingRange, setIsDraggingRange] = useState(false);
  const [dragStartCell, setDragStartCell] = useState(null);
  const [dragEndCell, setDragEndCell] = useState(null);
  const formulaDragPrefixRef = useRef(null);

  const [deciseconds, setDeciseconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [streak, setStreak] = useState(5);
  const [completedCases, setCompletedCases] = useState({});

  const [showHint, setShowHint] = useState(false);
  const [auditAlert, setAuditAlert] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultMetrics, setResultMetrics] = useState(null);
  const [animatedPct, setAnimatedPct] = useState(0);
  const [animatedBeat, setAnimatedBeat] = useState(0);
  const [copiedShare, setCopiedShare] = useState(false);

  const cellInputRef = useRef(null);
  const formulaBarRef = useRef(null);
  const gridContainerRef = useRef(null);

  // Inject Google Fonts & Custom Alpine Green Animations
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap';
    document.head.appendChild(link);

    const style = document.createElement('style');
    style.textContent = `
      @keyframes alpineConfettiFall {
        0% { transform: translateY(-20px) rotate(0deg) scale(0.8); opacity: 1; }
        100% { transform: translateY(340px) rotate(540deg) scale(1); opacity: 0; }
      }
      @keyframes curveDraw {
        from { stroke-dasharray: 1000; stroke-dashoffset: 1000; }
        to { stroke-dasharray: 1000; stroke-dashoffset: 0; }
      }
      @keyframes alpineFade {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes modalPop {
        0% { opacity: 0; transform: scale(0.92) translateY(12px); }
        100% { opacity: 1; transform: scale(1) translateY(0); }
      }
      .animate-confetti { animation: alpineConfettiFall ease-out forwards; }
      .animate-curve-draw { animation: curveDraw 1.1s ease-out forwards; }
      .animate-alpine-fade { animation: alpineFade 1.2s ease-in forwards; }
      .animate-modal-pop { animation: modalPop 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    `;
    document.head.appendChild(style);
  }, []);

  // Re-localize locked cell labels whenever language switches
  const handleChangeLanguage = (newLang) => {
    setLang(newLang);
    setCells((prev) => buildLocalizedCells(currentChallenge, newLang, prev));
    setAuditAlert(null);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDraggingRange) {
        setIsDraggingRange(false);
        formulaDragPrefixRef.current = null;
      }
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, [isDraggingRange]);

  const toggleStealthMode = useCallback(() => {
    setStealthMode((prev) => {
      if (prev) {
        setTimeout(() => {
          gridContainerRef.current?.focus();
        }, 30);
      }
      return !prev;
    });
  }, []);

  useEffect(() => {
    const handleStealthShortcut = (e) => {
      if ((e.altKey && e.key.toLowerCase() === 's') || e.key === 'F9') {
        e.preventDefault();
        toggleStealthMode();
      }
    };
    window.addEventListener('keydown', handleStealthShortcut);
    return () => window.removeEventListener('keydown', handleStealthShortcut);
  }, [toggleStealthMode]);

  // Continuous non-pausable stopwatch
  useEffect(() => {
    if (!timerRunning || !hasStarted) return;
    const interval = setInterval(() => {
      setDeciseconds((prev) => prev + 1);
    }, 100);
    return () => clearInterval(interval);
  }, [timerRunning, hasStarted]);

  // Animate KPI numbers smoothly when Result Modal opens
  useEffect(() => {
    if (!showResultModal || !resultMetrics) return;
    const targetTop = Number(resultMetrics.topPercentile);
    const targetBeat = Number(resultMetrics.beatenPercent);
    let frame = 0;
    const totalFrames = 24;
    const id = setInterval(() => {
      frame++;
      const progress = 1 - Math.pow(1 - frame / totalFrames, 3);
      setAnimatedPct((targetTop * progress).toFixed(1));
      setAnimatedBeat((targetBeat * progress).toFixed(1));
      if (frame >= totalFrames) clearInterval(id);
    }, 22);
    return () => clearInterval(id);
  }, [showResultModal, resultMetrics]);

  const { computed, errors } = useMemo(() => evaluateGrid(cells), [cells]);

  const handleSwitchDailyOffset = (newOffset) => {
    const clamped = Math.min(0, Math.max(-30, newOffset));
    setDailyOffset(clamped);
    const newDate = getTodayIsoString(clamped);
    const dailyCh = generateDailyChallengeForDate(CHALLENGES[0], newDate);
    setChallengeIdx(0);
    setCells(buildLocalizedCells(dailyCh, lang));
    const firstTarget = Object.keys(dailyCh.targets)[0] || 'C10';
    setSelectedCell(firstTarget);
    setDragStartCell(firstTarget);
    setDragEndCell(firstTarget);
    setIsEditing(false);
    setEditValue('');
    setDeciseconds(0);
    setHasStarted(false);
    setTimerRunning(false);
    setShowHint(false);
    setAuditAlert(null);
    setShowResultModal(false);
  };

  const loadChallenge = useCallback(
    (idx) => {
      const ch =
        idx === 0
          ? generateDailyChallengeForDate(CHALLENGES[0], activeDateStr)
          : CHALLENGES[idx];
      setChallengeIdx(idx);
      setCells(buildLocalizedCells(ch, lang));
      const firstTarget = Object.keys(ch.targets)[0] || 'C10';
      setSelectedCell(firstTarget);
      setDragStartCell(firstTarget);
      setDragEndCell(firstTarget);
      setIsEditing(false);
      setEditValue('');
      setDeciseconds(0);
      setHasStarted(false);
      setTimerRunning(false);
      setShowHint(false);
      setAuditAlert(null);
      setShowResultModal(false);
      setCopiedShare(false);
      setResultMetrics(null);
    },
    [lang, activeDateStr]
  );

  const handleStartChallenge = () => {
    const firstTarget = Object.keys(currentChallenge.targets)[0] || 'C10';
    setDeciseconds(0);
    setHasStarted(true);
    setTimerRunning(true);
    setSelectedCell(firstTarget);
    setDragStartCell(firstTarget);
    setDragEndCell(firstTarget);
    setAuditAlert(null);
    setShowResultModal(false);
    setTimeout(() => {
      gridContainerRef.current?.focus();
    }, 30);
  };

  useEffect(() => {
    if (!isEditing) {
      const raw = cells[selectedCell]?.raw ?? '';
      setEditValue(String(raw));
    }
  }, [selectedCell, cells, isEditing]);

  const commitEdit = useCallback(
    (targetCellId = selectedCell, valueToCommit = editValue) => {
      const existing = cells[targetCellId];
      if (existing?.locked) {
        setIsEditing(false);
        return;
      }
      setCells((prev) => ({
        ...prev,
        [targetCellId]: {
          ...(prev[targetCellId] || {}),
          raw: valueToCommit
        }
      }));
      setIsEditing(false);
    },
    [cells, selectedCell, editValue]
  );

  const finalizeChallengeSuccess = useCallback(
    (snapshotCells) => {
      setTimerRunning(false);
      setAuditAlert(null);

      const elapsedSec = Math.max(1.5, deciseconds / 10);
      const key = `${currentChallenge.id}_${activeDateStr}`;
      const updatedSubs = {
        ...recordedSubmissions,
        [key]: [...(recordedSubmissions[key] || []), elapsedSec]
      };
      setRecordedSubmissions(updatedSubs);
      try {
        localStorage.setItem('cellsprint_submissions_v1', JSON.stringify(updatedSubs));
      } catch (e) {
        // ignore storage errors in sandbox
      }

      const updatedMarket = computeLiveMarketStats(currentChallenge, activeDateStr, updatedSubs);
      const { mean, stdDev, totalPlayers } = updatedMarket;

      const cdf = normalCDF(elapsedSec, mean, stdDev);
      const topPercentile = Math.max(0.4, Math.min(99.5, cdf * 100));
      const beatenPercent = Math.max(0.5, Math.min(99.6, (1 - cdf) * 100));

      const formulasCount = Object.values(snapshotCells).filter((c) =>
        String(c?.raw ?? '')
          .trim()
          .startsWith('=')
      ).length;

      if (!completedCases[currentChallenge.id]) {
        setCompletedCases((prev) => ({ ...prev, [currentChallenge.id]: true }));
        if (currentChallenge.mode === 'daily') {
          setStreak((prev) => prev + 1);
        }
      }

      setResultMetrics({
        elapsedSec,
        formattedTime: formatTimer(deciseconds),
        topPercentile: topPercentile.toFixed(1),
        beatenPercent: beatenPercent.toFixed(1),
        formulasCount,
        mean,
        stdDev,
        totalPlayers
      });
      setShowResultModal(true);
    },
    [deciseconds, currentChallenge, completedCases, activeDateStr, recordedSubmissions]
  );

  useEffect(() => {
    if (!hasStarted || !timerRunning || showResultModal) return;

    const targetIds = Object.keys(currentChallenge.targets);
    const { computed: currentComputed, errors: currentErrors } = evaluateGrid(cells);

    for (const tid of targetIds) {
      const rawText = String(cells[tid]?.raw ?? '').trim();
      const targetMeta = currentChallenge.targets[tid];
      const tol = targetMeta.tolerance ?? 0.01;

      if (!rawText || !rawText.startsWith('=')) return;
      const exprBody = rawText.slice(1).trim();
      const hasReferenceOrFn = /[A-Za-z]+\d+|\b(SUMA|SUM|PROMEDIO|AVERAGE|MEDIANA|MEDIAN|SI|IF|SUMAR\.SI|SUMIF|CONTAR\.SI|COUNTIF|PROMEDIO\.SI|AVERAGEIF|BUSCARV|VLOOKUP|SUMAPRODUCTO|SUMPRODUCT|MAX|MIN|SI\.ERROR|IFERROR)\b/i.test(
        exprBody
      );
      if (!hasReferenceOrFn) return;
      if (currentErrors[tid]) return;

      const calcVal = Number(currentComputed[tid]);
      if (isNaN(calcVal) || Math.abs(calcVal - targetMeta.expected) > tol) {
        return;
      }
    }

    if (currentChallenge.auditMutation) {
      const { cellId, delta } = currentChallenge.auditMutation;
      const mutatedCells = structuredClone(cells);
      mutatedCells[cellId].raw = Number(mutatedCells[cellId].raw) + delta;
      const { computed: mutatedComputed } = evaluateGrid(mutatedCells);
      const primaryTarget = targetIds[0];
      if (
        Math.abs(
          Number(mutatedComputed[primaryTarget]) -
            Number(currentComputed[primaryTarget])
        ) < 1e-6
      ) {
        return;
      }
    }

    finalizeChallengeSuccess(cells);
  }, [
    cells,
    hasStarted,
    timerRunning,
    showResultModal,
    currentChallenge,
    finalizeChallengeSuccess
  ]);

  const getFormulaPrefixForReference = (val) => {
    const trimmed = val.trimEnd();
    const lastChar = trimmed[trimmed.length - 1];
    if (['=', '(', '+', '-', '*', '/', ',', ';', '>', '<'].includes(lastChar)) {
      return val;
    }
    const trailingRefMatch = val.match(/^(.*?)(\$?[A-G]\$?\d{1,2}(?::\$?[A-G]\$?\d{1,2})?)$/i);
    if (trailingRefMatch) {
      return trailingRefMatch[1];
    }
    return null;
  };

  const handleCellMouseDown = (cellId, e) => {
    if (!hasStarted) return;

    if (
      isEditing &&
      editValue.trim().startsWith('=') &&
      cellId !== selectedCell
    ) {
      e.preventDefault();
      const prefix = getFormulaPrefixForReference(editValue);
      if (prefix !== null) {
        if (e.shiftKey && dragStartCell) {
          const rangeText = formatRangeBetween(dragStartCell, cellId);
          setDragEndCell(cellId);
          setEditValue(`${prefix}${rangeText}`);
        } else {
          formulaDragPrefixRef.current = prefix;
          setDragStartCell(cellId);
          setDragEndCell(cellId);
          setIsDraggingRange(true);
          setEditValue(`${prefix}${cellId}`);
        }
        if (editingSource === 'formulaBar') {
          formulaBarRef.current?.focus();
        } else {
          cellInputRef.current?.focus();
        }
        return;
      }
    }

    if (isEditing && cellId !== selectedCell) {
      commitEdit(selectedCell, editValue);
    }

    if (e.shiftKey && selectedCell) {
      setDragStartCell(selectedCell);
      setDragEndCell(cellId);
    } else {
      setSelectedCell(cellId);
      setDragStartCell(cellId);
      setDragEndCell(cellId);
      setIsDraggingRange(true);
      formulaDragPrefixRef.current = null;
    }
    setIsEditing(false);
    setAuditAlert(null);
  };

  const handleCellMouseEnter = (cellId) => {
    if (!isDraggingRange || !dragStartCell) return;
    setDragEndCell(cellId);

    if (isEditing && formulaDragPrefixRef.current !== null) {
      const rangeStr = formatRangeBetween(dragStartCell, cellId);
      setEditValue(`${formulaDragPrefixRef.current}${rangeStr}`);
    }
  };

  const handleCellDoubleClick = (cellId) => {
    if (!hasStarted || cells[cellId]?.locked) return;
    setSelectedCell(cellId);
    setDragStartCell(cellId);
    setDragEndCell(cellId);
    setEditingSource('cell');
    setIsEditing(true);
    setEditValue(String(cells[cellId]?.raw ?? ''));
    setTimeout(() => {
      if (cellInputRef.current) cellInputRef.current.focus();
    }, 10);
  };

  const moveSelection = (dCol, dRow) => {
    const parsed = parseCellId(selectedCell);
    if (!parsed) return;
    const cIdx = COLS.indexOf(parsed.col);
    const nextColIdx = Math.max(0, Math.min(COLS.length - 1, cIdx + dCol));
    const nextRow = Math.max(1, Math.min(NUM_ROWS, parsed.row + dRow));
    const nextId = `${COLS[nextColIdx]}${nextRow}`;
    setSelectedCell(nextId);
    setDragStartCell(nextId);
    setDragEndCell(nextId);
  };

  const handleGridKeyDown = (e) => {
    if (!hasStarted || showResultModal) return;

    const tag = e.target?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') {
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      moveSelection(0, -1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      moveSelection(0, 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      moveSelection(-1, 0);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      moveSelection(1, 0);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      moveSelection(e.shiftKey ? -1 : 1, 0);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (!cells[selectedCell]?.locked) {
        setEditingSource('cell');
        setIsEditing(true);
        setEditValue(String(cells[selectedCell]?.raw ?? ''));
      } else {
        moveSelection(0, 1);
      }
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
      if (!cells[selectedCell]?.locked) {
        e.preventDefault();
        setCells((prev) => ({
          ...prev,
          [selectedCell]: { ...(prev[selectedCell] || {}), raw: '' }
        }));
        setEditValue('');
      }
    } else if (
      e.key.length === 1 &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.altKey &&
      !cells[selectedCell]?.locked
    ) {
      e.preventDefault();
      setEditingSource('cell');
      setIsEditing(true);
      setEditValue(e.key);
    }
  };

  const handleValidateSolution = () => {
    if (!hasStarted) return;
    if (isEditing) {
      commitEdit();
    }

    const snapshotCells = isEditing
      ? {
          ...cells,
          [selectedCell]: { ...(cells[selectedCell] || {}), raw: editValue }
        }
      : cells;

    const { computed: currentComputed, errors: currentErrors } =
      evaluateGrid(snapshotCells);

    const targetIds = Object.keys(currentChallenge.targets);

    for (const tid of targetIds) {
      const rawText = String(snapshotCells[tid]?.raw ?? '').trim();
      const targetMeta = currentChallenge.targets[tid];
      const tol = targetMeta.tolerance ?? 0.01;

      if (!rawText) {
        setAuditAlert({
          type: 'warning',
          title: t.alertIncompleteTitle,
          message: t.alertIncompleteMsg.replace('{tid}', tid)
        });
        setSelectedCell(tid);
        return;
      }

      if (!rawText.startsWith('=')) {
        setAuditAlert({
          type: 'error',
          title: t.alertHardcodeTitle.replace('{tid}', tid),
          message: t.alertHardcodeMsg
        });
        setSelectedCell(tid);
        return;
      }

      const exprBody = rawText.slice(1).trim();
      const hasReferenceOrFn = /[A-Za-z]+\d+|\b(SUMA|SUM|PROMEDIO|AVERAGE|MEDIANA|MEDIAN|SI|IF|SUMAR\.SI|SUMIF|CONTAR\.SI|COUNTIF|PROMEDIO\.SI|AVERAGEIF|BUSCARV|VLOOKUP|SUMAPRODUCTO|SUMPRODUCT|MAX|MIN|SI\.ERROR|IFERROR)\b/i.test(
        exprBody
      );
      if (!hasReferenceOrFn) {
        setAuditAlert({
          type: 'error',
          title: t.alertStaticTitle.replace('{tid}', tid),
          message: t.alertStaticMsg
        });
        setSelectedCell(tid);
        return;
      }

      if (currentErrors[tid]) {
        setAuditAlert({
          type: 'error',
          title: t.alertSyntaxTitle.replace('{tid}', tid),
          message: t.alertSyntaxMsg
            .replace('{tid}', tid)
            .replace('{err}', currentErrors[tid])
        });
        setSelectedCell(tid);
        return;
      }

      const calcVal = Number(currentComputed[tid]);
      const expectedVal = targetMeta.expected;
      if (isNaN(calcVal) || Math.abs(calcVal - expectedVal) > tol) {
        setAuditAlert({
          type: 'warning',
          title: t.alertMismatchTitle.replace('{tid}', tid),
          message: t.alertMismatchMsg
            .replace('{got}', formatCellValue(currentComputed[tid], targetMeta.format))
            .replace('{exp}', formatCellValue(expectedVal, targetMeta.format))
        });
        setSelectedCell(tid);
        return;
      }
    }

    if (currentChallenge.auditMutation) {
      const { cellId, delta } = currentChallenge.auditMutation;
      const mutatedCells = structuredClone(snapshotCells);
      mutatedCells[cellId].raw = Number(mutatedCells[cellId].raw) + delta;
      const { computed: mutatedComputed } = evaluateGrid(mutatedCells);

      const primaryTarget = targetIds[0];
      if (
        Math.abs(
          Number(mutatedComputed[primaryTarget]) -
            Number(currentComputed[primaryTarget])
        ) < 1e-6
      ) {
        setAuditAlert({
          type: 'error',
          title: t.alertDynamicTitle,
          message: t.alertDynamicMsg
            .replace('{cell}', cellId)
            .replace('{tid}', primaryTarget)
        });
        return;
      }
    }

    finalizeChallengeSuccess(snapshotCells);
  };

  const handleCopyShare = () => {
    if (!resultMetrics) return;
    const topRounded = Math.max(1, Math.round(Number(resultMetrics.topPercentile)));
    const shareText = `📊 CellSprint ${currentChallenge.caseNumber} | ⏱️ ${resultMetrics.formattedTime} | 🏆 Top ${topRounded}% (${resultMetrics.beatenPercent}%) | 🟩 ${resultMetrics.formulasCount} fx`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareText).catch(() => {
        fallbackCopy(shareText);
      });
    } else {
      fallbackCopy(shareText);
    }
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const fallbackCopy = (text) => {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
    } catch (e) {
      // ignore
    }
    document.body.removeChild(ta);
  };

  const getSelectedCellIds = () => {
    if (dragStartCell && dragEndCell && dragStartCell !== dragEndCell) {
      return expandRange(formatRangeBetween(dragStartCell, dragEndCell), false);
    }
    return [selectedCell];
  };

  const applyFormatToSelection = (patchObj) => {
    if (!hasStarted) return;
    const ids = getSelectedCellIds();
    setCells((prev) => {
      const next = { ...prev };
      for (const id of ids) {
        next[id] = { ...(next[id] || { raw: '' }), ...patchObj };
      }
      return next;
    });
  };

  const clearSelectionFormatting = () => {
    if (!hasStarted) return;
    const ids = getSelectedCellIds();
    setCells((prev) => {
      const next = { ...prev };
      for (const id of ids) {
        if (next[id]) {
          const { bgColor, bold, align, ...rest } = next[id];
          next[id] = rest;
        }
      }
      return next;
    });
  };

  const handleSortBySelectedColumn = (ascending = true) => {
    if (!hasStarted) return;
    const parsed = parseCellId(selectedCell);
    if (!parsed) return;
    const sortCol = parsed.col;

    const candidateRows = [4, 5, 6, 7, 8].filter((r) => {
      const hasAnyVal = ['A', 'B', 'C', 'D'].some(
        (c) => cells[`${c}${r}`]?.raw !== undefined && cells[`${c}${r}`]?.raw !== ''
      );
      const hasTarget = ['A', 'B', 'C', 'D'].some(
        (c) => Boolean(currentChallenge.targets[`${c}${r}`])
      );
      return hasAnyVal && !hasTarget;
    });

    if (candidateRows.length < 2) return;

    const tableCols = ['A', 'B', 'C', 'D'];
    const rowSnapshots = candidateRows.map((r) => {
      const rowData = {};
      for (const c of tableCols) {
        rowData[c] = cells[`${c}${r}`] ? { ...cells[`${c}${r}`] } : undefined;
      }
      const sortRaw = computed[`${sortCol}${r}`] ?? cells[`${sortCol}${r}`]?.raw ?? '';
      return { rowData, sortRaw };
    });

    rowSnapshots.sort((a, b) => {
      const aNum = toNumber(a.sortRaw);
      const bNum = toNumber(b.sortRaw);
      const bothNum = !isNaN(aNum) && !isNaN(bNum) && a.sortRaw !== '' && b.sortRaw !== '';
      let cmp = 0;
      if (bothNum) {
        cmp = aNum - bNum;
      } else {
        cmp = String(a.sortRaw).localeCompare(String(b.sortRaw), lang, { numeric: true });
      }
      return ascending ? cmp : -cmp;
    });

    setCells((prev) => {
      const next = { ...prev };
      candidateRows.forEach((r, idx) => {
        for (const c of tableCols) {
          const val = rowSnapshots[idx].rowData[c];
          if (val !== undefined) {
            next[`${c}${r}`] = val;
          } else {
            delete next[`${c}${r}`];
          }
        }
      });
      return next;
    });
  };

  const insertFunctionSnippet = (fnName) => {
    if (!hasStarted || cells[selectedCell]?.locked) return;
    setEditingSource('formulaBar');
    setIsEditing(true);
    if (!editValue.startsWith('=')) {
      setEditValue(`=${fnName}(`);
    } else {
      setEditValue((prev) => `${prev}${fnName}(`);
    }
    setTimeout(() => {
      if (formulaBarRef.current) {
        formulaBarRef.current.focus();
        const len = formulaBarRef.current.value.length;
        formulaBarRef.current.setSelectionRange(len, len);
      }
    }, 10);
  };

  const selectedCellMeta = cells[selectedCell] || {};
  const isTargetCell = Boolean(currentChallenge.targets[selectedCell]);
  const activeSelectionRangeLabel =
    dragStartCell && dragEndCell && dragStartCell !== dragEndCell
      ? formatRangeBetween(dragStartCell, dragEndCell)
      : selectedCell;

  if (stealthMode) {
    return <StealthWorkspaceView onExitStealth={toggleStealthMode} t={t} />;
  }

  return (
    <div
      className="min-h-screen bg-[#F2F7F5] text-[#102A22] flex flex-col select-none"
      style={{ fontFamily: "'Inter', sans-serif" }}
      onKeyDown={handleGridKeyDown}
      tabIndex={0}
      ref={gridContainerRef}
    >
      {/* ===================================================================
          A. HEADER ALPINE GREEN (Con Selector de 5 Idiomas arriba a la derecha)
         =================================================================== */}
      <header className="bg-gradient-to-r from-[#12352A] via-[#1B4D3E] to-[#143D30] text-white border-b border-[#0E2920] px-4 lg:px-8 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#2E7D5B] flex items-center justify-center shadow-inner border border-emerald-300/30">
              <FileSpreadsheet className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-base lg:text-lg text-white">
                  CellSprint
                </span>
                <span className="text-[11px] uppercase tracking-widest px-2 py-0.5 rounded-md bg-[#0E2920] text-[#A7F3D0] font-mono border border-[#2E7D5B]/50">
                  {isDailyMode ? `${t.dailyBadge} ${currentChallenge.caseNumber}` : `${t.practiceBadge} ${currentChallenge.caseNumber}`}
                </span>
              </div>
              <p className="text-[11px] text-emerald-100/75 hidden sm:block">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Mode Selector: Primary = Daily Case | Secondary = Practice Levels */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center bg-[#0E2920]/80 rounded-xl border border-emerald-300/40 p-0.5">
              <button
                type="button"
                onClick={() => handleSwitchDailyOffset(dailyOffset - 1)}
                className="p-1.5 text-emerald-200 hover:text-white hover:bg-[#1E5443] rounded-lg cursor-pointer"
                title="Día anterior (Archivo de Retos Diarios)"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => loadChallenge(0)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isDailyMode
                    ? 'bg-[#2E7D5B] text-white shadow-xs'
                    : 'text-emerald-100/85 hover:text-white'
                }`}
              >
                <Calendar className="w-3.5 h-3.5 text-emerald-200" />
                <span>
                  {t.dailyBadge} {currentChallenge.caseNumber} ({activeDateStr})
                </span>
                {completedCases.daily && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-200" />
                )}
              </button>
              <button
                type="button"
                disabled={dailyOffset >= 0}
                onClick={() => handleSwitchDailyOffset(dailyOffset + 1)}
                className={`p-1.5 rounded-lg ${
                  dailyOffset >= 0
                    ? 'text-emerald-200/30 cursor-not-allowed'
                    : 'text-emerald-200 hover:text-white hover:bg-[#1E5443] cursor-pointer'
                }`}
                title="Día siguiente"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="h-5 w-px bg-emerald-200/20 hidden sm:block" />

            <div className="flex items-center bg-[#0E2920]/70 p-1 rounded-xl border border-[#2A5E4B]/70">
              <span className="text-[11px] text-emerald-100/70 px-2 hidden md:inline-flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-200/80" />
                {t.practiceLabel}
              </span>
              {CHALLENGES.slice(1).map((ch, i) => {
                const actualIdx = i + 1;
                const active = challengeIdx === actualIdx;
                const isDone = completedCases[ch.id];
                const chContent = getChallengeContent(ch.id, lang);
                return (
                  <button
                    key={ch.id}
                    onClick={() => loadChallenge(actualIdx)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1 cursor-pointer ${
                      active
                        ? 'bg-[#246A53] text-white shadow-xs border border-emerald-300/40'
                        : 'text-emerald-100/75 hover:text-white hover:bg-[#1E5443]'
                    }`}
                  >
                    <span>{chContent.shortTab}</span>
                    {isDone && <CheckCircle2 className="w-3 h-3 text-emerald-300" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Controls: Stealth, Streak, Continuous Stopwatch, & 5-Language Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setShowDeployModal(true)}
              className="flex items-center gap-1.5 bg-[#2E7D5B]/90 hover:bg-[#246A53] border border-emerald-300/40 text-white px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer shrink-0"
              title="Estado de Producción, Datos en Vivo y Enlace Compartible"
            >
              <Rocket className="w-3.5 h-3.5 text-emerald-200 shrink-0" />
              <span className="hidden md:inline">Live & Share</span>
            </button>

            <button
              type="button"
              onClick={toggleStealthMode}
              className="flex items-center gap-1.5 bg-[#0E2920]/80 hover:bg-[#1E5443] border border-emerald-300/30 text-emerald-100 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer shrink-0"
              title={t.stealthTitle}
            >
              <Monitor className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
              <span>{t.stealthBtn}</span>
            </button>

            <div className="flex items-center gap-1.5 bg-[#0E2920]/80 border border-[#2A5E4B] px-2.5 py-1.5 rounded-xl">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span
                className="text-xs font-semibold text-emerald-50"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {streak}{t.streakSuffix}
              </span>
            </div>

            {/* Non-pausable Live Stopwatch */}
            <div className="flex items-center gap-2 bg-[#0E2920] border border-[#2E7D5B] px-3 py-1.5 rounded-xl shadow-inner">
              <Clock
                className={`w-4 h-4 ${
                  timerRunning ? 'text-emerald-300 animate-pulse' : 'text-emerald-200/60'
                }`}
              />
              <span
                className="text-sm lg:text-base font-bold tracking-wider text-white"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {formatTimer(deciseconds)}
              </span>
              {hasStarted && (
                <button
                  onClick={() => loadChallenge(challengeIdx)}
                  className="text-emerald-200/80 hover:text-white ml-0.5 cursor-pointer"
                  title={t.resetTitle}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* 5 Most Common Languages Selector (Top-Right) */}
            <div
              className="flex items-center bg-[#0E2920] p-0.5 rounded-xl border border-[#2A5E4B]"
              title="Language / Idioma"
            >
              <Languages className="w-3.5 h-3.5 text-emerald-300 mx-1.5 hidden sm:block" />
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => handleChangeLanguage(l.code)}
                  className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    lang === l.code
                      ? 'bg-[#2E7D5B] text-white shadow-xs'
                      : 'text-emerald-100/70 hover:text-white hover:bg-[#1E5443]'
                  }`}
                  title={l.name}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ===================================================================
          MAIN WORKSPACE CONTAINER
         =================================================================== */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-5 flex flex-col gap-4">
        {!hasStarted ? (
          /* ===============================================================
             PRE-START SCREEN (ALPINE GREEN)
             =============================================================== */
          <section className="bg-white border border-[#D2E4DB] rounded-2xl shadow-md p-7 lg:p-10 my-auto flex flex-col items-center text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-[#E8F3EE] border border-[#B4D8C7] flex items-center justify-center mb-4 shadow-xs">
              <Clock className="w-8 h-8 text-[#1B4D3E]" />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full border ${currentChallenge.badgeColor}`}
              >
                {challengeContent.level}
              </span>
              <span className="text-xs font-mono bg-[#F4F8F6] text-[#2A5E4B] px-2.5 py-1 rounded-full border border-[#D2E4DB]">
                {t.avgTimeToday}: {liveStats.mean}s ({liveStats.totalPlayers} jugadores)
              </span>
            </div>

            <h1 className="text-xl lg:text-2xl font-bold text-[#102A22] tracking-tight mb-2">
              {isDailyMode
                ? t.readyDailyTitle
                : `${t.readyPracticeTitle} (${challengeContent.shortTab})?`}
            </h1>

            <p className="text-sm text-slate-600 max-w-lg leading-relaxed mb-5">
              {t.readyBody1} <strong>{t.readyBodyBold}</strong>. {t.readyBody2}
            </p>

            <div className="w-full bg-[#F4F8F6] border border-[#D2E4DB] rounded-xl p-4 mb-6 text-left flex items-start gap-3">
              <EyeOff className="w-5 h-5 text-[#2A5E4B] shrink-0 mt-0.5" />
              <div className="text-xs text-slate-600 space-y-1">
                <p className="font-semibold text-[#143D30]">
                  {t.caseTopic}: {challengeContent.title}
                </p>
                <p>{challengeContent.teaser}</p>
                <p className="text-[11px] text-[#1B4D3E] font-medium pt-1">
                  ⚡ {t.autoStopNote}
                </p>
              </div>
            </div>

            <button
              onClick={handleStartChallenge}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#1B4D3E] to-[#2E7D5B] hover:from-[#143D30] hover:to-[#246A53] text-white font-bold text-sm lg:text-base shadow-md hover:shadow-lg transition-all flex items-center gap-2.5 cursor-pointer"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>{t.startBtn}</span>
            </button>
          </section>
        ) : (
          <>
            {/* =============================================================
                B. CHALLENGE CONTEXT PANEL (ALPINE GREEN)
               ============================================================= */}
            <section className="bg-white border border-[#D2E4DB] rounded-2xl shadow-sm p-4 lg:p-5">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${currentChallenge.badgeColor}`}
                    >
                      {challengeContent.level}
                    </span>
                    {isDailyMode && (
                      <span className="text-xs bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-full font-medium">
                        🌍 {t.competingBanner}
                      </span>
                    )}
                    <span className="text-xs font-mono text-[#345447]">
                      {t.avgTimeToday}: {liveStats.mean}s ({liveStats.totalPlayers} jugadores)
                    </span>
                  </div>

                  <h1 className="text-lg lg:text-xl font-bold text-[#102A22] tracking-tight">
                    {challengeContent.title}
                  </h1>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {challengeContent.description}
                  </p>

                  <div className="pt-1 flex flex-wrap gap-2">
                    {challengeContent.rules.map((rule, i) => (
                      <div
                        key={i}
                        className="text-xs bg-[#F4F8F6] border border-[#D2E4DB] text-[#143D30] px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                      >
                        <ChevronRight className="w-3.5 h-3.5 text-[#1B4D3E] shrink-0" />
                        <span>{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-row lg:flex-col items-stretch lg:items-end justify-between gap-2.5 shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0 border-[#E6F0EC]">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowHint((h) => !h)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border transition-colors flex items-center gap-1.5 cursor-pointer ${
                        showHint
                          ? 'bg-amber-50 border-amber-300 text-amber-900'
                          : 'bg-white border-[#D2E4DB] text-[#143D30] hover:bg-[#F4F8F6]'
                      }`}
                    >
                      <HelpCircle className="w-4 h-4 text-amber-600" />
                      <span>{t.hintBtn}</span>
                    </button>

                    <button
                      onClick={handleValidateSolution}
                      className="px-4 py-2 rounded-xl text-xs lg:text-sm font-semibold bg-[#1B4D3E] hover:bg-[#143D30] text-white shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{t.validateBtn}</span>
                    </button>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#143D30] bg-[#E8F3EE] border border-[#B4D8C7] px-2.5 py-1 rounded-lg">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#1B4D3E] shrink-0" />
                    <span>{t.antiHardcodingActive}</span>
                  </div>
                </div>
              </div>

              {showHint && (
                <div className="mt-3 pt-3 border-t border-[#E6F0EC] flex items-start gap-2.5 text-xs bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 text-amber-950">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold">{t.hintTitle}</p>
                    <p className="font-mono text-[11px] text-amber-900">
                      {challengeContent.hint}
                    </p>
                  </div>
                </div>
              )}

              {auditAlert && (
                <div
                  className={`mt-3 rounded-xl p-3.5 border flex items-start justify-between gap-3 ${
                    auditAlert.type === 'error'
                      ? 'bg-red-50 border-red-300 text-red-950'
                      : 'bg-amber-50 border-amber-300 text-amber-950'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle
                      className={`w-5 h-5 shrink-0 mt-0.5 ${
                        auditAlert.type === 'error' ? 'text-red-600' : 'text-amber-600'
                      }`}
                    />
                    <div className="text-xs space-y-0.5">
                      <p className="font-bold">{auditAlert.title}</p>
                      <p className="font-mono">{auditAlert.message}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setAuditAlert(null)}
                    className="text-xs font-semibold underline opacity-75 hover:opacity-100 cursor-pointer"
                  >
                    {t.closeBtn}
                  </button>
                </div>
              )}
            </section>

            {/* =============================================================
                C. SPREADSHEET ENGINE (ALPINE GREEN + EXCEL TOOLS)
               ============================================================= */}
            <section className="bg-white border border-[#D2E4DB] rounded-2xl shadow-sm overflow-hidden flex flex-col">
              <div className="border-b border-[#D2E4DB] bg-[#F4F8F6] px-3 py-2.5 flex flex-col gap-2">
                {/* Excel Formatting & Data Tools Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-1.5 border-b border-[#DCE9E2] text-xs">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <div className="flex items-center bg-white border border-[#D2E4DB] rounded-lg p-0.5 gap-0.5">
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => handleSortBySelectedColumn(true)}
                        className="px-2 py-1 rounded-md hover:bg-[#E8F3EE] text-[#143D30] flex items-center gap-1 text-[11px] font-medium cursor-pointer"
                      >
                        <ArrowUpAZ className="w-3.5 h-3.5 text-[#1B4D3E]" />
                        <span>{t.sortAZ}</span>
                      </button>
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => handleSortBySelectedColumn(false)}
                        className="px-2 py-1 rounded-md hover:bg-[#E8F3EE] text-[#143D30] flex items-center gap-1 text-[11px] font-medium cursor-pointer"
                      >
                        <ArrowDownZA className="w-3.5 h-3.5 text-[#2A5E4B]" />
                        <span>{t.sortZA}</span>
                      </button>
                    </div>

                    <div
                      className="flex items-center bg-white border border-[#D2E4DB] rounded-lg px-1.5 py-1 gap-1"
                      title={t.fillLabel}
                    >
                      <Paintbrush className="w-3 h-3 text-[#47695B] mr-0.5" />
                      {[
                        { label: t.noColor, hex: null, cls: 'bg-white border-slate-300' },
                        { label: 'Yellow', hex: '#FEF9C3', cls: 'bg-yellow-100 border-yellow-300' },
                        { label: 'Alpine', hex: '#D1FAE5', cls: 'bg-emerald-100 border-emerald-300' },
                        { label: 'Blue', hex: '#DBEAFE', cls: 'bg-blue-100 border-blue-300' },
                        { label: 'Orange', hex: '#FFEDD5', cls: 'bg-orange-100 border-orange-300' },
                        { label: 'Purple', hex: '#F3E8FF', cls: 'bg-purple-100 border-purple-300' }
                      ].map((swatch) => (
                        <button
                          key={swatch.label}
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => applyFormatToSelection({ bgColor: swatch.hex })}
                          className={`w-4 h-4 rounded-xs border ${swatch.cls} hover:scale-110 transition-transform cursor-pointer`}
                          title={swatch.label}
                        />
                      ))}
                    </div>

                    <div className="flex items-center bg-white border border-[#D2E4DB] rounded-lg p-0.5 gap-0.5">
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => applyFormatToSelection({ bold: !selectedCellMeta.bold })}
                        className={`p-1 rounded cursor-pointer ${selectedCellMeta.bold ? 'bg-[#D2E4DB] text-[#102A22]' : 'hover:bg-[#E8F3EE] text-[#345447]'}`}
                        title={t.boldTitle}
                      >
                        <Bold className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => applyFormatToSelection({ align: 'left' })}
                        className="p-1 rounded hover:bg-[#E8F3EE] text-[#345447] cursor-pointer"
                        title={t.alignLeft}
                      >
                        <AlignLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => applyFormatToSelection({ align: 'center' })}
                        className="p-1 rounded hover:bg-[#E8F3EE] text-[#345447] cursor-pointer"
                        title={t.alignCenter}
                      >
                        <AlignCenter className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => applyFormatToSelection({ align: 'right' })}
                        className="p-1 rounded hover:bg-[#E8F3EE] text-[#345447] cursor-pointer"
                        title={t.alignRight}
                      >
                        <AlignRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center bg-white border border-[#D2E4DB] rounded-lg p-0.5 gap-0.5">
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => applyFormatToSelection({ format: 'currency' })}
                        className="px-1.5 py-1 rounded hover:bg-[#E8F3EE] text-[#143D30] text-[11px] font-mono cursor-pointer flex items-center"
                        title={t.currencyTitle}
                      >
                        <DollarSign className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => applyFormatToSelection({ format: 'percent' })}
                        className="px-1.5 py-1 rounded hover:bg-[#E8F3EE] text-[#143D30] text-[11px] font-mono cursor-pointer flex items-center"
                        title={t.percentTitle}
                      >
                        <Percent className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => applyFormatToSelection({ format: 'number' })}
                        className="px-1.5 py-1 rounded hover:bg-[#E8F3EE] text-[#143D30] text-[11px] font-mono cursor-pointer"
                        title={t.decimalTitle}
                      >
                        .00
                      </button>
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={clearSelectionFormatting}
                        className="p-1 rounded hover:bg-[#E8F3EE] text-[#47695B] cursor-pointer"
                        title={t.clearFormatTitle}
                      >
                        <Eraser className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px]">
                    {selectedCellMeta.locked ? (
                      <span className="inline-flex items-center gap-1 text-[#47695B] bg-[#E3EEE8] px-2.5 py-0.5 rounded-md font-medium">
                        <Lock className="w-3 h-3" /> {t.lockedCellBadge}
                      </span>
                    ) : isTargetCell ? (
                      <span className="inline-flex items-center gap-1 text-[#143D30] bg-[#D8EFE4] border border-[#9FD0B9] px-2.5 py-0.5 rounded-md font-semibold">
                        <Sparkles className="w-3 h-3" /> {t.targetCellBadge}:{' '}
                        {challengeContent.targetLabels[selectedCell]}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[#47695B] bg-white border border-[#D2E4DB] px-2.5 py-0.5 rounded-md">
                        {t.auxCellBadge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quick Function Chips */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#47695B] mr-1 flex items-center gap-1">
                    <Terminal className="w-3.5 h-3.5" /> {t.functionsLabel}
                  </span>
                  {[
                    'SUMA',
                    'PROMEDIO',
                    'MEDIANA',
                    'MAX',
                    'MIN',
                    'SI',
                    'SUMAR.SI',
                    'CONTAR.SI',
                    'PROMEDIO.SI',
                    'BUSCARV',
                    'SUMAPRODUCTO',
                    'SI.ERROR',
                    'CONCAT'
                  ].map((fn) => (
                    <button
                      key={fn}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => insertFunctionSnippet(fn)}
                      className="px-2 py-0.5 bg-white hover:bg-[#E8F3EE] text-[#143D30] hover:text-[#1B4D3E] border border-[#D2E4DB] hover:border-[#2E7D5B] rounded-md font-mono text-[11px] transition-colors cursor-pointer"
                    >
                      ={fn}()
                    </button>
                  ))}
                </div>

                {/* Formula Bar (fx) */}
                <div className="flex items-center gap-2">
                  <div
                    className="min-w-16 px-2 h-8 bg-white border border-[#B4D8C7] rounded-lg flex items-center justify-center font-mono text-xs font-bold text-[#143D30] shadow-2xs shrink-0"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {activeSelectionRangeLabel}
                  </div>

                  <div
                    className="px-2.5 h-8 bg-[#E3EEE8] border border-[#B4D8C7] rounded-lg flex items-center justify-center font-mono text-xs font-bold italic text-[#1B4D3E] shrink-0"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    fx
                  </div>

                  <input
                    ref={formulaBarRef}
                    type="text"
                    disabled={Boolean(selectedCellMeta.locked)}
                    value={isEditing ? editValue : String(cells[selectedCell]?.raw ?? '')}
                    onFocus={() => {
                      if (!selectedCellMeta.locked) {
                        setEditingSource('formulaBar');
                        if (!isEditing) {
                          setIsEditing(true);
                          setEditValue(String(cells[selectedCell]?.raw ?? ''));
                        }
                      }
                    }}
                    onChange={(e) => {
                      setEditingSource('formulaBar');
                      setIsEditing(true);
                      setEditValue(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        e.stopPropagation();
                        commitEdit();
                        moveSelection(0, 1);
                        gridContainerRef.current?.focus();
                      } else if (e.key === 'Tab') {
                        e.preventDefault();
                        e.stopPropagation();
                        commitEdit();
                        moveSelection(e.shiftKey ? -1 : 1, 0);
                        gridContainerRef.current?.focus();
                      } else if (e.key === 'Escape') {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsEditing(false);
                        setEditValue(String(cells[selectedCell]?.raw ?? ''));
                        gridContainerRef.current?.focus();
                      }
                    }}
                    placeholder={
                      selectedCellMeta.locked ? t.fxPlaceholderLocked : t.fxPlaceholderActive
                    }
                    className={`flex-1 h-8 px-3 rounded-lg border text-xs font-mono focus:outline-none transition-colors select-text ${
                      selectedCellMeta.locked
                        ? 'bg-[#EAF1ED] text-[#5A7D6F] border-[#D2E4DB] cursor-not-allowed'
                        : 'bg-white text-[#102A22] border-[#B4D8C7] focus:border-[#1B4D3E] focus:ring-2 focus:ring-[#2E7D5B]/20'
                    }`}
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  />
                </div>
              </div>

              {/* Spreadsheet Grid Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse table-fixed min-w-[780px]">
                  <thead>
                    <tr className="bg-[#EAF1ED] border-b border-[#C5DDD1]">
                      <th className="w-10 py-1.5 border-r border-[#C5DDD1] text-[11px] font-mono text-[#47695B] text-center bg-[#DFECE5]">
                        #
                      </th>
                      {COLS.map((col) => {
                        const isActiveCol = selectedCell.startsWith(col);
                        return (
                          <th
                            key={col}
                            className={`py-1.5 border-r border-[#C5DDD1] text-xs font-mono font-semibold text-center transition-colors ${
                              isActiveCol
                                ? 'bg-[#1B4D3E]/15 text-[#143D30] font-bold'
                                : 'text-[#345447]'
                            }`}
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                          >
                            {col}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: NUM_ROWS }, (_, rIdx) => {
                      const rowNum = rIdx + 1;
                      const isActiveRow = parseCellId(selectedCell)?.row === rowNum;

                      return (
                        <tr key={rowNum} className="border-b border-[#E3EEE8]">
                          <td
                            className={`text-center text-[11px] font-mono border-r border-[#C5DDD1] select-none ${
                              isActiveRow
                                ? 'bg-[#1B4D3E]/15 text-[#143D30] font-bold'
                                : 'bg-[#EAF1ED] text-[#47695B]'
                            }`}
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                          >
                            {rowNum}
                          </td>

                          {COLS.map((col) => {
                            const cellId = `${col}${rowNum}`;
                            const cellObj = cells[cellId] || {};
                            const isSelected = selectedCell === cellId;
                            const isInDragRange = isCellInBox(cellId, dragStartCell, dragEndCell);
                            const isMultiRange = dragStartCell && dragEndCell && dragStartCell !== dragEndCell;

                            const isTarget = Boolean(currentChallenge.targets[cellId]);
                            const rawVal = String(cellObj.raw ?? '');
                            const hasFormula = rawVal.trim().startsWith('=');
                            const computedVal = computed[cellId];
                            const cellError = errors[cellId];

                            let cellBg = 'bg-white';
                            let textStyle = 'text-[#102A22] font-normal';

                            if (cellObj.locked) {
                              if (cellObj.style === 'header') {
                                cellBg = 'bg-[#143D30]';
                                textStyle = 'text-white font-semibold text-xs font-sans';
                              } else if (cellObj.style === 'label') {
                                cellBg = 'bg-[#EAF1ED]';
                                textStyle = 'text-[#143D30] font-semibold text-xs font-sans';
                              } else if (cellObj.style === 'label-bold') {
                                cellBg = 'bg-[#D8E9E0]';
                                textStyle = 'text-[#0E2920] font-bold text-xs font-sans';
                              } else if (cellObj.style === 'muted') {
                                cellBg = 'bg-[#F5F9F7]';
                                textStyle = 'text-[#47695B] italic text-[11px] font-sans';
                              } else {
                                cellBg = 'bg-[#F7FAF8]';
                                textStyle = 'text-[#1E3A30]';
                              }
                            } else if (isTarget) {
                              cellBg = 'bg-[#E8F5EE]';
                              textStyle = 'text-[#102A22] font-bold';
                            }

                            const isNumericDisplay =
                              typeof computedVal === 'number' ||
                              cellObj.format === 'currency' ||
                              cellObj.format === 'percent' ||
                              cellObj.format === 'number' ||
                              cellObj.format === 'integer';

                            return (
                              <td
                                key={cellId}
                                onMouseDown={(e) => handleCellMouseDown(cellId, e)}
                                onMouseEnter={() => handleCellMouseEnter(cellId)}
                                onDoubleClick={() => handleCellDoubleClick(cellId)}
                                className={`relative h-8 px-2 border-r border-[#E3EEE8] text-xs transition-colors cursor-cell ${cellBg} ${textStyle} ${
                                  isTarget ? 'border-2 border-dashed border-[#1B4D3E]/80' : ''
                                } ${
                                  isInDragRange && isMultiRange && !isSelected
                                    ? 'bg-[#2E7D5B]/15! ring-1 ring-[#1B4D3E]/50 ring-inset'
                                    : ''
                                } ${
                                  isSelected ? 'ring-2 ring-[#1B4D3E] ring-inset z-10 bg-white!' : ''
                                }`}
                                style={{
                                  backgroundColor:
                                    !isSelected && cellObj.bgColor ? cellObj.bgColor : undefined,
                                  fontWeight: cellObj.bold ? 700 : undefined,
                                  fontFamily:
                                    cellObj.style === 'header' ||
                                    cellObj.style === 'label' ||
                                    cellObj.style === 'label-bold' ||
                                    cellObj.style === 'muted'
                                      ? "'Inter', sans-serif"
                                      : "'JetBrains Mono', monospace"
                                }}
                              >
                                {isTarget && !isSelected && (
                                  <span
                                    className="absolute top-0.5 left-1 text-[9px] font-mono text-[#1B4D3E] opacity-80 pointer-events-none"
                                    title={challengeContent.targetLabels[cellId]}
                                  >
                                    🎯
                                  </span>
                                )}

                                {hasFormula && !isSelected && (
                                  <span
                                    className="absolute top-0.5 right-1 text-[9px] font-mono text-[#1B4D3E] font-bold pointer-events-none"
                                    title={rawVal}
                                  >
                                    fx
                                  </span>
                                )}

                                {isSelected && isEditing && editingSource === 'cell' && !cellObj.locked ? (
                                  <input
                                    ref={cellInputRef}
                                    type="text"
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        commitEdit();
                                        moveSelection(0, 1);
                                        gridContainerRef.current?.focus();
                                      } else if (e.key === 'Tab') {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        commitEdit();
                                        moveSelection(e.shiftKey ? -1 : 1, 0);
                                        gridContainerRef.current?.focus();
                                      } else if (e.key === 'Escape') {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setIsEditing(false);
                                        setEditValue(String(cells[selectedCell]?.raw ?? ''));
                                        gridContainerRef.current?.focus();
                                      }
                                    }}
                                    autoFocus
                                    className="w-full h-full bg-white text-[#102A22] font-mono text-xs focus:outline-none select-text"
                                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                                  />
                                ) : (
                                  <div
                                    className={`w-full truncate ${
                                      cellObj.align === 'center'
                                        ? 'text-center'
                                        : cellObj.align === 'left'
                                        ? 'text-left'
                                        : cellObj.align === 'right'
                                        ? 'text-right'
                                        : isNumericDisplay && !(isSelected && isEditing)
                                        ? 'text-right'
                                        : 'text-left'
                                    } ${cellError ? 'text-red-600 font-bold text-center' : ''}`}
                                  >
                                    {isSelected && isEditing
                                      ? editValue
                                      : formatCellValue(computedVal, cellObj.format)}
                                  </div>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="bg-[#F4F8F6] border-t border-[#D2E4DB] px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs text-[#345447]">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-[#E3EEE8] border border-[#B4D8C7] inline-block" />
                    {t.legendData}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-[#E8F5EE] border-2 border-dashed border-[#1B4D3E] inline-block" />
                    {t.legendTarget}
                  </span>
                </div>

                <div className="flex items-center gap-2 font-mono text-[11px]">
                  {Object.entries(currentChallenge.targets).map(([tid, meta]) => {
                    const rawStr = String(cells[tid]?.raw ?? '').trim();
                    const hasFormula = rawStr.startsWith('=');
                    const val = Number(computed[tid]);
                    const tol = meta.tolerance ?? 0.01;
                    const isCorrect =
                      hasFormula && !isNaN(val) && Math.abs(val - meta.expected) <= tol;
                    return (
                      <button
                        key={tid}
                        onClick={() => {
                          setSelectedCell(tid);
                          setDragStartCell(tid);
                          setDragEndCell(tid);
                        }}
                        className={`px-2 py-0.5 rounded-md border transition-colors flex items-center gap-1 cursor-pointer ${
                          isCorrect
                            ? 'bg-[#D8EFE4] border-[#2E7D5B] text-[#143D30] font-semibold'
                            : 'bg-white border-[#D2E4DB] text-[#345447]'
                        }`}
                      >
                        <span>{tid}</span>
                        {isCorrect ? (
                          <Check className="w-3 h-3 text-[#1B4D3E]" />
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#B4D8C7]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* ===================================================================
          3. ANIMATED ALPINE-GREEN RESULT MODAL (CONFETTI + COUNT-UP + GAUSS)
         =================================================================== */}
      {showResultModal && resultMetrics && (
        <div className="fixed inset-0 z-50 bg-[#0E2920]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative bg-white border border-[#B4D8C7] rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden animate-modal-pop">
            {/* Celebration Confetti Particles */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-40 overflow-hidden z-20">
              {CONFETTI_PIECES.map((p) => (
                <span
                  key={p.id}
                  className="absolute top-0 rounded-xs animate-confetti"
                  style={{
                    left: p.left,
                    width: `${p.size}px`,
                    height: `${p.size * 1.4}px`,
                    backgroundColor: p.color,
                    animationDelay: p.delay,
                    animationDuration: p.duration,
                    transform: `rotate(${p.rotate}deg)`
                  }}
                />
              ))}
            </div>

            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#12352A] to-[#1B4D3E] text-white px-6 py-4 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#2E7D5B] flex items-center justify-center shadow-inner border border-emerald-300/30 animate-bounce">
                  <Trophy className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <h2 className="text-base font-bold">
                    {isDailyMode ? t.modalDailyDone : t.modalPracticeDone}
                  </h2>
                  <p className="text-xs text-emerald-100/80">
                    {t.modalSubtitle} — {challengeContent.title}
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-[#2E7D5B]/50 text-emerald-100 border border-emerald-300/40">
                {t.modalBadge}
              </span>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 relative z-10">
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#F4F8F6] border border-[#D2E4DB] rounded-xl p-3 text-center">
                  <span className="text-[11px] uppercase tracking-wider text-[#47695B] font-semibold block">
                    {t.kpiTime}
                  </span>
                  <span
                    className="text-xl font-bold text-[#102A22] mt-0.5 block"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {resultMetrics.formattedTime}
                  </span>
                </div>

                <div className="bg-[#E8F5EE] border border-[#9FD0B9] rounded-xl p-3 text-center shadow-2xs">
                  <span className="text-[11px] uppercase tracking-wider text-[#143D30] font-semibold block">
                    {t.kpiTop}
                  </span>
                  <span
                    className="text-xl font-bold text-[#1B4D3E] mt-0.5 block"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    Top {animatedPct}%
                  </span>
                </div>

                <div className="bg-[#F4F8F6] border border-[#D2E4DB] rounded-xl p-3 text-center">
                  <span className="text-[11px] uppercase tracking-wider text-[#47695B] font-semibold block">
                    {t.kpiBeat}
                  </span>
                  <span
                    className="text-xl font-bold text-[#102A22] mt-0.5 block"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {animatedBeat}%
                  </span>
                </div>
              </div>

              <div className="bg-[#143D30] text-emerald-50 rounded-xl px-4 py-3 flex items-center justify-between text-xs shadow-xs">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>
                    {t.bannerPrefix} <strong>Top {resultMetrics.topPercentile}%</strong>{' '}
                    {t.bannerMiddle} <strong>{resultMetrics.beatenPercent}%</strong>{' '}
                    {t.bannerSuffix}
                  </span>
                </div>
                <span className="font-mono text-[10px] bg-[#1E5443] text-emerald-200 px-2 py-0.5 rounded border border-emerald-400/30 shrink-0">
                  {resultMetrics.formulasCount} {t.fxValidated}
                </span>
              </div>

              <GaussianCurveSVG
                userSeconds={resultMetrics.elapsedSec}
                mean={resultMetrics.mean}
                stdDev={resultMetrics.stdDev}
                t={t}
              />

              <div className="bg-[#F4F8F6] border border-[#D2E4DB] rounded-lg p-3 flex items-center justify-between gap-3">
                <code
                  className="text-xs text-[#143D30] truncate"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  📊 CellSprint {currentChallenge.caseNumber} | ⏱️{' '}
                  {resultMetrics.formattedTime} | 🏆 Top{' '}
                  {Math.max(1, Math.round(Number(resultMetrics.topPercentile)))}% ({resultMetrics.beatenPercent}%)
                </code>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <button
                  onClick={() => setShowResultModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#B4D8C7] text-[#143D30] hover:bg-[#F4F8F6] text-xs font-semibold transition-colors cursor-pointer"
                >
                  {t.reviewSheetBtn}
                </button>

                <div className="flex items-center gap-2.5">
                  {challengeIdx < CHALLENGES.length - 1 ? (
                    <button
                      onClick={() => loadChallenge(challengeIdx + 1)}
                      className="px-4 py-2.5 rounded-xl border border-[#143D30] bg-[#143D30] hover:bg-[#0E2920] text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      {t.goToNext} {getChallengeContent(CHALLENGES[challengeIdx + 1].id, lang).shortTab} →
                    </button>
                  ) : (
                    <button
                      onClick={() => loadChallenge(0)}
                      className="px-4 py-2.5 rounded-xl border border-[#143D30] bg-[#143D30] hover:bg-[#0E2920] text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      {t.backToDaily}
                    </button>
                  )}

                  <button
                    onClick={handleCopyShare}
                    className="px-4 py-2.5 rounded-xl bg-[#2E7D5B] hover:bg-[#246A53] text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                  >
                    {copiedShare ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>{t.copied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>{t.copyResult}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          4. MODAL DE CONEXIÓN EN VIVO, ROTACIÓN DIARIA Y COMPARTIR ENLACE
         =================================================================== */}
      {showDeployModal && (
        <div className="fixed inset-0 z-50 bg-[#0E2920]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#B4D8C7] rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden animate-modal-pop">
            <div className="bg-gradient-to-r from-[#12352A] to-[#1B4D3E] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Rocket className="w-5 h-5 text-emerald-300" />
                <div>
                  <h2 className="text-base font-bold">Motor Diario & Estadísticas en Vivo</h2>
                  <p className="text-xs text-emerald-100/80">
                    Rotación automática por fecha ({activeDateStr}) · Caso {currentChallenge.caseNumber}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDeployModal(false)}
                className="text-xs bg-[#0E2920]/60 hover:bg-[#0E2920] px-2.5 py-1 rounded-lg border border-emerald-300/30 cursor-pointer"
              >
                {t.closeBtn}
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-700">
              <div className="bg-[#F4F8F6] border border-[#D2E4DB] rounded-xl p-3.5 space-y-1.5">
                <div className="flex items-center justify-between font-semibold text-[#143D30]">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#1B4D3E]" />
                    Muestra activa hoy ({activeDateStr})
                  </span>
                  <span className="font-mono text-sm">{liveStats.totalPlayers} jugadores</span>
                </div>
                <p className="text-slate-600">
                  Media actual: <strong className="font-mono">{liveStats.mean}s</strong> | Desviación: <strong className="font-mono">±{liveStats.stdDev}s</strong>. Cada vez que un jugador completa el reto, su tiempo actualiza la curva de Gauss.
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-[#143D30]">
                  ¿Cómo probar ahora mismo el cambio automático de día?
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Usa las flechas <strong>◀ / ▶</strong> junto a la fecha en la barra superior para viajar a días anteriores o volver al día de hoy: verás cómo cambian automáticamente el número de caso, las cifras de la tabla y los objetivos esperados.
                </p>
              </div>

              <div className="bg-[#0E2920] text-emerald-100 rounded-xl p-3.5 font-mono text-[11px] space-y-1">
                <p className="text-emerald-300 font-bold">// Pack de Producción Next.js + Supabase incluido</p>
                <p>1. Despliega el archivo ZIP en Vercel (enlace público + SEO).</p>
                <p>2. Ejecuta supabase/schema.sql en tu proyecto de Supabase.</p>
                <p>3. Añade NEXT_PUBLIC_SUPABASE_URL y ANON_KEY en Vercel.</p>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  onClick={() => setShowDeployModal(false)}
                  className="px-5 py-2 rounded-xl bg-[#1B4D3E] hover:bg-[#143D30] text-white font-semibold cursor-pointer"
                >
                  Entendido
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}