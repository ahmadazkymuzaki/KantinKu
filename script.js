// Data menu contoh untuk demonstrasi halaman Menu KantinKu.
const products = [
  {id:1,name:'Nasi Ayam Teriyaki',category:'Makanan',price:18000,rating:'4.9',time:'15 mnt',description:'Ayam teriyaki gurih dengan nasi hangat dan sayuran.',image:'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTAyL3Jhd3BpeGVsb2ZmaWNlNl9waG90b19vZl9fY2hpY2tlbl90ZXJpeWFraV9ib3dsX3dpdGhfcmljZV90b3Bfdl84MTczOGNjZC0xOGJjLTRjYTUtYmM2Zi03ZjNkMjg0ZjM1NWRfMS5qcGc.jpg',tag:'Favorit'},
  {id:2,name:'Nasi Goreng Spesial',category:'Makanan',price:16000,rating:'4.8',time:'12 mnt',description:'Nasi goreng dengan telur, ayam, dan kerupuk.',image:'https://www.westonaprice.org/wp-content/uploads/fried-rice2.jpg',tag:'Best seller'},
  {id:3,name:'Mie Ayam Pangsit',category:'Makanan',price:14000,rating:'4.7',time:'10 mnt',description:'Mie kenyal dengan ayam berbumbu dan pangsit.',image:'https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/9e98f429-6fa3-467f-b5c2-08371bb2c923_24280a4a-33b8-4598-95b7-88be039a1c57_Go-Biz_20190826_115414.jpeg?auto=format',tag:'Hangat'},
  {id:4,name:'Es Kopi Susu',category:'Minuman',price:12000,rating:'4.9',time:'5 mnt',description:'Perpaduan espresso, susu, dan gula aren.',image:'https://dineout-media-assets.swiggy.com/swiggy/image/upload/fl_lossy%2Cf_auto%2Cq_auto/v1669525277/0c9d78314ee7573b5a8f5418654e40bb.jpg',tag:'Populer'},
  {id:5,name:'Es Teh Lemon',category:'Minuman',price:7000,rating:'4.6',time:'3 mnt',description:'Teh segar dengan perasan lemon pilihan.',image:'https://static.wixstatic.com/media/b1b820_fed73d89fced4c9b8a49dc2947698a75~mv2.jpg/v1/fill/w_980%2Ch_980%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/b1b820_fed73d89fced4c9b8a49dc2947698a75~mv2.jpg',tag:'Segar'},
  {id:6,name:'Roti Croissant',category:'Camilan',price:10000,rating:'4.8',time:'5 mnt',description:'Pastry renyah dan lembut untuk teman istirahat.',image:'https://131310657.cdn6.editmysite.com/uploads/1/3/1/3/131310657/IMJLMW4D7Q2GTXF6RCMFWXYX.jpeg',tag:'Baru'}
];

const productGrid = document.querySelector('#productGrid');
const searchInput = document.querySelector('#searchInput');
const categoryList = document.querySelector('#categoryList');
const resultCount = document.querySelector('#resultCount');
const emptyState = document.querySelector('#emptyState');
const cartPanel = document.querySelector('#cartPanel');
const cartOverlay = document.querySelector('#cartOverlay');
const cartItems = document.querySelector('#cartItems');
const cartBadge = document.querySelector('#cartBadge');
const toast = document.querySelector('#toast');

let activeCategory = 'Semua';
let cart = [];
let toastTimer;

const rupiah = value => new Intl.NumberFormat('id-ID', {style:'currency',currency:'IDR',maximumFractionDigits:0}).format(value);

// Menampilkan kartu produk sesuai kata kunci dan kategori yang dipilih.
function renderProducts(){
  const keyword = searchInput.value.trim().toLowerCase();
  const filtered = products.filter(item =>
    (activeCategory === 'Semua' || item.category === activeCategory) &&
    (item.name.toLowerCase().includes(keyword) || item.description.toLowerCase().includes(keyword))
  );
  productGrid.innerHTML = filtered.map(item => `
    <article class="product-card">
      <div class="product-image"><img src="${item.image}" alt="${item.name}" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.alt='Foto tidak dapat dimuat';this.parentElement.classList.add('image-unavailable')"><span class="product-tag">${item.tag}</span></div>
      <div class="product-info">
        <div class="product-meta"><span>${item.category}</span><span>★ ${item.rating} &nbsp;·&nbsp; ${item.time}</span></div>
        <h3>${item.name}</h3><p>${item.description}</p>
        <div class="product-bottom"><span class="price">${rupiah(item.price)}</span><button class="add-button" data-add="${item.id}" type="button">+ Tambah</button></div>
      </div>
    </article>`).join('');
  resultCount.textContent = `${filtered.length} menu tersedia`;
  emptyState.classList.toggle('hidden', filtered.length !== 0);
}

function addToCart(id){
  const product = products.find(item => item.id === id);
  const existing = cart.find(item => item.id === id);
  if(existing) existing.quantity += 1;
  else cart.push({...product, quantity:1});
  renderCart();
  showToast(`${product.name} ditambahkan ke keranjang`);
}

function changeQuantity(id, amount){
  const item = cart.find(product => product.id === id);
  if(!item) return;
  item.quantity += amount;
  if(item.quantity <= 0) cart = cart.filter(product => product.id !== id);
  renderCart();
}

function renderCart(){
  const totalItems = cart.reduce((sum,item) => sum + item.quantity,0);
  const subtotal = cart.reduce((sum,item) => sum + item.price * item.quantity,0);
  const fee = totalItems ? 2000 : 0;
  cartBadge.textContent = totalItems;
  cartItems.innerHTML = cart.length ? cart.map(item => `
    <div class="cart-item"><div><strong>${item.name}</strong><small>${rupiah(item.price)} × ${item.quantity}</small></div>
      <div class="quantity-control"><button data-quantity="-1" data-id="${item.id}" aria-label="Kurangi ${item.name}" type="button">−</button><b>${item.quantity}</b><button data-quantity="1" data-id="${item.id}" aria-label="Tambah ${item.name}" type="button">+</button></div>
    </div>`).join('') : '<div class="cart-empty"><span>🛍️</span><strong>Keranjang masih kosong</strong><span>Yuk, pilih makanan favoritmu.</span></div>';
  document.querySelector('#subtotal').textContent = rupiah(subtotal);
  document.querySelector('#serviceFee').textContent = rupiah(fee);
  document.querySelector('#grandTotal').textContent = rupiah(subtotal + fee);
  document.querySelector('#checkoutButton').disabled = cart.length === 0;
}

function openCart(){cartPanel.classList.add('open');cartOverlay.classList.remove('hidden');cartPanel.setAttribute('aria-hidden','false');}
function closeCart(){cartPanel.classList.remove('open');cartOverlay.classList.add('hidden');cartPanel.setAttribute('aria-hidden','true');}
function showToast(message){toast.textContent = message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer = setTimeout(()=>toast.classList.remove('show'),2200);}

productGrid.addEventListener('click', event => {
  const button = event.target.closest('[data-add]');
  if(button) addToCart(Number(button.dataset.add));
});
categoryList.addEventListener('click', event => {
  const button = event.target.closest('[data-category]');
  if(!button) return;
  activeCategory = button.dataset.category;
  categoryList.querySelectorAll('.category-chip').forEach(chip => chip.classList.toggle('selected', chip === button));
  renderProducts();
});
searchInput.addEventListener('input', renderProducts);
document.querySelector('#clearFilters').addEventListener('click', () => {
  searchInput.value = '';activeCategory = 'Semua';
  categoryList.querySelectorAll('.category-chip').forEach(chip => chip.classList.toggle('selected', chip.dataset.category === 'Semua'));
  renderProducts();
});
document.querySelector('#openCart').addEventListener('click', openCart);
document.querySelector('#closeCart').addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);
cartItems.addEventListener('click', event => {
  const button = event.target.closest('[data-quantity]');
  if(button) changeQuantity(Number(button.dataset.id), Number(button.dataset.quantity));
});
document.querySelector('#checkoutButton').addEventListener('click', () => showToast('Simulasi berhasil: lanjut ke tahap checkout.'));
document.addEventListener('keydown', event => {if(event.key === 'Escape') closeCart();});

renderProducts();
renderCart();
