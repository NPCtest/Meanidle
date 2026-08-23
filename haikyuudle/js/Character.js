export class Character {
    constructor(data) {
        this.name = data.name;
        this.school = data.school;
        this.team = data.team || data.school;
        this.prefecture = data.prefecture;
        this.position = data.position;
        this.year = data.year;
        this.number = data.number;
        this.height = data.height;
        this.hair = data.hair;
        this.age = data.age || (data.year === 1 ? 16 : data.year === 2 ? 17 : data.year === 3 ? 18 : "Unknown");
        this.image = data.image || "";
    }

    // ฟังก์ชันเช็คค่าความถูกต้องเทียบกับตัวละครปริศนา (Target)
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
