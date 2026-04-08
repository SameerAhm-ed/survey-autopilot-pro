document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const modeSelect = document.getElementById('modeSelect');
    const typeSelect = document.getElementById('typeSelect');

    startBtn.addEventListener('click', async () => {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const mode = modeSelect.value;
        const answerType = typeSelect.value;

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: (mode, answerType) => {
                if (window.runSurveyBot) {
                    window.runSurveyBot(mode, answerType);
                } else {
                    console.error("Survey bot not found on this page.");
                }
            },
            args: [mode, answerType]
        });
    });
});