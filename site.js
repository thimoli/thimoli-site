const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('visible'));
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

document.getElementById('waitlist-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('email');
  const note = document.getElementById('form-note');
  note.textContent = `Merci ! ${email.value} est bien noté pour le lancement.`;
  note.classList.add('success');
  email.value = '';
});
