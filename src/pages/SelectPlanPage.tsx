import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronDown } from 'lucide-react';

const SelectPlanPage = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'manulife',
      name: '宏利環保行業計劃',
      icon: '/icons/manulife-logo.png',
      iconBg: '#00A651',
    },
    {
      id: 'aia',
      name: '友邦強積金優選計劃',
      icon: '/icons/aia-logo.png',
      iconBg: '#E31937',
    },
  ];

  const steps = [
    { number: 1, label: '選擇計劃', active: true },
    { number: 2, label: '基金轉換指示', active: false },
    { number: 3, label: '確認', active: false },
  ];

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

      {/* Plan Selection */}
      <div className="plan-selection">
        <h2 className="section-title">選擇計劃</h2>
        
        <div className="plan-cards">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`plan-card ${selectedPlan === plan.id ? 'selected' : ''}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              <div 
                className="plan-card-icon"
                style={{ backgroundColor: plan.iconBg }}
              >
                <img src={plan.icon} alt="" className="plan-logo" />
              </div>
              <div className="plan-card-content">
                <span className="plan-name">{plan.name}</span>
                <ChevronDown 
                  size={20} 
                  className={`plan-arrow ${selectedPlan === plan.id ? 'rotated' : ''}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Button */}
      <div className="bottom-button-container">
        <button 
          className={`next-button ${selectedPlan ? 'active' : 'disabled'}`}
          onClick={() => selectedPlan && navigate('/invest/fund-transfer')}
          disabled={!selectedPlan}
        >
          下一步
        </button>
      </div>

      {/* Bottom Spacer */}
      <div className="bottom-spacer">
        <img src="/bottom-bg.png" alt="" className="bottom-bg-image" />
      </div>
    </div>
  );
};

export default SelectPlanPage;
