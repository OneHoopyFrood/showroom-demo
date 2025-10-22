interface ActionButtonProps {
  type: 'delete' | 'edit' | 'add';
  onClick: () => void;
  ariaLabel: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ type, onClick, ariaLabel }) => {
  const config = {
    delete: {
      icon: '\u2716',
      className: 'text-red-500 hover:text-red-700 focus:ring-red-300',
    },
    edit: {
      icon: '\u270E',
      className: 'text-blue-500 hover:text-blue-700 focus:ring-blue-300',
    },
    add: {
      icon: <span className="text-2xl font-bold">+</span>,
      className: 'text-green-500 hover:text-green-700 focus:ring-green-300',
    },
  };

  const { icon, className } = config[type];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${className} p-1 rounded focus:outline-none focus:ring-2 cursor-pointer`}
      aria-label={ariaLabel}
      title={type.charAt(0).toUpperCase() + type.slice(1)}
    >
      {icon}
    </button>
  );
};
