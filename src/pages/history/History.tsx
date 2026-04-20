import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle2, XCircle } from 'lucide-react';
import { dummyHistory } from '@/data/dummy';

export function History() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="px-6 pt-6 pb-4 flex items-center gap-4 bg-card sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-muted">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">History</h1>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-4">
          {dummyHistory.map(item => (
            <div key={item.id} className="bg-card rounded-2xl p-4 border border-border flex items-center gap-4 shadow-sm">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${item.status === 'visited' ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-500'}`}>
                {item.status === 'visited' ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
              </div>
              <div className="flex-1">
                <h4 className="font-bold mb-1">{item.activityTitle}</h4>
                <p className="text-sm text-muted-foreground">{item.date}</p>
              </div>
              <div className={`text-xs font-bold px-2 py-1 rounded-md ${item.status === 'visited' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                {item.status.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
