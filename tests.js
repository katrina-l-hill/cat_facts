const { getByText, queryByText } = require('@testing-library/dom');
const fetchMock = require('jest-fetch-mock');

// Enable mock for fetch
fetchMock.enableMocks();

// Set up the HTML structure for testing before each test
beforeEach(() => {
    document.body.innerHTML = `
        <div class="data-container-parent">
            <div id="data-container" class="data-container"></div>
        </div>
    `;
    fetch.resetMocks(); // Reset fetch mocks before each test
});

// Test case 1: Renders cat facts from API
test('renders cat facts from API', async () => {
    fetch.mockResponseOnce(JSON.stringify([
        { text: "Cats sleep 70% of their lives." },
        { text: "A group of cats is called a clowder." },
        { text: "Cats have five toes on their front paws, but only four toes on their back paws." },
    ]));

    await getData();

    expect(getByText("Cats sleep 70% of their lives.")).toBeInTheDocument();
    expect(getByText("A group of cats is called a clowder.")).toBeInTheDocument();
    expect(getByText("Cats have five toes on their front paws, but only four toes on their back paws.")).toBeInTheDocument();
});

// Test case 2: Does not render anything if API returns no data
test('does not render anything if API returns no data', async () => {
    fetch.mockResponseOnce(JSON.stringify([]));

    await getData();

    expect(queryByText("Cats sleep 70% of their lives.")).not.toBeInTheDocument();
});

// Test case 3: Handles fetch error gracefully
test('handles fetch error gracefully', async () => {
    fetch.mockReject(new Error('API failure'));

    await getData();

    expect(queryByText("Cats sleep 70% of their lives.")).not.toBeInTheDocument();
});

// Test case 4: Checks that the correct number of cat facts are displayed
test('displays the correct number of cat facts', async () => {
    fetch.mockResponseOnce(JSON.stringify([
        { text: "Cats are great hunters." },
        { text: "Cats can rotate their ears 180 degrees." },
    ]));

    await getData();

    const items = document.querySelectorAll('.item');
    expect(items.length).toBe(2);
});

// Test case 5: Displays an error message when API fails
test('displays an error message on API failure', async () => {
    fetch.mockReject(new Error('Network Error'));

    await getData();

    // Assuming you have a way to display error messages in your getData function
    expect(queryByText("Failed to fetch cat facts.")).toBeInTheDocument();
});

// Test case 6: Checks if no duplicate facts are displayed
test('does not display duplicate facts', async () => {
    fetch.mockResponseOnce(JSON.stringify([
        { text: "Cats sleep 70% of their lives." },
        { text: "Cats sleep 70% of their lives." }, // Duplicate fact
    ]));

    await getData();

    const items = document.querySelectorAll('.item');
    expect(items.length).toBe(1); // Should only be one unique fact displayed
});
