document.addEventListener('DOMContentLoaded', () => {
    const linkForm = document.getElementById('linkForm');
    const linkList = document.getElementById('linkList');

    linkForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const linkTitle = document.getElementById('linkTitle').value;
        const linkInput = document.getElementById('linkInput').value;

        if (linkTitle && linkInput) {
            const response = await fetch('/links', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: linkTitle, url: linkInput }),
            });

            if (response.ok) {
                const newLink = await response.json();
                addLinkToList(newLink);
                document.getElementById('linkTitle').value = '';
                document.getElementById('linkInput').value = '';
            } else {
                console.error('Error adding link:', response.statusText);
            }
        }
    });

    const addLinkToList = (link) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${link.title}</strong>: <a href="${link.url}" target="_blank">${link.url}</a>`;
        linkList.appendChild(listItem);
    };

    const loadLinks = async () => {
        const response = await fetch('/links');
        if (response.ok) {
            const links = await response.json();
            links.forEach(addLinkToList);
        } else {
            console.error('Error loading links:', response.statusText);
        }
    };

    loadLinks();
});