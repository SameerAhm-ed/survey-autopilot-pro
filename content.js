(function() {

    const TEXTS = [
        "Well structured and easy to follow.",
        "Instructor explained clearly.",
        "Very useful and practical course.",
        "Great learning experience."
    ];

    function randomText() {
        return TEXTS[Math.floor(Math.random() * TEXTS.length)];
    }

    function runSurveyBot(mode = "fast", answerType = "positive") {
        let delay = 1500;
        if (mode === "safe") delay = 2500;
        if (mode === "stealth") delay = 3500;

        const interval = setInterval(() => {
            const questionWrapper = document.querySelector('.js_question-wrapper');
            if (!questionWrapper) return;

            const radios = questionWrapper.querySelectorAll('input[type="radio"]');
            if (radios.length) {
                let pick;
                if (answerType === "random") {
                    pick = radios[Math.floor(Math.random() * radios.length)];
                } else {
                    const good = [...radios].filter(r => r.dataset.selectionKey === "D" || r.dataset.selectionKey === "E");
                    pick = good[Math.floor(Math.random() * good.length)];
                }
                if (pick) pick.closest('label').click();
            }

            const textarea = questionWrapper.querySelector('textarea');
            if (textarea && !textarea.value) {
                textarea.value = randomText();
                textarea.dispatchEvent(new Event('input', { bubbles: true }));
            }

            const btn = document.querySelector('button[type="submit"]');
            if (btn) setTimeout(() => btn.click(), 600);

            if (document.querySelector('.o_survey_finished')) {
                clearInterval(interval);
                console.log("Survey Completed!");
            }
        }, delay);
    }

    window.runSurveyBot = runSurveyBot;

})();