// Theme Toggle
function toggleTheme() {
    var h = document.documentElement;
    var n = h.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    h.setAttribute('data-theme', n);
    localStorage.setItem('pib-theme', n);
}

(function () {
    var s = localStorage.getItem('pib-theme');
    if (s) document.documentElement.setAttribute('data-theme', s);
})();

// Toggle Topic Card
function toggleCard(header) {
    var card = header.closest('.topic-card');
    var content = card.querySelector('.topic-content');
    if (card.classList.contains('open')) {
        content.style.maxHeight = null;
        card.classList.remove('open');
        card.querySelectorAll('.subtopic.open').forEach(function (sub) {
            sub.classList.remove('open');
            sub.querySelector('.subtopic-content').style.maxHeight = null;
        });
    } else {
        content.style.maxHeight = 'none';
        card.classList.add('open');
    }
}

// Toggle Subtopic
function toggleSubtopic(header) {
    var sub = header.closest('.subtopic');
    var content = sub.querySelector('.subtopic-content');
    if (sub.classList.contains('open')) {
        content.style.maxHeight = null;
        sub.classList.remove('open');
    } else {
        content.style.maxHeight = content.scrollHeight + 'px';
        sub.classList.add('open');
    }
    var parent = sub.closest('.topic-content');
    if (parent) {
        setTimeout(function () {
            parent.style.maxHeight = 'none';
        }, 10);
    }
}

// Expand / Collapse All
var allExpanded = false;
function toggleAll() {
    var cards = document.querySelectorAll('.topic-card');
    var btn = document.getElementById('expandAllBtn');
    allExpanded = !allExpanded;
    cards.forEach(function (card) {
        var content = card.querySelector('.topic-content');
        if (allExpanded) {
            card.classList.add('open');
            content.style.maxHeight = 'none';
        } else {
            card.classList.remove('open');
            content.style.maxHeight = null;
            card.querySelectorAll('.subtopic.open').forEach(function (sub) {
                sub.classList.remove('open');
                sub.querySelector('.subtopic-content').style.maxHeight = null;
            });
        }
    });
    btn.textContent = allExpanded ? 'Collapse All' : 'Expand All';
}

// Year Switcher (for index.html)
function switchYear(year) {
    document.querySelectorAll('.year-panel').forEach(function (p) {
        p.classList.remove('visible');
    });
    document.querySelectorAll('.year-btn').forEach(function (b) {
        b.classList.remove('active');
    });
    document.getElementById('year-' + year).classList.add('visible');
    event.target.classList.add('active');
}

// Search Topics
function searchTopics() {
    var query = document.getElementById('searchInput').value.toLowerCase().trim();
    document.querySelectorAll('.topic-card').forEach(function (card) {
        var text = card.textContent.toLowerCase();
        card.style.display = (query === '' || text.includes(query)) ? '' : 'none';
    });
}