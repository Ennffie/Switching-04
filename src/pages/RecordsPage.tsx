import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, SlidersHorizontal, LayoutGrid } from 'lucide-react';

const RecordsPage = () => {
  const navigate = useNavigate();

  const referenceNumber = 'SGD0709209016503813';
  const transactionNumber = 'SOD0709209022541674';

  return (
    <div className="page-container no-bottom-nav">
      {/* Header */}
      <div className="invest-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </button>
        <h1 className="page-title">我的紀錄</h1>
        <div className="header-actions" style={{ display: 'flex', gap: '15px' }}>
          <Search size={24} />
          <SlidersHorizontal size={24} />
          <LayoutGrid size={24} />
        </div>
      </div>

      {/* Content */}
      <div className="records-content" style={{ padding: '20px' }}>
        <div style={{ marginBottom: '15px', color: '#666' }}>
          共 1 個結果
        </div>

        {/* Record Card */}
        <div 
          className="record-card" 
          style={{ 
            background: 'white', 
            borderRadius: '12px', 
            padding: '15px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            border: '1px solid #f0f0f0'
          }}
        >
          {/* Reference Numbers */}
          <div style={{ 
            background: '#FFF9E6', 
            padding: '10px', 
            borderRadius: '8px',
            marginBottom: '15px',
            fontSize: '12px'
          }}>
            <div>參考編號：#{referenceNumber}</div>
            <div>交易#1的參考編號：#{transactionNumber}</div>
          </div>

          {/* Status Tag */}
          <div style={{ marginBottom: '15px' }}>
            <span style={{ 
              background: '#E19C4B', 
              color: 'white', 
              padding: '4px 12px', 
              borderRadius: '12px',
              fontSize: '12px'
            }}>
              待投資指示
            </span>
          </div>

          {/* Plan Info */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <img 
              src="./icons/manulife-logo.png" 
              alt="宏利" 
              style={{ width: '40px', height: '40px', marginRight: '12px' }} 
            />
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                宏利環球精選 (強積金) 計劃
              </div>
              <div style={{ color: '#666', fontSize: '14px' }}>
                29819644
              </div>
            </div>
          </div>

          {/* Transaction Details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '14px' }}>
            <div style={{ color: '#666' }}>交易類別</div>
            <div style={{ textAlign: 'right' }}>基金轉換</div>
            
            <div style={{ color: '#666' }}>交易來源</div>
            <div style={{ textAlign: 'right' }}>流動應用程式</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordsPage;
