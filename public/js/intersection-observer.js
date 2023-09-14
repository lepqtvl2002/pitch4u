// Create an Intersection Observer
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            console.log(entry);
            // Section is in the viewport, remove the "hidden" class
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('blur', '-translate-x-full');
            // Stop observing once the section is shown (optional)
            // observer.unobserve(entry.target);
        } else {
            entry.target.classList.remove('opacity-100');
        }
    });
});

// Specify the target section to observe
const targetSections = document.getElementsByTagName('section');
for (let i = 0; i < targetSections.length; i++) {
    observer.observe(targetSections.item(i))
}
// Specify the target image to observe
const hiddenImages = document.querySelectorAll('.hidden-image');
for (let i = 0; i < hiddenImages.length; i++) {
    observer.observe(hiddenImages.item(i))
}
