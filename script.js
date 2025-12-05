document.addEventListener('DOMContentLoaded', () => {
    const profileWrapper = document.querySelector('.profile-wrapper');
    const sharePopup = document.querySelector ('.share-popup');

    //find the inline share button
    const inlineShareButton = profileWrapper.querySelector('.share-button.share-button--inline');
    // button inside the popup
    const popupShareButton = sharePopup.querySelector('.share-button.share-button--popup');

    if (inlineShareButton || !popupShareButton || !sharePopup || !profileWrapper){
        //dont throw error if html structure changes . just stop
        console.warn('incomplete')
        return
    }

    //chech if viewport is mobile
    const isMobileViewport = () => window.innerWidth <1024;

    function openPopup() {
        sharePopup.classList.remove('hidden')
        sharePopup.setAttribute('aria-hidden', 'false')
    }

    function closePopup () {
        sharePopup.classList.add('hidden')
        sharePopup.setAttribute('aria-hidden', 'true')
    }

    function activeButton(btn) {
        btn.classList.add('active')
        btn.setAttribute('aria-expanded', 'true');
    }

    function deactivateButton(btn) {
        btn.classList.remove('active')
        btn.setAttribute('aria-expanded', 'false');
    }

    //main click handler for inline button and popup button
    function handleInlineShareClick() {
        if(isMobileViewport()) {
            //hide wrapper and show popup
            profileWrapper.classList.toggle('hidden');

            const popupIsHidden = sharePopup.classList.contains('hidden');
            if (popupIsHidden) {
                openPopup();
            }else {
                closePopup();
                deactivateButton(inlineShareButton);
            }
        }else {
            //desktp: inline button should act as open popup control
            // open popup on desktop and set active on popup control
            const popupIsHidden = sharePopup.classList.contains('hidden');
            if(popupIsHidden) {
                openPopup();
                activeButton(popupShareButton);
            } else {
                closePopup();
                deactivateButton(popupShareButton);
            }
        }
    }

    function handlePopupButtonClick() {
        //popup button acts as close button on mobuile adnd is hidden on desktop
        const popupIsHidden = sharePopup.classList.contains('hidden');
        if(popupIsHidden) {
            openPopup();
            activeButton(popupShareButton);
        } else {
            closePopup();
            deactivateButton(popupShareButton);
            // ensure inline button is deactivated and profile visible
            deactivateButton(inlineShareButton);
            profileWrapper.classList.remove('hidden')
        }
    }
    inlineShareButton.addEventListener('click', handleInlineShareClick);
    popupShareButton.addEventListener('click', handleInlineShareClick);

    //close popup when user clicks outsdie it
    document.addEventListener('click', (e) => {
        //if popup is open and click target is not inside popup or inline button. close it
        const popupOpen = !sharePopup.classList.contains('hidden');
        if (!popupOpen) return;

        const clickInsidePopup = sharePopup.contains(e.target);
        const clickedInlineButton = inlineShareButton.contains(e.target);
        if (!clickedInlineButton && !clickedInlineButton) {
            closePopup();
            deactivateButton(inlineShareButton);
            deactivateButton(popupShareButton)
            // make sure profile wrapper is visible on mobile after outside click
            profileWrapper.classList.remove('hidden');
        }
    });

    //suync ui when resizing to avoid conflicting states
    let lastIsMobile = isMobileViewport();

    function syncUIOnResize () {
        const nowIsMobile = isMobileViewport();
        //only act when crossing(desktop <-> mobile)
        if(nowIsMobile !== lastIsMobile) {
            if(nowIsMobile){
            // entring mobile: ensure popup is hiddena dn profile wrapper is visible(by default)
            closePopup();
            deactivateButton(popupShareButton);
            deactivateButton(inlineShareButton);
            profileWrapper.classList.remove('hidden');
        } else {
                //entring desktop: ensure profile wrapper is visible and popup closed 
                closePopup();
                deactivateButton(inlineShareButton);
                deactivateButton(popupShareButton);
                profileWrapper.classList.remove('hidden');
            }
        }
    lastIsMobile = nowIsMobile;
    }
    Window.addEventListener('resize', syncUIOnResize)
    //call once to establish correct initial state
    syncUIOnResize();
})
