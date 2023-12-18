export const MoneyAmount = ({amount = '0'}) => {
  return (
    <p className='text-lg font-medium [&>*]:font-mono'>
      <span style={{wordSpacing: '-5px'}}>{amount?.split('.')[0]}</span>
      <sup>{amount?.split('.')[1]}</sup>&nbsp;
    </p>
  );
}
