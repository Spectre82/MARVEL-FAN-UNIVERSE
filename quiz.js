const questions = [
    {
        question: "Which cosmic entity was responsible for granting the Phoenix Force to Jean Grey?",
        options: ["The Living Tribunal", "The Phoenix Force itself", "The Celestials", "The White Hot Room"],
        correct: 1,
        explanation: "The Phoenix Force itself chose Jean Grey as its host, not any other cosmic entity."
    },
    {
        question: "What is the name of the dimension where Doctor Strange learned the mystic arts from the Ancient One?",
        options: ["Kamar-Taj", "Dark Dimension", "Mirror Dimension", "Quantum Realm"],
        correct: 0,
        explanation: "Kamar-Taj is the mystical compound in Nepal where Doctor Strange learned the mystic arts."
    },
    {
        question: "Which metal was used to create the original adamantium formula before it was perfected?",
        options: ["Carbonadium", "Vibranium", "Uru", "Secondary Adamantium"],
        correct: 0,
        explanation: "Carbonadium was the precursor to adamantium, though less stable and more malleable."
    },
    {
        question: "What is the designation number of the main Marvel Comics universe?",
        options: ["Earth-616", "Earth-199999", "Earth-1610", "Earth-838"],
        correct: 0,
        explanation: "Earth-616 is the primary continuity of Marvel Comics, while Earth-199999 is the MCU."
    },
    {
        question: "Who was the first being to wield the Power Cosmic granted by Galactus?",
        options: ["Silver Surfer", "Fallen One", "Tyrant", "Air-Walker"],
        correct: 2,
        explanation: "Tyrant was Galactus's first herald and wielder of the Power Cosmic before he rebelled."
    },
    {
        question: "What is the name of the symbiote that bonded with Flash Thompson?",
        options: ["Toxin", "Anti-Venom", "Agent Venom", "Mania"],
        correct: 2,
        explanation: "Flash Thompson bonded with the Venom symbiote to become Agent Venom."
    },
    {
        question: "Which infinity stone was originally housed within the Orb of Agamotto?",
        options: ["Time Stone", "Soul Stone", "Reality Stone", "Power Stone"],
        correct: 0,
        explanation: "The Time Stone was housed within the Eye of Agamotto, allowing manipulation of time."
    },
    {
        question: "What is the true identity of the original Ronin in Marvel Comics?",
        options: ["Clint Barton", "Maya Lopez", "Marc Spector", "Wade Wilson"],
        correct: 1,
        explanation: "Maya Lopez (Echo) was the first character to adopt the Ronin identity in the comics."
    },
    {
        question: "Which hero was responsible for creating the Illuminati in the comics?",
        options: ["Tony Stark", "Reed Richards", "Charles Xavier", "Black Bolt"],
        correct: 0,
        explanation: "Tony Stark formed the Illuminati after the Kree-Skrull War to share information and protect Earth."
    },
    {
        question: "What is the name of the device that allows travel between different universes in the Council of Reeds?",
        options: ["Bridge", "Gateway", "Portal", "The Bridge"],
        correct: 3,
        explanation: "The Bridge was the interdimensional travel device used by the Council of Reeds."
    }
];

let currentScore = 0;
const questionContainer = document.getElementById('question-container');
const submitButton = document.getElementById('submit-quiz');
const resultDiv = document.getElementById('result');
const scoreSpan = document.getElementById('score');
const retryButton = document.getElementById('retry');
const feedbackP = document.getElementById('feedback');

function displayQuestions() {
    questionContainer.innerHTML = '';
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `
            <p><strong>Question ${index + 1}:</strong> ${q.question}</p>
            <div class="options">
                ${q.options.map((option, i) => `
                    <label class="option-label">
                        <input type="radio" name="q${index}" value="${i}">
                        ${option}
                    </label>
                `).join('')}
            </div>
        `;
        questionContainer.appendChild(questionDiv);
    });
}

function calculateScore() {
    currentScore = 0;
    const explanations = [];
    questions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected) {
            if (parseInt(selected.value) === q.correct) {
                currentScore++;
                explanations.push(`Question ${index + 1}: Correct! ${q.explanation}`);
            } else {
                explanations.push(`Question ${index + 1}: Incorrect. ${q.explanation}`);
            }
        } else {
            explanations.push(`Question ${index + 1}: Not answered. ${q.explanation}`);
        }
    });
    return { score: currentScore, explanations };
}

function getFeedback(score) {
    if (score === 10) return "Perfect score! You're a true Marvel Comics expert!";
    if (score >= 8) return "Excellent! You really know your Marvel Comics!";
    if (score >= 6) return "Good job! You have solid Marvel knowledge!";
    if (score >= 4) return "Not bad! Keep reading those comics!";
    return "Time to dive deeper into the Marvel universe!";
}

async function submitQuizToBackend(score, answers) {
    try {
        const response = await fetch('http://localhost:5000/api/submit-quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ score, answers })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error submitting quiz:', error);
        return null;
    }
}

async function getLeaderboard() {
    try {
        const response = await fetch('http://localhost:5000/api/leaderboard');
        const data = await response.json();
        return data.leaderboard;
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        return [];
    }
}

async function updateLeaderboard() {
    const leaderboard = await getLeaderboard();
    const leaderboardHtml = leaderboard.map((entry, index) => `
        <div class="leaderboard-entry">
            <span class="rank">#${index + 1}</span>
            <span class="score">${entry.score}/10</span>
            <span class="date">${entry.date}</span>
        </div>
    `).join('');
    
    document.getElementById('leaderboard').innerHTML = `
        <h3>Top Scores</h3>
        ${leaderboardHtml}
    `;
}

submitButton.addEventListener('click', async () => {
    const { score, explanations } = calculateScore();
    const answers = questions.map((q, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        return selected ? parseInt(selected.value) : -1;
    });

    // Submit to backend
    await submitQuizToBackend(score, answers);
    
    scoreSpan.textContent = score;
    feedbackP.innerHTML = `
        ${getFeedback(score)}<br><br>
        <strong>Detailed Explanations:</strong><br>
        ${explanations.join('<br><br>')}
    `;
    
    // Update leaderboard
    await updateLeaderboard();
    
    questionContainer.style.display = 'none';
    submitButton.style.display = 'none';
    resultDiv.classList.remove('hidden');
});

retryButton.addEventListener('click', () => {
    questionContainer.style.display = 'block';
    submitButton.style.display = 'block';
    resultDiv.classList.add('hidden');
    displayQuestions();
});

// Initialize the quiz
displayQuestions();
