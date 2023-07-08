import { ReactComponent as CloseIcon } from '@/assets/icons/CloseIcon.svg'

interface Props {
  onClick: () => void
}

export default function CloseButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="relative rounded-lg hover:before:absolute before:content-[''] before:block before:inset-0 before:rounded-lg before:bg-gray-10 focus:before:opacity-10 before:opacity-20 hover:transition-all"
    >
      <CloseIcon />
    </button>
  )
}
