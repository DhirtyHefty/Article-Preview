document.addEventListener('DOMContentLoaded', () => {
const profileWrapper = document.querySelector('.profile-wrapper');
const sharePopup = document.querySelector('.share-popup');


// Find the inline share button
const inlineShareButton = profileWrapper.querySelector('.share-button.share-button--inline');
// Button inside the popup
const popupShareButton = sharePopup.querySelector('.share-button.share-button--popup');

// BUG FIX #1: Changed || to && - we need ALL elements to exist
if (!inlineShareButton || !popupShareButton || !sharePopup || !profileWrapper) {
    console.warn('incomplete - missing required elements');
    return;
}

// Check if viewport is mobile
const isMobileViewport = () => window.innerWidth < 1024;

function openPopup() {
    sharePopup.classList.remove('hidden');
    sharePopup.setAttribute('aria-hidden', 'false');
}

function closePopup() {
    sharePopup.classList.add('hidden');
    sharePopup.setAttribute('aria-hidden', 'true');
}

function activateButton(btn) {
    btn.classList.add('active');
    btn.setAttribute('aria-expanded', 'true');
}

function deactivateButton(btn) {
    btn.classList.remove('active');
    btn.setAttribute('aria-expanded', 'false');
}

// Main click handler for inline button
function handleInlineShareClick() {
    if (isMobileViewport()) {
        // Mobile: toggle between profile and popup
        const popupIsHidden = sharePopup.classList.contains('hidden');
        
        if (popupIsHidden) {
            // Show popup, hide profile
            profileWrapper.classList.add('hidden');
            openPopup();
            activateButton(popupShareButton);
        } else {
            // Hide popup, show profile
            closePopup();
            profileWrapper.classList.remove('hidden');
            deactivateButton(popupShareButton);
        }
    } else {
        // Desktop: toggle popup only
        const popupIsHidden = sharePopup.classList.contains('hidden');
        
        if (popupIsHidden) {
            openPopup();
            activateButton(inlineShareButton);
        } else {
            closePopup();
            deactivateButton(inlineShareButton);
        }
    }
}

// Popup button click handler (mobile only - closes popup)
function handlePopupButtonClick() {
    closePopup();
    deactivateButton(popupShareButton);
    profileWrapper.classList.remove('hidden');
}

// BUG FIX #2: Popup button should use its own handler
inlineShareButton.addEventListener('click', handleInlineShareClick);
popupShareButton.addEventListener('click', handlePopupButtonClick);

// Close popup when user clicks outside it
document.addEventListener('click', (e) => {
    const popupOpen = !sharePopup.classList.contains('hidden');
    if (!popupOpen) return;

    const clickInsidePopup = sharePopup.contains(e.target);
    const clickedInlineButton = inlineShareButton.contains(e.target);
    
    // BUG FIX #3: Changed second clickedInlineButton to clickInsidePopup
    if (!clickInsidePopup && !clickedInlineButton) {
        closePopup();
        deactivateButton(inlineShareButton);
        deactivateButton(popupShareButton);
        profileWrapper.classList.remove('hidden');
    }
});

// Sync UI when resizing to avoid conflicting states
let lastIsMobile = isMobileViewport();

function syncUIOnResize() {
    const nowIsMobile = isMobileViewport();
    
    // Only act when crossing breakpoint (desktop <-> mobile)
    if (nowIsMobile !== lastIsMobile) {
        // Reset to default state on breakpoint change
        closePopup();
        deactivateButton(inlineShareButton);
        deactivateButton(popupShareButton);
        profileWrapper.classList.remove('hidden');
    }
    
    lastIsMobile = nowIsMobile;
}

// BUG FIX #4: Changed Window to window (lowercase)
window.addEventListener('resize', syncUIOnResize);

// Call once to establish correct initial state
syncUIOnResize();


});