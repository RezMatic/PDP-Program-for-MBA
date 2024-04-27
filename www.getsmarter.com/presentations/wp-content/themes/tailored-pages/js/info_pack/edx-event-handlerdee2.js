window.addEventListener('DOMContentLoaded', () => {
    const searchParams = new URLSearchParams(window.location.search);
    // Check if source is edx
    if (searchParams.get('utm_source') === 'edx') {
        onBrochurePageLoadedFromEdX();
    }
});
  
// Create iframe and append to body
function onBrochurePageLoadedFromEdX() {
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.edx.org/event/?ajs_event=edx.bi.lead.form.submitted&ajs_prop_source=executive_education';
    iframe.style.position = 'absolute';
    iframe.style.width = 0;
    iframe.style.height = 0;
    iframe.style.border = 0;
    document.body.appendChild(iframe);
}