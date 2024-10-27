export const getData = async () => {
    const container = document.getElementById('data-container');
    try {
        const response = await fetch('https://cat-fact.herokuapp.com/facts');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Clear previous items
        container.innerHTML = '';
        if (data.length === 0) {
            return; // No data to render
        }
        const uniqueFacts = new Set();
        data.forEach(fact => {
            if (!uniqueFacts.has(fact.text)) {
                uniqueFacts.add(fact.text);
                const div = document.createElement('div');
                div.classList.add('item');
                div.textContent = fact.text;
                container.appendChild(div);
            }
        });
    } catch (error) {
        // Handle error - display message in the container
        const errorDiv = document.createElement('div');
        errorDiv.textContent = "Failed to fetch cat facts.";
        container.appendChild(errorDiv);
    }
};
