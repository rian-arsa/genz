"use client";

const products = [
  {
    id: 1,
    name: "Smartphone X100 128GB RAM 8GB",
    price: 2499000,
    image: "https://via.placeholder.com/300x300?text=Produk+1",
    location: "Jakarta",
    sold: 210,
  },
  {
    id: 2,
    name: "Kemeja Formal Pria Slimfit Polos",
    price: 179000,
    image: "https://via.placeholder.com/300x300?text=Produk+2",
    location: "Bandung",
    sold: 85,
  },
  {
    id: 3,
    name: "Mi Instan Rasa Ayam Bawang - 1 Karton",
    price: 89000,
    image: "https://via.placeholder.com/300x300?text=Produk+3",
    location: "Surabaya",
    sold: 520,
  },
  {
    id: 4,
    name: "Headset Bluetooth Wireless Pro ANC",
    price: 299000,
    image: "https://via.placeholder.com/300x300?text=Produk+4",
    location: "Depok",
    sold: 150,
  },
  {
    id: 5,
    name: "Air Fryer Digital Kapasitas 5L",
    price: 689000,
    image: "https://via.placeholder.com/300x300?text=Produk+5",
    location: "Yogyakarta",
    sold: 78,
  },
];

export default function ProductGridTokopediaStyle() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-zinc-200 rounded-lg overflow-hidden hover:border-pink-500 transition">
            <div className="aspect-square bg-zinc-100 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3 space-y-1">
              <h3 className="text-sm font-medium text-zinc-800 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-pink-600 font-bold text-sm">
                Rp{product.price.toLocaleString("id-ID")}
              </p>
              <p className="text-xs text-zinc-500">
                {product.location} • Terjual {product.sold}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
