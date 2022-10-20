import { Button } from 'react-bootstrap';

export const AdminListBtn = ({
  btnProps = null,
  iconProps = null,
  btnText = null,
}) => {
  return (
    <Button {...btnProps}>
      {iconProps && <i {...iconProps} />}
      {btnText && btnText}
    </Button>
  );
};
