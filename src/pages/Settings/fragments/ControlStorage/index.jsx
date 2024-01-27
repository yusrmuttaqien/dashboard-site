import { useState, useEffect } from 'react';
import useStorage from '@/hooks/useStorage';
import Button from '@/components/Button';
import { Label, ControlContainer } from '../../styles';

export default function ControlStorage() {
  const [isSaved, setIsSaved] = useState(false);
  const { resetLogout, syncAll } = useStorage();

  function _refreshStates() {
    syncAll();
    setIsSaved(true);
  }

  useEffect(() => {
    if (!isSaved) return;

    const timeout = setTimeout(() => setIsSaved(false), 2000);

    return () => clearTimeout(timeout);
  }, [isSaved]);

  return (
    <ControlContainer>
      <Label htmlFor="card-name" $save={isSaved}>
        Storage control{' '}
        <p>
          you can reset or refresh site storage here<span>✓</span>
        </p>
      </Label>
      <div className="option-container">
        <Button onClick={resetLogout}>Reset storage & logout</Button>
        <Button onClick={_refreshStates}>Sync states with storage</Button>
      </div>
    </ControlContainer>
  );
}
