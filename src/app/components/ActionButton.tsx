interface ActionButtonProps {
  type: 'delete' | 'edit' | 'add'
  onClick: () => void
  ariaLabel: string
  children?: string
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  type,
  onClick,
  ariaLabel,
  children: childString,
}) => {
  const config = {
    delete: {
      icon: '\u2716',
      iconClassName: 'text-red-500',
      hoverClassName: 'hover:[&>span]:text-red-700',
    },
    edit: {
      icon: '\u270E',
      iconClassName: 'text-blue-500',
      hoverClassName: 'hover:[&>span]:text-blue-700',
    },
    add: {
      icon: '+',
      iconClassName: 'text-2xl font-bold text-green-500',
      hoverClassName: 'hover:[&>span]:text-green-300 hover:font-bold',
    },
  }

  const { icon, iconClassName, hoverClassName } = config[type]

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center p-1 rounded focus:outline-none focus:ring-2 cursor-pointer ${hoverClassName}`}
      aria-label={ariaLabel}
      title={type.charAt(0).toUpperCase() + type.slice(1)}
    >
      <span className={`${iconClassName} mr-1`}>{icon}</span>
      {childString}
    </button>
  )
}
