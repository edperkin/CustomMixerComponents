document.addEventListener('DOMContentLoaded', () => {
    const knob = document.getElementById('knob');
    const knobSvg = document.getElementById('knob-svg');
    const valueInput = document.getElementById('value-input');
    let value = 0;
    let isDragging = false;
    let startX, startY;

    knob.addEventListener('mousedown', (event) => {
        isDragging = true;
        startX = event.clientX;
        startY = event.clientY;
        document.body.style.cursor = 'pointer';
    });

    document.addEventListener('mousemove', (event) => {
        if (isDragging) {
            const dx = event.clientX - startX;
            const dy = event.clientY - startY;

            let deltaValue = Math.floor((Math.abs(dx) + Math.abs(dy)) / 10);

            if (dx > 0 && dy < 0) {
                value = Math.min(100, value + deltaValue);
            } else if (dx < 0 && dy > 0) {
                value = Math.max(0, value - deltaValue);
            }

            valueInput.value = value;

            knobSvg.style.transform = `rotate(${value * 3}deg)`;

            startX = event.clientX;
            startY = event.clientY;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        document.body.style.cursor = 'default';
    });

    knob.addEventListener('mouseup', () => {
        isDragging = false;
        document.body.style.cursor = 'default';
    });

    valueInput.addEventListener('input', (event) => {
        let newValue = parseInt(event.target.value);
        if (isNaN(newValue)) {
            newValue = 0;
        }
        value = Math.max(0, Math.min(100, newValue));
        knobSvg.style.transform = `rotate(${value * 3}deg)`;
    });
});
