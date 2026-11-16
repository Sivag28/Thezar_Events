import Notiflix from 'notiflix';

const navy = '#183b68';
const gold = '#c5a04b';
const cream = '#fff8e9';

Notiflix.Notify.init({
  position: 'right-top',
  distance: '18px',
  timeout: 3600,
  borderRadius: '4px',
  fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
  fontSize: '13px',
  clickToClose: true,
  backOverlay: true,
  backOverlayColor: 'rgba(7, 20, 39, .72)',
  success: { background: navy, textColor: cream, notiflixIconColor: gold, backOverlayColor: 'rgba(7, 20, 39, .72)' },
  failure: { background: '#8f2934', textColor: cream, notiflixIconColor: '#ffd5cc', backOverlayColor: 'rgba(7, 20, 39, .72)' },
  warning: { background: '#9a742d', textColor: cream, notiflixIconColor: '#ffe6a3', backOverlayColor: 'rgba(7, 20, 39, .72)' },
  info: { background: navy, textColor: cream, notiflixIconColor: gold, backOverlayColor: 'rgba(7, 20, 39, .72)' },
});

Notiflix.Report.init({
  width: '360px',
  backgroundColor: cream,
  borderRadius: '8px',
  fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
  titleColor: navy,
  messageColor: '#53647a',
  buttonBackground: navy,
  buttonColor: cream,
  backOverlay: true,
  backOverlayColor: 'rgba(7, 20, 39, .72)',
  plainText: true,
  success: { svgColor: gold, titleColor: navy, messageColor: '#53647a', buttonBackground: navy, buttonColor: cream, backOverlayColor: 'rgba(7, 20, 39, .72)' },
  failure: { svgColor: '#8f2934', titleColor: navy, messageColor: '#53647a', buttonBackground: navy, buttonColor: cream, backOverlayColor: 'rgba(7, 20, 39, .72)' },
  warning: { svgColor: gold, titleColor: navy, messageColor: '#53647a', buttonBackground: navy, buttonColor: cream, backOverlayColor: 'rgba(7, 20, 39, .72)' },
  info: { svgColor: gold, titleColor: navy, messageColor: '#53647a', buttonBackground: navy, buttonColor: cream, backOverlayColor: 'rgba(7, 20, 39, .72)' },
});

Notiflix.Confirm.init({
  width: '360px',
  backgroundColor: cream,
  borderRadius: '8px',
  fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
  titleColor: navy,
  messageColor: '#53647a',
  okButtonBackground: navy,
  okButtonColor: cream,
  cancelButtonBackground: '#e9dfcc',
  cancelButtonColor: navy,
  backOverlay: true,
  backOverlayColor: 'rgba(7, 20, 39, .72)',
});

Notiflix.Loading.init({
  backgroundColor: 'rgba(7, 20, 39, .72)',
  messageColor: cream,
  svgColor: gold,
  fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
});

export { Notiflix };

export async function withLoading(message, operation) {
  Notiflix.Loading.standard(message);
  try {
    return await operation();
  } finally {
    Notiflix.Loading.remove();
  }
}

export function reportError(error, fallback = 'Please try again. If the issue continues, contact the event team.') {
  console.error(error);
  Notiflix.Report.failure('Something went wrong', error instanceof Error ? error.message : fallback, 'Close');
}
