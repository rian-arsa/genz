"use client";

import { ShoppingCart, Store, Star, X } from "lucide-react";
import { useState } from "react";

const product = {
  id: 1,
  name: "Smartphone X100 128GB RAM 8GB - Garansi Resmi",
  price: 2499000,
  images: ["/images/event.jpg", "/images/organisasi.jpeg", "/images/event.jpg"],
  description: `Smartphone X100 hadir dengan RAM 8GB dan memori internal 128GB. Layar AMOLED 6.7", baterai 5000mAh, dan sudah mendukung jaringan 5G.`,
  variants: {
    colors: ["Hitam", "Putih", "Biru"],
    sizes: ["64GB", "128GB", "256GB"],
  },
  seller: {
    name: "Toko Gadget Resmi",
    location: "Jakarta",
  },
  rating: 4.6,
  reviews: 218,
};

const relatedProducts = [
  {
    id: 2,
    name: "Smartphone Z Pro",
    price: 2199000,
    image: "/images/event.jpg",
  },
  {
    id: 3,
    name: "Smartphone Lite Edition",
    price: 1899000,
    image: "/images/event.jpg",
  },
];

export default function ProductDetailPage() {
  const [selectedColor, setSelectedColor] = useState(
    product.variants.colors[0]
  );
  const [selectedSize, setSelectedSize] = useState(product.variants.sizes[0]);
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const totalPrice = product.price * quantity;
  const [paymentMethod, setPaymentMethod] = useState("poin");
  const saldoPoin = 12500; // saldo user, bisa dari backend

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      {/* Atas: Gambar & Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Carousel */}
        <div>
          <div className="aspect-square bg-zinc-100 rounded-lg overflow-hidden mb-4">
            <img
              src={activeImage}
              alt="Produk"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx}`}
                onClick={() => setActiveImage(img)}
                className={`w-16 h-16 rounded border cursor-pointer object-cover ${
                  activeImage === img ? "border-pink-500" : "border-zinc-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Info Produk */}
        <div className="space-y-4">
          <h1 className="text-xl font-semibold text-zinc-800">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 text-sm text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                fill={i < Math.round(product.rating) ? "currentColor" : "none"}
                className="w-4 h-4"
              />
            ))}
            <span className="text-zinc-600 ml-2">
              ({product.reviews} ulasan)
            </span>
          </div>

          <p className="text-2xl font-bold text-pink-600">
            Rp{product.price.toLocaleString("id-ID")}
          </p>

          {/* Variants */}
          <div className="space-y-2">
            <div>
              <p className="text-sm text-zinc-700 font-medium">Warna:</p>
              <div className="flex gap-2 mt-1">
                {product.variants.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1 text-sm border rounded-full ${
                      selectedColor === color
                        ? "bg-pink-100 text-pink-600 border-pink-500"
                        : "border-zinc-300 text-zinc-600"
                    }`}>
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm text-zinc-700 font-medium">Penyimpanan:</p>
              <div className="flex gap-2 mt-1">
                {product.variants.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 text-sm border rounded-full ${
                      selectedSize === size
                        ? "bg-pink-100 text-pink-600 border-pink-500"
                        : "border-zinc-300 text-zinc-600"
                    }`}>
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tombol */}
          <div className="flex gap-2 pt-2">
            <button
              className="flex-1 px-4 py-2 rounded-md bg-pink-600 text-white hover:bg-pink-700 transition text-sm"
              onClick={() => setModalOpen(true)}>
              Beli Sekarang
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-zinc-300 rounded-md text-sm hover:border-pink-500 transition">
              <ShoppingCart className="w-4 h-4" />
              Tambah ke Keranjang
            </button>
          </div>

          {/* Toko */}
          <div className="flex items-center gap-2 text-sm text-zinc-500 pt-3">
            <Store className="w-4 h-4" />
            {product.seller.name} • {product.seller.location}
          </div>
        </div>
      </div>

      {/* Deskripsi */}
      <div className="border-t pt-6">
        <h2 className="text-lg font-semibold mb-2">Deskripsi Produk</h2>
        <p className="text-sm text-zinc-700 leading-relaxed whitespace-pre-line">
          {product.description}
        </p>
      </div>

      {/* Produk Terkait */}
      <div className="border-t pt-6">
        <h2 className="text-lg font-semibold mb-4">Produk Serupa</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {relatedProducts.map((prod) => (
            <div
              key={prod.id}
              className="border rounded-lg overflow-hidden hover:shadow transition">
              <img
                src={prod.image}
                alt={prod.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-3">
                <p className="text-sm font-medium line-clamp-2">{prod.name}</p>
                <p className="text-sm font-bold text-pink-600 mt-1">
                  Rp{prod.price.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-zinc-500 hover:text-zinc-800"
              onClick={() => setModalOpen(false)}>
              <X className="w-5 h-5" />
            </button>

            {/* Title */}
            <h2 className="text-lg font-semibold text-zinc-800 mb-4">
              Konfirmasi Pembelian
            </h2>

            {/* Produk Info */}
            <div className="flex gap-4 mb-4">
              <img
                src={product.images[0]}
                alt="Produk"
                className="w-20 h-20 object-cover rounded"
              />
              <div className="text-sm">
                <p className="font-medium">{product.name}</p>
                <p className="text-zinc-500">
                  {selectedColor} / {selectedSize}
                </p>
                <p className="text-pink-600 font-semibold">
                  Rp{product.price.toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            {/* Jumlah */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-zinc-700">Jumlah</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 border rounded hover:bg-zinc-100">
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1 border rounded hover:bg-zinc-100">
                  +
                </button>
              </div>
            </div>

            {/* Metode Pembayaran */}
            <div className="mb-4 space-y-2">
              <p className="text-sm font-medium text-zinc-700">
                Metode Pembayaran:
              </p>

              <label className="flex items-center gap-2 text-sm text-zinc-600">
                <input
                  type="radio"
                  name="payment"
                  value="poin"
                  checked={paymentMethod === "poin"}
                  onChange={() => setPaymentMethod("poin")}
                  className="accent-pink-600"
                />
                Gunakan Saldo Poin
              </label>

              <div className="ml-6 text-xs text-zinc-500">
                Saldo poin:{" "}
                <span className="font-semibold text-pink-600">
                  Rp{saldoPoin.toLocaleString("id-ID")}
                </span>
              </div>

              {/* Notifikasi jika saldo kurang */}
              {paymentMethod === "poin" && totalPrice > saldoPoin && (
                <div className="text-xs text-red-600 mt-1">
                  Saldo poin tidak cukup untuk transaksi ini.
                </div>
              )}
            </div>

            {/* Total */}
            <div className="text-right font-bold text-pink-600 text-sm mb-4">
              Total: Rp{totalPrice.toLocaleString("id-ID")}
            </div>

            {/* Action */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 border rounded text-sm hover:bg-zinc-100">
                Batal
              </button>
              <button
                onClick={() => {
                  if (paymentMethod === "poin" && totalPrice > saldoPoin) {
                    alert("Saldo poin tidak cukup!");
                    return;
                  }
                  alert("Pembayaran berhasil (simulasi)");
                  setModalOpen(false);
                }}
                disabled={paymentMethod === "poin" && totalPrice > saldoPoin}
                className={`px-4 py-2 text-sm rounded text-white transition ${
                  paymentMethod === "poin" && totalPrice > saldoPoin
                    ? "bg-zinc-300 cursor-not-allowed"
                    : "bg-pink-600 hover:bg-pink-700"
                }`}>
                Bayar Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
