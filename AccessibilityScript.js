const themeToggle = document.getElementById('theme-toggle');
        const contrastToggle = document.getElementById('contrast-toggle');
        const body = document.body;

        themeToggle.addEventListener('click', function() {
            if (body.classList.contains('dark-theme')) {
                body.classList.remove('dark-theme');
                themeToggle.textContent = 'Dark Theme';
                updateCaretPattern('light');
                localStorage.setItem('theme', 'light');
            } else {
                body.classList.add('dark-theme');
                body.classList.remove('high-contrast');
                contrastToggle.textContent = 'High Contrast';
                themeToggle.textContent = 'Light Theme';
                updateCaretPattern('dark');
                localStorage.setItem('theme', 'dark');
            }
        });

        contrastToggle.addEventListener('click', function() {
            if (body.classList.contains('high-contrast')) {
                body.classList.remove('high-contrast');
                contrastToggle.textContent = 'High Contrast';
                if (body.classList.contains('dark-theme')) {
                    updateCaretPattern('dark');
                } else {
                    updateCaretPattern('light');
                }
            } else {
                body.classList.add('high-contrast');
                body.classList.remove('dark-theme');
                themeToggle.textContent = 'Dark Theme';
                contrastToggle.textContent = 'Normal Contrast';
                updateCaretPattern('high-contrast');
            }
        });

        function updateCaretPattern(theme) {
            let color1, color2;
            
            if (theme === 'dark' || theme === 'high-contrast') {
                color1 = 'white';
                color2 = 'orange';
            } else {
                color1 = 'black';
                color2 = 'orange';
            }
            
            const svgPattern = `
                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
                    <text x="50" y="100" font-size="50" fill="${color1}">^</text>
                    <text x="38" y="100" font-size="50" fill="${color1}">.</text>
                    <text x="15" y="100" font-size="50" fill="${color2}">^</text>
                </svg>
            `;
            const svgBase64 = btoa(svgPattern);
            const dataUrl = `url("data:image/svg+xml;base64,${svgBase64}")`;
            
            document.body.style.backgroundImage = dataUrl;
            document.body.style.backgroundSize = '200px 200px';
            document.body.style.backgroundRepeat = 'repeat';
            document.body.style.backgroundPosition = '0 0';
        }

        function changeFontSize(direction) {
            const htmlEl = document.documentElement;
            const currentSizeRem = parseFloat(getComputedStyle(htmlEl).fontSize) / 16; // Get current size in rem
            let newSizeRem;

            if (direction === 'increase') {
                newSizeRem = currentSizeRem * 1.05; // Increase by 5%
            } else if (direction === 'decrease') {
                newSizeRem = currentSizeRem / 1.05; // Decrease by dividing by 1.05
            }

            const maxSizeRem = 2.5;
            const minSizeRem = 0.7;
            if (newSizeRem > maxSizeRem) newSizeRem = maxSizeRem;
            if (newSizeRem < minSizeRem) newSizeRem = minSizeRem;

            if (newSizeRem) {
                htmlEl.style.fontSize = newSizeRem + 'rem';
            }
        }

        const increaseBtn = document.getElementById('increase-font');
        const decreaseBtn = document.getElementById('decrease-font');

        if (increaseBtn) {
            increaseBtn.addEventListener('click', () => changeFontSize('increase'));
        }
        if (decreaseBtn) {
            decreaseBtn.addEventListener('click', () => changeFontSize('decrease'));
        }

        document.addEventListener('DOMContentLoaded', function() {
            body.classList.add('dark-theme');
            themeToggle.textContent = 'Light Theme';
            updateCaretPattern('dark');
        });

        body.classList.add('dark-theme');
        themeToggle.textContent = 'Light Theme';
        updateCaretPattern('dark');