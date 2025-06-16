document.addEventListener("DOMContentLoaded", () => {
  // Load Header
  fetch("/components/header.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("header-placeholder").innerHTML = html;

      // Highlight Active Navigation Link
      const currentPath = window.location.pathname;
      const navLinks = document.querySelectorAll(".nav-link");

      navLinks.forEach((link) => {
        const linkPath = link.getAttribute("href");

        if (currentPath === linkPath) {
          link.classList.add("active");
        }
      });
    })
    .catch(console.error);

  // Load Footer
  fetch("/components/footer.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("footer-placeholder").innerHTML = html;
    })
    .catch(console.error);
});
