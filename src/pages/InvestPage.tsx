import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Info } from 'lucide-react';

const InvestPage = () => {
  const navigate = useNavigate();

  const handleCardClick = (type: 'existing' | 'future') => {
    if (type === 'existing') {
      navigate('/invest/select-plan');
    }
    // future 暫時無動作
  };

  const handleInfoClick = (e: React.MouseEvent, type: string) => {
    e.stopPropagation();
    // 顯示 info modal
    alert(type === 'existing' 
      ? '更改你現有帳戶結餘的投資組合，你可選擇指定基金轉換或單次投資組合重組' 
      : '適用於更改所有未來收到的款項的投資組合，包括供款及自另一計劃轉入之款項。'
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-medium text-[#E67E22]">投資</h1>
        <div className="w-8" />
      </div>

      <div className="px-4 py-4">
        {/* Subtitle */}
        <p className="text-gray-600 text-sm mb-6">
          請根據你的需要選擇投資指示選項。
        </p>

        {/* Investment Cards */}
        <div className="space-y-4">
          {/* Card 1: 現有帳戶結餘的投資 */}
          <div 
            onClick={() => handleCardClick('existing')}
            className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow bg-white"
          >
            <div className="flex items-start">
              {/* Icon */}
              <div className="flex-shrink-0 mr-4">
                <img 
                  src="./icons/invest-existing.jpg" 
                  alt="現有帳戶結餘"
                  className="w-12 h-12 object-contain"
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <h3 className="text-base font-medium text-gray-900">現有帳戶結餘的投資</h3>
                  <button 
                    onClick={(e) => handleInfoClick(e, 'existing')}
                    className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                  >
                    <Info size={18} />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  更改你現有帳戶結餘的投資組合，你可選擇指定基金轉換或單次投資組合重組
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: 未來供款的投資 */}
          <div 
            onClick={() => handleCardClick('future')}
            className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow bg-white"
          >
            <div className="flex items-start">
              {/* Icon */}
              <div className="flex-shrink-0 mr-4">
                <img 
                  src="./icons/invest-future.jpg" 
                  alt="未來供款"
                  className="w-12 h-12 object-contain"
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <h3 className="text-base font-medium text-gray-900">未來供款的投資</h3>
                  <button 
                    onClick={(e) => handleInfoClick(e, 'future')}
                    className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                  >
                    <Info size={18} />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  適用於更改所有未來收到的款項的投資組合，包括供款及自另一計劃轉入之款項。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestPage;