import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const TermsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container no-bottom-nav">
      {/* Header */}
      <div className="invest-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </button>
        <h1 className="page-title" style={{ color: '#E19C4B' }}>條款及細則</h1>
        <div className="header-placeholder"></div>
      </div>

      {/* Terms Content */}
      <div className="terms-content" style={{ padding: '20px', paddingBottom: '120px', overflowY: 'auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <span style={{ color: '#666' }}>顯示較少 </span>
          <span style={{ transform: 'rotate(180deg)', display: 'inline-block' }}>▲</span>
        </div>

        <p style={{ marginBottom: '15px' }}>
          點擊下方「接受」按鈕，即表示閣下確認：
        </p>

        <ol style={{ paddingLeft: '20px', marginBottom: '20px' }}>
          <li style={{ marginBottom: '10px' }}>此申請內所提供之資料正確及完整；</li>
          <li style={{ marginBottom: '10px' }}>閣下明白此申請一經提交，即不可撤回；</li>
          <li style={{ marginBottom: '10px' }}>閣下已閱讀並同意受以下條款及細則約束。</li>
        </ol>

        <div style={{ fontSize: '12px', color: '#666', lineHeight: '1.6' }}>
          <p style={{ marginBottom: '10px' }}>
            <strong>A. 重要事項</strong><br/>
            1. 積金易平台有限公司（「積金易公司」）是強制性公積金計劃管理局（「積金局」）的全資附屬公司。積金易公司將根據「積金易平台一般條款及細則」（可於 https://empf.org.hk/tnc 瀏覽），透過積金易平台為你提供計劃行政服務。
          </p>
          <p style={{ marginBottom: '10px' }}>
            2. 提交本申請前，請先參閱宏利環球精選（強積金）計劃（「本計劃」）之強積金計劃說明書、主要計劃資料文件（你可透過瀏覽積金局的網頁 (https://www.mpfa.org.hk/assets/OD/MT00482_Manulife_Global_Select_(MPF)_Scheme_CH.pdf) 下載強積金計劃說明書及主要計劃資料文件）、重要事項、條款及細則、預設投資策略注意事項及宏利 MPF 穩健基金注意事項。
          </p>
          <p style={{ marginBottom: '10px' }}>
            3. 積金易平台收到完整申請後，才會處理有關指示。如有遺漏（包括但不限於資料不齊全），積金易平台可能未能執行此指示。
          </p>
          <p style={{ marginBottom: '10px' }}>
            4. 遞交本申請後，你可能沒法取消有關更改投資指示。
          </p>
          <p style={{ marginBottom: '10px' }}>
            5. 如你擬為多於一個帳戶更改投資指示，請就每個帳戶分別遞交一份申請。
          </p>
          <p style={{ marginBottom: '10px' }}>
            6. 本申請所有已提供的資料將按照有關強積金法例、積金易平台及本計劃《收集個人資料聲明》（「聲明」）處理。詳情請參閱後頁所提供的「聲明」。
          </p>

          <p style={{ marginBottom: '10px' }}>
            <strong>B. 條款及細則</strong><br/>
            1. 更改投資授權：<br/>
            (i) 指示執行後，新的投資授權方可應用於未來供款／由另一註冊計劃轉入之款項（即不適用於同一計劃的轉移）。處理中的供款／轉入之款項將根據舊有的投資授權作出分配（如有）。<br/>
            (ii) 更改投資授權的截止時間為任何工作日香港時間下午四時。如積金易平台在工作日截止時間前收到的指示，此指示將會在同日生效。而積金易平台在工作日截止時間或之後或非工作日才收到的指示，將會在下一個工作日生效。
          </p>

          <p style={{ marginBottom: '10px' }}>
            2. 現有結餘資產轉換：<br/>
            (i) 資產轉換指示僅適用於帳戶現有結餘，並不適用於處理中的供款／由另一註冊計劃轉入之款項。<br/>
            (ii) 現有結餘資產轉換的截止時間為任何工作日香港時間下午四時。如積金易平台在工作日截止時間前收到的指示，此指示將會在同日執行並以交易日當日的基金價格處理。而積金易平台在工作日截止時間或之後或非工作日（如星期六、公眾假日或烈風／黑色暴雨警告日）才收到的指示，將會在下一個工作日執行。
          </p>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="bottom-summary" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'white', padding: '20px', boxShadow: '0 -2px 10px rgba(0,0,0,0.1)' }}>
        <button 
          className="next-button-fixed active"
          onClick={() => navigate('/invest/success')}
          style={{ width: '100%', marginBottom: '10px' }}
        >
          接受
        </button>
        <button 
          className="next-button-fixed"
          onClick={() => navigate(-1)}
          style={{ width: '100%', background: 'transparent', color: '#333', border: '1px solid #ddd' }}
        >
          拒絕
        </button>
      </div>
    </div>
  );
};

export default TermsPage;
