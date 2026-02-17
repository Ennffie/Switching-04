import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const InvestPage = () => {
  const navigate = useNavigate();

  const investCards = [
    {
      title: '基金轉換指示',
      subtitle: '轉換現有基金組合',
      icon: '/icons/manulife-logo.png',
      iconBg: '#00A651',
      onClick: () => navigate('/invest/select-plan')
    },
    {
      title: '更改投資指示',
      subtitle: '更改未來投資分配',
      icon: '/icons/aia-logo.png',
      iconBg: '#E31937',
    },
  ];

  const menuItems = [
    { icon: '📊', label: '我的投資組合', hasArrow: true },
    { icon: '📈', label: '表現', hasArrow: true },
    { icon: '💰', label: '強積金價格', hasArrow: true },
    { icon: '💵', label: '強積金供款', hasArrow: true },
    { icon: '📋', label: '強積金戶口摘要', hasArrow: true },
    { icon: '🔔', label: '強積金提示', hasArrow: true },
  ];

  return (
    <div className="page-container no-bottom-nav">
      {/* Header */}
      <div className="invest-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </button>
        <h1 className="page-title">投資</h1>
        <div className="header-placeholder"></div>
      </div>

      {/* Investment Cards */}
      <div className="invest-cards">
        {investCards.map((card, index) => (
          <div 
            key={index} 
            className="invest-card"
            onClick={card.onClick}
          >
            <div className="invest-card-content">
              <div className="invest-card-text">
                <h3 className="invest-card-title">{card.title}</h3>
                <p className="invest-card-subtitle">{card.subtitle}</p>
              </div>
              <div 
                className="invest-card-icon"
                style={{ backgroundColor: card.iconBg }}
              >
                <img src={card.icon} alt="" className="card-logo" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Menu List */}
      <div className="menu-list">
        {menuItems.map((item, index) => (
          <div key={index} className="menu-item">
            <div className="menu-item-left">
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
            </div>
            <div className="menu-item-right">
              {item.hasArrow && <ChevronRight size={20} className="menu-arrow" />}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Spacer */}
      <div className="bottom-spacer">
        <img src="/bottom-bg.png" alt="" className="bottom-bg-image" />
      </div>
    </div>
  );
};

export default InvestPage;
