export default function ToPriceDisplay(price) {
  const displayPrice = parseFloat(price).toFixed(2);
  return displayPrice + '€';
}