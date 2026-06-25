// ========================================================
// MOTOR INTERATIVO DA LANDING PAGE - MÉTRICA VIDROS
// DESENVOLVIDO POR: AGÊNCIA WHATSLITTLE
// ========================================================
document.addEventListener("DOMContentLoaded", function() {
    console.log("Landing Page carregada com sucesso e pronta para rodar!");
    
    // ------------------------------------------------------
    // COMPORTAMENTO: ACORDEÃO DE PERGUNTAS FREQUENTES (FAQ)
    // ------------------------------------------------------
    const questions = document.querySelectorAll(".faq-question");

    questions.forEach(button => {
        button.addEventListener("click", () => {
            const faqItem = button.parentElement;
            faqItem.classList.toggle("active");
        });
    });

    // --------------------------------------------------------
    // COMPORTAMENTO: INTEGRAÇÃO COM API DO WHATSAPP COM LEADS
    // --------------------------------------------------------
    const form = document.querySelector(".appointment-form");

    if (form) {
        form.addEventListener("submit", function(event) {
            // Impede o reload nativo do navegador para blindar os dados capturadoS
            event.preventDefault();

            // Captura dinâmica dos valores nos campos de entrada do formulário
            const nome = document.getElementById("nome").value;
            const whatsappCliente = document.getElementById("whatsapp").value;
            const servicoSelect = document.getElementById("servico-select");
            const servicoTexto = servicoSelect.options[servicoSelect.selectedIndex].text;
            const mensagemAdicional = document.getElementById("mensagem").value;

            const numeroDestinatario = "551199999999";

            // Construção do template de mensagem utilizando marcações em negrito nativas da API
            let textoMensagem = `🔔 *Novo Pedido de Agendamento* 🔔\n\n`;
            textoMensagem += `👤 *Nome:* ${nome}\n`;
            textoMensagem += `📞 *Contato:* ${whatsappCliente}\n`;
            textoMensagem += `💎 *Serviço:* ${servicoTexto}\n`;
            
            if (mensagemAdicional.trim() !== "") {
                textoMensagem += `📝 *Detalhes:* ${mensagemAdicional}`;
            }

            // Sanitização de caracteres especiais utilizando codificação URI pura para transmissão limpa de link
            const urlWhatsApp = 'https://wa.me/5511999999999?text=' + encodeURIComponent(textoMensagem);

            // Dispara o aplicativo abrindo uma aba independente segura
            window.open(urlWhatsApp, "_blank");
        });
    }

    // ----------------------------------------------------------
    // COMPORTAMENTO: CONTROLE DE GALERIA E CARROSSEL (LIGHTBOX)
    // ----------------------------------------------------------
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".lightbox-close");
    const btnLeft = document.querySelector(".nav-left");
    const btnRight = document.querySelector(".nav-right");
    
    let currentImgArray = []; // Vetor dinâmico que isola o escopo de imagens do bloco ativo
    let currentImgIndex = 0;

    // Monitora o clique no grupo de imagens de cada especialidade
    document.querySelectorAll(".service-img-group").forEach(group => {
        const mainImg = group.querySelector(".active-thumb");
        
        if (mainImg) {
            mainImg.addEventListener("click", () => {
                const allImagesInGroup = group.querySelectorAll("img");
                currentImgArray = Array.from(allImagesInGroup).map(img => img.src);
                currentImgIndex = 0;

                lightbox.style.display = "flex";
                lightboxImg.src = currentImgArray[currentImgIndex];

                // Liga os sensores no momento em que a foto se abre no celular
                ativarGestoToque();
            });
        }
    });

    // RECURSOS DE TOQUE: MOBILE SWIPE
    let toqueInicioX = 0;
    let toqueFimX = 0;

    function ativarGestoToque() {
        lightbox.addEventListener('touchstart', e => {
            toqueInicioX = e.changedTouches.screenX;
        }, { passive: true });

        lightbox.addEventListener('touchend', e => {
            toqueFimX = e.changedTouches.screenX;
            analisarDirecaoGesto();
        }, { passive: true });
    }

    function analisarDirecaoGesto() {
        const distanciaMinima = 50;

        if (toqueInicioX - toqueFimX > distanciaMinima) {
            changeImage(1);
        }
        if (toqueFimX - toqueInicioX > distanciaMinima) {
            changeImage(-1);
        }
    }

    // Vetor dinâmico que isola o escopo de imagens do bloco ativo
    function changeImage(direction) {
        if (currentImgArray.length <= 1) return;
        
        currentImgIndex += direction;
        
        if (currentImgIndex >= currentImgArray.length) currentImgIndex = 0;
        if (currentImgIndex < 0) currentImgIndex = currentImgArray.length - 1;
        
        lightboxImg.src = currentImgArray[currentImgIndex];
    }

    // INTERAÇÃO CLIQUE: Botões direcionais físicos do computador
    if (btnLeft && btnRight) {
        btnLeft.addEventListener("click", (e) => {
            e.stopPropagation(); // Impede o lightbox de fechar ao clicar na lateral
            changeImage(-1);
        });

        btnRight.addEventListener("click", (e) => {
            e.stopPropagation();
            changeImage(1);
        });
    }

    // INTERAÇÃO FECHAMENTO: Funções para fechar a tela escura
    if (closeBtn && lightbox) {
        closeBtn.addEventListener("click", () => lightbox.style.display = "none");
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) lightbox.style.display = "none";
        });
    }

    // INTERAÇÃO ACESSIBILIDADE: Passar as fotos usando as setas físicas do teclado do notebook!
    document.addEventListener("keydown", (e) => {
        if (lightbox && lightbox.style.display === "flex") {
            if (e.key === "ArrowRight") changeImage(1);
            if (e.key === "ArrowLeft") changeImage(-1);
            if (e.key === "Escape") lightbox.style.display = "none";
        }
    });

    // ------------------------------------------------------------
    // COMPORTAMENTO: MENU HAMBÚRGUER MOBILE COM SCROLL INTELIGENTE
    // ------------------------------------------------------------
    const menuToggle = document.getElementById("menu-toggle");
    
    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault(); 
            
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);
                
            if (menuToggle) menuToggle.checked = false;
            
            // Força o navegador principal a realizar o arraste suave ignorando conflitos de camadas fixas
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth", 
                    block: "start" 
                });
            }
        });
    });

     // ----------------------------------------------------------
    // COMPORTAMENTO: GERENCIAMENTO DE MODAL DA PRIVACIDADE (LGPD)
    // -----------------------------------------------------------
    const privacyModal = document.getElementById("privacy-modal");
    const openPrivacyBtn = document.getElementById("open-privacy");
    const closePrivacyBtn = document.querySelector(".privacy-close");

    if (privacyModal && openPrivacyBtn && closePrivacyBtn) {
            openPrivacyBtn.addEventListener("click", (e) => {
            e.preventDefault();
            privacyModal.style.display = "flex"; 
            
            // BLINDAGEM MOBILE: Congela rigidamente a barra de rolagem externa do site enquanto lê a lei
            document.body.style.overflow = "hidden"; 
        });

        closePrivacyBtn.addEventListener("click", () => {
            privacyModal.style.display = "none";
            document.body.style.overflow = "auto";
        });

        privacyModal.addEventListener("click", (e) => {
            if (e.target === privacyModal) {
                privacyModal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        });
    }
});
