import { useEffect } from 'react';
import { useHookstate } from '@hookstate/core';
import useActivities from '@/hooks/useActivities';
import useUser, { _defineUserAttribute } from '@/hooks/useUser';
import { CARD_STATE_PROVIDER } from '@/utils/states';
import { updateLocalStorage, getLocalStorage } from '@/utils/storages';
import { STORAGE_CARD } from '@/constants/storages';

export function _syncCardLocalStorage() {
  const currentCard = CARD_STATE_PROVIDER.get({ noproxy: true });
  const cardLocalStorage = getLocalStorage(STORAGE_CARD);
  const { id } = _defineUserAttribute() || {};

  updateLocalStorage(STORAGE_CARD, { ...cardLocalStorage, [id]: currentCard });
}

export default function useVisa() {
  const cardState = useHookstate(CARD_STATE_PROVIDER);
  const { user, isLoggedIn } = useUser();
  const { addActivities } = useActivities();

  const _syncToLocalStorage = () => {
    const cardLocalStorage = getLocalStorage(STORAGE_CARD);

    updateLocalStorage(STORAGE_CARD, {
      ...cardLocalStorage,
      [user.id.get()]: cardState.get({ noproxy: true }),
    });
  };
  const _handleChangeID = (v) => {
    cardState.id.set(v);
    _syncToLocalStorage();
    addActivities({
      title: 'Changed: Visa Card ID',
      type: 'Visa Card',
    });
  };
  const _handleChangeName = (v, mute) => {
    cardState.name.set(v);
    _syncToLocalStorage();
    !mute &&
      addActivities({
        title: 'Changed: Visa Card name',
        type: 'Visa Card',
      });
  };

  useEffect(() => {
    if (!cardState.name.get() && isLoggedIn) {
      _handleChangeName(user.name.get(), true);
    }
  }, [cardState]);

  return { card_info: cardState, changeVisaID: _handleChangeID, changeVisaName: _handleChangeName };
}
