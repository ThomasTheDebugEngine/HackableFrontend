const burgerButton = document.querySelector(".burgerSvgDiv");

const homeMenuButton = document.querySelector("#homeButton");
const aboutMenuButton = document.querySelector("#aboutButton");
const projectMenuButton = document.querySelector("#projectButton");
const contactMenuButton = document.querySelector("#contactButton");

const contactForm = document.querySelector(".contactButton")

contactForm.addEventListener("click", submitForm);

function submitForm(){
    let NameField = document.querySelector(".nameInput").value;
    let emailField = document.querySelector(".emailInput").value;
    let textArea = document.querySelector(".messageInput").value;

    const InputArr = [NameField, emailField, textArea]
    validateInput(InputArr);
}

function validateInput(paramArr){
    let name = paramArr[0];
    let email = paramArr[1];
    let textArea = paramArr[2];
    
    
    if(nameIsValid(name) && emailIsValid(email)){
        const senObj = {
            nameField: name,
            emailField: email,
            textField: textArea
        }
        
        postData(senObj)
        .then(console.log("saved entry" + JSON.stringify(senObj) + " to database at localhost:2020"))
        .catch((err) => {
            throw Error("ERROR: POST failled " + err);
        });
    }
    else{
        throw Error("No hack today");
    }
}

async function postData(data){
    //const newUrl = new URL("") 
    const response = await fetch("http://f3e107d8.ngrok.io/",{
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    });

    alert("data posted check the server on localhost:2020");
}

function nameIsValid(nameInput){
    if(nameInput.length != 0){
        for (let idx = 0; idx < nameInput.length; idx++) {
            const char = nameInput[idx];
 
            var boolStatus = undefined;
            if(!char.match("[a-zA-Z]" || char.match("\d+"))){
                boolStatus = false;
                alert("please enter your \"real\" name");
                return false
            }
            else{
                boolStatus = true
            }
        }

        if(boolStatus != undefined) {
            return boolStatus;
        }
        else {
            throw Error("ERROR: Boolean status undefined")   
        }
    }
    else{
        alert("please enter more than 0 characters");
        throw Error("No hack today");
    }
}

function emailIsValid(emailInput){
    if(emailInput.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)){
        return true;
    }
    else{
        return false;
    }
}

function toggleDisplay(){
    document.querySelector("#navItems").classList.toggle("active");

    document.querySelector("#greetingText").classList.toggle("active");
    document.querySelector("#aboutFlex").classList.toggle("active");
    document.querySelector("#projectTitle").classList.toggle("active");
    document.querySelector("#scrollPointer").classList.toggle("active");
    document.querySelector("#projectGridContainer").classList.toggle("active");
    document.querySelector("#contactTitle").classList.toggle("active");
    document.querySelector("#formFlexContainer").classList.toggle("active");

}

burgerButton.addEventListener("click", toggleDisplay);

if(document.body.clientWidth <= 600){
    homeMenuButton.addEventListener("click", toggleDisplay);
    aboutMenuButton.addEventListener("click", toggleDisplay);
    projectMenuButton.addEventListener("click", toggleDisplay);
    contactMenuButton.addEventListener("click", toggleDisplay);
}
