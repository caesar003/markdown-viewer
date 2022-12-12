"use strict";

const placeholder = `
# Header 1
## Header 2
### Third level header
#### Even smaller one
##### Smaller one
###### The smallest header


## This is how we create tables 
| Tables   |      Are      |  Cool |
|----------|:-------------:|------:|
| col 1 is |  left-aligned | $1600 |
| col 2 is |    centered   |   $12 |
| col 3 is | right-aligned |    $1 |


## There are lists as well
* item 1
* item two
* item four

1. rule number one
2. next rule
3. another rule


## Text formatting
**bold** _italic_ ~strike~


## We can make checkboxes

- [ ] do housework
- [x] get kids from school
- [x] go to gas station

## We can  write \`code\` like \`\<hr \/\>\`

## Or a block level code like this
\`\`\`js
"use strict";

console.log("This is freakin awesome....!");
\`\`\`

## Quote
> The best preparation for tomorrow is doing your best today

## We can also attach images
![cute baby](https://www.brighthorizons.com/resources/-/media/BH/Corporate/FamilyResources/eFamilyNews461x409/what-babies-think.ashx?h=556&w=740&la=en&hash=15951D0310DB6233FFC1E03835EC5B16)
`;
const preview = document.getElementById("preview");
const editor = document.getElementById("editor");
const clearBtn = document.getElementById("clear");
const toggleBtns = document.querySelectorAll(".button-toggle");

editor.value = placeholder;

class Mark {
    constructor() {}

    parse(text = editor.value) {
        preview.innerHTML = marked.parse(text);
    }

    clear() {
        // console.log("clearing text area");
        editor.value = "";
        this.parse();
        editor.focus();
    }
    split(e) {
        const { id } = e.target.dataset;
        const el = document.getElementById(id);
        // case 1 pencil
        // case 2 eye
        // case 3 both;
        this.removeActive(el);
        el.classList.add("active");
    }
    removeActive() {
        toggleBtns.forEach((button) => button.classList.remove("active"));
    }
}

const kraM = new Mark();

toggleBtns.forEach((button) => {
    button.addEventListener("click", (e) => kraM.split(e));
});

// handle tab key to indent instead of moving to another element
editor.addEventListener("keydown", function (e) {
    if (e.code === "Tab") {
        e.preventDefault();
        const start = this.selectionStart;
        const end = this.selectionEnd;

        this.value =
            this.value.substring(0, start) + "\t" + this.value.substring(end);

        this.selectionStart = this.selectionEnd = start + 1;
    }
});

editor.addEventListener("keyup", (e) => {
    kraM.parse();
});

clearBtn.addEventListener("click", () => kraM.clear());

kraM.parse(placeholder);
