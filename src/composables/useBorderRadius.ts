import useInstance from './useInstance'
import { Rounded } from '@/enums'

const mappedBorderRadius: Record<number, string> = {
  [Rounded.NONE]: '0em',
  [Rounded.SM]: '0.185em',
  [Rounded.DEFAULT]: '0.375em',
  [Rounded.MD]: '0.75em',
  [Rounded.LG]: '3em',
  [Rounded.FULL]: '50%',
}

export default (): string => {
  const { props } = useInstance('useBorderRadius')

  return mappedBorderRadius[props.rounded as keyof typeof mappedBorderRadius]
}
