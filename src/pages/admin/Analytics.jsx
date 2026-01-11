import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  BarChart2, Globe, Users, Activity, Calendar 
} from 'lucide-react';

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get('https://portfolio-be-five-dun.vercel.app/api/analytics');
        setData(res.data);
      } catch (error) {
        console.error("error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-full flex items-center justify-center text-gray-400">
        <div className="flex flex-col items-center gap-3">
          <Activity className="animate-spin text-spotify-green" size={32} />
          <span className="text-sm font-mono">Loading real-time data...</span>
        </div>
      </div>
    );
  }

  // helper untuk menghitung persentase bar chart
  const maxVisits = data?.visitsByDate?.length 
    ? Math.max(...data.visitsByDate.map(d => d.count)) 
    : 1;

  return (
    <div className="min-h-full text-white pb-10">
      
      {/* header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">Analytics</h1>
        <p className="text-gray-400 text-sm md:text-base">Real-time visitor insights from your database.</p>
      </div>

      {/* summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* total visits */}
        <div className="bg-[#181818] p-6 rounded-xl border border-[#333]">
          <div className="flex items-center gap-3 mb-4 text-gray-400">
            <Activity size={20} className="text-spotify-green" />
            <span className="text-xs font-bold uppercase tracking-wider">Total Visits</span>
          </div>
          <p className="text-4xl font-black">{data?.totalVisits || 0}</p>
        </div>

        {/* unique visitors */}
        <div className="bg-[#181818] p-6 rounded-xl border border-[#333]">
          <div className="flex items-center gap-3 mb-4 text-gray-400">
            <Users size={20} className="text-blue-400" />
            <span className="text-xs font-bold uppercase tracking-wider">Unique Visitors</span>
          </div>
          <p className="text-4xl font-black">{data?.uniqueVisitors || 0}</p>
        </div>

        {/* top country */}
        <div className="bg-[#181818] p-6 rounded-xl border border-[#333]">
          <div className="flex items-center gap-3 mb-4 text-gray-400">
            <Globe size={20} className="text-purple-400" />
            <span className="text-xs font-bold uppercase tracking-wider">Top Location</span>
          </div>
          <p className="text-xl font-bold truncate">
            {data?.topCountries?.[0]?._id || 'No Data'}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {data?.topCountries?.[0]?.count || 0} visits
          </p>
        </div>
      </div>

      {/* charts & details grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* traffic chart (last 7 days) */}
        <div className="bg-[#181818] p-6 rounded-xl border border-[#333]">
          <div className="flex items-center gap-2 mb-8">
            <Calendar className="text-gray-400" size={20} />
            <h2 className="text-lg font-bold">Traffic (Last 7 Days)</h2>
          </div>

          <div className="h-48 flex items-end justify-between gap-2">
            {data?.visitsByDate?.length > 0 ? (
              data.visitsByDate.map((item, idx) => {
                const heightPct = (item.count / maxVisits) * 100;
                return (
                  <div key={idx} className="flex flex-col items-center flex-1 group">
                    <div className="w-full bg-[#2a2a2a] rounded-t-sm relative h-full flex items-end overflow-hidden">
                      <div 
                        style={{ height: `${heightPct}%` }} 
                        className="w-full bg-spotify-green/80 group-hover:bg-spotify-green transition-all relative"
                      >
                         <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition border border-[#333]">
                            {item.count}
                         </div>
                      </div>
                    </div>
                    {/* show date only (mm-dd) */}
                    <span className="text-[10px] text-gray-500 mt-2 font-mono">
                      {item._id.substring(5)}
                    </span>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-sm w-full text-center self-center">No traffic data yet.</p>
            )}
          </div>
        </div>

        {/* geographic distribution */}
        <div className="bg-[#181818] p-6 rounded-xl border border-[#333]">
          <div className="flex items-center gap-2 mb-6">
            <Globe className="text-gray-400" size={20} />
            <h2 className="text-lg font-bold">Top Countries</h2>
          </div>

          <div className="space-y-4">
            {data?.topCountries?.length > 0 ? (
              data.topCountries.map((geo, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center text-xs font-bold text-gray-400">
                      {idx + 1}
                    </div>
                    <span className="font-medium text-sm">{geo._id}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-1.5 bg-[#2a2a2a] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500" 
                        style={{ width: `${(geo.count / data.totalVisits) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold w-6 text-right">{geo.count}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No location data yet.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Analytics;