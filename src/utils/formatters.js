// Formatter utilities for Indonesian Rupiah, Dates, and Grocery WhatsApp order messages

export const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(number);
};

export const formatDateIndo = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

export const generateWhatsAppOrderMessage = (order, storeSettings) => {
  const itemsText = order.items.map((item, idx) => {
    let text = `${idx + 1}. *${item.name}* (x${item.quantity}) - ${formatRupiah(item.price * item.quantity)}`;
    if (item.customDetails) {
      text += `\n   └ 📦 Rincian Paket: ${item.customDetails.rice}, Minyak: ${item.customDetails.oil}, Mie: ${item.customDetails.noodle}, Kemasan: ${item.customDetails.packaging}`;
      if (item.customDetails.addons && item.customDetails.addons.length > 0) {
        text += `\n   └ ➕ Tambahan: ${item.customDetails.addons.join(', ')}`;
      }
    }
    if (item.greetingCard) {
      text += `\n   └ 💌 Kartu/Pesan: "${item.greetingCard}"`;
    }
    if (item.note) {
      text += `\n   └ 📝 Catatan: ${item.note}`;
    }
    return text;
  }).join('\n\n');

  const message = `Halo Admin *${storeSettings.name}*, saya mau pesan sembako & snack:

🧾 *NO. INVOICE*: #${order.id}
📅 *Waktu Pesan*: ${order.date}

👤 *DATA PEMESAN*:
• Nama: ${order.customerName}
• No. HP/WA: ${order.customerPhone}

📍 *PENGANTARAN / ALAMAT*:
• Penerima: ${order.recipientName} (${order.recipientPhone})
• Alamat Rumah/Tujuan: ${order.deliveryAddress}
• Waktu Antar: ${order.deliveryDate} (${order.deliverySlot})
• Jenis Layanan: ${order.deliveryType === 'express' ? '🚀 Kurir Warung Kilat (30-60 Menit)' : order.deliveryType === 'pickup' ? '🏪 Ambil di Toko/Warung' : '🚚 Kurir Reguler'}
${order.courierNote ? `• Catatan Rumah/Patokan: "${order.courierNote}"` : ''}

🛒 *DAFTAR BELANJAAN*:
${itemsText}

💰 *RINCIAN BAYAR*:
• Total Belanjaan: ${formatRupiah(order.subtotal)}
• Ongkir Antar: ${order.deliveryFee === 0 ? 'Gratis' : formatRupiah(order.deliveryFee)}
• Potongan Diskon: -${formatRupiah(order.discount || 0)}
• *TOTAL AKHIR*: *${formatRupiah(order.total)}*
• Metode Pembayaran: *${order.paymentMethod.toUpperCase()}*

Mohon segera disiapkan dan dikirim ya Toko Berkah Sekar. Terima kasih! 🙏🛒`;

  const encodedMessage = encodeURIComponent(message);
  const cleanPhone = storeSettings.phone.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
};
