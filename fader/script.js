document.addEventListener('DOMContentLoaded', () => {
    const faderSvg = document.getElementById('fader-svg');
    const valueInput = document.getElementById('value-input');
    const faderContainer = document.getElementById('fader-container');
    const faderHeight = faderSvg.clientHeight;
    const containerHeight = faderContainer.clientHeight;

    let isDragging = false;
    let startY;
    let startTop;

    faderSvg.addEventListener('mousedown', (e) => {
        isDragging = true;
        startY = e.clientY;
        startTop = faderSvg.offsetTop;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
        if (!isDragging) return;

        let deltaY = e.clientY - startY;
        let newTop = startTop + deltaY;
        newTop = Math.max(0, Math.min(newTop, containerHeight - faderHeight));

        faderSvg.style.top = newTop + 'px';

        let percentage = ((containerHeight - faderHeight - newTop) / (containerHeight - faderHeight)) * 100;
        valueInput.value = Math.round(percentage);
    }

    function onMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    valueInput.addEventListener('input', () => {
        let value = parseInt(valueInput.value);
        value = Math.max(0, Math.min(value, 100));
        valueInput.value = value;

        let newTop = (1 - value / 100) * (containerHeight - faderHeight);
        faderSvg.style.top = newTop + 'px';
    });
});
