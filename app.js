if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;
  
        do {
            if (el.matches(s)) 
                return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}

/**
 * @author Jacob Gibellini
 * @date 15/06/2019
 */
(function () {
    // Constants
    const RIPPLE_CLASS = 'ripple';

    /**
     * @description
     * A container element to hold the ripple element.
     * This is so we don't need to change the styling of the selected element.
     * For example, the overflow need to be hidden.
     */
    function createContainerElement () {
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.top = 0;
        container.style.left = 0;
        container.style.height = '100%';
        container.style.width = '100%';
        container.style.overflow = 'hidden';
        return container;
    }

    /**
     * @description
     * Created the element that will be the ripple effect.
     * It will initially start at 0 height and width.
     */
    function createRippleElement (x, y, time) {
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

    /**
     * @description
     * Created the ripple animation by creating an element.
     * After 30 milliseconds, it will apply new styles to that element
     * and then remove it once it's done animating.
     */
    function rippleAnimation (element, x, y, size) {
        const time = size > 300 ? 2 : 1;

        const container = createContainerElement();
        const ripple = createRippleElement(x, y, time);

        element.appendChild(container); 
        container.appendChild(ripple);

        // Add the styles to cause the ripple effect.
        setTimeout(function () {
            const newSize = size * 2;
            ripple.style.height = newSize;
            ripple.style.width = newSize;
            ripple.style.opacity = 0;
        }, 30)

        // Delete the node from the DOM.
        setTimeout(function () {
            element.removeChild(container);
        }, time * 1000)
    }

    /**
     * @description
     * The on click handler for starting the ripple effect.
     */
    function onClickHandler (e) {
        let target = e.target;
        // If the user clicked the currently animating ripple or container, select the parent element.
        while (!target.classList.contains(RIPPLE_CLASS)) {
            target = target.parentElement;
        }

        const width = target.offsetWidth;
        const height = target.offsetHeight;
        const size = height > width ? height : width;

        rippleAnimation(target, e.x - target.offsetLeft, e.y - target.offsetTop, size);
    }

    /**
     * @description
     * Attaching the event listeners to all elements with the class "ripple".
     */
    function attachRippleToElements () {
        const elements = document.getElementsByClassName(RIPPLE_CLASS);

        for(var i = 0; i < elements.length; i++) {
            elements[i].addEventListener('click', onClickHandler);
        }
    }

    // Init
    attachRippleToElements();
})();