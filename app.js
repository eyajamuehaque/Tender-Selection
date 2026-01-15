const { useState, useMemo } = React;

const IconCalculator = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>
);
const IconPlus = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
);
const IconTrash = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
);
const IconEdit = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
);
const IconX = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const IconInfo = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
);
const IconAlert = ({ size = 12 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
);
const IconCheck = ({ size = 12, className = "" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
);
const IconFileText = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
);
const IconTrendingDown = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></svg>
);
const IconFacebook = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline mr-1"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);


const App = () => {
    const [oce, setOce] = useState(''); 
    const [nppiFactor, setNppiFactor] = useState(''); 
    const [bidders, setBidders] = useState([]);
    const [newBidder, setNewBidder] = useState({ name: '', price: '' });
    
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState('');
    const [editPrice, setEditPrice] = useState('');

    const results = useMemo(() => {
        const numericOce = parseFloat(oce) || 0;
        const factor = parseFloat(nppiFactor) || 0;
        
        if (!bidders || bidders.length === 0 || numericOce === 0 || factor === 0) return null;

        const totalPrices = bidders.reduce((sum, b) => sum + (parseFloat(b.price) || 0), 0);
        const xi = totalPrices / bidders.length;
        const calculatedNppi = numericOce * factor;
        const xwa = (numericOce * 0.20) + (xi * 0.50) + (calculatedNppi * 0.30);
        const varianceSum = bidders.reduce((sum, b) => {
            const price = parseFloat(b.price) || 0;
            return sum + Math.pow(price - xwa, 2);
        }, 0);
        const sd = Math.sqrt(varianceSum / bidders.length);
        const sltLimit = xwa - sd;

        const evaluatedBidders = bidders.map(b => {
            const price = parseFloat(b.price) || 0;
            const isResponsive = price >= sltLimit;
            return { 
                ...b, 
                price, 
                isResponsive,
                deviation: price - xwa
            };
        });

        const responsiveBids = evaluatedBidders.filter(b => b.isResponsive);
        const winner = responsiveBids.length > 0 
            ? responsiveBids.reduce((prev, curr) => (prev.price < curr.price ? prev : curr))
            : null;

        return { 
            xi, 
            weightedAverage: xwa, 
            sd, 
            slt: sltLimit, 
            nppi: calculatedNppi,
            evaluatedBidders, 
            winner 
        };
    }, [oce, nppiFactor, bidders]);

    const addBidder = () => {
        if (newBidder.name.trim() && newBidder.price) {
            setBidders([
                ...bidders, 
                { 
                    id: Date.now(), 
                    name: newBidder.name.trim(), 
                    price: parseFloat(newBidder.price) 
                }
            ]);
            setNewBidder({ name: '', price: '' });
        }
    };

    const removeBidder = (id) => {
        if(editingId === id) cancelEdit();
        setBidders(bidders.filter(b => b.id !== id));
    };

    const startEdit = (bidder) => {
        setEditingId(bidder.id);
        setEditName(bidder.name);
        setEditPrice(bidder.price.toString());
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditName('');
        setEditPrice('');
    };

    const saveEdit = (id) => {
        if (editName.trim() && editPrice) {
            setBidders(bidders.map(b => 
                b.id === id ? { ...b, name: editName.trim(), price: parseFloat(editPrice) } : b
            ));
            setEditingId(null);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8 text-slate-900 flex flex-col">
            <div className="max-w-6xl mx-auto flex-grow w-full">
                <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                            <span className="text-blue-600"><IconCalculator /></span>
                            পিপিআর মূল্যায়ন ক্যালকুলেটর
                        </h1>
                        
                    </div>
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 w-fit h-fit">
                        <IconFileText />
                        <span className="font-semibold text-sm">Tenderer List</span>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 space-y-6">
                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-800">
                                <IconInfo className="text-blue-500" />
                                প্যারামিটারসমূহ
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-600 mb-1">
                                        দাপ্তরিক প্রাক্কলিত ব্যয় (X<sub>OCE</sub>)
                                    </label>
                                    <input 
                                        type="number" 
                                        placeholder="পরিমাণ লিখুন"
                                        value={oce}
                                        onChange={(e) => setOce(e.target.value)}
                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-600 mb-1">
                                        সাম্প্রতিক মূল্য সূচক 
                                    </label>
                                    <input 
                                        type="number" 
                                        placeholder="পরিমাণ লিখুন"
                                        value={nppiFactor}
                                        onChange={(e) => setNppiFactor(e.target.value)}
                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono"
                                    />
                                    {results && (
                                        <p className="mt-1 text-[11px] text-blue-600 font-bold">
                                            Calculated X<sub>NPPI</sub>: {results.nppi.toFixed(2)}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </section>

                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                            <h2 className="text-lg font-bold mb-4 text-slate-800">দরপত্র জমা</h2>
                            <div className="space-y-3 mb-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                                {bidders.length === 0 && (
                                    <p className="text-center py-8 text-slate-400 text-sm italic">এখনো কোনো ঠিকাদার যোগ করা হয়নি।</p>
                                )}
                                {bidders.map((bidder) => (
                                    <div key={bidder.id} className={`p-3 rounded-xl border transition-all ${editingId === bidder.id ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-100 hover:border-slate-300'}`}>
                                        {editingId === bidder.id ? (
                                            <div className="space-y-2">
                                                <input 
                                                    className="w-full px-2 py-1 text-sm border rounded outline-none focus:border-blue-500"
                                                    value={editName}
                                                    onChange={(e) => setEditName(e.target.value)}
                                                    autoFocus
                                                />
                                                <div className="flex gap-2">
                                                    <input 
                                                        type="number"
                                                        className="flex-1 px-2 py-1 text-sm border rounded outline-none focus:border-blue-500 font-mono"
                                                        value={editPrice}
                                                        onChange={(e) => setEditPrice(e.target.value)}
                                                    />
                                                    <button onClick={() => saveEdit(bidder.id)} className="text-emerald-600 hover:bg-emerald-100 p-1 rounded transition-colors"><IconCheck size={18} /></button>
                                                    <button onClick={cancelEdit} className="text-slate-400 hover:bg-slate-200 p-1 rounded transition-colors"><IconX /></button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-between group">
                                                <div className="overflow-hidden">
                                                    <p className="font-bold text-sm truncate text-slate-700">{bidder.name}</p>
                                                    <p className="text-xs font-mono text-slate-500">Rate: {parseFloat(bidder.price).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <button 
                                                        onClick={() => startEdit(bidder)}
                                                        className="text-slate-400 hover:text-blue-600 p-2 transition-colors"
                                                        title="এডিট করুন"
                                                    >
                                                        <IconEdit />
                                                    </button>
                                                    <button 
                                                        onClick={() => removeBidder(bidder.id)}
                                                        className="text-slate-400 hover:text-red-500 p-2 transition-colors"
                                                        title="মুছে ফেলুন"
                                                    >
                                                        <IconTrash />
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            
                            <div className="space-y-3 pt-4 border-t border-slate-100">
                                <input 
                                    placeholder="ঠিকাদারের নাম"
                                    className="w-full px-4 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-slate-50"
                                    value={newBidder.name}
                                    onChange={(e) => setNewBidder({...newBidder, name: e.target.value})}
                                />
                                <div className="flex gap-2">
                                    <input 
                                        type="number"
                                        placeholder="উদ্ধৃত মূল্য"
                                        className="flex-1 px-4 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-slate-50 font-mono"
                                        value={newBidder.price}
                                        onChange={(e) => setNewBidder({...newBidder, price: e.target.value})}
                                    />
                                    <button 
                                        onClick={addBidder}
                                        disabled={!newBidder.name || !newBidder.price}
                                        className="bg-blue-600 text-white px-4 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-200"
                                    >
                                        <IconPlus />
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        {results ? (
                            <>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="bg-white p-5 rounded-2xl border-b-4 border-blue-500 shadow-sm text-center">
                                        <p className="text-[12px] font-bold text-slate-400 mb-1 uppercase">Average (Xi)</p>
                                        <p className="text-xl font-mono font-bold text-slate-800 tracking-tight">{results.xi.toFixed(4)}</p>
                                    </div>
                                    <div className="bg-white p-5 rounded-2xl border-b-4 border-indigo-500 shadow-sm text-center">
                                        <p className="text-[12px] font-bold text-slate-400 mb-1 uppercase">Weighted Average</p>
                                        <p className="text-xl font-mono font-bold text-slate-800 tracking-tight">{results.weightedAverage.toFixed(4)}</p>
                                    </div>
                                    <div className="bg-white p-5 rounded-2xl border-b-4 border-purple-500 shadow-sm text-center">
                                        <p className="text-[12px] font-bold text-slate-400 mb-1 uppercase">Standard Deviation</p>
                                        <p className="text-xl font-mono font-bold text-slate-800 tracking-tight">{results.sd.toFixed(4)}</p>
                                    </div>
                                    <div className="bg-white p-5 rounded-2xl border-b-4 border-red-500 shadow-sm text-center">
                                        <p className="text-[12px] font-bold text-slate-400 mb-1 uppercase text-red-600">SLT Limit</p>
                                        <p className="text-xl font-mono font-bold text-red-600 tracking-tight">{results.slt.toFixed(4)}</p>
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                                    <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                                        <h2 className="text-xl font-bold text-slate-800">Tenderer List</h2>
                                        <span className="text-[10px] font-bold px-2 py-1 bg-blue-100 text-blue-600 rounded-md uppercase tracking-tighter">Real-time</span>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-slate-50 text-slate-500 text-[13px] font-bold border-b border-slate-100">
                                                    <th className="px-6 py-4 font-bold">ঠিকাদার</th>
                                                    <th className="px-6 py-4 text-center">উদ্ধৃত মূল্য</th>
                                                    <th className="px-6 py-4 text-center">যোগ্যতা</th>
                                                    <th className="px-6 py-4 text-right">পার্থক্য</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-sm">
                                                {results.evaluatedBidders.map((bidder) => (
                                                    <tr key={bidder.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                                        <td className="px-6 py-4 font-bold text-slate-700">{bidder.name}</td>
                                                        <td className="px-6 py-4 text-center font-mono font-semibold text-slate-600">
                                                            {parseFloat(bidder.price).toFixed(2)}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex justify-center">
                                                                {bidder.isResponsive ? (
                                                                    <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[11px] font-bold border border-emerald-100">
                                                                        <IconCheck size={12} className="text-emerald-500" /> উপযুক্ত
                                                                    </span>
                                                                ) : (
                                                                    <span className="flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 rounded-full text-[11px] font-bold border border-red-100">
                                                                        <IconAlert /> অযোগ্য 
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td className={`px-6 py-4 text-right font-mono font-medium ${bidder.deviation < 0 ? 'text-red-500' : 'text-slate-400'}`}>
                                                            {bidder.deviation > 0 ? '+' : ''}{parseFloat(bidder.deviation).toFixed(2)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {results.winner ? (
                                    <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                            <div className="flex items-start gap-4">
                                                <div className="bg-blue-500 p-3 rounded-xl shadow-lg shadow-blue-500/30">
                                                    <IconTrendingDown />
                                                </div>
                                                <div>
                                                    <p className="text-blue-400 text-[12px] font-bold uppercase tracking-wider mb-1">উপযুক্ত ঠিকাদার</p>
                                                    <h3 className="text-2xl font-bold tracking-tight">{results.winner.name}</h3>
                                                    <p className="text-slate-400 text-sm mt-1">
                                                        উপযুক্ত দর: <span className="text-white font-mono font-bold px-1">{parseFloat(results.winner.price).toFixed(2)}</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end border-l border-slate-800 pl-6">
                                                <p className="text-[12px] text-slate-500 font-bold mb-1 uppercase tracking-tight">সাশ্রয়/অতিরিক্ত</p>
                                                <p className={`text-3xl font-bold font-mono ${results.winner.price < parseFloat(oce) ? 'text-emerald-400' : 'text-amber-400'}`}>
                                                    {(((parseFloat(results.winner.price) - parseFloat(oce)) / parseFloat(oce)) * 100).toFixed(2)}%
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-red-800 flex items-center gap-4">
                                        <IconAlert size={32} />
                                        <div>
                                            <p className="font-bold">যোগ্য দরপত্র পাওয়া যায়নি</p>
                                            <p className="text-sm font-mono opacity-80 tracking-tight">All submitted prices are below the threshold of {results.slt.toFixed(4)}.</p>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="h-full min-h-[400px] bg-white rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                    <IconCalculator />
                                </div>
                                <h3 className="text-slate-600 font-bold text-lg">তথ্যের জন্য অপেক্ষমাণ</h3>
                                <p className="max-w-xs text-sm mt-2">OCE এবং ফ্যাক্টর ইনপুট দিন এবং মূল্যায়ন শুরু করতে অন্তত একজন ঠিকাদার যোগ করুন।</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            <footer className="max-w-6xl mx-auto w-full mt-12 mb-8 py-6 border-t border-slate-200 text-center">
                <p className="text-slate-500 text-sm font-medium">
                    Made By: <a href="https://www.facebook.com/eyajamuehaq/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline font-bold transition-all flex items-center justify-center gap-1">
                        <IconFacebook /> Eya Jamue Haque
                    </a>
                </p>
            </footer>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
