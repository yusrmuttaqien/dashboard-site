import { useState } from 'react';
import Button from '@/components/Button';
import useUser from '@/hooks/useUser';
import { Modal } from './styles';
import { Label, ControlContainer } from '../../styles';
import { MODAL_DELETE_ACCOUNT } from '@/constants/modal';

export default function DeleteAccount() {
  const [isDeleteAccount, setIsDeleteAccount] = useState(false);

  return (
    <ControlContainer>
      <Label htmlFor="card-name">
        Delete Account <p>you can delete your account here</p>
      </Label>
      <div className="option-container">
        <Button onClick={() => setIsDeleteAccount(true)}>Delete Account</Button>
      </div>
      <ConfirmDelete states={[isDeleteAccount, setIsDeleteAccount]} />
    </ControlContainer>
  );
}

function ConfirmDelete({ states }) {
  const { deleteAccount } = useUser();
  const [isDeleteAccount, setIsDeleteAccount] = states;

  return (
    <Modal
      id={MODAL_DELETE_ACCOUNT}
      isOpen={isDeleteAccount}
      onClose={() => setIsDeleteAccount(false)}
    >
      <h3>Are you sure want to delete your account?</h3>
      <Button className="custom-button" onClick={deleteAccount}>
        Yes, delete my account
      </Button>
    </Modal>
  );
}
