(function () {
    // Constants
    const RIPPLE_CLASS = 'ripple';

    const rippleElement = ({ x, y, time }) => {
        const element = document.createElement('div');
        element.style.position = 'absolute';
        element.style.borderRadius = '50%';
        element.style.left = x;
        element.style.top = y;
        element.style.transform = 'translate(-50%, -50%)';
        element.style.transformOrigin = 'center center';
        element.style.backgroundColor = '#000';
        element.style.height = 0;
        element.style.width = 0;
        element.style.opacity = 0.2;
        element.style.transition = `all ${ time }s ease`;
        return element;
    }

    const createRippleAnimation = (element, x, y, size) => {
        const time = size >= 300 ? 2 : 1;
        const fullSize = size * 2;
        const ripple = rippleElement({ x, y, time });

        element.appendChild(ripple); 

        // Add the styles to cause the ripple effect.
        setTimeout(() => {
            ripple.style.height = fullSize;
            ripple.style.width = fullSize;
            ripple.style.opacity = 0;
        }, 30)

        // Delete the node from the DOM.
        setTimeout(() => {
            element.removeChild(ripple);
        }, time * 1000)
    }

    const onClickHandler = e => {
        const target = e.target.parentElement.classList.contains(RIPPLE_CLASS) ? e.target.parentElement : e.target;
        const { offsetLeft, offsetTop, offsetWidth: width, offsetHeight: height } = target;
        const { x, y } = e;
        const size = height > width ? height : width;

        createRippleAnimation(target, x - offsetLeft, y - offsetTop, size);
    }

    const attachRippleToElements = () => {
        const elements = document.getElementsByClassName(RIPPLE_CLASS);

        for(var i = 0; i < elements.length; i++) {
            elements[i].style.overflow = 'hidden';
            elements[i].addEventListener('click', onClickHandler);
        }
    }

    attachRippleToElements();
})();