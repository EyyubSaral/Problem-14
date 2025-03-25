import { TrashIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useState, useEffect } from "react";

const cartProducts = [
  {
    id: 1,
    title: "Basic Tee",
    href: "#",
    price: "$32.00",
    color: "Black",
    size: "Large",
    imageSrc: "/product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    quantity: 1,
  },
  {
    id: 2,
    title: "Basic Tee",
    href: "#",
    price: "$32.00",
    color: "Sienna",
    size: "Large",
    imageSrc: "/product-02.jpg",
    imageAlt: "Front of men's Basic Tee in sienna.",
    quantity: 2,
  },
];

// Bu bileşen sipariş özeti içeren bir alışveriş sepeti görünümü sağlar.
// Görevler:
// 1. "Çöp kutusu" ikonuna tıklayarak listedeki ürünleri kaldırmayı mümkün hale getirin.
//    - Ürün silindiğinde, ara toplam, kargo ve toplam fiyat değerlerinin doğru bir şekilde güncellenmesini sağlayın.
// 2. Ara toplam, kargo ve toplam fiyat değerlerini dinamik hale getirin. (Kargo ücreti sabit olabilir, ancak ara toplam ürünlerin fiyatına göre hesaplanmalıdır.)
// 3. "Siparişi onaylayın" butonuna tıklandığında, console.log() ile mevcut sipariş özeti bilgilerini (ürünler, ara toplam, toplam) görüntüleyin.
// Bonus:
// - Ürün kaldırıldığında kullanıcıya bir doğrulama penceresi gösterin (örn. "Bu ürünü kaldırmak istediğinizden emin misiniz?").
// - Sepette ürün kalmadığında ara toplam, toplam ve kargo bilgilerini gizleyerek "Sepetiniz boş" mesajını görüntüleyin.
// - Responsive tasarımı optimize edin: Mobil cihazlarda ürün bilgileri dikey bir düzende gösterilsin.
// - Her ürün için dinamik bir fiyat hesaplama ekleyin (örneğin, miktar seçimi ve birim fiyat çarpımı).
// Tailwind ile ilgili bonus istekler:
// 1. Ürün kaldırma butonuna tıklandığında, buton geçici olarak "Kaldırılıyor..." durumunu gösterecek şekilde stil ekleyin.
// 2. Toplam fiyat değerine dikkat çeken bir vurgu (örneğin, daha büyük yazı boyutu veya farklı bir arka plan rengi) ekleyin.
// 3. Her ürünün fiyatını hover sırasında vurgulamak için görsel efektler ekleyin (örneğin, fiyat metninin rengini değiştirin).

export default function OrderSummary() {
  const [products, setProducts] = useState(cartProducts);
  const cargoFee = 5;
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const updatedPrice = products.reduce((total, product) => {
      const price = parseFloat(product.price.slice(1)) * product.quantity;
      return (total += price);
    }, 0);
    setPrice(updatedPrice);
  }, [products]);

  useEffect(() => {
    setTotal(price + cargoFee);
  }, [price]);

  const handleRemove = (id) => {
    const newProduct = products.filter((product) => {
      return product.id !== id;
    });
    setProducts(newProduct);
  };

  return (
    <div className="max-w-sm py-8 mx-auto">
      <h2 className="text-lg font-medium text-gray-900">Sipariş özeti</h2>

      <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
        <h3 className="sr-only">Alışveriş sepetinizdeki ürünler</h3>
        <ul role="list" className="divide-y divide-gray-200">
          {products.map((product) => (
            <li key={product.id} className="flex px-4 py-6 sm:px-6">
              <div className="flex-shrink-0">
                <Image
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="w-20 rounded-md"
                  width={500}
                  height={500}
                />
              </div>

              <div className="ml-6 flex flex-1 flex-col">
                <div className="flex">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm">
                      <a
                        href={product.href}
                        className="font-medium text-gray-700 hover:text-gray-800"
                      >
                        {product.title}
                      </a>
                    </h4>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.color}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">{product.size}</p>
                    <p className="mt-1 text-sm text-gray-500">{product.quantity}</p>
                  </div>

                  <div className="ml-4 flow-root flex-shrink-0">
                    <button
                      type="button"
                      className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                      onClick={() => handleRemove(product.id)}
                    >
                      <span className="sr-only">Kaldır</span>
                      <TrashIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-1 items-end justify-between pt-2">
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {product.price}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex items-center justify-between">
            <dt className="text-sm">Ara Toplam</dt>
            <dd className="text-sm font-medium text-gray-900">${price}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-sm">Kargo</dt>
            <dd className="text-sm font-medium text-gray-900">
              ${cargoFee}.00
            </dd>
          </div>
          <div className="flex items-center justify-between border-t border-gray-200 pt-6">
            <dt className="text-base font-medium">Toplam</dt>
            <dd className="text-base font-medium text-gray-900">${total}</dd>
          </div>
        </dl>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <button
            type="submit"
            className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            onClick={console.log(
              "total:",
              total,
              "products:",
              products,
              "price:",
              price
            )}
          >
            Siparişi onaylayın
          </button>
        </div>
      </div>
    </div>
  );
}
