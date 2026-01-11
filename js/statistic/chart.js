// ------------------------------------------------------------------
//  Konfiguration der Charts-Komponente
// ------------------------------------------------------------------
const urlParams = new URLSearchParams(window.location.search);

// Y1/Y2 vom url
const y1 = urlParams.get('y1') || 'pm2_5';
const y2 = urlParams.get('y2');

// Y Achses aufbauen
const yAxes = y2 ? [y1, y2] : [y1];

// Chart Achsen
const chart_options = {
  showWhenNoData: true,
  xAxisAttrName: 'ts',
  yAxisAttrNames: yAxes,
  plugins: new Map([
    ['Linechart', { id: 'Linechart', active: true }]
  ])
};

// Farben
const collection = urlParams.get('data_collection') || '';

chart_options.sourceColors = {
  pm2_5:  '#00A3FF',
  pm10_0: '#FF2E2E',
  temp1:  '#00C853',

  [`${collection}_pm2_5`]:  '#00A3FF',
  [`${collection}_pm10_0`]: '#FF2E2E',
  [`${collection}_temp1`]:  '#00C853'
};

chart_options.attrColors = chart_options.sourceColors;

window.chart_options = chart_options;