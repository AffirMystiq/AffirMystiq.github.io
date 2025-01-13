document.addEventListener('DOMContentLoaded', function() {
  const url = new URL(window.location.href);
  const images = ['main.jpeg', 'IMG_f_3313.jpeg', 'IMG_m_0654.jpeg', 'IMG_r_3079.jpeg', 'IMG_s_2913.jpeg', 'IMG_w_1367.jpeg'];
  const options = {
    text: url.searchParams.get('text') ?? '',
    picture: url.searchParams.get('picture') ?? Math.floor(Math.random() * images.length),
    useLightTheme: url.searchParams.get('theme') == 'light'
  };

  const body = document.querySelector('body');
  body.style.backgroundImage = 'url("bg/' + images[options.picture] + '")';

  document.querySelector('main').classList.add('show');

  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.checked = !options.useLightTheme;
  themeToggle.addEventListener('change', function() {
    url.searchParams.set('theme', themeToggle.checked ? 'dark' : 'light');
    history.replaceState(history.state, '', url.href);
  });

  const affirmationText = document.getElementById('affirmation-text');
  const safeText = document.createElement('div');
  safeText.append(document.createTextNode(options.text));
  affirmationText.innerHTML = safeText.innerHTML;
  
  affirmationText.addEventListener('input', function() {
    url.searchParams.set('text', affirmationText.innerText.trim());
    history.replaceState(history.state, '', url.href);
  });

  affirmationText.addEventListener('paste', function(e) {
    e.preventDefault();
    const text = (e.originalEvent || e).clipboardData.getData('text/plain');
    affirmationText.innerText = text;
  });

  affirmationText.addEventListener('click', function() {
    affirmationText.contentEditable = true;
    affirmationText.focus();
  });

  affirmationText.addEventListener('blur', function() {
    affirmationText.innerText = affirmationText.innerText.trim();
    affirmationText.contentEditable = false;
  });

  document.getElementById('btn-download').addEventListener('click', async function() {
    html2canvas(document.body).then(function(canvas) {
      const download = document.createElement('a');
      download.href = canvas.toDataURL('image/jpeg');
      download.download = 'afirmacja.jpeg';
      download.click();
    });
  });

  // Detects if device is on iOS 
  const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test( userAgent );
  }
  // Detects if device is in standalone mode
  const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

  // Checks if should display install popup notification:
  if (isIos() && !isInStandaloneMode()) {
    this.setState({ showInstallMessage: true });
  }
});