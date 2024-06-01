// шаблон форматирования для отображения валюты
export const currencyFormatter = new Intl.NumberFormat("en-EU", {
  currency: "EUR",
  style: "currency",
});
