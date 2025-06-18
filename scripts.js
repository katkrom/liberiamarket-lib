// Tailwind config for color palette
tailwind.config = {
  theme: {
    extend: {
      colors: { primary: "#0047AB", secondary: "#E60000" },
      borderRadius: {
        none: "0px",
        sm: "4px",
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "32px",
        full: "9999px",
        button: "8px",
      },
    },
  },
};

// Category card hover effect
document.addEventListener("DOMContentLoaded", function () {
  const categoryCards = document.querySelectorAll(".category-card");
  categoryCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      const icon = this.querySelector(".category-icon");
      icon.classList.add("text-secondary");
    });
    card.addEventListener("mouseleave", function () {
      const icon = this.querySelector(".category-icon");
      icon.classList.remove("text-secondary");
    });
  });
});

// Checkbox label color toggle
document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll(".custom-checkbox");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const label = this.nextElementSibling;
      if (this.checked) {
        label.classList.add("text-primary");
      } else {
        label.classList.remove("text-primary");
      }
    });
  });
});

// Heart icon toggle for favorites
document.addEventListener("DOMContentLoaded", function () {
  const heartButtons = document.querySelectorAll(".ri-heart-line");
  heartButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      if (this.classList.contains("ri-heart-line")) {
        this.classList.remove("ri-heart-line");
        this.classList.add("ri-heart-fill");
        this.classList.add("text-secondary");
      } else {
        this.classList.remove("ri-heart-fill");
        this.classList.remove("text-secondary");
        this.classList.add("ri-heart-line");
      }
    });
  });
});
