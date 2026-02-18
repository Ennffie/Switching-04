import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Inject custom styles
const customStyles = document.createElement('style')
customStyles.textContent = `
/* Custom App Styles */
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f5f5f5; -webkit-font-smoothing: antialiased; color: #333; }

/* MPF Page */
.mpf-page { min-height: 100vh; background-color: #f5f5f5; display: flex; flex-direction: column; padding-bottom: 80px; }

/* Top Header */
.top-header { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background-color: #fff; border-bottom: 1px solid #e8e8e8; }
.header-left { display: flex; align-items: center; gap: 12px; }
.close-btn { background: none; border: none; padding: 4px; cursor: pointer; color: #333; display: flex; align-items: center; justify-content: center; }
.preview-text { font-size: 16px; font-weight: 500; color: #333; }
.version-dropdown { display: flex; align-items: center; gap: 4px; padding: 4px 8px; background-color: #f0f0f0; border-radius: 6px; cursor: pointer; }
.version-text { font-size: 14px; color: #666; }
.header-right { display: flex; align-items: center; gap: 8px; }
.header-icon-btn { background: none; border: none; padding: 8px; cursor: pointer; color: #666; display: flex; align-items: center; justify-content: center; border-radius: 6px; transition: background-color 0.2s; }
.header-icon-btn:hover { background-color: #f0f0f0; }
.update-btn { padding: 8px 16px; background-color: #fff; border: 1px solid #e0e0e0; border-radius: 6px; font-size: 14px; font-weight: 500; color: #333; cursor: pointer; transition: all 0.2s; }
.update-btn:hover { background-color: #f5f5f5; border-color: #ccc; }

/* Page Title */
.page-title-orange { font-size: 24px; font-weight: 700; color: #e67e22; padding: 20px 16px 16px; background-color: #f5f5f5; }

/* Menu Cards */
.menu-cards-container { display: flex; flex-direction: column; gap: 12px; padding: 0 16px 20px; flex: 1; }
.menu-card { display: flex; align-items: flex-start; gap: 16px; padding: 20px 16px; background-color: #fff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04); cursor: pointer; transition: all 0.2s; }
.menu-card:hover { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); transform: translateY(-1px); }
.menu-card:active { transform: scale(0.995); }
.menu-card-icon { flex-shrink: 0; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; color: #333; }
.menu-icon-svg { width: 40px; height: 40px; }
.menu-card-content { flex: 1; display: flex; flex-direction: column; gap: 6px; }
.menu-card-title { font-size: 17px; font-weight: 600; color: #333; line-height: 1.3; }
.menu-card-description { font-size: 14px; color: #888; line-height: 1.5; }

/* Bottom Navigation */
.bottom-nav-bar { position: fixed; bottom: 0; left: 0; right: 0; display: flex; justify-content: space-around; align-items: center; background-color: #fff; border-top: 1px solid #e8e8e8; padding: 8px 0 20px; z-index: 100; }
.bottom-tab { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 8px 16px; background: none; border: none; cursor: pointer; color: #999; transition: color 0.2s; }
.bottom-tab.active { color: #333; }
.tab-icon { display: flex; align-items: center; justify-content: center; }
.tab-label { font-size: 11px; font-weight: 400; }

/* Page Container */
.page-container { min-height: 100vh; background-color: #f5f5f5; display: flex; flex-direction: column; }
.page-container.no-bottom-nav { padding-bottom: 0; }

/* Invest Header */
.invest-header { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background-color: #fff; border-bottom: 1px solid #e8e8e8; }
.back-button { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: none; border: none; cursor: pointer; color: #333; padding: 0; border-radius: 8px; transition: background-color 0.2s; }
.back-button:hover { background-color: rgba(0, 0, 0, 0.05); }
.page-title { font-size: 17px; font-weight: 600; color: #333; margin: 0; text-align: center; flex: 1; }
.header-placeholder { width: 40px; }

/* Step Indicator */
.step-indicator { display: flex; align-items: center; justify-content: center; padding: 20px 16px; background-color: #fff; gap: 24px; }
.step-item { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.step-number { width: 36px; height: 36px; border-radius: 50%; background-color: #e5e5e5; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600; color: #999; }
.step-number.active { background-color: #E19C4B; color: #fff; }
.step-number.completed { background-color: #4CAF50; color: #fff; }
.step-label { font-size: 13px; color: #666; }
.step-item.active .step-label { color: #E19C4B; font-weight: 600; }

/* Plan Selection */
.plan-selection { flex: 1; padding: 20px 16px; }
.section-title { font-size: 20px; font-weight: 600; color: #333; margin-bottom: 20px; }
.plan-cards { display: flex; flex-direction: column; gap: 12px; }
.plan-card { display: flex; align-items: center; gap: 16px; padding: 16px; background-color: #fff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04); cursor: pointer; transition: all 0.2s; border: 2px solid transparent; }
.plan-card:hover { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); }
.plan-card.selected { border-color: #E19C4B; background-color: #FFF9F0; }
.plan-card-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.plan-logo { width: 32px; height: 32px; object-fit: contain; }
.plan-card-content { flex: 1; display: flex; align-items: center; justify-content: space-between; }
.plan-name { font-size: 16px; font-weight: 500; color: #333; }
.plan-arrow { color: #999; transition: transform 0.2s; }
.plan-arrow.rotated { transform: rotate(180deg); }

/* Bottom Button */
.bottom-button-container { padding: 20px 16px 40px; background-color: #fff; border-top: 1px solid #e8e8e8; }
.next-button { width: 100%; height: 52px; border-radius: 26px; border: none; font-size: 17px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; background-color: #e0e0e0; color: #999; }
.next-button.disabled { background-color: #e0e0e0; color: #999; cursor: not-allowed; }
.next-button.active { background-color: #E19C4B; color: #fff; cursor: pointer; }
.next-button.active:hover { background-color: #d48b3a; }

/* Confirm Page */
.confirm-content { flex: 1; padding: 20px 16px; overflow-y: auto; }
.summary-section { margin-bottom: 24px; }
.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.section-header span { font-size: 16px; font-weight: 600; color: #333; }
.summary-card { background: #fff; padding: 16px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04); }
.next-button-fixed { width: 100%; height: 52px; border-radius: 26px; border: none; font-size: 17px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; background-color: #e0e0e0; color: #999; margin-top: 20px; }
.next-button-fixed.active { background-color: #E19C4B; color: #fff; }
.next-button-fixed.active:hover { background-color: #d48b3a; }

/* Bottom Spacer */
.bottom-spacer-large { height: 100px; background-color: #f5f5f5; }
.bottom-spacer { height: 40px; background-color: #f5f5f5; }
.bottom-bg-image { width: 100%; height: auto; display: block; }

/* Responsive */
@media (max-width: 375px) {
  .menu-card { padding: 16px 12px; }
  .menu-card-title { font-size: 16px; }
  .menu-card-description { font-size: 13px; }
  .page-title-orange { font-size: 22px; }
}

@supports (padding-bottom: env(safe-area-inset-bottom)) {
  .bottom-nav-bar { padding-bottom: calc(20px + env(safe-area-inset-bottom)); }
  .mpf-page { padding-bottom: calc(80px + env(safe-area-inset-bottom)); }
}
`
document.head.appendChild(customStyles)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
