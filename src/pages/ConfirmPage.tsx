import { useEffect } from 'react';

const ConfirmPage = () => {
  useEffect(() => {
    alert('ConfirmPage loaded!');
  }, []);

  return (
    <div style={{padding: 50, background: 'red'}}>
      <h1>TEST PAGE LOADED</h1>
    </div>
  );
};

export default ConfirmPage;
