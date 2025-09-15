const header = document.getElementById('header');
const nav = document.getElementById('nav');
const themeToggle = document.getElementById('theme-toggle');
const backToTop = document.getElementById('back-to-top');
const modal = document.getElementById('interest-modal');
const tooltip = document.getElementById('tooltip');

// Dynamic greeting
const greetings = [
    "Welcome to my professional journey! 👋",
    "Hello! Let's explore my experience together! 🚀",
    "Hi there! Ready to discover what I can bring to your team? ✨"
];

function displayRandomGreeting() {
    const greetingElement = document.getElementById('dynamic-greeting');
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    greetingElement.textContent = randomGreeting;
}

const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('#nav a');

const observerOptions = {
  root: null,        
  rootMargin: '-150px 0px -60% 0px', 
  threshold: 0       
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const currentSection = entry.target.getAttribute('id');

      navLinks.forEach(link => {
        link.classList.remove('active');
      });

      const activeLink = document.querySelector(`#nav a[data-section="${currentSection}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, observerOptions);

sections.forEach(section => observer.observe(section));

function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('#nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeToggle(savedTheme);
}

function updateThemeToggle(theme) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggle(newTheme);
});

function setupEducationSorting() {
    const sortButton = document.getElementById('sort-gpa');
    const tableBody = document.querySelector('#education-table tbody');
    let sortAscending = false;
    
    sortButton.addEventListener('click', () => {
        const rows = Array.from(tableBody.querySelectorAll('tr'));
        
        rows.sort((a, b) => {
            const gpaA = parseFloat(a.getAttribute('data-gpa'));
            const gpaB = parseFloat(b.getAttribute('data-gpa'));
            
            return sortAscending ? gpaA - gpaB : gpaB - gpaA;
        });
        
        // Clear and re-append sorted rows
        tableBody.innerHTML = '';
        rows.forEach(row => tableBody.appendChild(row));
        
        sortAscending = !sortAscending;
    });
}

// Skills progress animation and filtering
function animateProgressBars() {
    const progressBars = document.querySelectorAll('progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target;
                const targetValue = parseInt(progress.getAttribute('data-target'));
                
                // Animate progress bar
                let currentValue = 0;
                const increment = targetValue / 50;
                
                const animation = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= targetValue) {
                        currentValue = targetValue;
                        clearInterval(animation);
                    }
                    progress.value = currentValue;
                }, 20);
                
                observer.unobserve(progress);
            }
        });
    });
    
    progressBars.forEach(bar => observer.observe(bar));
}

function setupSkillsFilter() {
    const toggleButton = document.getElementById('skill-toggle');
    const skillItems = document.querySelectorAll('.skill-item');
    let currentFilter = 'all';
    
    const filterOptions = ['all', 'beginner', 'intermediate', 'advanced'];
    
    toggleButton.addEventListener('click', () => {
        const currentIndex = filterOptions.indexOf(currentFilter);
        const nextIndex = (currentIndex + 1) % filterOptions.length;
        currentFilter = filterOptions[nextIndex];
        
        skillItems.forEach(item => {
            const skillLevel = item.getAttribute('data-level');
            
            if (currentFilter === 'all' || skillLevel === currentFilter) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
        
        toggleButton.textContent = `Show: ${currentFilter.charAt(0).toUpperCase() + currentFilter.slice(1)} Skills`;
    });
}


function setupProjectsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const technologies = card.getAttribute('data-technologies');
                
                if (filter === 'all' || technologies.includes(filter)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}


function setupInterestsModal() {
    const interestItems = document.querySelectorAll('.interest-item');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close');
    
    const interestDetails = {
        photography: {
            title: "Photography",
            content: `
                <p>I'm passionate about capturing moments and telling stories through photography. My interests include:</p>
                <ul>
                    <li>Landscape and nature photography</li>
                    <li>Street photography and urban exploration</li>
                    <li>Portrait and event photography</li>
                    <li>Digital photo editing and post-processing</li>
                </ul>
                <p>Photography has taught me patience, attention to detail, and the importance of perspective - skills that translate well into my development work.</p>
            `
        },
        hiking: {
            title: "Hiking & Outdoor Adventures",
            content: `
                <p>Hiking is my way of disconnecting from technology and reconnecting with nature. Benefits I've gained:</p>
                <ul>
                    <li>Physical fitness and mental clarity</li>
                    <li>Problem-solving skills on challenging trails</li>
                    <li>Appreciation for environmental conservation</li>
                    <li>Team building through group hiking experiences</li>
                </ul>
                <p>The persistence required for long hikes mirrors the determination needed for complex coding challenges.</p>
            `
        },
        music: {
            title: "Music Production",
            content: `
                <p>Music production combines creativity with technical skills, much like software development:</p>
                <ul>
                    <li>Electronic music composition and arrangement</li>
                    <li>Audio engineering and mixing</li>
                    <li>Live performance and DJ sets</li>
                    <li>Collaboration with other musicians and artists</li>
                </ul>
                <p>The iterative process of music creation - composing, refining, and perfecting - parallels the software development lifecycle.</p>
            `
        }
    };
    
    interestItems.forEach(item => {
        item.addEventListener('click', () => {
            const interest = item.getAttribute('data-interest');
            const details = interestDetails[interest];
            
            if (details) {
                modalTitle.textContent = details.title;
                modalBody.innerHTML = details.content;
                modal.style.display = 'block';
            }
        });
    });
    
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function setupScrollAnimations() {
    const jobEntries = document.querySelectorAll('.job-entry');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animationDelay = `${index * 0.2}s`;
                    entry.target.classList.add('animate');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    jobEntries.forEach(entry => observer.observe(entry));
}

function scrolltoTopFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}



function backToTopButton() {
    backToTop.addEventListener('click', () => scrolltoTopFunction());
}

document.addEventListener('DOMContentLoaded', () => {
    displayRandomGreeting();
    initTheme();
    setupSmoothScrolling();
    setupEducationSorting();
    animateProgressBars();
    setupSkillsFilter();
    setupProjectsFilter();
    setupInterestsModal();
    setupScrollAnimations();
    backToTopButton();
    
    // Initial scroll check
    handleScroll();
});

window.addEventListener('resize', () => {
    tooltip.classList.remove('visible');
});