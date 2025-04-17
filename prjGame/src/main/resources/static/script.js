// Variáveis Globais -- usaremos mais tarde
let jogos = [];
let posicaoAtual = -1; 
let jogoAtualId = null; 
// Função para abrir o menu drop 
function abrirMenu() {
    const menu = document.getElementById("sideMenu");
    if (menu) menu.style.left = "0";
}
// Função para fechar
function fecharMenu() {
    const menu = document.getElementById("sideMenu");
    if (menu) menu.style.left = "-250px";
}
// Função para carregar as imagens do form de cadastro
document.addEventListener('DOMContentLoaded', () => {
    const cadastroForm = document.getElementById('cadastroForm');
    if (cadastroForm) {
        const thumbnailInput = document.getElementById('thumbnail');
        const exampleImage = document.getElementById('exampleImage');
        const fileNameSpan = document.querySelector('.file-name');

        if (thumbnailInput && exampleImage && fileNameSpan) {
            thumbnailInput.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        exampleImage.src = event.target.result;                        
                        fileNameSpan.textContent = file.name;
                    }
                    reader.readAsDataURL(file);
                } else {
                    exampleImage.src = "src/Imagem5.jpg"; 
                    fileNameSpan.textContent = "Nenhum arquivo escolhido";
                }
            });
        }


        cadastroForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            cadastrarJogo();        
        });
    }


    const pesquisaForm = document.getElementById('pesquisaForm');
    if (pesquisaForm) {
  
        carregarBase().then(() => { // asdf
            console.log('Base de jogos carregada para navegação.');
            atualizarBotoesNavegacao(); 
        }).catch(error => {
            console.error("Erro ao carregar base na inicialização da pesquisa:", error);
            alert("Não foi possível carregar a lista de jogos para navegação.");
        });
     
        const searchButton = pesquisaForm.querySelector('button[onclick="pesquisarJogo()"]');
        if(searchButton) {
             searchButton.setAttribute('type', 'button'); 
        }
         const navButtons = document.querySelector('.navegar');
         if (navButtons) {
            navButtons.style.display = 'none';
         }
    }

}); 

function cadastrarJogo() {
    const name = document.getElementById('name')?.value;
    const platform = document.getElementById('platform')?.value;
    const price = document.getElementById('price')?.value;
    const category = document.getElementById('category')?.value;
    const thumbnailInput = document.getElementById('thumbnail');
    const thumbnail = thumbnailInput?.files[0];
    
    if(!name || !platform || !price || !category) {
        alert("Por favor. preencha todos os campos obrigatórios (nome, plataforma, preço, categoria e imagem)")
    }

    if(!thumbnail) {
        alert("Por favor, selecione uma imagem")
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('platform', platform);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('thumbnail', thumbnail);

    fetch('http://localhost:8080/Jogos/create',{
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if(response.ok){
            alert('Jogo cadastrado com sucesso');
        }
        return response.json();
    })
    .catch(error =>{
        console.error('Erro ao cadastrar jogo', error);
        alert(`Erro ao cadastrar ${error.message}`);
    });
}
// Função para pesquisar jogo por ID
function pesquisarJogo() {
    const searchId = document.getElementById('searchId').value;
    if (!searchId) {
        alert('Por favor, insira um ID de jogo para pesquisar.');
        return;
    }

    fetch(`http://localhost:8080/Jogos/${searchId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Jogo não encontrado');
            }
            return response.json();
        })
        .then(jogo => {
            document.getElementById('name').value = jogo.name;
            document.getElementById('platform').value = jogo.platform;
            document.getElementById('price').value = jogo.price;
            document.getElementById('category').value = jogo.category;
            
            if (jogo.thumbnail) {
                document.getElementById('exampleImage').src = jogo.thumbnail;
            } else {
                document.getElementById('exampleImage').src = 'src/Imagem5.jpg';
            }
        })
        .catch(error => {
            console.error('Erro ao buscar jogo:', error);
            alert('Jogo não encontrado ou erro na pesquisa.');
        });
}

// Função para excluir um jogo por ID
function excluirJogo() {
    const searchId = document.getElementById('searchId').value;
    if (!searchId) {
        alert('Por favor, insira um ID de jogo para excluir.');
        return;
    }

    if (!confirm('Tem certeza que deseja excluir este jogo? Esta ação não pode ser desfeita.')) {
        return;
    }

    fetch(`http://localhost:8080/Jogos/delete/${searchId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao excluir o jogo');
        }
        alert('Jogo excluído com sucesso!');
        document.getElementById('pesquisaForm').reset();
        document.getElementById('exampleImage').src = 'src/Imagem5.jpg';
    })
    .catch(error => {
        console.error('Erro ao excluir jogo:', error);
        alert('Erro ao excluir o jogo. Verifique se o ID está correto.');
    });
}

