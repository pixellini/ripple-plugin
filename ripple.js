/**
 * @author Jacob Gibellini
 * @date 15/06/2019
 */
(function () {
    // Constants
    const RIPPLE_CLASS = 'ripple';
    const ELEMENT_SIZE_TIME_TOGGLE = 300; //px

    /**
     * @description
     * A container element to hold the ripple element.
     * This is so we don't need to change the styling of the original element width the "ripple" class.
     * For example, the style "overflow" needs to be hidden to prevent the ripple growing outside the boundaries.
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
     * Creates the element that will be the ripple effect.
     */
    function createRippleElement (x, y, time) {
        const element = document.createElement('div');
        element.style.position = 'absolute';
        element.style.borderRadius = '50%';
        element.style.left = x;
        element.style.top = y;
        element.style.transform = 'translate(-50%, -50%)';
        element.style.backgroundColor = '#000';
        element.style.height = 0;
        element.style.width = 0;
        element.style.opacity = 0.2;
        element.style.transition = `all ${ time }s ease`;
        return element;
    }

    /**
     * @description
     * Creates the ripple animation by creating a ripple element.
     * After 30 milliseconds, it will apply new styles to that element 
     * to begin the animation and then remove it once it's done animating.
     */
    function rippleAnimation (element, x, y, size) {
        const time = size > ELEMENT_SIZE_TIME_TOGGLE ? 2 : 1; // seconds

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

        rippleAnimation(
            target,                   // Element
            e.x - target.offsetLeft,  // Ripple X Position
            e.y - target.offsetTop,   // Ripple Y Position
            size                      // Ripple Size
        );
    }

    /**
     * @description
     * Attaching the event listeners to all elements with the class "ripple".
     */
    function attachRippleToElements () {
        const elements = document.getElementsByClassName(RIPPLE_CLASS);

        for(let i = 0; i < elements.length; i++) {
            elements[i].addEventListener('click', onClickHandler);
        }
    }

    // Init
    attachRippleToElements();
})();