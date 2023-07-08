import { ReactComponent as InfoIcon } from '@/assets/icons/InfoIcon.svg'

interface Props {
  onClick: () => void
}

export default function InfoButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="opacity-[0.15] hover:opacity-25 focus:hover:opacity-20 transition-all"
    >
      <InfoIcon />
    </button>
  )
}
