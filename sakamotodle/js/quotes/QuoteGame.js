import { characterData } from '../data.js';
import { quotesData } from './quotesData.js';

export class QuoteGame {
    constructor() {
        this.characters = characterData;
        this.quotes = quotesData;
        this.targetQuote = null;
        this.targetCharacterObj = null;
        this.guessCount = 0;
        this.guessedCharacters = [];
        this.gameOver = false;
        this.answerRevealed = false;

        this.quoteDisplay = document.getElementById('quoteDisplay');
        this.guessInput = document.getElementById('guessInput');
        this.guessBtn = document.getElementById('guessBtn');
        this.hintBtn = document.getElementById('hintBtn');
        this.answerBtn = document.getElementById('answerBtn');
        this.restartBtn = document.getElementById('restartBtn');
        this.resultContainer = document.getElementById('resultContainer');
        this.guessCountDisplay = document.getElementById('guessCount');
        this.autocompleteList = document.getElementById('autocompleteList');
        this.answerBox = document.getElementById('answerBox');
        this.hintBox = document.getElementById('hintBox');

        this.initEvents();
        this.startNewGame();
    }

    initEvents() {
        this.guessBtn.addEventListener('click', () => this.makeGuess());
        this.hintBtn.addEventListener('click', () => this.showHint());
        this.answerBtn.addEventListener('click', () => this.revealAnswer());
        this.restartBtn.addEventListener('click', () => this.startNewGame());
        
        this.guessInput.addEventListener('input', () => this.handleInput());
        document.addEventListener('click', (e) => {
            if (e.target !== this.guessInput) {
                this.autocompleteList.innerHTML = '';
            }
        });
        
        this.guessInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.makeGuess();
        });
    }

    handleInput() {
        const val = this.guessInput.value.trim().toLowerCase();
        this.autocompleteList.innerHTML = '';
        if (!val) return;

        const matches = this.characters.filter(c => c.name.toLowerCase().includes(val) && !this.guessedCharacters.includes(c.name));

        matches.forEach(c => {
            const item = document.createElement('div');
            const imgUrl = c.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=222&color=fff&size=70&rounded=false&bold=true`;
            
            item.innerHTML = `<img src="${imgUrl}" class="autocomplete-img"> <span>${c.name}</span>`;
            item.addEventListener('click', () => {
                this.guessInput.value = c.name;
                this.autocompleteList.innerHTML = '';
                this.guessInput.focus();
            });
            this.autocompleteList.appendChild(item);
        });
    }

    startNewGame() {
        const randomIndex = Math.floor(Math.random() * this.quotes.length);
        this.targetQuote = this.quotes[randomIndex];
        this.targetCharacterObj = this.characters.find(c => c.name === this.targetQuote.character);

        this.quoteDisplay.innerText = this.targetQuote.quote;

        this.gameOver = false;
        this.answerRevealed = false;
        this.guessCount = 0;
        this.guessedCharacters = [];
        this.guessCountDisplay.innerText = this.guessCount;
        this.resultContainer.innerHTML = '';
        this.guessInput.value = '';
        this.autocompleteList.innerHTML = '';
        this.guessInput.disabled = false;
        this.guessBtn.disabled = false;
        this.hintBtn.disabled = false;
        this.answerBtn.style.display = 'inline-block';
        this.restartBtn.style.display = 'none';
        this.answerBox.style.display = 'none';
        this.answerBox.innerHTML = '';
        this.hintBox.style.display = 'none';
        this.hintBox.innerHTML = '';
        
        this.guessInput.focus();
    }

    showHint() {
        if (this.gameOver || !this.targetCharacterObj) return;
        this.hintBox.style.display = 'block';
        const arc = this.targetCharacterObj.firstArc;
        this.hintBox.innerHTML = `💡 <b>Hint:</b> The character who said this first appeared in the <b>${arc}</b>.`;
        this.hintBtn.disabled = true;
    }

    revealAnswer() {
        if (this.answerRevealed) return;
        this.answerRevealed = true;

        const t = this.targetCharacterObj;
        const imgUrl = t.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=f44336&color=fff&size=180&rounded=false&bold=true`;
        this.answerBox.innerHTML = `
            <img src="${imgUrl}" class="answer-img">
            <div>
                <div style="font-size: 24px; font-weight: bold; margin-bottom: 5px;">${t.name}</div>
                <div style="color: #eee;">${t.occupation} • ${t.affiliation}</div>
            </div>
        `;
        this.answerBox.style.display = 'flex';
        
        this.gameOver = true;
        this.guessInput.disabled = true;
        this.guessBtn.disabled = true;
        this.hintBtn.disabled = true;
        this.answerBtn.style.display = 'none';
        this.restartBtn.style.display = 'inline-block';
    }

    makeGuess() {
        if (this.gameOver) return;

        const guessName = this.guessInput.value.trim();
        const guessChar = this.characters.find(c => c.name.toLowerCase() === guessName.toLowerCase());

        if (!guessChar) {
            alert("Character not found! Please select from the list.");
            return;
        }

        this.guessInput.value = '';
        this.autocompleteList.innerHTML = '';
        const guessedName = guessChar.name;
        this.guessedCharacters.push(guessedName);
        this.guessCount++;
        this.guessCountDisplay.innerText = this.guessCount;

        const isCorrect = (guessChar.name === this.targetCharacterObj.name);
        const imgUrl = guessChar.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(guessChar.name)}&background=222&color=fff&size=70&rounded=false&bold=true`;

        const row = document.createElement('div');
        row.className = 'guess-row';
        row.innerHTML = `
            <img src="${imgUrl}" alt="${guessChar.name}">
            <div class="guess-name">${guessChar.name}</div>
            <div class="guess-status">${isCorrect ? '✅' : '❌'}</div>
        `;
        
        // Insert at the top of the container
        this.resultContainer.insertBefore(row, this.resultContainer.firstChild);

        if (isCorrect) {
            this.revealAnswer();
        }
    }
}
