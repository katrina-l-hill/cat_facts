export const getData = async () => {
    const container = document.getElementById('data-container');
    console.log('Container:', container);
    try {
        const response = await fetch('https://cat-fact.herokuapp.com/facts');
        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Data received:', data);

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
                console.log('Added fact:', fact.text);
            }
        });
    } catch (error) {
        console.error('Fetch error:', error);
        // Handle error - display message in the container
        const errorDiv = document.createElement('div');
        errorDiv.textContent = "Failed to fetch cat facts.";
        container.appendChild(errorDiv);
    }
};

// Automatically call getData on page load
window.onload = async () => {
    console.log('Page loaded, calling getData');
    await getData();
};
