import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Sparkles, ShieldCheck, CheckCircle2, AlertTriangle, 
  RotateCcw, Eye, FileText, Globe, Mail, Building, 
  Check, Lock, ExternalLink, X, RefreshCw, Trash2, Clock, Sliders
} from 'lucide-react';

const ease = [0.16, 1, 0.3, 1];

export default function AdminOutreach() {
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [country, setCountry] = useState('United States');
  const [leadType, setLeadType] = useState('auto_detect');
  const [isSimulated, setIsSimulated] = useState(true); // Default to safe simulation mode!

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentLead, setCurrentLead] = useState(null);
  const [editedSubject, setEditedSubject] = useState('');
  const [editedBody, setEditedBody] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendResult, setSendResult] = useState(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);

  // Campaign history
  const [campaignLeads, setCampaignLeads] = useState([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);

  // 50-Lead Database state
  const [prospects, setProspects] = useState([]);
  const [prospectFilter, setProspectFilter] = useState('A'); // 'A' | 'Agency' | 'Brand' | 'All'
  const [prospectSearch, setProspectSearch] = useState('');

  // Batch Outreach State
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [isBatchGenerating, setIsBatchGenerating] = useState(false);
  const [batchDrafts, setBatchDrafts] = useState([]);
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [batchDelay, setBatchDelay] = useState(30);
  const [batchIsSimulated, setBatchIsSimulated] = useState(true);
  const [isBatchDispatching, setIsBatchDispatching] = useState(false);
  const [batchReport, setBatchReport] = useState(null);

  useEffect(() => {
    fetchLeads();
    fetchProspects();
  }, []);

  const fetchProspects = async () => {
    try {
      const res = await fetch('/api/outreach/prospects');
      if (res.ok) {
        const data = await res.json();
        setProspects(data.prospects || []);
      }
    } catch (e) {
      console.warn('Failed to load prospects database:', e);
    }
  };

  const handleSelectProspect = (p) => {
    setEmail(p.email || '');
    setCompanyName(p.company || '');
    setWebsiteUrl(p.website || '');
    setCountry(p.country || 'United States');
    setLeadType(p.segment?.toLowerCase().includes('agency') ? 'Agency' : 'Direct Brand');
    
    // Auto-scroll to workbench
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const toggleSelectProspect = (id) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSelectBatch = (count, priorityOnly = false) => {
    const valid = prospects.filter(p => p.email && (!priorityOnly || p.priority === 'A'));
    const slice = count === 'all' ? valid : valid.slice(0, count);
    setSelectedIds(new Set(slice.map(p => p.id)));
  };

  const handleSendToAll50 = async () => {
    const valid = prospects.filter(p => p.email);
    setSelectedIds(new Set(valid.map(p => p.id)));
    
    setIsBatchGenerating(true);
    setBatchReport(null);

    try {
      const res = await fetch('/api/outreach/batch-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prospects: valid })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setBatchDrafts(data.drafts || []);
        setShowBatchModal(true);
        fetchLeads();
      } else {
        alert(data.error || 'Failed to generate drafts for all leads');
      }
    } catch (err) {
      alert(`Network error during batch generation: ${err.message}`);
    } finally {
      setIsBatchGenerating(false);
    }
  };

  const handleClearSelection = () => {
    setSelectedIds(new Set());
  };

  const handleGenerateBatch = async () => {
    const selectedProspects = prospects.filter(p => selectedIds.has(p.id) && p.email);
    if (selectedProspects.length === 0) return;

    setIsBatchGenerating(true);
    setBatchReport(null);

    try {
      const res = await fetch('/api/outreach/batch-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prospects: selectedProspects })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setBatchDrafts(data.drafts || []);
        setShowBatchModal(true);
        fetchLeads();
      } else {
        alert(data.error || 'Failed to generate batch drafts');
      }
    } catch (err) {
      alert(`Network error during batch generation: ${err.message}`);
    } finally {
      setIsBatchGenerating(false);
    }
  };

  const handleUpdateBatchDraft = (index, field, value) => {
    setBatchDrafts(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleRemoveDraft = (index) => {
    setBatchDrafts(prev => prev.filter((_, i) => i !== index));
  };

  const handleExecuteBatchSend = async () => {
    if (batchDrafts.length === 0) return;
    setIsBatchDispatching(true);
    setBatchReport(null);

    try {
      const res = await fetch('/api/outreach/batch-send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer jellycut_outreach_secret_2026'
        },
        body: JSON.stringify({
          items: batchDrafts.map(d => ({
            to: d.to,
            name: d.company,
            subject: d.subject,
            body: d.body,
            leadId: d.leadId
          })),
          delaySeconds: batchDelay,
          isSimulation: batchIsSimulated
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setBatchReport(data);
        fetchLeads();
      } else {
        alert(data.error || 'Failed to dispatch batch');
      }
    } catch (err) {
      alert(`Network error during batch send: ${err.message}`);
    } finally {
      setIsBatchDispatching(false);
    }
  };

  const fetchLeads = async () => {
    setIsLoadingLeads(true);
    try {
      const res = await fetch('/api/outreach/leads');
      if (res.ok) {
        const data = await res.json();
        setCampaignLeads(data.leads || []);
      }
    } catch (e) {
      console.warn('Failed to load campaign leads:', e);
    } finally {
      setIsLoadingLeads(false);
    }
  };

  const handleAnalyze = async (e) => {
    if (e) e.preventDefault();
    if (!email) return;

    setIsAnalyzing(true);
    setSendResult(null);

    try {
      const res = await fetch('/api/outreach/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          companyName,
          websiteUrl,
          country,
          leadType
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setCurrentLead(data.lead);
        setEditedSubject(data.pitch.subject);
        setEditedBody(data.pitch.body);
        fetchLeads();
      } else {
        alert(data.error || 'Failed to analyze prospect');
      }
    } catch (err) {
      alert(`Network error during analysis: ${err.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleExecuteSend = async () => {
    if (!currentLead) return;
    setIsSending(true);
    setSendResult(null);

    try {
      const res = await fetch('/api/outreach/send', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer jellycut_outreach_secret_2026'
        },
        body: JSON.stringify({
          to: currentLead.email,
          name: currentLead.companyName,
          subject: editedSubject,
          body: editedBody,
          leadId: currentLead.id,
          isSimulation: isSimulated
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSendResult({
          success: true,
          simulated: data.simulated,
          messageId: data.messageId,
          text: data.simulated 
            ? '✅ Simulation test passed: Email formatting & deliverability verified. (No live email was sent).' 
            : `✅ Email dispatched successfully via authenticated SMTP! Message ID: ${data.messageId}`
        });
        fetchLeads();
      } else {
        setSendResult({
          success: false,
          text: `❌ Sending blocked: ${data.error || 'Server error'}`
        });
      }
    } catch (err) {
      setSendResult({
        success: false,
        text: `❌ Network error during dispatch: ${err.message}`
      });
    } finally {
      setIsSending(false);
      setShowApprovalModal(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-paper text-ink pt-28 pb-24 px-6 md:px-12 lg:px-20 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* ── HEADER ── */}
        <div className="border-b border-line pb-8">
          <div className="inline-flex items-center gap-2 bg-[#f0fbe8] border border-[#c8f0a0] rounded-full px-3.5 py-1 text-xs font-semibold text-[#2d7a00] mb-3 font-mono">
            <Lock className="w-3.5 h-3.5 text-jelly-deep" />
            <span>CONFIDENTIAL // INTERNAL OUTREACH SYSTEM</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink font-normal tracking-tight">
            AI Opportunity Engine &amp; Prospect Dispatch
          </h1>
          <p className="mt-2 text-muted text-sm sm:text-base font-light max-w-2xl">
            Research qualified international prospects, map them to the single best Jellycut service &amp; portfolio proof, and require human review before dispatching.
          </p>
        </div>

        {/* ── TWO COLUMN WORKBENCH ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ── LEFT: PROSPECT INPUT FORM ── */}
          <div className="lg:col-span-5 bg-white border border-line rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-jelly-deep" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-ink font-mono">
                1. Target Prospect Input
              </h2>
            </div>

            <form onSubmit={handleAnalyze} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-muted mb-1">
                  Business Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. partner@apexcreative.co.uk"
                  className="w-full px-4 py-2.5 rounded-xl border border-line text-sm focus:outline-none focus:border-jelly-deep"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-muted mb-1">
                  Company Name (Optional)
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Apex Creative Studio"
                  className="w-full px-4 py-2.5 rounded-xl border border-line text-sm focus:outline-none focus:border-jelly-deep"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-muted mb-1">
                  Website URL (Optional)
                </label>
                <input
                  type="text"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="e.g. https://apexcreative.co.uk"
                  className="w-full px-4 py-2.5 rounded-xl border border-line text-sm focus:outline-none focus:border-jelly-deep"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-muted mb-1">
                    Country
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-line text-xs focus:outline-none focus:border-jelly-deep bg-white"
                  >
                    <option value="United States">United States (CAN-SPAM)</option>
                    <option value="United Kingdom">United Kingdom (PECR)</option>
                    <option value="Canada">Canada (CASL)</option>
                    <option value="Australia">Australia (ACMA)</option>
                    <option value="UAE">UAE / Middle East</option>
                    <option value="India">India</option>
                    <option value="International">Other / International</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-muted mb-1">
                    Lead Segment
                  </label>
                  <select
                    value={leadType}
                    onChange={(e) => setLeadType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-line text-xs focus:outline-none focus:border-jelly-deep bg-white"
                  >
                    <option value="auto_detect">⚡ Auto-Detect</option>
                    <option value="Agency">B2B Agency (White-Label)</option>
                    <option value="Direct Brand">E-commerce / D2C Brand</option>
                  </select>
                </div>
              </div>

              {/* Simulation Mode Toggle */}
              <div className="pt-2 border-t border-line/60">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isSimulated}
                    onChange={(e) => setIsSimulated(e.target.checked)}
                    className="rounded text-jelly-deep focus:ring-jelly-deep h-4 w-4"
                  />
                  <span className="text-xs font-medium text-ink">
                    Test Mode (Simulation only, safe dry-run)
                  </span>
                </label>
                <p className="text-[11px] text-muted font-light pl-6.5 mt-0.5">
                  When checked, checks compliance and formatting without actually sending out live emails.
                </p>
              </div>

              <button
                type="submit"
                disabled={isAnalyzing || !email}
                className="w-full bg-ink text-white hover:bg-ink/90 font-semibold py-3 rounded-full text-xs transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-4"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-jelly" />
                    <span>Analyzing Company &amp; Opportunity...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-jelly" />
                    <span>Analyze Opportunity &amp; Draft Pitch</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* ── RIGHT: AI PROPOSAL PREVIEW & HUMAN APPROVAL ── */}
          <div className="lg:col-span-7 bg-white border border-line rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-jelly-deep" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-ink font-mono">
                  2. Generated Pitch &amp; Compliance Preview
                </h2>
              </div>
              {currentLead && (
                <span className="text-[10px] font-mono uppercase bg-[#f0fbe8] text-[#2d7a00] border border-[#c8f0a0] px-2.5 py-0.5 rounded-full font-bold">
                  {currentLead.confidenceLevel === 'high' ? 'High Confidence' : 'Medium Confidence'}
                </span>
              )}
            </div>

            {!currentLead && !isAnalyzing && (
              <div className="border border-dashed border-line rounded-2xl p-12 text-center text-muted space-y-2">
                <Mail className="w-8 h-8 text-muted/50 mx-auto" />
                <p className="text-xs font-mono uppercase">No prospect loaded</p>
                <p className="text-xs font-light max-w-xs mx-auto">
                  Enter an international lead's email on the left and click Analyze to generate a personalized proposal.
                </p>
              </div>
            )}

            {isAnalyzing && (
              <div className="border border-line rounded-2xl p-12 text-center space-y-4">
                <RefreshCw className="w-8 h-8 text-jelly-deep animate-spin mx-auto" />
                <div className="space-y-1">
                  <p className="text-xs font-mono uppercase text-ink font-bold">Researching prospect domain...</p>
                  <p className="text-xs text-muted font-light">Identifying single strongest service fit &amp; portfolio anchor.</p>
                </div>
              </div>
            )}

            {currentLead && !isAnalyzing && (
              <div className="space-y-6">
                
                {/* Strategic Match Card */}
                <div className="bg-[#fafbf7] border border-line/70 rounded-2xl p-4.5 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between text-[11px] font-mono text-muted">
                    <span>Target Company: <strong className="text-ink">{currentLead.companyName}</strong> ({currentLead.country})</span>
                    <span>Type: <strong className="text-ink">{currentLead.leadType}</strong></span>
                  </div>
                  <div className="pt-2 border-t border-line/60 flex flex-wrap gap-y-1 gap-x-4">
                    <span>Opportunity: <strong className="text-jelly-deep">{currentLead.recommendedService}</strong></span>
                    <span>Proof Anchor: <strong className="text-ink">{currentLead.portfolioAnchor}</strong></span>
                  </div>
                </div>

                {/* Quality & Compliance checklist */}
                <div className="space-y-2 pt-1">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-muted font-bold">
                    Automated Quality &amp; Compliance Checks
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="flex items-center gap-1.5 text-ink/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-jelly-deep" />
                      <span>Single target service focus</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-ink/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-jelly-deep" />
                      <span>No fictional claims / buzzwords</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-ink/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-jelly-deep" />
                      <span>Opt-out &amp; sender address included</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-ink/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-jelly-deep" />
                      <span>Suppression &amp; deduplication check</span>
                    </div>
                  </div>
                </div>

                {/* Editable Subject */}
                <div className="space-y-1">
                  <label className="block text-xs font-mono uppercase text-muted">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    value={editedSubject}
                    onChange={(e) => setEditedSubject(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-line text-xs font-semibold text-ink focus:outline-none focus:border-jelly-deep"
                  />
                </div>

                {/* Editable Body */}
                <div className="space-y-1">
                  <label className="block text-xs font-mono uppercase text-muted">
                    Email Body (Review &amp; Edit)
                  </label>
                  <textarea
                    rows={10}
                    value={editedBody}
                    onChange={(e) => setEditedBody(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-line text-xs leading-relaxed font-sans text-ink focus:outline-none focus:border-jelly-deep"
                  />
                </div>

                {/* Send Result Banner */}
                {sendResult && (
                  <div className={`p-4 rounded-2xl text-xs font-mono ${sendResult.success ? 'bg-[#f0fbe8] text-[#2d7a00] border border-[#c8f0a0]' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                    {sendResult.text}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={handleAnalyze}
                    className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-ink font-mono transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Regenerate Draft</span>
                  </button>

                  <button
                    onClick={() => setShowApprovalModal(true)}
                    disabled={isSending}
                    className="bg-ink hover:bg-ink/90 text-white font-semibold px-6 py-2.5 rounded-full text-xs shadow-sm inline-flex items-center gap-2 cursor-pointer transition-all"
                  >
                    <Send className="w-3.5 h-3.5 text-jelly" />
                    <span>Approve &amp; Send Proposal</span>
                  </button>
                </div>

              </div>
            )}

          </div>

        </div>

        {/* ── 50 INTERNATIONAL PROSPECTS DATABASE ── */}
        <div className="bg-white border border-line rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-jelly animate-pulse" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-ink font-mono">
                  Verified International Prospects Database ({prospects.length})
                </h2>
              </div>
              <p className="text-xs text-muted font-light mt-0.5">
                Loaded from <code className="text-[11px] bg-cream px-1.5 py-0.5 rounded">Jellycut_50_International_Leads.xlsx</code>. Select prospects for safe throttled batch dispatch.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              {[
                { id: 'A', label: 'Priority A (20)' },
                { id: 'Agency', label: 'Agencies (30)' },
                { id: 'Brand', label: 'Brands (20)' },
                { id: 'All', label: 'All 50' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setProspectFilter(tab.id)}
                  className={`px-3 py-1 rounded-full border transition-all cursor-pointer ${
                    prospectFilter === tab.id 
                      ? 'bg-ink text-white border-ink font-semibold' 
                      : 'bg-[#fafbf7] text-muted border-line hover:text-ink'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Batch Quick-Select Controls */}
          <div className="bg-[#fafbf7] border border-line/60 rounded-2xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="font-bold text-ink">Batch Select:</span>
              <button
                onClick={() => handleSelectBatch(5, true)}
                className="px-2.5 py-1 bg-white border border-line rounded-lg hover:border-jelly-deep text-muted hover:text-ink transition-colors cursor-pointer"
              >
                Top 5 Priority A
              </button>
              <button
                onClick={() => handleSelectBatch(10, true)}
                className="px-2.5 py-1 bg-white border border-line rounded-lg hover:border-jelly-deep text-muted hover:text-ink transition-colors cursor-pointer"
              >
                Top 10 Priority A
              </button>
              <button
                onClick={() => handleSelectBatch('all')}
                className="px-2.5 py-1 bg-white border border-line rounded-lg hover:border-jelly-deep text-muted hover:text-ink transition-colors cursor-pointer"
              >
                Select All 40 Valid
              </button>
              {selectedIds.size > 0 && (
                <button
                  onClick={handleClearSelection}
                  className="px-2.5 py-1 text-red-600 hover:underline cursor-pointer"
                >
                  Clear ({selectedIds.size})
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSendToAll50}
                disabled={isBatchGenerating}
                className="bg-jelly hover:bg-jelly/90 text-ink font-bold px-4 py-2 rounded-full shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50 transition-all text-xs"
              >
                {isBatchGenerating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-ink" />
                    <span>Preparing All Leads...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-ink" />
                    <span>⚡ Send to All 50 Leads</span>
                  </>
                )}
              </button>

              {selectedIds.size > 0 && selectedIds.size !== prospects.filter(p => p.email).length && (
                <button
                  onClick={handleGenerateBatch}
                  disabled={isBatchGenerating}
                  className="bg-ink hover:bg-ink/90 text-white font-semibold px-4 py-2 rounded-full shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-50 transition-all text-xs"
                >
                  {isBatchGenerating ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-jelly" />
                      <span>Generating ({selectedIds.size})...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-jelly" />
                      <span>Dispatch Selected ({selectedIds.size})</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Prospects Table */}
          <div className="overflow-x-auto max-h-[460px] overflow-y-auto">
            <table className="w-full text-left text-xs">
              <thead className="sticky top-0 bg-white border-b border-line z-10 font-mono text-muted uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 pl-2 w-8">
                    <span className="sr-only">Select</span>
                  </th>
                  <th className="py-2.5">Priority</th>
                  <th className="py-2.5">Company / Country</th>
                  <th className="py-2.5">Sector</th>
                  <th className="py-2.5">Suggested Angle</th>
                  <th className="py-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/40">
                {prospects
                  .filter(p => {
                    if (prospectFilter === 'A') return p.priority === 'A';
                    if (prospectFilter === 'Agency') return p.segment?.toLowerCase().includes('agency');
                    if (prospectFilter === 'Brand') return !p.segment?.toLowerCase().includes('agency');
                    return true;
                  })
                  .map((p) => {
                    const isChecked = selectedIds.has(p.id);
                    const hasEmail = Boolean(p.email);
                    return (
                      <tr key={p.id} className={`hover:bg-[#fafbf7] transition-colors ${isChecked ? 'bg-[#f0fbe8]/40' : ''}`}>
                        <td className="py-3 pl-2">
                          <input
                            type="checkbox"
                            disabled={!hasEmail}
                            checked={isChecked}
                            onChange={() => toggleSelectProspect(p.id)}
                            className="rounded text-jelly-deep focus:ring-jelly-deep h-3.5 w-3.5 disabled:opacity-30 cursor-pointer"
                          />
                        </td>
                        <td className="py-3 pr-2">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                            p.priority === 'A' ? 'bg-[#f0fbe8] text-[#2d7a00] border border-[#c8f0a0]' : 'bg-cream text-muted'
                          }`}>
                            Tier {p.priority}
                          </span>
                        </td>
                        <td className="py-3 pr-3">
                          <div className="font-semibold text-ink flex items-center gap-1.5">
                            <span>{p.company}</span>
                            {p.website && (
                              <a href={p.website} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-jelly-deep">
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                          <div className="text-[11px] text-muted">{p.country} · {p.email || 'Contact Form / Careers'}</div>
                        </td>
                        <td className="py-3 pr-3 text-muted text-[11px] max-w-[120px] truncate">{p.sector}</td>
                        <td className="py-3 pr-3 text-ink/80 text-[11px] max-w-[280px]">
                          <p className="line-clamp-2">{p.pitchAngle}</p>
                        </td>
                        <td className="py-3 text-right">
                          <button
                            onClick={() => handleSelectProspect(p)}
                            className="bg-ink hover:bg-ink/90 text-white font-mono text-[10px] px-3 py-1.5 rounded-full shadow-sm transition-all cursor-pointer whitespace-nowrap"
                          >
                            Load &amp; Draft →
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── CAMPAIGN & SUPPRESSION LOG ── */}
        <div className="bg-white border border-line rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-ink font-mono">
                Persistent Campaign Log &amp; Suppressed Contacts ({campaignLeads.length})
              </h2>
              <p className="text-xs text-muted font-light mt-0.5">
                Automatically tracks drafts, approved sends, and suppresses duplicate or opted-out leads.
              </p>
            </div>
            <button
              onClick={fetchLeads}
              className="text-xs font-mono text-muted hover:text-ink flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingLeads ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>

          {campaignLeads.length === 0 ? (
            <p className="text-xs text-muted font-light py-6 text-center">
              No leads tracked yet. Analyze and send your first prospect above.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-line/60 font-mono text-muted uppercase text-[10px]">
                    <th className="py-2.5">Company / Email</th>
                    <th className="py-2.5">Country</th>
                    <th className="py-2.5">Service Fit</th>
                    <th className="py-2.5">Status</th>
                    <th className="py-2.5">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/40">
                  {campaignLeads.map((l) => (
                    <tr key={l.id} className="hover:bg-[#fafbf7]">
                      <td className="py-3 pr-4">
                        <div className="font-semibold text-ink">{l.companyName || 'Unknown'}</div>
                        <div className="text-[11px] text-muted">{l.email}</div>
                      </td>
                      <td className="py-3 pr-4 text-muted">{l.country}</td>
                      <td className="py-3 pr-4 text-ink font-mono text-[11px]">{l.recommendedService}</td>
                      <td className="py-3 pr-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                          l.status === 'sent' 
                            ? 'bg-[#f0fbe8] text-[#2d7a00]' 
                            : l.status === 'opted_out' || l.status === 'suppressed'
                            ? 'bg-red-50 text-red-600'
                            : 'bg-cream text-muted'
                        }`}>
                          {l.status}
                        </span>
                      </td>
                      <td className="py-3 text-muted text-[11px]">
                        {new Date(l.sentAt || l.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

      {/* ── HUMAN APPROVAL MODAL ── */}
      <AnimatePresence>
        {showApprovalModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease }}
              className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-line shadow-2xl space-y-5"
            >
              <div className="w-10 h-10 rounded-full bg-[#f0fbe8] border border-[#c8f0a0] flex items-center justify-center text-jelly-deep">
                <ShieldCheck className="w-5 h-5" />
              </div>

              <div>
                <h3 className="font-serif text-2xl text-ink font-normal">
                  Confirm Human Approval
                </h3>
                <p className="text-xs text-muted font-light mt-1">
                  You are about to dispatch this proposal to:
                </p>
                <div className="bg-[#fafbf7] border border-line/60 rounded-xl p-3 text-xs mt-3 space-y-1 font-mono">
                  <div><strong>To:</strong> {currentLead?.email}</div>
                  <div><strong>Subject:</strong> {editedSubject}</div>
                  <div><strong>Mode:</strong> {isSimulated ? '🧪 Test Simulation' : '🚀 Live Delivery via SMTP'}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setShowApprovalModal(false)}
                  className="w-1/2 py-2.5 rounded-full border border-line text-xs font-semibold hover:bg-cream transition-colors cursor-pointer"
                >
                  Cancel / Edit
                </button>
                <button
                  onClick={handleExecuteSend}
                  disabled={isSending}
                  className="w-1/2 py-2.5 rounded-full bg-ink text-white hover:bg-ink/90 text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isSending ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-jelly" />
                      <span>Dispatching...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-jelly" />
                      <span>Confirm &amp; Send</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
        {/* ── BATCH REVIEW & THROTTLED DISPATCH MODAL ── */}
        {showBatchModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease }}
              className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 border border-line shadow-2xl my-8 max-h-[90vh] flex flex-col space-y-5"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between pb-4 border-b border-line">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-jelly/20 flex items-center justify-center text-ink">
                      <Sliders className="w-4 h-4" />
                    </div>
                    <h3 className="font-serif text-2xl text-ink font-normal">
                      Batch Outreach Review &amp; Dispatch
                    </h3>
                  </div>
                  <p className="text-xs text-muted font-light">
                    Review each personalized pitch before dispatching. Human verification required before sending.
                  </p>
                </div>
                <button
                  onClick={() => setShowBatchModal(false)}
                  className="p-2 text-muted hover:text-ink hover:bg-cream rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Controls Toolbar: Throttle & Simulation Mode */}
              <div className="bg-[#fafbf7] border border-line/60 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-jelly-deep" />
                    <span className="text-xs font-semibold text-ink">Drip Delay:</span>
                    <select
                      value={batchDelay}
                      onChange={(e) => setBatchDelay(Number(e.target.value))}
                      className="bg-white border border-line rounded-lg px-2.5 py-1 text-xs font-mono text-ink focus:outline-none focus:border-jelly"
                    >
                      <option value={15}>15s (Fast)</option>
                      <option value={30}>30s (Recommended)</option>
                      <option value={45}>45s (Conservative)</option>
                      <option value={60}>60s (Ultra Safe)</option>
                    </select>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={batchIsSimulated}
                      onChange={(e) => setBatchIsSimulated(e.target.checked)}
                      className="w-4 h-4 rounded text-ink border-line focus:ring-0 cursor-pointer accent-black"
                    />
                    <span className="text-xs font-semibold text-ink">
                      Simulation Mode {batchIsSimulated ? '(Safe Test Run)' : '(LIVE SEND)'}
                    </span>
                  </label>
                </div>

                <div className="text-xs font-mono text-muted">
                  Queue: <strong className="text-ink">{batchDrafts.length}</strong> prospect{batchDrafts.length === 1 ? '' : 's'}
                </div>
              </div>

              {/* Batch Report Banner (if just dispatched) */}
              {batchReport && (
                <div className="p-4 rounded-2xl border bg-[#f0fbe8] border-[#c8f0a0] text-xs text-ink space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-[#2d7a00]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Batch Dispatch Completed ({batchReport.mode === 'simulation' ? 'SIMULATION' : 'LIVE'})</span>
                  </div>
                  <div>
                    Sent: <strong>{batchReport.sentCount}</strong> | Skipped: <strong>{batchReport.skippedCount}</strong> | Failed: <strong>{batchReport.failedCount}</strong>
                  </div>
                </div>
              )}

              {/* Scrollable Drafts List */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-1 min-h-[220px]">
                {batchDrafts.length === 0 ? (
                  <div className="text-center py-12 text-muted text-xs font-mono">
                    No drafts currently in queue.
                  </div>
                ) : (
                  batchDrafts.map((draft, idx) => (
                    <div 
                      key={draft.leadId || idx}
                      className="bg-white border border-line rounded-2xl p-4 shadow-sm space-y-3 relative group hover:border-jelly-mid/40 transition-colors"
                    >
                      {/* Draft Header */}
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-ink">{draft.company}</span>
                            <span className="text-xs font-mono text-muted">({draft.to})</span>
                            {draft.country && (
                              <span className="text-[10px] bg-cream px-2 py-0.5 rounded-full text-muted border border-line/40">
                                {draft.country}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono bg-jelly/20 text-ink px-2 py-0.5 rounded-full font-semibold">
                              Target: {draft.targetService || 'Custom'}
                            </span>
                            {draft.matchedCaseStudy && (
                              <span className="text-[10px] font-mono bg-[#fafbf7] text-muted px-2 py-0.5 rounded-full border border-line/50">
                                Proof: {draft.matchedCaseStudy}
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => handleRemoveDraft(idx)}
                          title="Remove from batch"
                          className="p-1.5 text-muted hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Subject input */}
                      <div>
                        <label className="text-[10px] font-mono uppercase tracking-wider text-muted block mb-1">
                          Subject Line:
                        </label>
                        <input
                          type="text"
                          value={draft.subject}
                          onChange={(e) => handleUpdateBatchDraft(idx, 'subject', e.target.value)}
                          className="w-full text-xs font-medium bg-[#fafbf7] border border-line/60 rounded-xl px-3 py-2 text-ink focus:outline-none focus:border-jelly"
                        />
                      </div>

                      {/* Pitch Body */}
                      <div>
                        <label className="text-[10px] font-mono uppercase tracking-wider text-muted block mb-1">
                          Personalized Pitch:
                        </label>
                        <textarea
                          rows={4}
                          value={draft.body}
                          onChange={(e) => handleUpdateBatchDraft(idx, 'body', e.target.value)}
                          className="w-full text-xs font-normal leading-relaxed bg-[#fafbf7] border border-line/60 rounded-xl p-3 text-ink focus:outline-none focus:border-jelly resize-y font-sans"
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-line flex items-center justify-between gap-4">
                <button
                  onClick={() => setShowBatchModal(false)}
                  className="px-6 py-2.5 rounded-full border border-line text-xs font-semibold hover:bg-cream transition-colors cursor-pointer"
                >
                  Close
                </button>

                <button
                  onClick={handleExecuteBatchSend}
                  disabled={isBatchDispatching || batchDrafts.length === 0}
                  className="px-8 py-2.5 rounded-full bg-ink text-white hover:bg-ink/90 text-xs font-semibold transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isBatchDispatching ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-jelly" />
                      <span>Throttling Queue ({batchDelay}s delay)...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-jelly" />
                      <span>
                        Confirm &amp; Dispatch {batchDrafts.length} Pitch{batchDrafts.length === 1 ? '' : 'es'}
                        {batchIsSimulated ? ' (Test Run)' : ' (Live SMTP)'}
                      </span>
                    </>
                  )}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

