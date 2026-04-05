// scroll suave
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener("click", function (e) {
      const id = this.getAttribute("href");
      
      if (id === "#" || !document.querySelector(id)) return;

      e.preventDefault();
      const target = document.querySelector(id);
      const header = document.querySelector("nav");
      const offset = header ? header.offsetHeight + 20 : 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    });
  });
});

// fade-in e fade-out
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      } else {
        entry.target.classList.remove("active");
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll(".reveal");
  revealElements.forEach((el) => observer.observe(el));
});

// animação do menu de navegação
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    const spyOptions = {
        threshold: 0.6
    };

    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                
                const activeId = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-link[href="#${activeId}"]`);
                
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, spyOptions);

    sections.forEach(section => spyObserver.observe(section));
});

// sessão do chatbot
const chatWindow = document.getElementById("chat-window");

function getBotResponse(message) {
  message = message.toLowerCase();
  if (message.includes("serviço"))
    return "Trabalhamos com extensão de cílios, manicure, pedicure e outros cuidados de beleza";

  if (message.includes("preço") || message.includes("valor"))
    return "Para valores atualizados, o ideal é falar direto no WhatsApp. Posso te enviar o link?";

  if (message.includes("agendar"))
    return "Você pode agendar seu horário de forma rápida pelo nosso WhatsApp!";

  if (message.includes("local") || message.includes("onde"))
    return `Estamos em uma localização privilegiada. Veja no mapa 👇<br><br><a href="https://maps.app.goo.gl/2SZAcoUM2X5omhsG7" 
    class="inline-block bg-gold-accent text-white px-4 py-2 rounded-lg text-xs">Ver Localização</a>`;

  return `Para essa e outras dúvidas, fale conosco no WhatsApp 👇<br><br><a href="https://api.whatsapp.com/send/?phone=558487788019&text=Ol%C3%A1%2C+gostaria+de+mais+informa%C3%A7%C3%B5es%21&type=phone_number&app_absent=0" 
    target="_blank" class="inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-xs font-bold">Abrir WhatsApp</a>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("chat-input");
  const chatBox = document.querySelector("#chat-window .h-80");
  const sendBtn = document.getElementById("chat-send-btn");
  const suggestionsContainer = document.getElementById("suggestions-container");

  function addMessage(message, sender) {
    const div = document.createElement("div");
    div.className = sender === "user" ? "flex justify-end" : "flex gap-3";

    if (sender === "user") {
      div.innerHTML = `<div class="bg-primary text-white p-3 rounded-lg rounded-tr-none max-w-[85%] text-sm shadow-sm">${message}</div>`;
    } else {
      div.innerHTML = `
                <div class="w-8 h-8 bg-secondary-container rounded-full flex items-center justify-center shrink-0 border border-gold-accent/30">
                    <span class="material-symbols-outlined text-secondary text-sm">face</span>
                </div>
                <div class="bg-surface-container-high p-3 rounded-lg rounded-tl-none text-primary border border-gold-accent/5 max-w-[85%] text-sm shadow-sm">
                    ${message}
                </div>`;
    }
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function showTypingIndicator() {
    const div = document.createElement("div");
    div.id = "typing-indicator";
    div.className = "flex gap-3 items-center";
    div.innerHTML = `
            <div class="w-8 h-8 bg-secondary-container rounded-full flex items-center justify-center shrink-0 border border-gold-accent/30">
                <span class="material-symbols-outlined text-secondary text-sm">face</span>
            </div>
            <div class="bg-surface-container-high p-3 rounded-lg rounded-tl-none flex gap-1 items-center">
                <span class="w-1.5 h-1.5 bg-gold-accent/50 rounded-full animate-bounce"></span>
                <span class="w-1.5 h-1.5 bg-gold-accent/50 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span class="w-1.5 h-1.5 bg-gold-accent/50 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>`;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
    return div;
  }

  function handleSendMessage(text) {
    if (!text.trim()) return;

    if (suggestionsContainer) {
      suggestionsContainer.style.display = "none";
    }

    addMessage(text, "user");
    input.value = "";

    const typing = showTypingIndicator();

    setTimeout(() => {
      typing.remove();
      const response = getBotResponse(text);
      addMessage(response, "bot");
    }, 1500);
  }

  sendBtn.addEventListener("click", () => handleSendMessage(input.value));

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSendMessage(input.value);
  });

  const suggestionButtons = document.querySelectorAll(".suggestion-btn");
  suggestionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const msg = btn.getAttribute("data-message") || btn.innerText;
      handleSendMessage(msg);
    });
  });
});
