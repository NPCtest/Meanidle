export class Character {
    constructor(data) {
        this.name = data.name;
        this.gender = data.gender;
        this.eye = data.eye;
        this.age = data.age;
        this.hair = data.hair;
        this.height = data.height;
        this.weight = data.weight;
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

    compareArc(attribute, targetCharacter) {
        const arcOrder = [
            "Amusement Park Arc",
            "Lab Arc",
            "Death Row Prisoners Arc",
            "JCC Transfer Exams Arc",
            "JCC Infiltration Arc",
            "Taro Sakamoto's Past Arc",
            "Bangkok Arc",
            "Assassin Exhibition Arc",
            "JAA Jail Arc",
            "New JAA Arc"
        ];

        if (this[attribute] === targetCharacter[attribute]) {
            return { text: `${this[attribute]} ✅`, class: 'correct' };
        }
        if (this[attribute] === "Unknown" || targetCharacter[attribute] === "Unknown") {
            return { text: `${this[attribute]} ❌`, class: 'incorrect' };
        }

        const thisIdx = arcOrder.indexOf(this[attribute]);
        const targetIdx = arcOrder.indexOf(targetCharacter[attribute]);

        if (thisIdx === -1 || targetIdx === -1) {
            return { text: `${this[attribute]} ❌`, class: 'incorrect' };
        }

        return thisIdx < targetIdx
            ? { text: `${this[attribute]} 🔼`, class: 'incorrect' }
            : { text: `${this[attribute]} 🔽`, class: 'incorrect' };
    }
}
