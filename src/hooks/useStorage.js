import { useNavigate } from 'react-router-dom';
import { removeLocalStorage, removeSessionStorage } from '@/utils/storages';
import { resetStates, hydrateStates } from '@/utils/states';

export default function useStorage() {
  const navigate = useNavigate();

  function _handleResetLogout(withNavigate = true) {
    removeLocalStorage();
    removeSessionStorage();
    resetStates();
    withNavigate && navigate('/login');
  }

  function _handleSyncAll() {
    hydrateStates();
  }

  return { resetLogout: _handleResetLogout, syncAll: _handleSyncAll };
}
