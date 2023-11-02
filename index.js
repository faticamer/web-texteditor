const textContainer = document.querySelector(".notepad-area");
const tools = document.querySelector(".button-dark-mode");
const fileButton = document.getElementById("file-button");
const fileInput = document.getElementById("file-input");
const clearButton = document.querySelector(".clear-btn");
let timeoutId;

/*Commit test*/

window.addEventListener('scroll', function() {
    // Select all elements with class 'card'
    const cards = this.document.querySelectorAll(".card");

    // Clear previous timers
    this.clearTimeout(timeoutId);

    // Apply no-transition class to all cards
    cards.forEach(card => {
        card.classList.add("no-transition");
    })    

    // When scrolling stops, remove all no-transition classes
    timeoutId = setTimeout(() => {
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

textContainer.addEventListener("input", function () {
    const charField = document.querySelector(".character-count p:nth-child(2)");
    const text = textContainer.textContent;
    const textWithoutWhitespace = text.replace(/\s/g, '');
    const characterCount = textWithoutWhitespace.length;

    // Update the <p> element's content with the character count
    charField.textContent = `Char count: ${characterCount}`;
    
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
        wrapWordsInSpan();  // Wraps each word in its own span, so each word can be modified separately without using messy logic 
                            // and trying to cover sa many edge cases as possible
        placeCursorAtEnd(); // Place the cursor at the end of the text after the delay
        clearEmptySpans();  // If there are any empty spans this function call will handle them.
    }, 1000);
});

clearButton.addEventListener("mouseover", function() {
    const svg = document.querySelector(".clear-btn svg");

    if(clearButton.classList.contains("clear-btn-light")) {        
        clearButton.classList.add("clear-btn-hover-light");
        svg.classList.add("clear-btn-svg-light");
    } else {        
        clearButton.classList.add("clear-btn-hover");
        svg.classList.add("clear-btn-svg");
    }
});

clearButton.addEventListener("mouseout", function() {
    const svg = document.querySelector(".clear-btn svg");

    if(clearButton.classList.contains("clear-btn-light")) {        
        clearButton.classList.remove("clear-btn-hover-light");
        svg.classList.remove("clear-btn-svg-light");
    } else {        
        clearButton.classList.remove("clear-btn-hover");
        svg.classList.remove("clear-btn-svg");
    }
})

clearButton.addEventListener("click", function() {
    textContainer.textContent = "";
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
    const navh2 = document.querySelector(".nav-h2");
    const time = document.querySelector(".time");
    const navLinks = document.querySelectorAll(".nav-links-a");
    const logo = document.querySelector(".logo img");
    const cards = document.querySelectorAll(".card");
    const cardHeader = document.querySelector(".card-h1");
    const sectionTwoContent = document.querySelector(".section-two-content");
    const sectionTwoParagraph = document.querySelector(".section-two-paragraph");
    const characterCount = document.querySelector(".character-count");
    const body = document.body;

    toggleLightButton.addEventListener("click", () => {
        isNightMode = !isNightMode;

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
        navh2.classList.toggle("nav-h2-light");
        time.classList.toggle("time-light");
        toggleLightButton.classList.toggle("lightmode-button");  
        cardHeader.classList.toggle("card-h1-light");
        sectionTwoContent.classList.toggle("section-two-content-light");
        sectionTwoParagraph.classList.toggle("section-two-paragraph-light");
        characterCount.classList.toggle("character-count-light");
        clearButton.classList.toggle("clear-btn-light")
        cards.forEach(card => {
            card.classList.toggle("card-light");
        })   
        buttons.forEach(button => {
            button.classList.toggle("button-light-mode");
        });
        navLinks.forEach(navLink => {
            navLink.classList.toggle("nav-links-a-light");
        })
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

function selectFontStyle() {
    const note = "NOTE: Generic Font-family set to sans-serif";
    const query = "\n\nSpecify Font-family, make sure the family exists:";
    const defaultFont = "Poppins, sans-serif";

    const inputFont = prompt(note + query);
    if(inputFont === null) {
        textContainer.style.fontFamily = defaultFont;
    } else {
        const finalFont = inputFont + ", sans-serif";

        // There will be no checks done for the input
        textContainer.style.fontFamily = finalFont;
        const spanElements = textContainer.querySelectorAll('span')
        spanElements.forEach(spanElement => {
            spanElement.style.fontFamily = finalFont;
        })
    }
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
    checkAndApplySelectionBoldV2();    
}

function applyItalic () {
    checkAndApplySelectionItalicV2();
}

function applyUnderline () {
    checkAndApplySelectionUnderlineV2();
}

function capitalizeWord () {
    checkAndApplySelectionCapitalizeV2();
}

// Restricted functionality
function applyBulletList () {
    // const selectedText = window.getSelection().toString();
    const selectedPortion = window.getSelection();    

    // Create li html element and apply a class to it    
    const listElement = document.createElement('li');
    listElement.classList.add('custom-unordered-list');

    // Crate ul html element and apply a class to it
    const unorderedList = document.createElement('ul');
    unorderedList.classList.add('u-list');
    
    // 1. Case when container is empty - trim used for getting rid of white spaces
    if(textContainer.textContent.trim() === '') {
        // Here we need to check if user is trying to disable the li elements
        let range = document.createRange();
        range.selectNodeContents(textContainer);        
        range.insertNode(unorderedList);
        unorderedList.appendChild(listElement);

    } else if (selectedPortion) {
        if(hasListElements(selectedPortion)) {
            // Get the common ancestor element
            let range = document.createRange();
            range.selectNodeContents(selectedPortion.anchorNode);
            const commonAncestor = range.commonAncestorContainer;            

            // Check if the common ancestor is an element node - it could be a text node
            if(commonAncestor.nodeType === Node.ELEMENT_NODE) { // not satisfied                
                // Iterate over child nodes
                const childNodes = commonAncestor.childNodes;                
                for(let i = 0; i < childNodes.length; i++) {
                    const node = childNodes[i];

                    // Check if node is within range
                    if(range.intersectsNode(node)) {
                        node.replaceWith(document.createTextNode(node.textContent + "\n"));
                    }
                } // End of loop
                
                // Removing the ul as well
                commonAncestor.replaceWith(document.createTextNode(commonAncestor.textContent));
                return;
            }
        } else {            
            // Define range
            let range = document.createRange();
            range.selectNodeContents(selectedPortion.anchorNode);
            range.surroundContents(listElement);
            
            // Range must be updated again, since new element was inserted, and previously detected anchorNode is now different
            range.selectNodeContents(selectedPortion.anchorNode.parentNode);

            // Add li items
            range.surroundContents(unorderedList); 
        }
    } else {
        // Temporary adjustment
        alert("Not possible to implement bullet list there.");
    }

    // Focus on container
    textContainer.focus();
}

// Restricted functionality
function applyNumberedList () { 
    // const selectedText = window.getSelection().toString();
    const selectedPortion = window.getSelection();    

    // Create li html element and apply a class to it    
    const listElement = document.createElement('li');
    listElement.classList.add('custom-ordered-list');

    // Crate ul html element and apply a class to it
    const unorderedList = document.createElement('ul');
    unorderedList.classList.add('u-list');
    
    // 1. Case when container is empty - trim used for getting rid of white spaces
    if(textContainer.textContent.trim() === '') {
        // Here we need to check if user is trying to disable the li elements
        let range = document.createRange();
        range.selectNodeContents(textContainer);        
        range.insertNode(unorderedList);
        unorderedList.appendChild(listElement);

    } else if (selectedPortion) {        
        if(selectedPortion.rangeCount > 0) {
            const range = selectedPortion.getRangeAt(0);

            // Get the common ancestor element
            const commonAncestor = range.commonAncestorContainer;            

            // Check if the common ancestor is an element node - it could be a text node
            if(commonAncestor.nodeType === Node.ELEMENT_NODE) {
                // Iterate over child nodes
                const childNodes = commonAncestor.childNodes;                
                for(let i = 0; i < childNodes.length; i++) {
                    const node = childNodes[i];

                    // Check if node is within range
                    if(range.intersectsNode(node)) {
                        node.replaceWith(document.createTextNode(node.textContent + "\n"));
                    }
                }
                // Removing the ul as well
                commonAncestor.replaceWith(document.createTextNode(commonAncestor.textContent));
            }
        } else {
            // Define range
            let range = document.createRange();
            range.selectNodeContents(selectedPortion.anchorNode);
            range.surroundContents(listElement);
            
            // Range must be updated again, since new element was inserted, and previously detected anchorNode is now different
            range.selectNodeContents(selectedPortion.anchorNode.parentNode);

            // Add li items
            range.surroundContents(unorderedList); 
        }
    } else {
        // Temporary adjustment
        alert("Not possible to implement bullet list there.");
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

    
    /* Fetch the current Font Family
    / Get the computed style */
    const computedStyle = window.getComputedStyle(textContainer);

    // Get the font family
    const capturedFontFamily = computedStyle.getPropertyValue('font-family');   

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

                // Set the span's font-family depending on text container's font-family
                link.style.fontFamily = capturedFontFamily;
            }
        }
    } else {
        alert("No text selected!");
    }

    // Focus on container
    textContainer.focus();
}

// New functionality : Remove all pre-defined styles for pasted text
function purifyContent() {
    const range = document.createRange();    
    range.selectNodeContents(textContainer);    
    const childSpan = range.extractContents(); // This is a document fragment

    // Replace child node's content (span) with the plain text to remove predefined styling
    textContainer.textContent = childSpan.textContent;

    textContainer.focus();
}

function exportAsTxt () {    
    const range = document.createRange();
    range.selectNodeContents(textContainer);
    const fragment = range.extractContents(); // Removes content and creates Document Fragment

    var regexPattern = /[!"#$%&\/=?*,.¸~ˇ^˘°˛`˙´˝¨]+/;
    const nameOfTheFile = prompt("Enter the name of the file:");

    if(nameOfTheFile.length === 0) {
        alert("Name cannot be empty.");
        return;
    }

    if (regexPattern.test(nameOfTheFile)) {
        alert("Invalid File Name.");
        return;
    } else {
        // Retrieve the text from the textContainer        
        const text = fragment.textContent;
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
    // Reset styles in the container since extractContents() removes everything within range
    textContainer.appendChild(fragment);

    // Focus on container
    textContainer.focus();
}

function checkAndApplySelectionBoldV2() {
    // Get user selection
    const selection = window.getSelection();

    if (selection.rangeCount >= 0) {
        const range = selection.getRangeAt(0);        
        if (
            range.startContainer === range.endContainer &&  // Start and end containers are the same
            range.startOffset < range.endOffset &&           // Start offset is before the end offset
            range.startContainer.nodeType === Node.TEXT_NODE // Start container is a text node
          ) {
            // User selected a single word
            const spanElement = range.startContainer.parentNode;            

            // Apply a class if there isn't one, deactivate if there is one
            if(spanElement.classList.contains('bolded')) {
                spanElement.classList.remove('bolded');
            } else {
                spanElement.classList.add('bolded');
            }
          }
  
        // Clone the content within the range
        const clonedContent = range.cloneContents();             

        // Crate a temporary div to manipulate the cloned content
        const tempDiv = document.createElement('div');
        tempDiv.appendChild(clonedContent);        

        // Get all the spans within temp div
        const spanElements = tempDiv.querySelectorAll('span');        
  
        // Apply the specified class to each span
        spanElements.forEach(spanElement => {            
            spanElement.classList.toggle('bolded');            
        });
        
        // Extract into function - but first modify for single word
        range.deleteContents(); // works in pair with clearEmptySpans
                                // Ensures that the span content gets cleared
        insertChildren(tempDiv, range);

        range.commonAncestorContainer.normalize();
        clearEmptySpans(); // clear any empty spans        
    }

    // Place the cursor at the end of the selection - deactivate selection
    placeCursor();

    // Focus on container
    textContainer.focus();
}

function checkAndApplySelectionItalicV2() {
    // Get user selection
    const selection = window.getSelection();

    if (selection.rangeCount >= 0) {
        const range = selection.getRangeAt(0);        
        if (
            range.startContainer === range.endContainer &&  // Start and end containers are the same
            range.startOffset < range.endOffset &&           // Start offset is before the end offset
            range.startContainer.nodeType === Node.TEXT_NODE // Start container is a text node
          ) {
            // User selected a single word
            const spanElement = range.startContainer.parentNode;            

            // Apply a class if there isn't one, deactivate if there is one
            if(spanElement.classList.contains('italic')) {
                spanElement.classList.remove('italic');
            } else {
                spanElement.classList.add('italic');
            }
          }
  
        // Clone the content within the range
        const clonedContent = range.cloneContents();               

        // Crate a temporary div to manipulate the cloned content
        const tempDiv = document.createElement('div');
        tempDiv.appendChild(clonedContent);        

        // Get all the spans within temp div
        const spanElements = tempDiv.querySelectorAll('span');        
  
        // Apply the specified class to each span
        spanElements.forEach(spanElement => {            
            spanElement.classList.toggle('italic');            
        });
        
        // Extract into function - but first modify for single word
        range.deleteContents(); // works in pair with clearEmptySpans
                                // Ensures that the span content gets cleared
        insertChildren(tempDiv, range);

        range.commonAncestorContainer.normalize();
        clearEmptySpans(); // clear any empty spans        
    }

    // Place the cursor at the end of the selection - deactivate selection
    placeCursor();

    // Focus on container
    textContainer.focus();
}

function checkAndApplySelectionUnderlineV2() {
    // Get user selection
    const selection = window.getSelection();

    if (selection.rangeCount >= 0) {
        const range = selection.getRangeAt(0);        
        if (
            range.startContainer === range.endContainer &&  // Start and end containers are the same
            range.startOffset < range.endOffset &&           // Start offset is before the end offset
            range.startContainer.nodeType === Node.TEXT_NODE // Start container is a text node
          ) {
            // User selected a single word
            const spanElement = range.startContainer.parentNode;            

            // Apply a class if there isn't one, deactivate if there is one
            if(spanElement.classList.contains('underlined')) {
                spanElement.classList.remove('underlined');
            } else {
                spanElement.classList.add('underlined');
            }
          }
  
        // Clone the content within the range
        const clonedContent = range.cloneContents();             

        // Crate a temporary div to manipulate the cloned content
        const tempDiv = document.createElement('div');
        tempDiv.appendChild(clonedContent);        

        // Get all the spans within temp div
        const spanElements = tempDiv.querySelectorAll('span');        
  
        // Apply the specified class to each span
        spanElements.forEach(spanElement => {            
            spanElement.classList.toggle('underlined');            
        });
        
        // Extract into function - but first modify for single word
        range.deleteContents(); // works in pair with clearEmptySpans
                                // Ensures that the span content gets cleared
        insertChildren(tempDiv, range);

        range.commonAncestorContainer.normalize();
        clearEmptySpans(); // clear any empty spans        
    }

    // Place the cursor at the end of the selection - deactivate selection
    placeCursor();

    // Focus on container
    textContainer.focus();
}


function checkAndApplySelectionCapitalizeV2() {
    // Get user selection
    const selection = window.getSelection();

    if (selection.rangeCount >= 0) {
        const range = selection.getRangeAt(0);        
        if (
            range.startContainer === range.endContainer &&  // Start and end containers are the same
            range.startOffset < range.endOffset &&           // Start offset is before the end offset
            range.startContainer.nodeType === Node.TEXT_NODE // Start container is a text node
          ) {
            // User selected a single word
            const spanElement = range.startContainer.parentNode;            

            // Apply a class if there isn't one, deactivate if there is one
            if(spanElement.classList.contains('word-capitalize')) {
                spanElement.classList.remove('word-capitalize');
            } else {
                spanElement.classList.add('word-capitalize');
            }
          }
  
        // Clone the content within the range
        const clonedContent = range.cloneContents();               

        // Crate a temporary div to manipulate the cloned content
        const tempDiv = document.createElement('div');
        tempDiv.appendChild(clonedContent);        

        // Get all the spans within temp div
        const spanElements = tempDiv.querySelectorAll('span');        
  
        // Apply the specified class to each span
        spanElements.forEach(spanElement => {            
            spanElement.classList.toggle('word-capitalize');            
        });
        
        // Extract into function - but first modify for single word
        range.deleteContents(); // works in pair with clearEmptySpans
                                // Ensures that the span content gets cleared
        insertChildren(tempDiv, range);

        range.commonAncestorContainer.normalize();
        clearEmptySpans(); // clear any empty spans        
    }

    // Place the cursor at the end of the selection - deactivate selection
    placeCursor();

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

function dropHandler(ev) {
    console.log("File(s) dropped");

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        [...ev.dataTransfer.items].forEach((item, i) => {
        // If dropped items aren't files, reject them
        if (item.kind === "file") {
            const file = item.getAsFile();
            // console.log(`… file[${i}].name = ${file.name}`);

            const reader = new FileReader();
            reader.onload = function (event) {
                const fileContent = event.target.result;

                // Insert the file content in notepad area
                textContainer.innerHTML += fileContent;
            };

            // Read the file as text
            reader.readAsText(file);
        }
        });
    } else {
        // Use DataTransfer interface to access the file(s)
        [...ev.dataTransfer.files].forEach((file, i) => {
        console.log(`… file[${i}].name = ${file.name}`);
        });
    }
}

function clear() {
    textContainer.textContent = "";
}
  
function dragOverHandler(ev) {
    // console.log("File(s) in drop zone");

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
}

function hasListElements(selection) {
    const range = selection.getRangeAt(0); // Assuming it's the first range

    // Iterate through nodes in the range
    const walker = document.createTreeWalker(range.commonAncestorContainer, NodeFilter.SHOW_ELEMENT);
    while (walker.nextNode()) {
        if (walker.currentNode.tagName.toLowerCase() === 'li') {
            return true; // Found an <li> element
        }
    }

    return false; // No <li> elements found in the selection
}

function placeCursor() {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const endContainer = range.endContainer;
    const endOffset = range.endOffset;

    // Set the range to the end of the selection
    range.setStart(endContainer, endOffset);
    range.setEnd(endContainer, endOffset);
    
    // Remove the selection
    window.getSelection().removeAllRanges();

    // Place the cursor at the end of the selection
    const cursorRange = document.createRange();
    cursorRange.setStart(endContainer, endOffset);
    cursorRange.setEnd(endContainer, endOffset);

    const cursorSelection = window.getSelection();
    cursorSelection.removeAllRanges();
    cursorSelection.addRange(cursorRange);
}

// Decide when to call this function?
function wrapWordsInSpan() {
    // Get the textContent of textContainer
    const textContent = textContainer.textContent;

    // Split the text into words using regex
    const words = textContent.split(/\s+/);

    // Clear the content of textContainer
    textContainer.innerHTML = '';

    // Create and append a <span> element for each word, preserving white spaces
    for(const word of words) {
        const span = document.createElement('span');
        
        if(isWordWrapped(word)) {
            span.textContent = word;
        } else {    
            span.textContent = word;
            textContainer.appendChild(span);
        }

        // Append a space character after each word
        const space = document.createTextNode(' ');
        textContainer.appendChild(space);

        // Helper function to check if a word is wrapped in a <span>
        function isWordWrapped(word) {
            // Replace leading and trailing space characters
            const trimmedWord = word.trim();            
        
            // Create a temporary <div> and set its HTML content to the word
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = trimmedWord;
        
            // Check if there is a <span> within div
            return tempDiv.querySelector('span') !== null;
        }
    }
}

/**
 * Functions that aren't related to text modifications
 * 
 * updateClock()
 * 
 * redirectToVimer()
 * 
 * clearEmptySpans()
 * 
 * insertChildren()
 * 
 * placeCursorAtEnd()
 */

function updateClock() {
    const clockTitle = document.getElementById("time");

    setInterval(function() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        // Determine AM/PM
        const ampm = hours >= 12 ? "PM" : "AM";

        // Convert to 12/hr clock
        const formattedHours = hours % 12 || 12;

        // Format : HH/MM/SS
        const timeString = `${formattedHours}:${(minutes < 10 ? '0' : '') + minutes}:${(seconds < 10 ? '0' : '') + seconds} ${ampm}`;

        // Update the title in HTML
        clockTitle.textContent = timeString;
    }, 1000);
}

function redirectToVimer() {
    window.open("https://github.com/faticamer/vimer-texteditor", "_blank");
}

function clearEmptySpans() {
    // Select all span elements from a contenteditable div (textContainer)
    const spans = textContainer.querySelectorAll('span');

    spans.forEach(span => {
        if(span.textContent.trim() === '') {
            // Remove the empty <span> element
            span.parentNode.removeChild(span);
        }
    })
}

function insertChildren(tempDiv, range) {
    const nodes = []; // Create an empty array that will hold nodes within tempDiv (argument)
    for ( let i = 0; i < tempDiv.childNodes.length; i++ ) {
        const child = tempDiv.childNodes[i];
        nodes.push(child);
    }
    /**
     * I couldn't figure out why, but if the counter started from 0, each inserted node would be in reverse
     * If there was a sentence "This was a sample text" and user chose to apply Bold style to "sample text"
     * the end result would be something like this "This was textsample". It would insert it the other way around, which
     * would probably happen with all other cases. Also, one might notice that one for could've been used to insert 
     * all the nodes, however, there was a bug in that case as well, where spans (individiual words) were not separated 
     * from each other. So the end result in this case was something like "This was a sampletext." The style would be
     * applied, but the press of any button would merge the words together. I could not figure out why but noticed that two
     * loops solved this issue without any complex logic.
     */
    for ( let i = nodes.length - 1; i >= 0; i--) {
        range.insertNode(nodes[i]);
    }
}

function placeCursorAtEnd() {
    // Create a range
    const range = document.createRange();

    // Set the range to the end of the content within the div
    range.selectNodeContents(textContainer);
    range.collapse(false); // Collapse the range to the end

    // Create a selection and set the range
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
}
  
updateClock();
toggleLightMode();
toggleTooltips();
scrollToTop();