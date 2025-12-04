const shareButtons = document.querySelectorAll('.share-button');
const profileWrapper = document.querySelector('.profile-wrapper');
const sharePopup = document.querySelector('.share-popup');

shareButtons.forEach(button => {
    button.addEventListener('click', () => {
        
        profileWrapper.classList.toggle('hidden');
        sharePopup.classList.toggle('hidden');
        // Toggle active state on all share buttons
        shareButtons.forEach(btn => btn.classList.toggle('active'));
    });
});