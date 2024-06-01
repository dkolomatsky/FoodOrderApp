export default function Button({ children, onlyText, className, ...props }) {
  const cssClasses = onlyText
    ? `text-button ${className}`
    : `button ${className}`; // возможность задавать разным кнопкам разные классы
  return (
    <button className={cssClasses} {...props}>
      {children} 
    </button>
  );
}
