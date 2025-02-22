document.addEventListener('DOMContentLoaded', () => {
    // Custom cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    let isHovering = false;

    // Mouse movement for cursor
    document.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows cursor exactly
        gsap.to(cursorDot, {
            x: posX,
            y: posY,
            duration: 0,
        });

        // Outline follows with slight delay
        gsap.to(cursorOutline, {
            x: posX - 15,
            y: posY - 15,
            duration: 0.15,
        });
    });

    // Project hover effects
    const projects = document.querySelectorAll('.project-item');
    
    projects.forEach(project => {
        const projectImage = project.querySelector('img');
        const projectInfo = project.querySelector('.project-info');

        // Initial setup
        gsap.set(projectInfo, {
            y: 30,
            opacity: 0
        });

        // Mouse enter
        project.addEventListener('mouseenter', () => {
            gsap.to(cursorOutline, {
                scale: 1.5,
                duration: 0.3
            });
            
            gsap.to(projectInfo, {
                y: 0,
                opacity: 1,
                duration: 0.4,
                ease: 'power2.out'
            });
        });

        // Mouse move
        project.addEventListener('mousemove', (e) => {
            const rect = project.getBoundingClientRect();
            const mouseX = (e.clientX - rect.left) / rect.width;
            const mouseY = (e.clientY - rect.top) / rect.height;

            gsap.to(projectImage, {
                duration: 0.6,
                x: (mouseX - 0.5) * 30,
                y: (mouseY - 0.5) * 30,
                rotateX: (mouseY - 0.5) * 10,
                rotateY: (mouseX - 0.5) * 10,
                ease: 'power2.out'
            });
        });

        // Mouse leave
        project.addEventListener('mouseleave', () => {
            gsap.to(cursorOutline, {
                scale: 1,
                duration: 0.3
            });

            gsap.to(projectInfo, {
                y: 30,
                opacity: 0,
                duration: 0.4,
                ease: 'power2.in'
            });

            gsap.to(projectImage, {
                duration: 0.6,
                x: 0,
                y: 0,
                rotateX: 0,
                rotateY: 0,
                ease: 'power2.out'
            });
        });
    });

    // Initial page load animations
    const textReveal = gsap.timeline({
        defaults: { ease: 'power3.out' }
    });

    textReveal.from('.text-reveal', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2
    }).from('.project-item', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15
    }, '-=0.8');

    // Hover effects for navigation elements
    const navElements = document.querySelectorAll('.navbar-brand, .nav-contact, .menu-toggle');
    
    navElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            gsap.to(cursorOutline, {
                scale: 1.5,
                duration: 0.3
            });
        });

        element.addEventListener('mouseleave', () => {
            gsap.to(cursorOutline, {
                scale: 1,
                duration: 0.3
            });
        });
    });

    // Add this to your existing DOMContentLoaded event listener
    const videoModal = document.querySelector('.video-modal');
    const closeVideo = document.querySelector('.close-video');

    // Add a button or trigger to open the video (for example, in your navbar)
    const openVideo = document.createElement('button');
    openVideo.classList.add('video-trigger');
    openVideo.textContent = 'Showreel';
    document.querySelector('.nav-right').insertBefore(openVideo, document.querySelector('.nav-contact'));

    // Open video modal
    openVideo.addEventListener('click', () => {
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close video modal
    closeVideo.addEventListener('click', () => {
        videoModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close on background click
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            videoModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Add this CSS for the video trigger button
    const style = document.createElement('style');
    style.textContent = `
        .video-trigger {
            background: none;
            border: none;
            color: var(--color-grey);
            font-family: var(--font-primary);
            font-size: 1rem;
            padding: 0;
            transition: color 0.3s ease;
        }
        
        .video-trigger:hover {
            color: var(--color-text);
        }
    `;
    document.head.appendChild(style);
});