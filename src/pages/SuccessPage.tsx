import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();

  // Generate a reference number
  const referenceNumber = 'SGD' + Date.now().toString().slice(-16);
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '/');
  const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="page-container no-bottom-nav">
      <div className="success-content" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '40px 20px',
        textAlign: 'center'
      }}>
        
        {/* Success Icon */}
        <div style={{ 
          width: '80px', 
          height: '80px', 
          borderRadius: '50%', 
          background: '#FFF9E6', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          marginBottom: '30px'
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E19C4B" strokeWidth="3">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', lineHeight: '1.5' }}>
          成功提交基金轉換／<br/>
          重組投資組合指示
        </h1>

        {/* Reference Info */}
        <div style={{ margin: '30px 0', fontSize: '14px', color: '#666' }}>
          <div style={{ marginBottom: '8px' }}>參考編號：{referenceNumber}</div>
          <div>提交日期及時間：{dateStr}, {timeStr}</div>
        </div>

        {/* Buttons */}
        <div style={{ width: '100%', maxWidth: '300px', marginTop: '40px' }}>
          <button 
            className="next-button-fixed active"
            onClick={() => navigate('/invest/records')}
            style={{ width: '100%', marginBottom: '15px' }}
          >
            查閱提交狀態
          </button>
          <button 
            className="next-button-fixed"
            onClick={() => navigate('/')}
            style={{ 
              width: '100%', 
              background: 'transparent', 
              color: '#333', 
              border: '1px solid #ddd'
            }}
          >
            未來供款的投資
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
