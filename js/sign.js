// Definindo as variaveis
let cadastro = document.querySelector('#cadastrar');
let login = document.querySelector('#login');
let btnColor = document.querySelector('.btnColor');

// Alternar entre login e cadastro
document.querySelector('#btnLogin').addEventListener('click', () => {
    login.style.left = "0px";
    cadastro.style.left = "340px";
    btnColor.style.left = "0px";
})

document.querySelector('#btnCadastrar').addEventListener('click', () => {
    login.style.left = "-450px";
    cadastro.style.left = "0px";
    btnColor.style.left = "114px";
})

// Link para o "Cadastre-se!"
document.getElementById('linkCadastrar').addEventListener('click', function(event) {
    login.style.left = "-450px";
    cadastro.style.left = "0px";
    btnColor.style.left = "114px";
});

// Voltar para o login
document.getElementById('openLogin').addEventListener('click', function(event) {

});

// MOSTRAR E OCULTAR SENHA
let eyebtn = document.querySelector('.eye');
let eyebtn1 = document.querySelector('.eye1');
let eyebtn2 = document.querySelector('.eye2');
eyebtn.addEventListener('click', function() {
    let passwordInput = document.querySelector('#password');
    if(passwordInput.getAttribute('type') != 'password') {
        passwordInput.setAttribute('type', 'password');
    } else {
        passwordInput.setAttribute('type', 'text');
    }
});
eyebtn1.addEventListener('click', function() {
    let passwordInput = document.querySelector('#password1');
    if(passwordInput.getAttribute('type') != 'password') {
        passwordInput.setAttribute('type', 'password');
    } else {
        passwordInput.setAttribute('type', 'text');
    }
});
eyebtn2.addEventListener('click', function() {
    let passwordInput = document.querySelector('#password2');
    if(passwordInput.getAttribute('type') != 'password') {
        passwordInput.setAttribute('type', 'password');
    } else {
        passwordInput.setAttribute('type', 'text');
    }
});


// FUNÇÃO DE CADASTRO
function cadastrar(event) {
    event.preventDefault();

    const nomeInput = document.querySelector('#cadastrar input[type="text"]');
    const emailInput = document.querySelector('#cadastrar input[type="email"]');
    const senhaInput = document.querySelector('#cadastrar input[id="password1"]');
    const confirmSenhaInput = document.querySelector('#cadastrar input[id="password2"]');   
    
    const inputs = document.querySelectorAll('#cadastrar input');
    
    let campoMaxCarac = false;

    // Verifica se todos os campos estão preenchidos
    if (nomeInput.value.trim() !== '' && emailInput.value.trim() !== '' && senhaInput.value.trim() !== '' && confirmSenhaInput.value.trim() !== '') {
        // Passar por cada input, observando sua quantidade de caracteres
        inputs.forEach(input => {
            // Verifica se os inputs tem mais que 200 caracteres
            if (input.value.length >= 200) {
                // Se sim, emitir um aviso
                console.log("A quantidade de caracteres é: " + input.value.length);
                const popup = document.getElementById('popup_erro_char');
                popup.classList.add('show');

                setTimeout(() => {
                    popup.classList.remove('show');
                }, 3000); // Popup com duração de 3s 
                
                campoMaxCarac = true; // O campo será inválido
            }
        });          
        
        // Se houver campos com mais de 200 caracteres, interromper o cadastro
        if (campoMaxCarac) {
            return;
        }  
        
        // Verificar se as senhas são iguais
        if (senhaInput.value !== confirmSenhaInput.value) {
            // Exibir uma mensagem
            confirmSenhaInput.setCustomValidity("As senhas são diferentes!");
            confirmSenhaInput.reportValidity();

            // Impede o cadastro até que as senhas sejam iguais
            return; 
        } else {
            // Limpar a mensagem de erro
            confirmSenhaInput.setCustomValidity("");
        }
        
        // Se o usuário tentar cadastrar um usuário já existente
        firebase.auth().signInWithEmailAndPassword(emailInput.value, senhaInput.value
        ).then(response => {
            // Exibir popup de usuário já cadastrado
            const popup = document.getElementById('popup_erro_user');
            popup.classList.add('show');

            setTimeout(() => {
                popup.classList.remove('show');
            }, 3000); // Popup com duração de 3s
        })

        // Cadastrar novo usuário
        firebase.auth().createUserWithEmailAndPassword(emailInput.value, senhaInput.value
        ).then(response => {
                // Exibir popup de usuário cadastrado
                const popup = document.getElementById('popup_cadastrar');
                popup.classList.add('show');

                setTimeout(() => {
                    popup.classList.remove('show');
                }, 3000); // Popup com duração de 3s

                // Voltar para o login
                login.style.left = "0px";
                cadastro.style.left = "340px";
                btnColor.style.left = "0px";

                // Apagar informações dos campos
                nomeInput.value='';
                emailInput.value='';  
                senhaInput.value=''; 
                confirmSenhaInput.value='';  
        })

        // Caso dê erro
        .catch(error => {
            // Se o usuário inserir uma senha com menos de 6 caracteres
            if(error.code === 'auth/weak-password') {
                // Exibir uma mensagem
                senhaInput.setCustomValidity("A senha deve ter mais que 6 caracteres!");
                senhaInput.reportValidity();
            }        
            
            else {
                // Exibir o erro
                console.error("Erro no login:", error); // Exibe o erro no console
                alert("Erro no login: " + error.message); // Exibe a mensagem de erro do Firebase
            }
        });
    }
    
    else {
        // Exibir popup se algum campo nao estiver preenchido
        const popup = document.getElementById('popup_preencher');
        popup.classList.add('show');

        setTimeout(() => {
            popup.classList.remove('show');
        }, 3000); // Popup com duração de 3s
    }
}

// FUNÇÃO DE LOGIN
function signin(event) {
    event.preventDefault();

    const nomeInput = document.querySelector('#login input[type="text"]');
    const emailInput = document.querySelector('#login input[type="email"]');
    const senhaInput = document.querySelector('#login input[type="password"]');
        
    const inputs = document.querySelectorAll('#login input');
    
    let campoMaxCarac = false

    // Verifica se ambos os campos estão preenchidos
    if (nomeInput.value.trim() !== '' && emailInput.value.trim() !== '' && senhaInput.value.trim() !== '') {
        // Passar por cada input, observando sua quantidade de caracteres
        inputs.forEach(input => {
            // Verifica se os inputs tem mais que 200 caracteres
            if (input.value.length >= 200) {
                // Se sim, emitir um aviso
                console.log("A quantidade de caracteres é: " + input.value.length);
                const popup = document.getElementById('popup_erro_char');
                popup.classList.add('show');

                setTimeout(() => {
                    popup.classList.remove('show');
                }, 3000); // Popup com duração de 3s 
                
                campoMaxCarac = true; // O campo será inválido
            }
        });          
        
        // Se houver campos com mais de 200 caracteres, interromper o cadastro
        if (campoMaxCarac) {
            return;
        }  
        
        firebase.auth().signInWithEmailAndPassword(emailInput.value, senhaInput.value
        ).then(response => {
            // Exibir popup de sucesso
            const popup = document.getElementById('popup_login');
            popup.classList.add('show');

            setTimeout(() => {
                popup.classList.remove('show');
            }, 3000); // Popup com duração de 3s

            // Redireciona para a página inicial
            window.location.href = "./index.html";
        })

        // Caso dê erro
        .catch(error => {
            // Exibir o erro
            console.error("Erro no login:", error); // Exibe o erro no console
            alert("Erro no login: " + error.message); // Exibe a mensagem de erro do Firebase
        });
    }
    
    else {
        // Exibir popup se algum campo nao estiver preenchido
        const popup = document.getElementById('popup_preencher');
        popup.classList.add('show');

        setTimeout(() => {
            popup.classList.remove('show');
        }, 3000); // Popup com duração de 3s
    }
}
