import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ArrowUpDown, RotateCcw } from 'lucide-react';

interface Fund {
  id: string;
  name: string;
  code: string;
  percentage: number;
}

const FundTransferPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'out' | 'in'>('out');
  const [contributionType, setContributionType] = useState<'mandatory' | 'voluntary'>('mandatory');
  const [rebalanceEnabled, setRebalanceEnabled] = useState(false);
  const [funds, setFunds] = useState<Fund[]>([
    { id: '1', name: '宏利環球精選(強積金)計劃', code: 'ML01', percentage: 0 },
    { id: '2', name: '宏利環球精選(強積金)計劃', code: 'ML02', percentage: 0 },
    { id: '3', name: '宏利環球精選(強積金)計劃', code: 'ML03', percentage: 0 },
    { id: '4', name: '宏利環球精選(強積金)計劃', code: 'ML04', percentage: 0 },
    { id: '5', name: '宏利環球精選(強積金)計劃', code: 'ML05', percentage: 0 },
  ]);
  const [errors, setErrors] = useState<string[]>([]);
  const [sortAsc, setSortAsc] = useState(true);

  const steps = [
    { number: 1, label: '選擇計劃', active: false },
    { number: 2, label: '基金轉換指示', active: true },
    { number: 3, label: '確認', active: false },
  ];

  const totalPercentage = useMemo(() => {
    return funds.reduce((sum, fund) => sum + fund.percentage, 0);
  }, [funds]);

  const handlePercentageChange = (id: string, value: string) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    if (isNaN(numValue) || numValue < 0) return;
    
    setFunds(prev => prev.map(fund => 
      fund.id === id ? { ...fund, percentage: numValue } : fund
    ));
    
    // Clear errors when user makes changes
    setErrors([]);
  };

  const handleReset = () => {
    setFunds(prev => prev.map(fund => ({ ...fund, percentage: 0 })));
    setErrors([]);
  };

  const handleSort = () => {
    setSortAsc(!sortAsc);
    setFunds(prev => [...prev].sort((a, b) => {
      if (sortAsc) {
        return a.code.localeCompare(b.code);
      } else {
        return b.code.localeCompare(a.code);
      }
    }));
  };

  const validateAndProceed = () => {
    const newErrors: string[] = [];
    
    if (totalPercentage !== 100) {
      newErrors.push(`總和必須等於100%，目前為${totalPercentage}%`);
    }
    
    const hasNegative = funds.some(f => f.percentage < 0);
    if (hasNegative) {
      newErrors.push('百分比不能為負數');
    }
    
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }
    
    navigate('/invest/confirm');
  };

  return (
    <div className="page-container no-bottom-nav">
      {/* Header */}
      <div className="invest-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </button>
        <h1 className="page-title">基金轉換指示</h1>
        <div className="header-placeholder"></div>
      </div>

      {/* Step Indicator */}
      <div className="step-indicator">
        {steps.map((step, index) => (
          <div key={index} className={`step-item ${step.active ? 'active' : ''}`}>
            <div className={`step-number ${step.active ? 'active' : ''}`}>
              {step.number}
            </div>
            <span className="step-label">{step.label}</span>
          </div>
        ))}
      </div>

      {/* Contribution Type Slider */}
      <div className="contribution-slider">
        <button 
          className={`slider-btn ${contributionType === 'mandatory' ? 'active' : ''}`}
          onClick={() => setContributionType('mandatory')}
        >
          強制性供款
        </button>
        <button 
          className={`slider-btn ${contributionType === 'voluntary' ? 'active' : ''}`}
          onClick={() => setContributionType('voluntary')}
        >
          自願性供款
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="tab-container-fund">
        <button 
          className={`tab-btn ${activeTab === 'out' ? 'active' : ''}`}
          onClick={() => setActiveTab('out')}
        >
          轉出
        </button>
        <button 
          className={`tab-btn ${activeTab === 'in' ? 'active' : ''}`}
          onClick={() => setActiveTab('in')}
        >
          轉入
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'out' && (
          <div className="transfer-out-section">
            {/* Rebalance Toggle */}
            <div className="rebalance-toggle">
              <span className="toggle-label">重組投資組合</span>
              <button 
                className={`toggle-switch ${rebalanceEnabled ? 'active' : ''}`}
                onClick={() => setRebalanceEnabled(!rebalanceEnabled)}
              >
                <div className="toggle-thumb"></div>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'in' && (
          <div className="transfer-in-section">
            {/* Sort and Reset Buttons */}
            <div className="fund-actions-bar">
              <button className="action-btn" onClick={handleSort}>
                <ArrowUpDown size={16} />
                <span>排序</span>
              </button>
              <button className="action-btn" onClick={handleReset}>
                <RotateCcw size={16} />
                <span>重設</span>
              </button>
            </div>
          </div>
        )}

        {/* Fund List */}
        <div className="fund-list">
          {funds.map((fund) => (
            <div key={fund.id} className="fund-item">
              <div className="fund-info">
                <span className="fund-code">{fund.code}</span>
                <span className="fund-name">{fund.name}</span>
              </div>
              <div className="fund-input">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={fund.percentage || ''}
                  onChange={(e) => handlePercentageChange(fund.id, e.target.value)}
                  placeholder="0"
                  className="percentage-input"
                />
                <span className="percentage-symbol">%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Validation Errors */}
        {errors.length > 0 && (
          <div className="validation-errors">
            {errors.map((error, index) => (
              <p key={index} className="error-message">{error}</p>
            ))}
          </div>
        )}

        {/* Notice Section */}
        <div className="notice-section-plain">
          <p className="notice-title">注意：</p>
          <p className="notice-text">
            1. 基金轉換指示一般需時約5個工作天處理。<br/>
            2. 閣下可於「交易紀錄」查閱有關指示的處理進度。<br/>
            3. 如閣下於下午4時前遞交指示，該指示將會以當日的基金價格執行。<br/>
            4. 如閣下於下午4時後遞交指示，該指示將會以下一個工作天的基金價格執行。
          </p>
        </div>
      </div>

      {/* Bottom Summary */}
      <div className="bottom-summary">
        <div className="summary-content">
          <div className="total-row">
            <span className="total-label">總和</span>
            <span className={`total-value ${totalPercentage === 100 ? 'valid' : 'invalid'}`}>
              {totalPercentage}%
            </span>
          </div>
          <button 
            className={`next-button-fixed ${totalPercentage === 100 ? 'active' : 'disabled'}`}
            onClick={validateAndProceed}
            disabled={totalPercentage !== 100}
          >
            下一步
          </button>
        </div>
      </div>

      {/* Bottom Spacer */}
      <div className="bottom-spacer-large">
        <img src="/bottom-bg.png" alt="" className="bottom-bg-image" />
      </div>
    </div>
  );
};

export default FundTransferPage;
