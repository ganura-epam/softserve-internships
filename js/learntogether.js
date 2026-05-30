// Learn Together - Video Learning Platform
// SoftServe Internship Program

document.addEventListener('DOMContentLoaded', function() {

    // Video data structure - 90 curated videos
    const learningContent = {
        'cloud-computing': {
            title: 'Cloud Computing',
            icon: '☁️',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            description: 'Master AWS, Azure, GCP, Docker, Kubernetes, and CI/CD pipelines',
            stats: { videos: 17, hours: '~60 hours', level: 'All Levels' },
            sections: [
                {
                    title: 'AWS Fundamentals',
                    icon: '📦',
                    videos: [
                        { id: 'SOTamWNgDKc', title: 'AWS Certified Cloud Practitioner Training 2024', duration: '13:55:00', difficulty: 'Beginner', channel: 'freeCodeCamp', description: 'Complete AWS fundamentals: EC2, S3, Lambda, RDS, IAM' },
                        { id: '8TlukLu11Yo', title: 'AWS EC2 Tutorial For Beginners', duration: '35:12', difficulty: 'Beginner', channel: 'Simplilearn', description: 'Learn EC2 instances and security groups' },
                        { id: 'tfU0JEZjcsg', title: 'AWS S3 Tutorial For Beginners', duration: '28:43', difficulty: 'Beginner', channel: 'Simplilearn', description: 'Master S3 buckets, storage classes, and permissions' },
                        { id: 'eOBq__h4OJ4', title: 'AWS Lambda Tutorial', duration: '31:48', difficulty: 'Intermediate', channel: 'TechWorld with Nana', description: 'Serverless computing with Lambda functions' },
                        { id: 'iF9fs8Rw4Uo', title: 'AWS IAM - Identity and Access Management Tutorial', duration: '37:45', difficulty: 'Intermediate', channel: 'Stephane Maarek', description: 'Complete IAM: users, groups, roles, and policies' }
                    ]
                },
                {
                    title: 'Microsoft Azure',
                    icon: '☁️',
                    videos: [
                        { id: 'NKEFWyqJ5XA', title: 'Azure Fundamentals Certification Course (AZ-900)', duration: '3:28:32', difficulty: 'Beginner', channel: 'freeCodeCamp', description: 'Complete Azure fundamentals and core services' },
                        { id: '4BibQ69MD8c', title: 'Azure DevOps Tutorial for Beginners', duration: '45:56', difficulty: 'Intermediate', channel: 'Edureka', description: 'Azure Pipelines, Repos, and Boards' }
                    ]
                },
                {
                    title: 'Google Cloud Platform',
                    icon: '🌐',
                    videos: [
                        { id: 'jpno8FSqpc8', title: 'Google Cloud Platform Full Course', duration: '4:01:15', difficulty: 'Beginner', channel: 'Edureka', description: 'GCP Compute Engine, Cloud Storage, BigQuery' },
                        { id: 'jpno8FSqpc8', title: 'GCP Associate Cloud Engineer Course', duration: '7:20:00', difficulty: 'Intermediate', channel: 'freeCodeCamp', description: 'Complete GCP architecture and best practices' }
                    ]
                },
                {
                    title: 'Docker & Containerization',
                    icon: '🐳',
                    videos: [
                        { id: '3c-iBn73dDE', title: 'Docker Tutorial for Beginners [FULL COURSE]', duration: '3:10:23', difficulty: 'Beginner', channel: 'TechWorld with Nana', description: 'Complete Docker: images, containers, networking' },
                        { id: 'pg19Z8LL06w', title: 'Docker Crash Course', duration: '1:08:26', difficulty: 'Beginner', channel: 'Traversy Media', description: 'Docker commands, Dockerfile, and compose' },
                        { id: 'MVIcrmeV_6c', title: 'Docker Compose Tutorial', duration: '32:12', difficulty: 'Intermediate', channel: 'TechWorld with Nana', description: 'Multi-container applications with docker-compose' }
                    ]
                },
                {
                    title: 'Kubernetes',
                    icon: '☸️',
                    videos: [
                        { id: 'X48VuDVv0do', title: 'Kubernetes Tutorial for Beginners [FULL COURSE]', duration: '3:53:27', difficulty: 'Beginner', channel: 'TechWorld with Nana', description: 'K8s architecture, pods, services, deployments' },
                        { id: 's_o8dwzRlu4', title: 'Kubernetes Crash Course for Absolute Beginners', duration: '1:02:05', difficulty: 'Beginner', channel: 'TechWorld with Nana', description: 'Quick Kubernetes overview with hands-on demo' },
                        { id: 'qmDzcu5uY1I', title: 'Kubernetes Deployments Explained', duration: '28:45', difficulty: 'Intermediate', channel: 'TechWorld with Nana', description: 'Kubernetes deployments, replicas, and updates' }
                    ]
                },
                {
                    title: 'CI/CD & DevOps',
                    icon: '🔄',
                    videos: [
                        { id: 'R8_veQiYBjI', title: 'GitHub Actions Tutorial', duration: '1:05:28', difficulty: 'Intermediate', channel: 'TechWorld with Nana', description: 'Complete CI/CD workflows with GitHub Actions' },
                        { id: 'FX322RVNGj4', title: 'Jenkins Tutorial', duration: '48:35', difficulty: 'Intermediate', channel: 'Simplilearn', description: 'Jenkins setup, jobs, and pipelines' }
                    ]
                }
            ]
        },
        'data-analytics': {
            title: 'Data Analytics',
            icon: '📊',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            description: 'Master SQL, Power BI, Tableau, and data warehousing',
            stats: { videos: 17, hours: '~55 hours', level: 'All Levels' },
            sections: [
                {
                    title: 'SQL Fundamentals',
                    icon: '🗄️',
                    videos: [
                        { id: 'HXV3zeQKqGY', title: 'SQL Tutorial - Full Database Course for Beginners', duration: '4:20:44', difficulty: 'Beginner', channel: 'freeCodeCamp', description: 'Complete SQL: SELECT, WHERE, JOIN, GROUP BY' },
                        { id: '7mz73uXD9DA', title: 'SQL for Data Analysis - Full Course', duration: '4:00:56', difficulty: 'Intermediate', channel: 'freeCodeCamp', description: 'Aggregate functions, subqueries, and CTEs' },
                        { id: 'ofme2o29ngU', title: 'Advanced SQL Tutorial', duration: '1:15:30', difficulty: 'Advanced', channel: 'Socratica', description: 'Advanced SQL: window functions, CTEs, subqueries' },
                        { id: '9yeOJ0ZMUYw', title: 'SQL Joins Explained', duration: '21:46', difficulty: 'Intermediate', channel: 'Alex The Analyst', description: 'INNER, LEFT, RIGHT, FULL JOIN mastery' },
                        { id: 'Ww71knvhQ-s', title: 'SQL Window Functions Tutorial', duration: '26:54', difficulty: 'Advanced', channel: 'Alex The Analyst', description: 'ROW_NUMBER, RANK, LEAD, LAG functions' }
                    ]
                },
                {
                    title: 'Power BI',
                    icon: '📈',
                    videos: [
                        { id: '3u7MQz1EyPY', title: 'Microsoft Power BI Full Course', duration: '4:12:48', difficulty: 'Beginner', channel: 'Edureka', description: 'Power BI Desktop, DAX, and visualizations' },
                        { id: 'g0m5sEHPU-s', title: 'Power BI Tutorial for Beginners', duration: '54:22', difficulty: 'Beginner', channel: 'Kevin Stratvert', description: 'Complete Power BI basics, dashboards, and reports' },
                        { id: 'klQAZLr5vxA', title: 'Power BI DAX Tutorial', duration: '1:15:42', difficulty: 'Intermediate', channel: 'SQLBI', description: 'DAX functions, calculated columns, measures' },
                        { id: 'NNSHu0rkew8', title: 'Power BI Dashboard Best Practices', duration: '18:35', difficulty: 'Intermediate', channel: 'Enterprise DNA', description: 'Professional dashboard design and layout tips' }
                    ]
                },
                {
                    title: 'Tableau',
                    icon: '📊',
                    videos: [
                        { id: 'aHaOIvR00So', title: 'Tableau Full Course', duration: '6:14:15', difficulty: 'Beginner', channel: 'Edureka', description: 'Tableau Desktop, visualizations, dashboards' },
                        { id: '6xv1KvCMF1Q', title: 'Tableau Tutorial for Beginners', duration: '58:45', difficulty: 'Beginner', channel: 'Simplilearn', description: 'Connect data, create charts, publish' },
                        { id: 'jEgVto5QME8', title: 'Tableau Advanced Techniques', duration: '1:02:15', difficulty: 'Advanced', channel: 'Tableau Software', description: 'Advanced calculations, parameters, and LOD expressions' }
                    ]
                },
                {
                    title: 'Data Warehousing',
                    icon: '🏢',
                    videos: [
                        { id: '-bSkREem8dM', title: 'Data Warehouse Tutorial', duration: '35:28', difficulty: 'Beginner', channel: 'Simplilearn', description: 'Star schema, fact tables, dimensions' },
                        { id: 'OW5OgsLpDCQ', title: 'ETL Process Tutorial', duration: '48:15', difficulty: 'Intermediate', channel: 'Edureka', description: 'Extract, Transform, Load processes' }
                    ]
                },
                {
                    title: 'Excel for Analytics',
                    icon: '📑',
                    videos: [
                        { id: 'Vl0H-qTclOg', title: 'Excel for Data Analysis - Full Course', duration: '3:41:12', difficulty: 'Beginner', channel: 'freeCodeCamp', description: 'Pivot tables, VLOOKUP, advanced formulas' },
                        { id: 'Vl0H-qTclOg', title: 'Advanced Excel - Full Course', duration: '2:15:30', difficulty: 'Advanced', channel: 'freeCodeCamp', description: 'Advanced Excel formulas, pivot tables, Power Query' },
                        { id: '0aeZX1l4JT4', title: 'Power Query Tutorial', duration: '52:18', difficulty: 'Intermediate', channel: 'Leila Gharani', description: 'Data transformation with M language' }
                    ]
                }
            ]
        },
        'data-science': {
            title: 'Data Science',
            icon: '🧠',
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            description: 'Master Python, Machine Learning, and Deep Learning',
            stats: { videos: 20, hours: '~80 hours', level: 'All Levels' },
            sections: [
                {
                    title: 'Python Programming',
                    icon: '🐍',
                    videos: [
                        { id: 'rfscVS0vtbw', title: 'Python for Beginners - Full Course', duration: '4:26:52', difficulty: 'Beginner', channel: 'freeCodeCamp', description: 'Python basics, functions, and OOP' },
                        { id: 'LHBE6Q9XlzI', title: 'Python for Data Science - Full Course', duration: '12:18:42', difficulty: 'Beginner', channel: 'freeCodeCamp', description: 'NumPy, Pandas, Matplotlib fundamentals' },
                        { id: 'GB9ByFAIAH4', title: 'NumPy Tutorial', duration: '58:41', difficulty: 'Beginner', channel: 'Keith Galli', description: 'Arrays, operations, and indexing' },
                        { id: 'vmEHCJofslg', title: 'Pandas Tutorial', duration: '1:00:27', difficulty: 'Beginner', channel: 'Keith Galli', description: 'DataFrames and data manipulation' }
                    ]
                },
                {
                    title: 'Data Visualization',
                    icon: '📊',
                    videos: [
                        { id: 'UO98lJQ3QGI', title: 'Matplotlib Tutorial', duration: '3:00:00', difficulty: 'Beginner', channel: 'Corey Schafer', description: 'Plots, charts, and customization' },
                        { id: '6GUZXDef2U0', title: 'Seaborn Tutorial', duration: '45:23', difficulty: 'Intermediate', channel: 'Krish Naik', description: 'Statistical visualizations' }
                    ]
                },
                {
                    title: 'Machine Learning Fundamentals',
                    icon: '🤖',
                    videos: [
                        { id: 'NWONeJKn6kc', title: 'Machine Learning Course for Beginners', duration: '10:44:16', difficulty: 'Beginner', channel: 'freeCodeCamp', description: 'Complete ML concepts and algorithms' },
                        { id: 'bPrmA1SEN2k', title: 'Machine Learning Tutorial Python', duration: '8:00:00', difficulty: 'Beginner', channel: 'Krish Naik', description: 'Complete ML pipeline with Python' },
                        { id: 'nk2CQITm_eo', title: 'Linear Regression Tutorial', duration: '27:26', difficulty: 'Beginner', channel: 'StatQuest', description: 'Regression fundamentals explained' },
                        { id: 'yIYKR4sgzI8', title: 'Logistic Regression Tutorial', duration: '20:13', difficulty: 'Intermediate', channel: 'StatQuest', description: 'Classification algorithms' },
                        { id: 'J4Wdy0Wc_xQ', title: 'Decision Trees and Random Forests', duration: '39:54', difficulty: 'Intermediate', channel: 'StatQuest', description: 'Tree-based models explained' },
                        { id: '4b5d3muPQmA', title: 'K-Means Clustering', duration: '8:57', difficulty: 'Intermediate', channel: 'StatQuest', description: 'Unsupervised learning fundamentals' }
                    ]
                },
                {
                    title: 'Scikit-learn',
                    icon: '🔬',
                    videos: [
                        { id: '0B5eIE_1vpU', title: 'Scikit-Learn Course', duration: '2:18:11', difficulty: 'Intermediate', channel: 'freeCodeCamp', description: 'ML library and model building' },
                        { id: 'M9Itm95JzL0', title: 'Scikit-Learn Tutorial - Classification', duration: '1:15:32', difficulty: 'Intermediate', channel: 'sentdex', description: 'Classification models in sklearn' },
                        { id: 'Q81RR3yKn30', title: 'Model Evaluation & Hyperparameter Tuning', duration: '1:08:42', difficulty: 'Advanced', channel: 'Simplilearn', description: 'Model evaluation metrics and hyperparameter optimization' }
                    ]
                },
                {
                    title: 'Deep Learning',
                    icon: '🧠',
                    videos: [
                        { id: 'aircAruvnKk', title: 'Neural Networks Explained', duration: '1:00:00', difficulty: 'Beginner', channel: '3Blue1Brown', description: 'How neural networks work visually' },
                        { id: 'tPYj3fFJGjk', title: 'TensorFlow 2.0 Complete Course', duration: '7:00:15', difficulty: 'Intermediate', channel: 'freeCodeCamp', description: 'TensorFlow, Keras, CNN, RNN' },
                        { id: 'V_xro1bcAuA', title: 'PyTorch Tutorial', duration: '10:28:26', difficulty: 'Intermediate', channel: 'freeCodeCamp', description: 'PyTorch basics and neural networks' },
                        { id: 'zfiSAzpy9NM', title: 'CNN for Computer Vision', duration: '1:12:45', difficulty: 'Advanced', channel: 'Krish Naik', description: 'Convolutional neural networks' },
                        { id: 'WCUNPb-5EYI', title: 'RNN and LSTM Tutorial', duration: '48:32', difficulty: 'Advanced', channel: 'Krish Naik', description: 'Recurrent networks for sequences' }
                    ]
                }
            ]
        },
        'web-development': {
            title: 'Web Development',
            icon: '💻',
            gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            description: 'Master HTML, CSS, JavaScript, React, and Node.js',
            stats: { videos: 18, hours: '~70 hours', level: 'All Levels' },
            sections: [
                {
                    title: 'HTML & CSS',
                    icon: '🎨',
                    videos: [
                        { id: 'mU6anWqZJcc', title: 'HTML & CSS Full Course', duration: '11:35:26', difficulty: 'Beginner', channel: 'freeCodeCamp', description: 'Complete HTML5 and CSS3 fundamentals' },
                        { id: 'fYq5PXgSsbE', title: 'Flexbox CSS Tutorial', duration: '23:45', difficulty: 'Beginner', channel: 'Web Dev Simplified', description: 'Master CSS Flexbox layout' },
                        { id: '9zBsdzdE4sM', title: 'CSS Grid Tutorial', duration: '34:12', difficulty: 'Intermediate', channel: 'Web Dev Simplified', description: 'Advanced CSS Grid techniques' }
                    ]
                },
                {
                    title: 'JavaScript',
                    icon: '⚡',
                    videos: [
                        { id: 'jS4aFq5-91M', title: 'JavaScript Full Course', duration: '7:45:13', difficulty: 'Beginner', channel: 'freeCodeCamp', description: 'JS fundamentals, ES6+, and DOM' },
                        { id: 'NCwa_xi0Uuc', title: 'JavaScript ES6 Tutorial', duration: '1:14:33', difficulty: 'Intermediate', channel: 'Traversy Media', description: 'Arrow functions, promises, async/await' },
                        { id: 'ZcQyJ-gxke0', title: 'Async JavaScript Tutorial', duration: '1:30:00', difficulty: 'Intermediate', channel: 'The Net Ninja', description: 'Callbacks, promises, and async/await' },
                        { id: '0ik6X4DJKCc', title: 'JavaScript DOM Manipulation', duration: '47:22', difficulty: 'Beginner', channel: 'Traversy Media', description: 'DOM methods, events, manipulation' }
                    ]
                },
                {
                    title: 'React.js',
                    icon: '⚛️',
                    videos: [
                        { id: 'bMknfKXIFA8', title: 'React Course for Beginners', duration: '11:19:27', difficulty: 'Beginner', channel: 'freeCodeCamp', description: 'Components, props, state, hooks' },
                        { id: 'j942wKiXFu8', title: 'React Tutorial', duration: '5:00:00', difficulty: 'Beginner', channel: 'The Net Ninja', description: 'Complete React fundamentals' },
                        { id: 'O6P86uwfdR0', title: 'React Hooks Tutorial', duration: '40:28', difficulty: 'Intermediate', channel: 'Web Dev Simplified', description: 'useState, useEffect, custom hooks' },
                        { id: 'Ul3y1LXxzdU', title: 'React Router Tutorial', duration: '38:14', difficulty: 'Intermediate', channel: 'Web Dev Simplified', description: 'React Router v6 navigation' },
                        { id: '9zySeP5vH9c', title: 'Redux Toolkit Tutorial', duration: '52:30', difficulty: 'Advanced', channel: 'Codevolution', description: 'State management with Redux' }
                    ]
                },
                {
                    title: 'Backend (Node.js & Express)',
                    icon: '🟢',
                    videos: [
                        { id: 'Oe421EPjeBE', title: 'Node.js and Express.js Full Course', duration: '8:16:48', difficulty: 'Beginner', channel: 'freeCodeCamp', description: 'Complete Node.js and Express' },
                        { id: 'fBNz5xF-Kx4', title: 'Node.js Tutorial for Beginners', duration: '1:08:34', difficulty: 'Beginner', channel: 'Traversy Media', description: 'Node basics, modules, npm' },
                        { id: 'VVGgacjzc2Y', title: 'Express.js Tutorial', duration: '2:00:00', difficulty: 'Intermediate', channel: 'The Net Ninja', description: 'Express framework and middleware' },
                        { id: 'pKd0Rpw7O48', title: 'REST API Tutorial', duration: '58:41', difficulty: 'Intermediate', channel: 'Programming with Mosh', description: 'RESTful API design with Express' }
                    ]
                },
                {
                    title: 'Databases',
                    icon: '🗄️',
                    videos: [
                        { id: '-56x56UppqQ', title: 'MongoDB Crash Course', duration: '1:00:44', difficulty: 'Beginner', channel: 'Traversy Media', description: 'MongoDB basics, CRUD, Mongoose' },
                        { id: 'qw--VYLpxG4', title: 'PostgreSQL Tutorial', duration: '4:19:23', difficulty: 'Beginner', channel: 'freeCodeCamp', description: 'SQL database and relations' }
                    ]
                }
            ]
        },
        'generative-ai': {
            title: 'Generative AI',
            icon: '🤖',
            gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            description: 'Master LLMs, Prompt Engineering, and RAG systems',
            stats: { videos: 16, hours: '~45 hours', level: 'All Levels' },
            sections: [
                {
                    title: 'AI Fundamentals',
                    icon: '🧠',
                    videos: [
                        { id: 'G2fqAlgmoPo', title: 'Introduction to Generative AI', duration: '22:07', difficulty: 'Beginner', channel: 'Google Cloud Tech', description: 'What is GenAI and how it works' },
                        { id: '67_aMPDk2zw', title: 'Large Language Models Explained', duration: '13:52', difficulty: 'Beginner', channel: 'IBM Technology', description: 'How LLMs work and transformers' },
                        { id: 'zxQyTK8quyY', title: 'Transformers Architecture Explained', duration: '28:33', difficulty: 'Intermediate', channel: 'StatQuest', description: 'Attention mechanism deep dive' },
                        { id: 'wjZofJX0v4M', title: 'GPT Models Explained', duration: '18:45', difficulty: 'Intermediate', channel: 'AI Explained', description: 'GPT architecture evolution' }
                    ]
                },
                {
                    title: 'Working with AI APIs',
                    icon: '🔌',
                    videos: [
                        { id: 'uRQH2CFvedY', title: 'OpenAI API Tutorial', duration: '1:28:42', difficulty: 'Beginner', channel: 'Dave Gray', description: 'Complete OpenAI API guide' },
                        { id: 'qV_AlRwhI3I', title: 'Build AI Apps with OpenAI API', duration: '3:24:15', difficulty: 'Intermediate', channel: 'freeCodeCamp', description: 'Building chatbots and integrations' },
                        { id: 'Nl2Cdbao5Ws', title: 'Anthropic Claude API Complete Guide', duration: '25:42', difficulty: 'Beginner', channel: 'All About AI', description: 'Complete guide to using Claude API' },
                        { id: '2FeymQoKvrk', title: 'Building a ChatGPT Clone', duration: '1:12:35', difficulty: 'Intermediate', channel: 'JavaScript Mastery', description: 'Full-stack AI application' }
                    ]
                },
                {
                    title: 'Prompt Engineering',
                    icon: '✍️',
                    videos: [
                        { id: '_ZvnD73m40o', title: 'Prompt Engineering Tutorial', duration: '15:32', difficulty: 'Beginner', channel: 'IBM Technology', description: 'Prompt basics and techniques' },
                        { id: 'T9aRN5JkmL8', title: 'Advanced Prompt Engineering', duration: '28:47', difficulty: 'Advanced', channel: 'AI Explained', description: 'Chain-of-thought and few-shot learning' },
                        { id: 'lG7Uxts9SXs', title: 'LangChain Crash Course', duration: '1:18:24', difficulty: 'Intermediate', channel: 'Dave Gray', description: 'LangChain framework and chains' }
                    ]
                },
                {
                    title: 'RAG & Vector Databases',
                    icon: '🔍',
                    videos: [
                        { id: 'T-D1OfcDW1M', title: 'RAG Explained (Retrieval Augmented Generation)', duration: '10:27', difficulty: 'Beginner', channel: 'IBM Technology', description: 'RAG architecture and use cases' },
                        { id: '2TJxpyO3ei4', title: 'Building RAG Applications', duration: '42:35', difficulty: 'Intermediate', channel: 'Sam Witteveen', description: 'Practical RAG implementation' },
                        { id: 'klTvEwg3oJ4', title: 'Vector Databases Explained', duration: '11:52', difficulty: 'Beginner', channel: 'IBM Technology', description: 'Embeddings and vector search' },
                        { id: 'dN0lsF2cvm4', title: 'Vector Databases & Embeddings Tutorial', duration: '42:30', difficulty: 'Intermediate', channel: 'AssemblyAI', description: 'Vector databases, embeddings, and semantic search' }
                    ]
                }
            ]
        }
    };

    // Initialize page
    const trackSelector = document.getElementById('trackSelector');
    const trackIntro = document.getElementById('trackIntro');
    const progressTracker = document.getElementById('progressTracker');
    const videoSections = document.getElementById('videoSections');

    // Load watched videos from localStorage
    function getWatchedVideos(track) {
        const key = `watched_${track}`;
        const watched = localStorage.getItem(key);
        return watched ? JSON.parse(watched) : [];
    }

    // Save watched videos to localStorage
    function saveWatchedVideo(track, videoId, isWatched) {
        const key = `watched_${track}`;
        let watched = getWatchedVideos(track);

        if (isWatched && !watched.includes(videoId)) {
            watched.push(videoId);
        } else if (!isWatched && watched.includes(videoId)) {
            watched = watched.filter(id => id !== videoId);
        }

        localStorage.setItem(key, JSON.stringify(watched));
    }

    // Calculate progress
    function calculateProgress(track, content) {
        const watched = getWatchedVideos(track);
        const totalVideos = content.sections.reduce((sum, section) => sum + section.videos.length, 0);
        const watchedCount = watched.length;
        const percentage = totalVideos > 0 ? Math.round((watchedCount / totalVideos) * 100) : 0;

        return { watchedCount, totalVideos, percentage };
    }

    // Render track introduction
    function renderTrackIntro(track, content) {
        const { watchedCount, totalVideos, percentage } = calculateProgress(track, content);

        trackIntro.innerHTML = `
            <div class="track-intro" style="background: ${content.gradient};">
                <div class="track-intro-content">
                    <h2 class="track-intro-title">${content.icon} ${content.title} Learning Path</h2>
                    <p class="track-intro-description">${content.description}</p>
                    <div class="track-intro-stats">
                        <span class="stat-item">📚 ${content.stats.videos} Videos</span>
                        <span class="stat-item">⏱️ ${content.stats.hours}</span>
                        <span class="stat-item">🎯 ${content.stats.level}</span>
                    </div>
                </div>
            </div>
        `;
    }

    // Render progress tracker
    function renderProgressTracker(track, content) {
        const { watchedCount, totalVideos, percentage } = calculateProgress(track, content);

        progressTracker.innerHTML = `
            <div class="progress-card">
                <div class="progress-header">
                    <h3>Your Progress</h3>
                    <span class="progress-stats">${watchedCount} / ${totalVideos} videos watched</span>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar" style="width: ${percentage}%"></div>
                </div>
                <p class="progress-percentage">${percentage}% Complete</p>
            </div>
        `;
    }

    // Get difficulty badge
    function getDifficultyBadge(difficulty) {
        const badges = {
            'Beginner': { color: '#10b981', icon: '🟢' },
            'Intermediate': { color: '#f59e0b', icon: '🟡' },
            'Advanced': { color: '#ef4444', icon: '🔴' }
        };
        const badge = badges[difficulty] || badges['Beginner'];
        return `<span class="difficulty-badge" style="color: ${badge.color}">${badge.icon} ${difficulty}</span>`;
    }

    // Render video sections
    function renderVideoSections(track, content) {
        const watched = getWatchedVideos(track);

        let html = '';

        content.sections.forEach((section, sectionIndex) => {
            html += `
                <div class="video-section">
                    <h3 class="section-header">${section.icon} ${section.title}</h3>
                    <div class="videos-grid">
            `;

            section.videos.forEach((video, videoIndex) => {
                const videoKey = `${track}_${sectionIndex}_${videoIndex}`;
                const isWatched = watched.includes(videoKey);

                html += `
                    <div class="video-card ${isWatched ? 'watched' : ''}">
                        <div class="video-checkbox-container">
                            <label class="video-checkbox-label">
                                <input
                                    type="checkbox"
                                    class="video-checkbox"
                                    data-track="${track}"
                                    data-video-key="${videoKey}"
                                    ${isWatched ? 'checked' : ''}
                                >
                                <span class="checkbox-text">Mark as watched</span>
                            </label>
                        </div>
                        <div class="video-embed">
                            <iframe
                                width="100%"
                                height="236"
                                src="https://www.youtube.com/embed/${video.id}"
                                title="${video.title}"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowfullscreen>
                            </iframe>
                        </div>
                        <div class="video-info">
                            <h4 class="video-title">${video.title}</h4>
                            <div class="video-meta">
                                <span class="video-duration">📺 ${video.duration}</span>
                                ${getDifficultyBadge(video.difficulty)}
                            </div>
                            <p class="video-channel">👤 ${video.channel}</p>
                            <p class="video-description">${video.description}</p>
                        </div>
                    </div>
                `;
            });

            html += `
                    </div>
                </div>
            `;
        });

        videoSections.innerHTML = html;

        // Add checkbox event listeners
        document.querySelectorAll('.video-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const track = this.dataset.track;
                const videoKey = this.dataset.videoKey;
                const isWatched = this.checked;

                saveWatchedVideo(track, videoKey, isWatched);

                // Update progress
                const content = learningContent[track];
                renderProgressTracker(track, content);

                // Toggle watched class on card
                const card = this.closest('.video-card');
                if (isWatched) {
                    card.classList.add('watched');
                } else {
                    card.classList.remove('watched');
                }
            });
        });
    }

    // Render complete track content
    function renderTrackContent(track) {
        const content = learningContent[track];

        if (!content) {
            console.error('Track not found:', track);
            return;
        }

        renderTrackIntro(track, content);
        renderProgressTracker(track, content);
        renderVideoSections(track, content);

        // Smooth scroll to content
        document.getElementById('learningContent').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    // Track selector change handler
    trackSelector.addEventListener('change', function() {
        const selectedTrack = this.value;
        renderTrackContent(selectedTrack);
    });

    // Initial render (Cloud Computing by default)
    renderTrackContent('cloud-computing');

    // Add smooth loading animation
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');

    if (heroTitle && heroSubtitle) {
        setTimeout(() => {
            heroTitle.style.opacity = '1';
        }, 100);

        setTimeout(() => {
            heroSubtitle.style.opacity = '1';
        }, 300);
    }
});
