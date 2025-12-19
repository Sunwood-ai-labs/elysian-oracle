
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { DICE_CONFIGS } from './constants';
import { DiceType, RollResult, RollBatch } from './types';
import DiceIcon from './components/DiceIcon';
import { interpretRoll } from './services/geminiService';

const App: React.FC = () => {
  const [currentBatch, setCurrentBatch] = useState<RollBatch | null>(null);
  const [history, setHistory] = useState<RollBatch[]>([]);
  const [selectedType, setSelectedType] = useState<DiceType>('d20');
  const [quantity, setQuantity] = useState<number>(1);
  const [isRolling, setIsRolling] = useState(false);
  const [isInterpreting, setIsInterpreting] = useState(false);
  
  const historyRef = useRef<HTMLDivElement>(null);

  const rollDice = useCallback(async () => {
    if (isRolling) return;

    setIsRolling(true);
    setCurrentBatch(null);

    // Simulate physics/rolling delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const config = DICE_CONFIGS.find(c => c.type === selectedType);
    if (!config) return;

    const newRolls: RollResult[] = Array.from({ length: quantity }).map(() => {
      let value: number | string;
      if (selectedType === 'coin') {
        value = Math.random() > 0.5 ? 'Heads' : 'Tails';
      } else {
        value = Math.floor(Math.random() * config.sides) + 1;
      }

      return {
        id: Math.random().toString(36).substring(7),
        type: selectedType,
        value,
        timestamp: Date.now(),
      };
    });

    const total = selectedType === 'coin' 
      ? newRolls.filter(r => r.value === 'Heads').length 
      : (newRolls.map(r => r.value as number).reduce((a, b) => a + b, 0));

    const batch: RollBatch = {
      id: Math.random().toString(36).substring(7),
      rolls: newRolls,
      total,
      timestamp: Date.now(),
    };

    setCurrentBatch(batch);
    setHistory(prev => [batch, ...prev].slice(0, 20));
    setIsRolling(false);
  }, [isRolling, selectedType, quantity]);

  const handleInterpret = async () => {
    if (!currentBatch || isInterpreting) return;
    setIsInterpreting(true);
    const interpretation = await interpretRoll(currentBatch);
    
    setCurrentBatch(prev => prev ? { ...prev, aiInterpretation: interpretation } : null);
    setHistory(prev => prev.map(item => item.id === currentBatch.id ? { ...item, aiInterpretation: interpretation } : item));
    setIsInterpreting(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden text-slate-100 font-sans">
      {/* Sidebar - Controls */}
      <aside className="w-full md:w-80 lg:w-96 glass-panel p-6 flex flex-col gap-8 z-20 border-r border-white/5 overflow-y-auto">
        <header className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="text-xl font-bold">◈</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Elysian Oracle
          </h1>
        </header>

        <section className="space-y-4">
          <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">Select Die</label>
          <div className="grid grid-cols-4 gap-3">
            {DICE_CONFIGS.map((dice) => (
              <button
                key={dice.type}
                onClick={() => setSelectedType(dice.type)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 border ${
                  selectedType === dice.type
                    ? `bg-gradient-to-br ${dice.color} border-white/30 scale-105 shadow-xl`
                    : 'bg-white/5 border-transparent hover:bg-white/10'
                }`}
              >
                <span className="text-xl mb-1">{dice.icon}</span>
                <span className="text-[10px] font-bold opacity-80">{dice.label}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex justify-between items-end">
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">Quantity</label>
            <span className="text-2xl font-black text-indigo-400">{quantity}</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </section>

        <button
          onClick={rollDice}
          disabled={isRolling}
          className={`relative group w-full py-5 rounded-2xl font-black text-xl tracking-tighter transition-all duration-300 overflow-hidden ${
            isRolling ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-95'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-gradient-x group-hover:opacity-90"></div>
          <div className="relative flex items-center justify-center gap-2">
            {isRolling ? 'CASTING FATE...' : 'ROLL DICE'}
          </div>
        </button>

        <div className="mt-auto pt-8">
          <label className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4 block">History</label>
          <div ref={historyRef} className="space-y-3 max-h-64 overflow-y-auto pr-2 scrollbar-hide">
            {history.map((batch) => (
              <div key={batch.id} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono text-slate-500">
                    {new Date(batch.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <div className="flex gap-1">
                    {batch.rolls.slice(0, 3).map((r, i) => (
                      <span key={i} className="text-[10px] bg-indigo-500/20 px-1.5 py-0.5 rounded text-indigo-300">
                        {r.value}
                      </span>
                    ))}
                    {batch.rolls.length > 3 && <span className="text-[10px] text-slate-600">+{batch.rolls.length - 3}</span>}
                  </div>
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-xl font-bold text-white">{batch.total}</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest">{batch.rolls[0].type} total</span>
                </div>
                {batch.aiInterpretation && (
                  <p className="text-[10px] text-slate-400 mt-2 italic line-clamp-2">"{batch.aiInterpretation}"</p>
                )}
              </div>
            ))}
            {history.length === 0 && (
              <div className="text-center py-8 opacity-20 italic text-sm">No fates woven yet...</div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content - Roll Display */}
      <main className="flex-1 relative flex flex-col items-center justify-center p-8 md:p-12 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full -z-10"></div>
        <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full -z-10 animate-pulse"></div>

        {isRolling ? (
          <div className="flex flex-wrap items-center justify-center gap-8 max-w-4xl">
            {Array.from({ length: quantity }).map((_, i) => (
              <div key={i} className="animate-tumble opacity-70 scale-110">
                <DiceIcon type={selectedType} value="?" className="blur-[1px]" />
              </div>
            ))}
          </div>
        ) : currentBatch ? (
          <div className="w-full max-w-5xl flex flex-col items-center">
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-16 px-4">
              {currentBatch.rolls.map((roll, i) => (
                <div 
                  key={roll.id} 
                  className="transition-all duration-700 animate-[bounce_0.5s_ease-out] relative group"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <DiceIcon type={roll.type} value={roll.value} className="dice-shadow" />
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center text-center animate-[fadeIn_0.5s_ease-out]">
              <div className="text-slate-500 text-sm uppercase tracking-[0.4em] mb-2 font-light">Total Result</div>
              <div className="relative">
                <div className="absolute inset-0 blur-3xl bg-indigo-500/20 rounded-full scale-150"></div>
                <div className="relative text-8xl md:text-9xl font-black text-white tracking-tighter drop-shadow-2xl">
                  {currentBatch.total}
                </div>
              </div>
              
              <div className="mt-12 max-w-2xl px-6 py-8 glass-panel rounded-3xl border border-white/10 relative group">
                {currentBatch.aiInterpretation ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2 text-indigo-400">
                      <span className="text-xs font-bold uppercase tracking-widest">Oracle Interpretation</span>
                      <div className="h-[1px] w-8 bg-indigo-500/30"></div>
                    </div>
                    <p className="text-lg md:text-xl font-medium italic text-slate-200 leading-relaxed animate-[fadeIn_0.8s_ease-out]">
                      "{currentBatch.aiInterpretation}"
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={handleInterpret}
                    disabled={isInterpreting}
                    className="flex items-center gap-3 px-8 py-3 bg-white/5 hover:bg-white/10 rounded-full transition-all text-indigo-400 hover:text-indigo-300 disabled:opacity-50"
                  >
                    {isInterpreting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-indigo-500/50 border-t-indigo-500 rounded-full animate-spin"></div>
                        Invoking the Spirits...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 font-bold tracking-tight">
                        <span className="text-xl">✧</span>
                        Interpret this Fate
                      </span>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-32 h-32 bg-slate-900/50 rounded-full flex items-center justify-center border border-white/5 relative group">
              <div className="absolute inset-0 bg-indigo-500/5 rounded-full animate-ping"></div>
              <span className="text-4xl opacity-20 group-hover:opacity-40 transition-opacity">◈</span>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-400">Ready your dice</h2>
              <p className="text-slate-600 text-sm max-w-xs mx-auto">Choose your dice type and quantity from the panel to weave your legend.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
