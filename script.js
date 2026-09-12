const botaoMenu = document.querySelector(".botao-menu");
const menu = document.querySelector(".menu");
const linksMenu = document.querySelectorAll(".menu a");
const botaoCopiar = document.querySelector("#copiar-email");
const mensagem = document.querySelector("#mensagem-copia");
const anoAtual = document.querySelector("#ano-atual");
const email = "rodfagnani@gmail.com";

anoAtual.textContent = new Date().getFullYear();

botaoMenu.addEventListener("click", () => {
    const aberto = menu.classList.toggle("aberto");

    botaoMenu.classList.toggle("aberto", aberto);
    botaoMenu.setAttribute("aria-expanded", aberto);
    botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
});

linksMenu.forEach((link) => {
    link.addEventListener("click", () => {
        menu.classList.remove("aberto");
        botaoMenu.classList.remove("aberto");
        botaoMenu.setAttribute("aria-expanded", "false");
        botaoMenu.setAttribute("aria-label", "Abrir menu");
    });
});

botaoCopiar.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(email);
        mensagem.textContent = "E-mail copiado para a área de transferência!";
        botaoCopiar.textContent = "Copiado!";
    } catch {
        mensagem.textContent = `Copie este endereço: ${email}`;
    }

    window.setTimeout(() => {
        mensagem.textContent = "";
        botaoCopiar.textContent = "Copiar e-mail";
    }, 3000);
});

const observadorAnimacao = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visivel");
                observadorAnimacao.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

document.querySelectorAll(".aparecer").forEach((element) => observadorAnimacao.observe(element));

const secoes = document.querySelectorAll("main section[id]");
const observadorSecoes = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            linksMenu.forEach((link) => {
                link.classList.toggle("ativo", link.getAttribute("href") === `#${entry.target.id}`);
            });
        });
    },
    { rootMargin: "-35% 0px -55%", threshold: 0 }
);

secoes.forEach((section) => observadorSecoes.observe(section));
