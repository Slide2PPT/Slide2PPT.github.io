const slides = ["1_01", "1_02", "1_03", "3_01", "4_01", "5_01", "7_01", "41_01", "49_01", "51_01", "52_01", "65_01"];

const showcaseGrid = document.querySelector("#showcase-grid");
const slideCount = document.querySelector("#slide-count");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
const lightboxClose = document.querySelector("#lightbox-close");

const assetsFor = (id) => ({
  reference: `assets/image_dataset/${id}.png`,
  process: `assets/readme/process/${id}.gif`,
  editable: `assets/gpt5.6_sol/${id}/${id}.png`,
});

const mediaButton = (src, alt, caption, extraClass = "") => `
  <button class="media-button ${extraClass}" type="button" data-full="${src}" data-caption="${caption}" aria-label="Open ${caption}">
    <img src="${src}" alt="${alt}" loading="lazy" />
  </button>
`;

const slideRow = (id, index) => {
  const assets = assetsFor(id);
  return `
    <article class="showcase-row" id="slide-${id}" data-slide="${id}">
      <div class="media-block">
        ${mediaButton(assets.reference, `Reference slide ${id}`, `Reference image · ${id}`)}
        <div class="media-label"><strong>${id}</strong><span>Source slide</span></div>
      </div>
      <div class="media-block">
        ${mediaButton(assets.process, `Animated reconstruction process for slide ${id}`, `Generation + iterative refinement · ${id}`, "process-media")}
        <div class="media-label"><strong>Process</strong><span class="stage-label">4 render stages</span></div>
      </div>
      <div class="media-block">
        ${mediaButton(assets.editable, `Editable PowerPoint result for slide ${id}`, `Editable PowerPoint result · ${id}`)}
        <div class="media-label"><strong>Editable output</strong><span>Object-level view</span></div>
      </div>
    </article>
  `;
};

if (showcaseGrid) {
  showcaseGrid.innerHTML = slides.map(slideRow).join("");
}

if (slideCount) {
  slideCount.textContent = slides.length;
}

const openLightbox = (button) => {
  if (!lightbox || !lightboxImage) return;
  lightboxImage.src = button.dataset.full;
  lightboxImage.alt = button.querySelector("img")?.alt || "Slide preview";
  lightboxCaption.textContent = button.dataset.caption || "Slide preview";
  if (typeof lightbox.showModal === "function") {
    lightbox.showModal();
  } else {
    lightbox.setAttribute("open", "");
  }
};

document.addEventListener("click", (event) => {
  const button = event.target.closest(".media-button");
  if (button) openLightbox(button);
});

const closeLightbox = () => {
  if (!lightbox) return;
  if (typeof lightbox.close === "function") {
    lightbox.close();
  } else {
    lightbox.removeAttribute("open");
  }
};

lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});
