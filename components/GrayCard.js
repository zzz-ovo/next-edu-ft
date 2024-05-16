import { theme, Card } from 'antd';

export default function GrayCard({ children, title = "", first = false }) {
  const { token } = theme.useToken();

  return (
    <Card style={{ background: token.colorFillAlter, marginTop: first ? 0 : 15 }} bodyStyle={{ padding: 15 }}>
      {title ? <span className='font-semibold'>{title}</span> : ''}
      {children}
    </Card>
  )
}

export function RowItem({ name, slot }) {
  return (
    <div className='mt-[5px] flex justify-between'>
      <span className='text-gray-400'>
        {name}
      </span>
      <span className='font-medium'>
        {slot}
      </span>
    </div>
  )
}

export function Item({ name, slot, br = false, className, style }) {
  return (
    <span className={className} style={style}>
      <span className='text-gray-400'>
        {name}
      </span>
      {br ? <br /> : ''}
      <span className='font-medium'>
        {slot}
      </span>
    </span>
  )
}