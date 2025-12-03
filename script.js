const shareButton = document.querySelector('.share-button')
const profileSection = document.querySelector('.profile-section')
const sharePopup = document.querySelector('.share-popup')

shareButton.addEventListener('click', () => {
    shareButton.classList.toggle('active');
    sharePopup.classList.toggle('hidden');
    profileSection.classList.toggle('hidden');
})

