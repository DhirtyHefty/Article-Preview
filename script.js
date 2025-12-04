const shareButtons = document.querySelectorAll('.share-button');
const profileWrapper = document.querySelector('.profile-wrapper');
const sharePopup = document.querySelector('.share-popup');

shareButtons.forEach(button => {
    button.addEventListener('click', () => {
        //on mobile
        if (window.innerWidth < 1024) {
            profileWrapper.classList.toggle('hidden');
        }

        sharePopup.classList.toggle('hidden');
        //toggle active state for share button
        shareButtons.forEach(btn => {
            btn.classList.toggle('active');
        });
    });
            
});