import { useState } from 'react';
import { X, ChevronDown, Monitor, RefreshCw, FileText, User } from 'lucide-react';

interface MenuItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const MyMPFPage = () => {
  const [activeTab, setActiveTab] = useState('my-mpf');

  const menuItems: MenuItem[] = [
    {
      id: '1',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="menu-icon-svg">
          <rect x="12" y="8" width="24" height="32" rx="3" stroke="currentColor" strokeWidth="2.5"/>
          <path d="M18 16H30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M18 24H30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M18 32H24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M32 30L36 34L32 38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: '登記強積金帳戶',
      description: '登記強積金帳戶，如可扣稅自願性供款帳戶、特別自願性供款帳戶等',
    },
    {
      id: '2',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="menu-icon-svg">
          <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2.5"/>
          <path d="M24 16V24L30 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M32 12L36 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M36 12L32 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      ),
      title: '作出一次性自願性供款',
      description: '向你的可扣稅自願性供款帳戶、特別自願性供款帳戶及／或自僱人士帳戶作出整筆供款',
    },
    {
      id: '3',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="menu-icon-svg">
          <rect x="10" y="12" width="28" height="24" rx="3" stroke="currentColor" strokeWidth="2.5"/>
          <path d="M10 20H38" stroke="currentColor" strokeWidth="2.5"/>
          <path d="M18 28H22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="32" cy="28" r="3" stroke="currentColor" strokeWidth="2.5"/>
          <path d="M16 12V8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M32 12V8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      ),
      title: '更改供款週期及／或金額',
      description: '更改可扣稅自願性供款供款週期及／或金額',
    },
    {
      id: '4',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="menu-icon-svg">
          <path d="M8 36L18 26L26 34L40 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M32 20H40V28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: '投資',
      description: '進行基金轉換／重組投資組合，以及更改投資授權',
    },
    {
      id: '5',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="menu-icon-svg">
          <rect x="8" y="16" width="32" height="20" rx="3" stroke="currentColor" strokeWidth="2.5"/>
          <circle cx="24" cy="26" r="5" stroke="currentColor" strokeWidth="2.5"/>
          <path d="M16 16V12C16 10.8954 16.8954 10 18 10H30C31.1046 10 32 10.8954 32 12V16" stroke="currentColor" strokeWidth="2.5"/>
        </svg>
      ),
      title: '轉移強積金',
      description: '提交轉移指示，包括整合個人帳戶、離職轉移或轉移自僱人士帳戶、僱員自選安排及轉移...',
    },
    {
      id: '6',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="menu-icon-svg">
          <rect x="14" y="8" width="20" height="28" rx="3" stroke="currentColor" strokeWidth="2.5"/>
          <path d="M18 16H30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M18 22H30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M18 28H24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M24 36V42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M18 42H30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      ),
      title: '提取權益',
      description: '提交提取指示，包括申索強積金權益、提取自願性供款及退還儲備帳戶結餘',
    },
  ];

  const bottomTabs = [
    { id: 'overview', icon: <Monitor size={24} />, label: '帳戶概覽' },
    { id: 'my-mpf', icon: <FileText size={24} />, label: '我的強積金' },
    { id: 'todo', icon: <RefreshCw size={24} />, label: '待辦事項' },
    { id: 'profile', icon: <User size={24} />, label: '個人檔案' },
  ];

  return (
    <div className="mpf-page">
      {/* Top Header */}
      <div className="top-header">
        <div className="header-left">
          <button className="close-btn">
            <X size={24} />
          </button>
          <span className="preview-text">Preview</span>
          <div className="version-dropdown">
            <span className="version-text">v37</span>
            <ChevronDown size={16} />
          </div>
        </div>
        <div className="header-right">
          <button className="header-icon-btn">
            <Monitor size={20} />
          </button>
          <button className="header-icon-btn">
            <RefreshCw size={20} />
          </button>
          <button className="update-btn">Update</button>
        </div>
      </div>

      {/* Page Title */}
      <h1 className="page-title-orange">我的強積金</h1>

      {/* Menu Cards */}
      <div className="menu-cards-container">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-card">
            <div className="menu-card-icon">{item.icon}</div>
            <div className="menu-card-content">
              <h3 className="menu-card-title">{item.title}</h3>
              <p className="menu-card-description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav-bar">
        {bottomTabs.map((tab) => (
          <button
            key={tab.id}
            className={`bottom-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MyMPFPage;
