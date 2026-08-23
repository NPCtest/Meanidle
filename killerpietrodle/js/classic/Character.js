export class Character {
    constructor(data) {
        this.name = data.name;
        this.gender = data.gender;
        this.age = data.age;
        this.hair = data.hair;
        this.height = data.height;
        this.occupation = data.occupation;
        this.affiliation = data.affiliation;
        this.firstArc = data.firstArc;
        this.image = data.image || "";
    }

    compareString(attribute, targetCharacter) {
        if (this[attribute] === targetCharacter[attribute]) {
            return { text: `${this[attribute]} ✅`, class: 'correct' };
        }
        return { text: `${this[attribute]} ❌`, class: 'incorrect' };
    }

    compareNumber(attribute, targetCharacter) {
        if (this[attribute] === targetCharacter[attribute]) {
            return { text: `${this[attribute]} ✅`, class: 'correct' };
        }
        if (this[attribute] === "Unknown" || targetCharacter[attribute] === "Unknown") {
            return { text: `${this[attribute]} ❌`, class: 'incorrect' };
        }
        return this[attribute] < targetCharacter[attribute]
            ? { text: `${this[attribute]} 🔼`, class: 'incorrect' }
            : { text: `${this[attribute]} 🔽`, class: 'incorrect' };
    }
}
