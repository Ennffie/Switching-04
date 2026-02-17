import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const ConfirmPage = () => {
  const navigate = useNavigate();

  const steps = [
    { number: 1, label: '選擇計劃', completed: true },
    { number: 2, label: '基金轉換指示', completed: true },
    { number: 3, label: '確認', active: true },
  ];

  const handleConfirm = () => {
    navigate('/invest/terms');
  };

  return (
    <div className="page-container no-bottom-nav">
      {/* Header */}
      <div className="invest-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </button>
        <h1 className="page-title">現有帳戶結餘的投資</h1>
        <div className="header-placeholder"></div>
      </div>

      {/* Step Indicator */}
      <div className="step-indicator">
        {steps.map((step, index) => (
          <div key={index} className={`step-item ${step.active ? 'active' : ''} ${step.completed ? 'completed' : ''}`}>
            <div className={`step-number ${step.active ? 'active' : ''} ${step.completed ? 'completed' : ''}`}>
              {step.completed ? '✓' : step.number}
            </div>
            <span className="step-label">{step.label}</span>
          </div>
        ))}
      </div>

      {/* Confirm Content */}
      <div className="confirm-content" style={{ padding: '20px' }}>
        <h2 style={{ color: '#E19C4B', marginBottom: '20px' }}>確認</h2>
        
        {/* Step 1 Summary */}
        <div className="summary-section" style={{ marginBottom: '20px' }}>
          <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontWeight: 'bold' }}>第1步：選擇計劃及帳戶</span>
          </div>
          <div className="summary-card" style={{ background: '#f5f5f5', padding: '15px', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <img src="./icons/manulife-logo.png" alt="宏利" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
              <div>
                <div style={{ fontWeight: 'bold' }}>宏利環球精選 (強積金) 計劃</div>
                <div style={{ fontSize: '12px', color: '#666' }}>成員帳戶號碼：29819644</div>
              </div>
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>帳戶類別：個人帳戶</div>
            <div style={{ fontSize: '14px', color: '#666' }}>帳戶結餘（港幣）：$133,538.8</div>
          </div>
        </div>

        {/* Step 2 Summary */}
        <div className="summary-section" style={{ marginBottom: '20px' }}>
          <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontWeight: 'bold' }}>第2步：基金轉換指示</span>
          </div>
          
          <div className="summary-card" style={{ background: '#f5f5f5', padding: '15px', borderRadius: '8px', marginBottom: '10px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>基金轉換指示 1</div>
            
            <div style={{ marginBottom: '10px' }}>
              <div style={{ color: '#666', fontSize: '14px', marginBottom: '5px' }}>轉出</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #ddd' }}>
                <span>強制性供款</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                <span>宏利MPF富達平穩增長基金</span>
                <span>10%</span>
              </div>
            </div>

            <div>
              <div style={{ color: '#666', fontSize: '14px', marginBottom: '5px' }}>轉入</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #ddd' }}>
                <span>強制性供款</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                <span>預設投資策略</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button 
          className="next-button-fixed active"
          onClick={handleConfirm}
          style={{ width: '100%', marginTop: '20px' }}
        >
          提交
        </button>
      </div>

      {/* Bottom Spacer */}
      <div className="bottom-spacer-large">
        <img src="./bottom-bg.png" alt="" className="bottom-bg-image" />
      </div>
    </div>
  );
};

export default ConfirmPage;
