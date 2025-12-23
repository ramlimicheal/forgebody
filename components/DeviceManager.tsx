
import React, { useState } from 'react';
import { ConnectedDevice } from '../types';
import { MOCK_DEVICES, SUPPORTED_DEVICES } from '../constants';

export const DeviceManager: React.FC = () => {
  const [devices, setDevices] = useState<ConnectedDevice[]>(MOCK_DEVICES);
  const [showAddDevice, setShowAddDevice] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const toggleConnection = (id: string) => {
    setDevices(prev => prev.map(d => 
      d.id === id ? { ...d, connected: !d.connected, lastSync: d.connected ? d.lastSync : 'Just now' } : d
    ));
  };

  const syncDevice = (id: string) => {
    setDevices(prev => prev.map(d => 
      d.id === id ? { ...d, lastSync: 'Just now' } : d
    ));
  };

  return (
    <div className="h-full overflow-y-auto p-12 bg-white animate-fade-in">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-end mb-16 border-b border-slate-50 pb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="tech-label bg-emerald-500 text-white px-2 py-0.5 rounded">Connected</span>
              <span className="tech-label">{devices.filter(d => d.connected).length} Active Devices</span>
            </div>
            <h1 className="text-6xl sport-italic text-slate-900 mb-2">Device Hub</h1>
            <p className="text-slate-400 text-sm font-semibold tracking-tight uppercase">
              Sync your affordable smartwatch data in one place
            </p>
          </div>
          <button 
            onClick={() => setShowAddDevice(true)}
            className="px-8 py-3 bg-slate-900 rounded-full tech-label text-white hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Add Device
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {devices.map((device) => (
            <div 
              key={device.id}
              className={`p-8 border rounded-[2rem] transition-all ${
                device.connected 
                  ? 'border-emerald-200 bg-emerald-50/30' 
                  : 'border-slate-100 bg-white hover:border-slate-200'
              }`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-2xl text-slate-700">
                    {device.type === 'smartwatch' ? 'watch' : device.type === 'band' ? 'fitness_center' : 'monitor_weight'}
                  </span>
                </div>
                <div className={`w-3 h-3 rounded-full ${device.connected ? 'bg-emerald-500 animate-pulse' : 'bg-slate-200'}`}></div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 tracking-tighter italic uppercase mb-1">{device.name}</h3>
              <p className="tech-label !text-[8px] text-slate-400 mb-4">{device.brand}</p>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-slate-400">sync</span>
                  <span className="tech-label !text-[8px]">{device.lastSync}</span>
                </div>
                {device.batteryLevel && (
                  <div className="flex items-center gap-2">
                    <span className={`material-symbols-outlined text-sm ${device.batteryLevel > 20 ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {device.batteryLevel > 80 ? 'battery_full' : device.batteryLevel > 20 ? 'battery_5_bar' : 'battery_1_bar'}
                    </span>
                    <span className="tech-label !text-[8px]">{device.batteryLevel}%</span>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => toggleConnection(device.id)}
                  className={`flex-1 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                    device.connected 
                      ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' 
                      : 'bg-emerald-500 text-white hover:bg-emerald-600'
                  }`}
                >
                  {device.connected ? 'Disconnect' : 'Connect'}
                </button>
                {device.connected && (
                  <button
                    onClick={() => syncDevice(device.id)}
                    className="px-4 py-2.5 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">sync</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-100 pt-16">
          <div className="flex items-center justify-between mb-10">
            <h2 className="tech-label !text-[10px] text-slate-900">Supported Devices</h2>
            <div className="h-[0.5px] flex-1 bg-slate-100 mx-8"></div>
            <span className="tech-label !text-[8px] text-slate-400">{SUPPORTED_DEVICES.reduce((acc, b) => acc + b.models.length, 0)}+ Models</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {SUPPORTED_DEVICES.map((brand) => (
              <button
                key={brand.brand}
                onClick={() => setSelectedBrand(selectedBrand === brand.brand ? null : brand.brand)}
                className={`p-6 border rounded-2xl transition-all text-center ${
                  selectedBrand === brand.brand 
                    ? 'border-slate-900 bg-slate-50' 
                    : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                <span className="text-sm font-bold text-slate-900 tracking-tight">{brand.brand}</span>
                <p className="tech-label !text-[7px] mt-1">{brand.models.length} models</p>
              </button>
            ))}
          </div>

          {selectedBrand && (
            <div className="mt-8 p-8 bg-slate-50 rounded-[2rem] border border-slate-100 animate-fade-in">
              <h3 className="tech-label !text-[9px] text-slate-900 mb-4">{selectedBrand} Compatible Models</h3>
              <div className="flex flex-wrap gap-2">
                {SUPPORTED_DEVICES.find(b => b.brand === selectedBrand)?.models.map((model) => (
                  <span key={model} className="px-4 py-2 bg-white border border-slate-100 rounded-full text-xs font-semibold text-slate-700">
                    {model}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-16 p-12 bg-slate-950 rounded-[3rem] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <span className="material-symbols-outlined text-9xl">bluetooth</span>
          </div>
          <div className="relative z-10">
            <span className="tech-label text-emerald-500 mb-4 inline-block">Universal Compatibility</span>
            <h3 className="text-2xl font-bold tracking-tighter italic mb-4">Works With Any Smartwatch</h3>
            <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
              ForgeBody connects with budget-friendly smartwatches and fitness bands. No expensive hardware required. 
              Get premium health insights from your Xiaomi, Amazfit, Fitbit, or any other affordable wearable.
            </p>
          </div>
        </div>
      </div>

      {showAddDevice && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowAddDevice(false)}>
          <div className="bg-white rounded-[3rem] p-12 max-w-lg w-full mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tighter italic uppercase">Add New Device</h3>
                <p className="tech-label mt-2">Select your smartwatch brand to begin pairing</p>
              </div>
              <button onClick={() => setShowAddDevice(false)} className="text-slate-400 hover:text-slate-900">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {SUPPORTED_DEVICES.slice(0, 6).map((brand) => (
                <button
                  key={brand.brand}
                  className="p-6 border border-slate-100 rounded-2xl hover:border-slate-900 hover:bg-slate-50 transition-all text-left"
                >
                  <span className="text-lg font-bold text-slate-900">{brand.brand}</span>
                  <p className="tech-label !text-[8px] mt-1">{brand.models.length} supported models</p>
                </button>
              ))}
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-400">info</span>
                <p className="text-xs text-slate-600">
                  Make sure Bluetooth is enabled on your phone and your device is in pairing mode.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
