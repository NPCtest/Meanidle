import { Character } from './Character.js';
import { characterData } from '../data.js';

export class KillerPietrodleGame {
    constructor() {
        this.characters = characterData.map(data => new Character(data));
        this.targetCharacter = null;
        this.availableTargets = [...this.characters];
        this.guessCount = 0;
        this.guessedCharacters = [];
        this.answerRevealed = false;

        this.guessInput = document.getElementById('guessInput');
        this.guessBtn = document.getElementById('guessBtn');
        this.answerBtn = document.getElementById('answerBtn');
        this.restartBtn = document.getElementById('restartBtn');
        this.resultBody = document.getElementById('resultBody');
        this.guessCountDisplay = document.getElementById('guessCount');
        this.autocompleteList = document.getElementById('autocompleteList');
        this.answerBox = document.getElementById('answerBox');

        this.initEvents();
        this.startNewGame();
    }

    initEvents() {
        this.guessBtn.addEventListener('click', () => this.makeGuess());
        this.answerBtn.addEventListener('click', () => this.revealAnswer());
        this.restartBtn.addEventListener('click', () => this.startNewGame());
        
        this.guessInput.addEventListener('input', () => this.handleInput());
        document.addEventListener('click', (e) => {
            if (e.target !== this.guessInput) {
                this.autocompleteList.innerHTML = '';
            }
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
            });
            this.autocompleteList.appendChild(item);
        });
    }

    startNewGame() {
        if (this.availableTargets.length === 0) {
            this.availableTargets = [...this.characters];
            console.log("All characters have been guessed! Resetting the pool.");
        }
        const randomIndex = Math.floor(Math.random() * this.availableTargets.length);
        this.targetCharacter = this.availableTargets.splice(randomIndex, 1)[0];

        this.guessCount = 0;
        this.guessedCharacters = [];
        this.answerRevealed = false;
        this.guessCountDisplay.innerText = this.guessCount;
        this.resultBody.innerHTML = '';
        this.guessInput.value = '';
        this.autocompleteList.innerHTML = '';
        this.guessInput.disabled = false;
        this.guessBtn.disabled = false;
        this.answerBtn.style.display = 'inline-block';
        this.restartBtn.style.display = 'none';
        this.answerBox.style.display = 'none';
        this.answerBox.innerHTML = '';
    }

    revealAnswer() {
        if (this.answerRevealed) return;
        this.answerRevealed = true;

        const t = this.targetCharacter;
        const imgUrl = t.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=f44336&color=fff&size=180&rounded=false&bold=true`;
        this.answerBox.innerHTML = `
            <img src="${imgUrl}" class="answer-img">
            <div>
                <strong>${t.name}</strong><br>
                <small>${t.occupation} · ${t.affiliation} · ${t.firstArc}</small>
            </div>
        `;
        this.answerBox.style.display = 'flex';

        this.guessInput.disabled = true;
        this.guessBtn.disabled = true;
        this.answerBtn.style.display = 'none';
        this.restartBtn.style.display = 'inline-block';
    }

    makeGuess() {
        const inputVal = this.guessInput.value.trim();
        const guess = this.characters.find(c => c.name.toLowerCase() === inputVal.toLowerCase());

        if (!guess) {
            alert("Character not found!");
            return;
        }

        const guessedName = guess.name;
        this.guessedCharacters.push(guessedName);
        this.guessCount++;
        this.guessCountDisplay.innerText = this.guessCount;

        const imgUrl = guess.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(guess.name)}&background=222&color=fff&size=105&rounded=false&bold=true`;

        const results = [
            { text: `<img src="${imgUrl}" class="char-img">`, class: '' },
            { text: guess.name, class: '' },
            guess.compareString('gender', this.targetCharacter),
            guess.compareNumber('age', this.targetCharacter),
            guess.compareString('hair', this.targetCharacter),
            guess.compareNumber('height', this.targetCharacter),
            guess.compareString('occupation', this.targetCharacter),
            guess.compareString('affiliation', this.targetCharacter),
            guess.compareString('firstArc', this.targetCharacter)
        ];

        this.renderRow(results);
        this.guessInput.value = '';

        if (guess.name === this.targetCharacter.name) {
            this.handleWin();
        }
    }

    renderRow(results) {
        const row = document.createElement('tr');
        results.forEach(res => {
            const td = document.createElement('td');
            td.innerHTML = res.text;
            if (res.class) td.classList.add(res.class);
            row.appendChild(td);
        });
        this.resultBody.insertBefore(row, this.resultBody.firstChild);
    }

    handleWin() {
        this.guessInput.disabled = true;
        this.guessBtn.disabled = true;
        this.answerBtn.style.display = 'none';
        this.restartBtn.style.display = 'inline-block';
        setTimeout(() => alert(`🎉 Correct! You got it in ${this.guessCount} guesses!`), 100);
    }
}
