//source: https://stackoverflow.com/questions/26667562/how-to-start-animations-when-element-appears-on-screen

const animationStyle = (selector, animationClass, delay) => {
  
    const elements = document.querySelectorAll(selector);
  
    const startAnimation = (entries, observer) => {
      entries.forEach((entry, index) => {
        setTimeout(() => {
          if (entry.isIntersecting){
            entry.target.style.opacity = "1";
            entry.target.classList.toggle(animationClass, entry.isIntersecting);
            observer.unobserve(entry.target);
          }
        }, delay * index);
      });
  };
  
    const options = { root: null, rootMargin: '0px', threshold: 0.3 }; 
    const observer = new IntersectionObserver(startAnimation, options);
  
    elements.forEach(el => {
      el.style.opacity = "0";
      observer.observe(el);
    });
  };
  

animationStyle('.aboutImages', 'swing-animation', 250);
animationStyle('.picture-box', 'fade-in-animation', 500);
animationStyle('.fade-in', 'fade-in-animation', 500);
