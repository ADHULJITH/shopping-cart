
import type { CartItem } from "../store/cartStore";

export function calculateCartTotals(items: CartItem[]) {

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.05;

  const discount = subtotal > 100
    ? subtotal * 0.10
    : 0;

  const finalTotal = subtotal + tax - discount;

  const canCheckout = subtotal >= 10;

  return {
    subtotal,
    tax,
    discount,
    finalTotal,
    canCheckout,
  };
}
