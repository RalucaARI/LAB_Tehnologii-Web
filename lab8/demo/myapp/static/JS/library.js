// API Card
// API Name: Open Library
// Base URL: https://openlibrary.org
// Endpoint used: /search.json?q=python&limit=10
// HTTP method: GET
// Status code seen: 200
// Fields used: title, author_name, first_publish_year, docs
// Relevance: The API allows students to search for educational books.
async function getJSON(url) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    try {
        const response = await fetch(url, {
            signal: controller.signal
        });
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return await response.json();
    }
    finally {
        clearTimeout(timer);
    }
}
const statusEl = document.getElementById("status");
const resultsEl = document.getElementById("results");
const searchForm = document.getElementById("searchForm");
const queryInput = document.getElementById("queryInput");
const searchBtn = document.getElementById("searchBtn");
const exportBtn = document.getElementById("exportBtn");
let currentBooks = [];
function setStatus(text) {
    statusEl.textContent = text;
}
function createCard(item) {
    const card = document.createElement("div");
    card.className = "card";
    const title = document.createElement("h3");
    title.textContent = item.title;
    const author = document.createElement("p");
    author.textContent = "Autor: " +
        (item.author_name?.join(", ") ?? "Necunoscut");
    const year = document.createElement("p");
    year.textContent = "Anul publicării: " +
        (item.first_publish_year ?? "Necunoscut");
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(year);
    return card;
}
function render(items) {
    resultsEl.replaceChildren();
    currentBooks = items;
    exportBtn.disabled = items.length === 0;
    if (items.length === 0) {
        setStatus("No results found.");
        return;
    }
    items.forEach(item => {
        resultsEl.appendChild(createCard(item));
    });
    setStatus(`Loaded ${items.length} result(s).`);
}
function buildURL(query) {
    const BASE_URL = "https://openlibrary.org/search.json";
    return `${BASE_URL}?q=${encodeURIComponent(query)}&limit=10`;
}
async function search() {
    const query = queryInput.value.trim();
    if (!query) {
        setStatus("Please enter a search term.");
        return;
    }
    if (searchBtn.disabled) {
        return;
    }
    searchBtn.disabled = true;
    exportBtn.disabled = true;
    currentBooks = [];
    setStatus("Loading...");
    resultsEl.replaceChildren();
    try {
        const data = await getJSON(buildURL(query));
        render(data.docs);
        localStorage.setItem("lastQuery", query);
    }
    catch (err) {
        const msg = err instanceof Error
            ? err.message
            : "Unknown error";
        setStatus(`Load failed: ${msg}`);
    }
    finally {
        searchBtn.disabled = false;
    }
}
function csvCell(value) {
    let text = String(value);
    if (/^\s*[=+\-@]/.test(text)) {
        text = "'" + text;
    }
    return '"' + text.replace(/"/g, '""') + '"';
}
function exportCSV() {
    if (currentBooks.length === 0) {
        return;
    }
    const rows = ["Titlu;Autor;Anul publicarii"];
    currentBooks.forEach(book => {
        rows.push([
            csvCell(book.title),
            csvCell(book.author_name?.join(", ") ?? "Necunoscut"),
            csvCell(book.first_publish_year ?? "Necunoscut")
        ].join(";"));
    });
    const blob = new Blob(["\uFEFF" + rows.join("\r\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "carti.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    search();
});
exportBtn.addEventListener("click", exportCSV);
window.addEventListener("DOMContentLoaded", () => {
    const lastQuery = localStorage.getItem("lastQuery");
    if (lastQuery) {
        queryInput.value = lastQuery;
    }
});
export {};
