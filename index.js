// textContainer variable
const textContainer = document.querySelector(".notepad-area");
const tools = document.querySelector(".button-dark-mode");
const fileButton = document.getElementById("file-button");
const fileInput = document.getElementById("file-input");
let scrollingTimer;

window.addEventListener('scroll', function() {
    // Select all elements with class 'card'
    const cards = this.document.querySelectorAll(".card");

    // Clear previous timers
    this.clearTimeout(scrollingTimer);

    // Apply no-transition class to all cards
    cards.forEach(card => {
        card.classList.add("no-transition");
    })    

    // When scrolling stops, remove all no-transition classes
    scrollingTimer = setTimeout(() => {
        cards.forEach(card => {
            card.classList.remove("no-transition");
        })
    }, 350);
});

tools.addEventListener("click", function () {    
    textContainer.focus();
})

fileButton.addEventListener("click", () => {
    fileInput.click();
})

fileInput.addEventListener("change", async () => {
    const [file] = fileInput.files;
    
    if(file) {
        textContainer.innerText = await file.text();
    }
})

// Function that handles light/night mode mode
function toggleLightMode () {
    let isNightMode = false;

    // Define properties for svg that will be inserted when light mode is toggled
    const newSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    newSvg.setAttribute('class', 'lightmode-button-svg');
    newSvg.setAttribute('height', '1em');
    newSvg.setAttribute('viewBox', '0 0 384 512');
    newSvg.innerHTML = '<path d="M144.7 98.7c-21 34.1-33.1 74.3-33.1 117.3c0 98 62.8 181.4 150.4 211.7c-12.4 2.8-25.3 4.3-38.6 4.3C126.6 432 48 353.3 48 256c0-68.9 39.4-128.4 96.8-157.3zm62.1-66C91.1 41.2 0 137.9 0 256C0 379.7 100 480 223.5 480c47.8 0 92-15 128.4-40.6c1.9-1.3 3.7-2.7 5.5-4c4.8-3.6 9.4-7.4 13.9-11.4c2.7-2.4 5.3-4.8 7.9-7.3c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-3.7 .6-7.4 1.2-11.1 1.6c-5 .5-10.1 .9-15.3 1c-1.2 0-2.5 0-3.7 0c-.1 0-.2 0-.3 0c-96.8-.2-175.2-78.9-175.2-176c0-54.8 24.9-103.7 64.1-136c1-.9 2.1-1.7 3.2-2.6c4.0-3.2 8.2-6.2 12.5-9c3.1-2 6.3-4.0 9.6-5.8c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-3.6-.3-7.1-.5-10.7-.6c-2.7-.1-5.5-.1-8.2-.1c-3.3 0-6.5 .1-9.8 .2c-2.3 .1-4.6 .2-6.9 .4z"/>';

    const nightmodeSvg = document.querySelector(".nightmode-button-svg");
    const toggleLightButton = document.querySelector(".nightmode-button");    
    const buttons = document.querySelectorAll(".button-row button");
    const navHeader = document.querySelector(".nav-header");
    const logo = document.querySelector(".logo img");
    const cards = document.querySelectorAll(".card");
    const cardHeader = document.querySelector(".card-h1");
    const sectionTwoContent = document.querySelector(".section-two-content");
    const sectionTwoParagraph = document.querySelector(".section-two-paragraph");
    const body = document.body;

    toggleLightButton.addEventListener("click", () => {
        isNightMode = !isNightMode;

        // To be resolved...
        textContainer.addEventListener("focus", () => {
            if(isNightMode) {
                //
            } else {
                //
            }
        })

        if(isNightMode) {
            nightmodeSvg.replaceWith(newSvg);
            logo.setAttribute('src', './public/images/vimer-light.png');
        } else {
            newSvg.replaceWith(nightmodeSvg);
            logo.setAttribute('src', './public/images/vimer2.png');
        }

        // Toggle the necessary classes that simulate the light mode
        body.classList.toggle("active");
        textContainer.classList.toggle("light-mode");
        navHeader.classList.toggle("nav-header-light");
        toggleLightButton.classList.toggle("lightmode-button");  
        cardHeader.classList.toggle("card-h1-light");
        sectionTwoContent.classList.toggle("section-two-content-light");
        sectionTwoParagraph.classList.toggle("section-two-paragraph-light");
        cards.forEach(card => {
            card.classList.toggle("card-light");
        })   
        buttons.forEach(button => {
            button.classList.toggle("button-light-mode");
        });
    });
};

// Function that toggles the tooltip menu
function toggleTooltips () {

    // Obtain all tooltips buttons
    const toggleButton = document.querySelector(".toggle-tooltips");
    const leftTooltips = document.querySelectorAll(".tooltip-container-button");
    const rightTooltips = document.querySelectorAll(".tooltip-container-button-last");

    // Apply / Remove class for each button in sequence depending on the current mode
    toggleButton.addEventListener("click", () => {        
        leftTooltips.forEach(tooltip => {
            if(tooltip.classList.contains("tooltip-container-button"))
                tooltip.classList.remove("tooltip-container-button")
            else
                tooltip.classList.add("tooltip-container-button")
            tooltip.classList.toggle("disable");                       
        })

        rightTooltips.forEach(tooltip => {
            if(tooltip.classList.contains("tooltip-container-button-last"))
                tooltip.classList.remove("tooltip-container-button-last");
            else
                tooltip.classList.add("tooltip-container-button-last");
            tooltip.classList.toggle("disable");
        });
    });
};

// Function that handles the scroll-to-top button behavior
function scrollToTop () {
    const arrowUpButtons = document.querySelectorAll(".go-up-button");

    arrowUpButtons.forEach(arrowUpButton => {
        arrowUpButton.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
};

function openFile () {
    // capture the entire div

    // To be resolved.
}

function selectFontStyle () {
    const note = "NOTE: Generic Font-family set to sans-serif";
    const query = "\n\nSpecify Font-family, make sure the family exists:";

    // Ask the user for the Font-Family
    const inputFont = prompt(note + query);

    // There will be no checks done for the input
    textContainer.style.fontFamily = inputFont + ", sans-serif";
}

function increaseFontSize () {
    /* Get an object containing all values of CSS properties of some element - editing area
     in this particular case */
    const computedStyle = window.getComputedStyle(textContainer);
    
    // Define maximum size
    let maximumSize = 48;
    
    // Obtain default font-size
    const defaultFontSize = computedStyle.getPropertyValue('font-size');    

    // Assign the starting value to the variable and start incrementing from there    
    let incrementedValue = parseFloat(defaultFontSize);
    incrementedValue += 2;

    // Assign newly created value to a variable and append 'px'
    let newSize = incrementedValue + 'px';
    
    // Condition for maximum size - 48px is the maximum
    if(incrementedValue <= maximumSize) {
        textContainer.style.fontSize = newSize;
    } else {
        alert("Maximum size reached.");
        return;
    }

    // Focus on container
    textContainer.focus();
}

function decreaseFontSize () {
    /* Get an object containing all values of CSS properties of some element - editing area
     in this particular case */
    const computedStyle = window.getComputedStyle(textContainer);

    // Define minimum size
    let minimumSize = 6;

    // Obtain default font-size
    const defaultFontSize = computedStyle.getPropertyValue('font-size');

    // Assign the starting value to the variable and start incrementing from there
    let decrementedValue = parseFloat(defaultFontSize);
    decrementedValue -= 2;

    // Assign newly created value to a variable and append 'px'
    let newSize = decrementedValue + 'px';

    // Condition for minimum size - 4px
    if(decrementedValue >= minimumSize) {
        textContainer.style.fontSize = newSize;
    } else {
        alert("Minimum size reached.");
        return;
    }
    // Focus on container
    textContainer.focus();
}

// Functions that handle text-decoration - Bold, Italic, Underline
function applyBold () {
    checkAndApplySelectionBold();    
}

function applyItalic () {
    checkAndApplySelectionItalic();
}

function applyUnderline () {
    checkAndApplySelectionUnderline();
}

function capitalizeWord () {
    checkAndApplySelectionCapitalize();
}

function applyBulletList () {
    const selectedText = window.getSelection().toString();

    if(selectedText) {
        // Create li html element and apply a class to it    
        const listElement = document.createElement('li');
        listElement.classList.add('custom-unordered-list');

        // Crate ul html element and apply a class to it
        const unorderedList = document.createElement('ul');
        unorderedList.classList.add('u-list');
        
        // Define range for beginning of the editable content until
        // the end of it
        let range = document.createRange();
        range.selectNodeContents(textContainer);

        // Check if range.extractContents() is faulty
        listElement.appendChild(range.extractContents());        
        unorderedList.appendChild(listElement);

        range.insertNode(unorderedList);        
    } else {
        document.addEventListener('keydown', function (event) {
            // When Enter is pressed, the next line starts with li

            // To be resolved.
        })
    }

    // Focus on container
    textContainer.focus();
}

function applyNumberedList () {
    const selectedText = window.getSelection().toString();

    if(selectedText) {
        // Create li html element and apply a class to it
        const listElement = document.createElement('li');
        listElement.classList.add('custom-ordered-list');

        // Crate ul html element and apply a class to it
        const orderedList = document.createElement('ul');
        orderedList.classList.add('u-list');

        // Define range for beginning of the editable content until
        // the end of it
        let range = document.createRange();
        range.selectNodeContents(textContainer);
        
        listElement.appendChild(range.extractContents());        
        orderedList.appendChild(listElement);

        range.insertNode(orderedList);
    } else {
        document.addEventListener('keydown', function (event) {
            // When Enter is pressed, the next line starts with li

            // To be resolved.
        })
    }

    // Focus on container
    textContainer.focus();
}

// Functions that control the alignment of a text within textContainer
function alignLeft () {    
    textContainer.style.textAlign = 'left';

    // Focus on container
    textContainer.focus();
}

function alignRight () {    
    textContainer.style.textAlign = 'right';

    // Focus on container
    textContainer.focus();
}

function alignCenter () {    
    textContainer.style.textAlign = 'center';

    // Focus on container
    textContainer.focus();
}

function alignJustify () {    
    textContainer.style.textAlign = 'justify';

    // Focus on container
    textContainer.focus();
}

function addHyperlink() {
    // Obtain user-selected text
    const selectedText = window.getSelection();    
    const isStyled = selectedText.anchorNode.parentElement.classList.contains('highlighted');
    
    // Defined regexPattern variable to ensure user included some of the necessary components of every URL.
    const regexPattern = /^(http|https|www|com)/;

    // Check if the selection is empty, if not execute if block
    if(selectedText) {
        if(isStyled) {
            // Since Range.startContainer and Range.endContainer both refer to the same 
            // node, range.commonAncestorContainer is that node
            const parentElement = selectedText.anchorNode.parentElement;
            parentElement.replaceWith(document.createTextNode(parentElement.textContent));
        } else {
            // Convert to lowercase and search for blank spaces to test for validity
            const URL = prompt("Enter a valid URL: ");
            let newURL = URL.toLowerCase();

            // Testing the regexPattern against user-prompted URL
            if(regexPattern.test(newURL)) {            
                let range = selectedText.getRangeAt(0);            

                // Create anchor element to handle redirection
                const link = document.createElement('a');
                link.setAttribute("class", "highlighted");          
                link.href = newURL;
                link.target = "_blank";
                link.textContext = selectedText;

                // Function used to assign necessary href to a hyperlinked element
                function handleDynamicAnchor() {
                    window.open(newURL, "_blank");
                }
                link.onclick = handleDynamicAnchor;

                // Wrap the necessary (selected) part with an anchor tag containing all necessary attributes            
                range.surroundContents(link);
            }
        }
    } else {
        alert("No text selected!");
    }

    // Focus on container
    textContainer.focus();
}

function exportAsTxt () {
    var regexPattern = /[!"#$%&\/=?*,.¸~ˇ^˘°˛`˙´˝¨]+/;    
    const nameOfTheFile = prompt("Enter the name of the file:");    

    if (regexPattern.test(nameOfTheFile)) {
        alert("Invalid File Name.");
        return;
    } else {
        // Retrieve the text from the textContainer
        const text = textContainer.innerHTML;
        // console.log(text);

        if (text) {
            // Creating a Blob object - Binary Large Object
            const blob = new Blob([text], { type : 'text/plain'});
            
            // Creating a temporary link to download the Blob
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = nameOfTheFile + ".txt";

            a.click();   
        } else {
            alert("No text entered.");
        }
    } 

    // Focus on container
    textContainer.focus();
}

// Separate into three functions :)) Refer to the one on PC
function checkAndApplySelectionBold() {
    // Fetch the text user selected
    const selectedText = window.getSelection();
    const isStyled = selectedText.anchorNode.parentElement.classList.contains('bolded');

    // Check if selectedText is empty - If yes, this means user chose nothing
    if(selectedText) {
        /* Define range using user-chosen selection
         Using this range we can wrap html around appropriate piece of text */
        let range = selectedText.getRangeAt(0);        

        if(isStyled) {
            // Since Range.startContainer and Range.endContainer both refer to the same 
            // node, range.commonAncestorContainer is that node
            const parentElement = selectedText.anchorNode.parentElement;
            parentElement.replaceWith(document.createTextNode(parentElement.textContent));
        } else {
            // Defining html element that is to be used when wrapping a text
            let span = document.createElement('span');
            span.setAttribute('class', 'bolded');
            span.textContent = window.getSelection().toString();

            // Surround chosen text with created html element
            range.surroundContents(span);   
        }
    }

    // Focus on container
    textContainer.focus();
}

function checkAndApplySelectionItalic() {
    // Fetch the text user selected
    const selectedText = window.getSelection();
    const isStyled = selectedText.anchorNode.parentElement.classList.contains('italic');

    // Check if selectedText is empty - If yes, this means user chose nothing
    if(selectedText) {
        /* Define range using user-chosen selection
         Using this range we can wrap html around appropriate piece of text */
        let range = selectedText.getRangeAt(0);        

        if(isStyled) {
            // Since Range.startContainer and Range.endContainer both refer to the same 
            // node, range.commonAncestorContainer is that node
            const parentElement = selectedText.anchorNode.parentElement;
            parentElement.replaceWith(document.createTextNode(parentElement.textContent));
        } else {
            // Defining html element that is to be used when wrapping a text
            let span = document.createElement('span');
            span.setAttribute('class', 'italic');
            span.textContent = window.getSelection().toString();

            // Surround chosen text with created html element
            range.surroundContents(span);   
        }
    }

    // Focus on container
    textContainer.focus();
}

function checkAndApplySelectionUnderline() {
    // Fetch the text user selected
    const selectedText = window.getSelection();
    const isStyled = selectedText.anchorNode.parentElement.classList.contains('underlined');

    // Check if selectedText is empty - If yes, this means user chose nothing
    if(selectedText) {
        /* Define range using user-chosen selection
         Using this range we can wrap html around appropriate piece of text */
        let range = selectedText.getRangeAt(0);        

        if(isStyled) {
            // Since Range.startContainer and Range.endContainer both refer to the same 
            // node, range.commonAncestorContainer is that node
            const parentElement = selectedText.anchorNode.parentElement;
            parentElement.replaceWith(document.createTextNode(parentElement.textContent));
        } else {
            // Defining html element that is to be used when wrapping a text
            let span = document.createElement('span');
            span.setAttribute('class', 'underlined');
            span.textContent = window.getSelection().toString();

            // Surround chosen text with created html element
            range.surroundContents(span);   
        }
    }

    // Focus on container
    textContainer.focus();
}

function checkAndApplySelectionCapitalize() {
    // Fetch the text user selected
    const selectedText = window.getSelection();
    const isStyled = selectedText.anchorNode.parentElement.classList.contains('word-capitalize');

    // Check if selectedText is empty - If yes, this means user chose nothing
    if(selectedText) {
        /* Define range using user-chosen selection
         Using this range we can wrap html around appropriate piece of text */
        let range = selectedText.getRangeAt(0);        

        if(isStyled) {
            // Since Range.startContainer and Range.endContainer both refer to the same 
            // node, range.commonAncestorContainer is that node
            const parentElement = selectedText.anchorNode.parentElement;
            parentElement.replaceWith(document.createTextNode(parentElement.textContent));
        } else {
            // Defining html element that is to be used when wrapping a text
            let span = document.createElement('span');
            span.setAttribute('class', 'word-capitalize');
            span.textContent = window.getSelection().toString();

            // Surround chosen text with created html element
            range.surroundContents(span);   
        }
    }

    // Focus on container
    textContainer.focus();
}

// Redirect functions for html cards
function redirect(id) {
    if(id === "calculators")
        window.open("https://github.com/faticamer/advanced-console-calculators", "_blank");
    else if (id === "canteenSystem")
        window.open("https://github.com/faticamer/canteen-system", "_blank");
    else if (id === "wifiGenerator")
        window.open("https://github.com/faticamer/wifi-qr-code", "_blank");
    else if (id === "capstone")
        window.open("https://github.com/faticamer/capstone-project", "_blank");
    else {
        alert("Error");
        return;
    }    
}

function redirectToVimer() {
    window.open("https://github.com/faticamer/vimer-texteditor", "_blank");
}

toggleLightMode();
toggleTooltips();
scrollToTop();