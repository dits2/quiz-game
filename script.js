// Fungsi untuk mengacak urutan array (jawaban)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Tukar posisi elemen
    }
    return array;
}

// Soal-soal quiz
const questions = [
    {
        question: "Wie sagt man „pagi“ auf Deutsch?",
        options: shuffleArray(["Morgen", "Nacht", "Mittag", "Abend"]),
        answer: "Morgen"
    },
    {
        question: "Was ist die Hauptstadt von Deutschland?",
        options: shuffleArray(["Berlin", "München", "Frankfurt", "Hamburg"]),
        answer: "Berlin"
    },
    {
        question: "Welche Farbe hat die deutsche Flagge nicht?",
        options: shuffleArray(["Blau", "Schwarz", "Rot", "Gelb"]),
        answer: "Blau"
    },
    {
        question: "Was ist das Gegenteil von „langsam“?",
        options: shuffleArray(["schnell", "groß", "klein", "dunkel"]),
        answer: "schnell"
    },
    {
        question: "Wie viele Monate hat ein Jahr?",
        options: shuffleArray(["zwölf", "zehn", "elf", "dreizehn"]),
        answer: "zwölf"
    },
    {
        question: "Welche Stadt ist bekannt für das Oktoberfest?",
        options: shuffleArray(["München", "Berlin", "Hamburg", "Köln"]),
        answer: "München"
    },
    {
        question: "Wie heißt der Artikel von „Haus“?",
        options: shuffleArray(["das", "der", "die", "den"]),
        answer: "das"
    },
    {
        question: "Welches Fest wird am 3. Oktober in Deutschland gefeiert?",
        options: shuffleArray(["Tag der Deutschen Einheit", "Oktoberfest", "Weihnachten", "Karneval"]),
        answer: "Tag der Deutschen Einheit"
    },
    {
        question: "Was ist eine bekannte deutsche Wurst?",
        options: shuffleArray(["Bratwurst", "Chorizo", "Hotdog", "Salami"]),
        answer: "Bratwurst"
    },
    {
        question: "Welches Getränk ist typisch für Deutschland?",
        options: shuffleArray(["Bier", "Wein", "Tee", "Kaffee"]),
        answer: "Bier"
    }
];

// Variabel untuk pelacakan
let currentQuestionIndex = 0;
let score = 0;
let playerName = "";

// Elemen-elemen DOM
const startContainer = document.getElementById("start-container");
const questionContainer = document.getElementById("question-container");
const endContainer = document.getElementById("end-container");

const playerNameInput = document.getElementById("player-name");
const startButton = document.getElementById("start-button");
const playerGreeting = document.getElementById("player-greeting");

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const nextButton = document.getElementById("next-button");
const scoreElement = document.getElementById("score");
const finalScoreElement = document.getElementById("final-score");
const restartButton = document.getElementById("restart-button");

// Event listener untuk memulai permainan
startButton.addEventListener("click", () => {
    playerName = playerNameInput.value.trim();
    if (playerName === "") {
        alert("Geben Sie einen Namen ein, um zu beginnen!");
        return;
    }
    playerGreeting.textContent = `Hallo ${playerName}! Viel Spaß beim Spielen!`;
    startContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    loadQuestion();
});

// Fungsi untuk memuat pertanyaan
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";

    // Menampilkan opsi jawaban
    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-button");
        button.addEventListener("click", () => selectAnswer(button, option));
        optionsContainer.appendChild(button);
    });

    nextButton.classList.add("hidden");
}

// Fungsi untuk memilih jawaban
function selectAnswer(button, selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    const correct = selectedOption === currentQuestion.answer;

    if (correct) {
        score += 10;
        button.style.backgroundColor = "#28a745"; // Warna hijau jika benar
        button.style.color = "white";
    } else {
        button.style.backgroundColor = "#dc3545"; // Warna merah jika salah
        button.style.color = "white";
    }

    // Menonaktifkan tombol setelah pilihan
    Array.from(optionsContainer.children).forEach(btn => btn.disabled = true);
    scoreElement.textContent = `Punkte: ${score}`;
    nextButton.classList.remove("hidden");
}

// Event listener untuk tombol "Nächste Frage" (Next Question)
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        questionContainer.classList.add("hidden");
        endContainer.classList.remove("hidden");
        finalScoreElement.textContent = `Endstand: ${score}`;
    }
});

// Event listener untuk tombol restart
restartButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = `Punkte: ${score}`;
    endContainer.classList.add("hidden");
    startContainer.classList.remove("hidden");
});
