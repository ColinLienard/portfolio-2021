let reveal = function() {
    let options = {
        root: null,
        rootMargin: "0px",
        treshold: .1
    };
    
    let handleIntersect = function(entries, observer) {
        entries.forEach(entry => {
            if(entry.intersectionRatio != 0) {
                entry.target.classList.add("reveal-visible");
                observer.unobserve(entry.target);
            }    
        });
    };
    
    let observer = new IntersectionObserver(handleIntersect, options);
    document.querySelectorAll(".reveal").forEach(r => {
        observer.observe(r);
    });
};