import { useHookstate } from '@hookstate/core';
import useActivities from '@/hooks/useActivities';
import { CARD_STATE_PROVIDER } from '@/utils/states';
import { syncCardLocalStorage } from '@/utils/storages';

export default function useVisa() {
  const cardState = useHookstate(CARD_STATE_PROVIDER);
  const { addActivities } = useActivities();

  const _handleChangeID = (v) => {
    cardState.id.set(v);
    syncCardLocalStorage();
    addActivities({
      title: 'Changed: Visa Card ID',
      type: 'Visa Card',
    });
  };
  const _handleChangeName = (v) => {
    cardState.name.set(v);
    syncCardLocalStorage();
    addActivities({
      title: 'Changed: Visa Card name',
      type: 'Visa Card',
    });
  };

  return { card_info: cardState, changeVisaID: _handleChangeID, changeVisaName: _handleChangeName };
}
