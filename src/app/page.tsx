'use client';

import { useState, useEffect } from 'react';
import { PlusCircle, Flame, Activity, PieChart, Calendar } from 'lucide-react';

interface MacroItem {
  _id: string;
  title: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  date: string;
}

export default function Home() {
  const [macros, setMacros] = useState<MacroItem[]>([]);
  const [form, setForm] = useState({
    title: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [loading, setLoading] = useState(false);

  // Data Fetching function
  const fetchMacros = async () => {
    try {
      const res = await fetch('/api/macros');
      const data = await res.json();
      if (data.success) {
        setMacros(data.data);
      }
    } catch (error) {
      console.error('Error fetching macros:', error);
    }
  };

  useEffect(() => {
    fetchMacros();
  }, []);

  // Form Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/macros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        setForm({
          title: '',
          calories: '',
          protein: '',
          carbs: '',
          fats: '',
          date: new Date().toISOString().split('T')[0],
        });
        fetchMacros();
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error saving macro:', error);
    } finally {
      setLoading(false);
    }
  };

  // Total Calculations
  const totalCalories = macros.reduce((acc, item) => acc + Number(item.calories), 0);
  const totalProtein = macros.reduce((acc, item) => acc + Number(item.protein), 0);
  const totalCarbs = macros.reduce((acc, item) => acc + Number(item.carbs), 0);
  const totalFats = macros.reduce((acc, item) => acc + Number(item.fats), 0);

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-indigo-50 text-slate-800 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="text-center space-y-2 py-6 border-b border-emerald-100">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent">
            MacroBalance Pro
          </h1>
          <p className="text-slate-600 text-sm md:text-base font-medium">
            Track your daily nutrition, monitor compliance, and master your health goals effortlessly.
          </p>
        </header>

        {/* Stats Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/80 border border-emerald-100 p-4 rounded-2xl shadow-sm backdrop-blur flex items-center space-x-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl"><Flame size={24} /></div>
            <div>
              <p className="text-xs text-slate-500 font-semibold">Total Calories</p>
              <h3 className="text-xl font-bold text-slate-800">{totalCalories} kcal</h3>
            </div>
          </div>
          <div className="bg-white/80 border border-blue-100 p-4 rounded-2xl shadow-sm backdrop-blur flex items-center space-x-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl"><Activity size={24} /></div>
            <div>
              <p className="text-xs text-slate-500 font-semibold">Protein</p>
              <h3 className="text-xl font-bold text-slate-800">{totalProtein}g</h3>
            </div>
          </div>
          <div className="bg-white/80 border border-amber-100 p-4 rounded-2xl shadow-sm backdrop-blur flex items-center space-x-4">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-xl"><PieChart size={24} /></div>
            <div>
              <p className="text-xs text-slate-500 font-semibold">Carbs</p>
              <h3 className="text-xl font-bold text-slate-800">{totalCarbs}g</h3>
            </div>
          </div>
          <div className="bg-white/80 border border-rose-100 p-4 rounded-2xl shadow-sm backdrop-blur flex items-center space-x-4">
            <div className="p-3 bg-rose-100 text-rose-600 rounded-xl"><Calendar size={24} /></div>
            <div>
              <p className="text-xs text-slate-500 font-semibold">Fats</p>
              <h3 className="text-xl font-bold text-slate-800">{totalFats}g</h3>
            </div>
          </div>
        </div>

        {/* Form and Entries Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form */}
          <div className="bg-white/90 border border-slate-200/80 p-6 rounded-2xl shadow-md backdrop-blur h-fit">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-emerald-700">
              <PlusCircle size={20} /> Add Meal Entry
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Meal / Food Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chicken & Rice"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Calories (kcal)</label>
                  <input
                    type="number"
                    required
                    placeholder="500"
                    value={form.calories}
                    onChange={(e) => setForm({ ...form, calories: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Protein (g)</label>
                  <input
                    type="number"
                    required
                    placeholder="40"
                    value={form.protein}
                    onChange={(e) => setForm({ ...form, protein: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Carbs (g)</label>
                  <input
                    type="number"
                    required
                    placeholder="60"
                    value={form.carbs}
                    onChange={(e) => setForm({ ...form, carbs: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Fats (g)</label>
                  <input
                    type="number"
                    required
                    placeholder="15"
                    value={form.fats}
                    onChange={(e) => setForm({ ...form, fats: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Date</label>
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-emerald-600/20 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Add Entry'}
              </button>
            </form>
          </div>

          {/* Entries List */}
          <div className="lg:col-span-2 bg-white/90 border border-slate-200/80 p-6 rounded-2xl shadow-md backdrop-blur">
            <h2 className="text-xl font-bold mb-4 text-emerald-700">Recent Entries</h2>
            {macros.length === 0 ? (
              <p className="text-slate-400 text-center py-12">No macro entries recorded yet. Add your first meal!</p>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {macros.map((item) => (
                  <div
                    key={item._id}
                    className="bg-slate-50 border border-slate-200/80 p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-emerald-300 transition-all shadow-sm"
                  >
                    <div>
                      <h4 className="font-bold text-base text-slate-800">{item.title}</h4>
                      <p className="text-xs text-slate-500">{item.date}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-lg border border-emerald-200">
                        {item.calories} kcal
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg border border-blue-200">
                        P: {item.protein}g
                      </span>
                      <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-lg border border-amber-200">
                        C: {item.carbs}g
                      </span>
                      <span className="px-3 py-1 bg-rose-100 text-rose-700 text-xs font-semibold rounded-lg border border-rose-200">
                        F: {item.fats}g
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </main>
  );
}