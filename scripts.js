// Responsive mobile menu
const mobileMenuBtn = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuBtn) {
  mobileMenuBtn.onclick = () => {
    mobileMenu.classList.toggle('hidden');
  };
}

// Simulated storage for pending and approved images
let pendingImages = [];
let approvedImages = [];

// Simulate admin role (set to false to hide admin section)
const isAdmin = true; // Change to false for non-admin view

if (!isAdmin && document.getElementById('admin-section')) {
  document.getElementById('admin-section').style.display = 'none';
}

// Seller upload form handler
document.getElementById('productForm').onsubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById('productName').value.trim();
  const files = document.getElementById('productImages').files;
  if (!name || !files.length) return;

  for (let file of files) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      pendingImages.push({
        name,
        dataUrl: evt.target.result,
        status: 'pending',
        feedback: ''
      });
      renderPending();
      document.getElementById('uploadStatus').innerHTML = `<span class="text-green-700 font-semibold">Submitted for review. You will be notified when approved or rejected.</span>`;
      document.getElementById('productForm').reset();
    };
    reader.readAsDataURL(file);
  }
};

// Render pending images (admin only)
function renderPending() {
  const container = document.getElementById('pendingImages');
  if (!container) return;
  container.innerHTML = '';
  pendingImages.forEach((img, idx) => {
    container.innerHTML += `
      <div class="border rounded p-3 flex flex-col items-center">
        <img src="${img.dataUrl}" alt="${img.name}" class="w-full h-40 object-cover rounded mb-2"/>
        <div class="font-semibold mb-1">${img.name}</div>
        <div class="flex gap-2">
          <button onclick="approveImage(${idx})" class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Approve</button>
          <button onclick="rejectImage(${idx})" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Reject</button>
        </div>
      </div>
    `;
  });
}

// Approve image (admin)
window.approveImage = function(idx) {
  const img = pendingImages[idx];
  img.status = 'approved';
  img.feedback = 'Your product image has been approved!';
  approvedImages.push(img);
  pendingImages.splice(idx, 1);
  renderPending();
  renderApproved();
  alert('Image approved and seller notified.');
};

// Reject image (admin)
window.rejectImage = function(idx) {
  const img = pendingImages[idx];
  img.status = 'rejected';
  img.feedback = 'Sorry, your product image was not approved. Please upload a clearer or more appropriate image.';
  pendingImages.splice(idx, 1);
  renderPending();
  alert('Image rejected and seller notified.');
};

// Render approved gallery
function renderApproved() {
  const container = document.getElementById('approvedGallery');
  if (!container) return;
  container.innerHTML = '';
  approvedImages.forEach(img => {
    container.innerHTML += `
      <div class="border rounded p-2 flex flex-col items-center">
        <img src="${img.dataUrl}" alt="${img.name}" class="w-full h-32 object-cover rounded mb-2"/>
        <div class="font-semibold">${img.name}</div>
      </div>
    `;
  });
}

// Initial render
renderPending();
renderApproved();
