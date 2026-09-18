import React, { useState } from 'react';
import { 
  Layers, 
  ArrowRight, 
  Server, 
  Smartphone, 
  Database, 
  Cpu, 
  Receipt, 
  Truck, 
  CheckCircle2,
  FileCode2,
  ShieldAlert
} from 'lucide-react';
import { audio } from './AudioEngine';

const pipelineStages = [
  {
    id: 'stage-1',
    step: '01',
    title: 'Touchpoint Ingress',
    sub: 'WhatsApp / AI Chatbot / 3D Web',
    icon: Smartphone,
    color: '#ffffff',
    desc: 'Customer submits order intent via WhatsApp conversational flow or modern 3D Web catalog in natural language.',
    bapi: 'META_CLOUD_API // WEBHOOK_RECEIVE',
    payload: `{\n  "channel": "whatsapp_cloud_api",\n  "from": "+91-98800-XXXXX",\n  "intent": "CREATE_SALES_ORDER",\n  "material": "MAT-9042",\n  "quantity": 50,\n  "customer_id": "CUST_BLR_1002"\n}`,
  },
  {
    id: 'stage-2',
    step: '02',
    title: 'AI Semantic Gateway',
    sub: 'Entity Extraction & Guardrails',
    icon: Cpu,
    color: '#ffffff',
    desc: 'LLM orchestrator extracts structured JSON schema parameters, checks customer credit ceiling, and verifies inventory.',
    bapi: 'LANGGRAPH // PYDANTIC_SCHEMA_VALIDATE',
    payload: `def validate_order(intent):\n    schema = SalesOrderInput(\n        doc_type="TA",\n        sales_org="1000",\n        distr_chan="10",\n        division="00"\n    )\n    return schema.to_bapi_payload()`,
  },
  {
    id: 'stage-3',
    step: '03',
    title: 'SAP SD Sales Order (VA01)',
    sub: 'BAPI_SALESORDER_CREATEFROMDAT2',
    icon: Database,
    color: '#ffffff',
    desc: 'Automated RFC/OData connection creates standard sales order document (VA01), executing pricing condition procedures.',
    bapi: 'BAPI_SALESORDER_CREATEFROMDAT2',
    payload: `CALL FUNCTION 'BAPI_SALESORDER_CREATEFROMDAT2'\n  EXPORTING\n    ORDER_HEADER_IN = ls_header\n  TABLES\n    ORDER_ITEMS_IN  = lt_items\n    ORDER_PARTNERS  = lt_partners\n    RETURN          = lt_return.\n* Result: SO #9002814 Generated`,
  },
  {
    id: 'stage-4',
    step: '04',
    title: 'Outbound Delivery (VL01N)',
    sub: 'BAPI_OUTB_DELIVERY_CREATE_SLS',
    icon: Truck,
    color: '#ffffff',
    desc: 'Generates outbound delivery document, triggers warehouse picking request and logistics carrier tracking assignment.',
    bapi: 'BAPI_OUTB_DELIVERY_CREATE_SLS',
    payload: `{\n  "delivery_doc": "80004128",\n  "picking_status": "COMPLETED",\n  "carrier": "BlueDart_Bangalore",\n  "tracking_awb": "BLR-772910"\n}`,
  },
  {
    id: 'stage-5',
    step: '05',
    title: 'Billing & Auto-Dispatch (VF01)',
    sub: 'BAPI_BILLINGDOC_CREATE',
    icon: Receipt,
    color: '#ffffff',
    desc: 'Posts billing document (VF01) to SAP FI, generates digitally signed GST PDF invoice, and sends WhatsApp confirmation.',
    bapi: 'BAPI_BILLINGDOC_CREATE + WA_SEND_PDF',
    payload: `✅ INVOICE DISPATCHED:\n• SAP Invoice #90011294\n• Total: ₹1,42,800 (incl. 18% GST)\n• Dispatched to customer WhatsApp\n• Pipeline duration: 1.4 seconds.`,
  },
];

export default function SapSdBridge() {
  const [activeStage, setActiveStage] = useState(pipelineStages[0]);

  return (
    <section id="sap-sd" className="py-20 px-4 lg:px-8 max-w-7xl mx-auto border-t border-[#262626]/20 dark:border-white/10 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-white/10 font-mono">
        <div>
          <span className="text-xs text-white font-bold tracking-widest uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] led-blink"></span>
            04 // ENTERPRISE INTEGRATION MATRIX
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-1 font-display uppercase tracking-tight">
            AI × SAP SD ARCHITECTURE
          </h2>
        </div>
        <div className="text-xs text-[#999] mt-3 md:mt-0 max-w-md">
          Bridging conversational frontend agents & WhatsApp automation directly with mission-critical SAP SD Order-to-Cash (O2C) transactions.
        </div>
      </div>

      {/* Interactive Pipeline Sequence Strip */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-8 font-mono text-xs">
        {pipelineStages.map((stage) => {
          const isSelected = activeStage.id === stage.id;
          const StageIcon = stage.icon;
          return (
            <button
              key={stage.id}
              onClick={() => {
                audio.playClick(1100);
                setActiveStage(stage);
              }}
              className={`p-4 text-left border transition-all relative flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'bg-white text-black border-white shadow-lg'
                  : 'bg-[#141414] text-[#bbb] border-white/10 hover:border-white'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 border ${
                    isSelected 
                      ? 'border-black text-black' 
                      : 'border-white/20 text-[#888]'
                  }`}>
                    STEP {stage.step}
                  </span>
                  <StageIcon className={`w-4 h-4 ${isSelected ? 'text-black' : 'text-current'}`} />
                </div>
                <div className="font-bold text-xs leading-snug">{stage.title}</div>
                <div className="text-[10px] text-[#888] mt-1 line-clamp-1">{stage.sub}</div>
              </div>

              {isSelected && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Stage Detail & Code Payload Panel */}
      <div className="bg-[#121212] border border-[#303030] p-6 sm:p-8 lg:p-10 crosshair-corner font-mono">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Stage Explanation */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 text-xs text-white font-bold">
              <span>PIPELINE STAGE {activeStage.step} //</span>
              <span className="text-[#888]">TRANSACTION VALIDATED</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase font-display">
              {activeStage.title}
            </h3>

            <p className="text-xs sm:text-sm font-semibold text-white/90">
              SAP RFC / BAPI SPEC: {activeStage.bapi}
            </p>

            <p className="text-xs sm:text-sm text-[#ccc] leading-relaxed font-sans">
              {activeStage.desc}
            </p>

            {/* SD Core highlights */}
            <div className="border-t border-white/10 pt-4 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#ddd]">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Zero manual entry: Direct automated RFC execution via secure gateway</span>
              </div>
              <div className="flex items-center gap-2 text-[#ddd]">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Condition pricing calculation (PR00, K004 discounts, MWST taxes)</span>
              </div>
              <div className="flex items-center gap-2 text-[#ddd]">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Automatic rollback & fault tolerance on stock deficiency or credit lock</span>
              </div>
            </div>
          </div>

          {/* Right Column: Code / Payload Inspector */}
          <div className="lg:col-span-6 bg-[#0e0e0e] border border-[#333] p-4 text-xs text-white">
            <div className="flex items-center justify-between border-b border-[#262626] pb-2 mb-3 text-[11px] text-[#888]">
              <span className="flex items-center gap-1.5 text-white font-bold">
                <FileCode2 className="w-3.5 h-3.5" />
                TRANSACTION PAYLOAD & BAPI CALL
              </span>
              <span>READ_ONLY // SECURE</span>
            </div>

            <pre className="p-3 bg-[#181818] overflow-x-auto text-[11px] text-[#f4f4f4] leading-relaxed border border-[#2a2a2a]">
              <code>{activeStage.payload}</code>
            </pre>

            <div className="mt-3 flex items-center justify-between text-[10px] text-[#777]">
              <span>PROTOCOL: RFC / ODATA v4</span>
              <span className="text-white font-bold">ERP STATE: S/4HANA COMPLIANT</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
