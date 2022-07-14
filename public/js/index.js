const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checlLogged();

//LOGAR SISTEMA

document.getElementById("login-form").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccount(email);    

    if (!account){
        alert("Verifiue usuário e senha");
        return
    }

    if(account){
        if(account.password !== password){
            alert("Verifiue usuário e senha");
            return
        }

        saveSesssion(email, checkSession);

        window.location.href = "home.html";
    }
});

//CRIAR CONTA
document.getElementById("create-form").addEventListener("submit", function(e){
    e.preventDefault();   

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;

    if(password.length < 4 ){
        alert("A senha precisa ter no minímo 4 caracteres");
        return;
    }
    
    saveAccount({
        login: email,
        password: password,
        transactions: []
    });   

    myModal.hide();

    alert("Conta criada com sucesso");
});

function checlLogged(){
    if(session){
        session.setItem("logged", session);
        logged = session;
    }

    if(logged){
        saveSesssion(logged,session );
        window.location.href = "home.html";
    }
}

function saveAccount(data){
    localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSesssion(data, saveSession){
    if(saveSession){
        localStorage.setItem("session",data)
    }

    sessionStorage.setItem("logged",data);

}

function getAccount(key){
    const account = localStorage.getItem(key);
        if(account){
            return JSON.parse(account);
        }   
    return "";    
}