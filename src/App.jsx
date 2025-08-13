import React, { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [assets, setAssets] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingAssets, setLoadingAssets] = useState(false);

  // This useEffect fetches the list of users when the component mounts.
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/users') // Make sure this URL matches your Laravel API
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setLoadingUsers(false);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
        setLoadingUsers(false);
      });
  }, []);

  // This function fetches assets for a specific user.
  const fetchAssets = (userId) => {
    setLoadingAssets(true);
    setSelectedUser(userId);
    fetch(`http://127.0.0.1:8000/api/users/${userId}/assets`) // Make sure this URL matches your Laravel API
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setAssets(data);
        setLoadingAssets(false);
      })
      .catch(error => {
        console.error(`Error fetching assets for user ${userId}:`, error);
        setLoadingAssets(false);
      });
  };

  return (
    <div className=" bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
       
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 animate-pulse">
            User Assets Dashboard
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-purple-500/25 transition-all duration-500">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-8 bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full"></div>
              <h2 className="text-2xl font-bold text-white">Users</h2>
            </div>
            
            {loadingUsers ? (
              <div className="flex items-center justify-center py-12">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-cyan-500 rounded-full animate-spin animation-delay-150"></div>
                </div>
                <p className="ml-4 text-gray-300 text-lg">Loading users...</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                {users.map(user => (
                  <div
                    key={user.id}
                    onClick={() => fetchAssets(user.id)}
                    className={`group relative p-4 rounded-2xl border cursor-pointer transition-all duration-300 transform hover:scale-102 hover:shadow-lg ${
                      selectedUser === user.id
                        ? 'bg-gradient-to-r from-purple-500/30 to-cyan-500/30 border-purple-400 shadow-lg shadow-purple-500/25'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                        selectedUser === user.id
                          ? 'bg-gradient-to-br from-purple-400 to-cyan-400 text-white'
                          : 'bg-white/10 text-gray-300 group-hover:bg-white/20'
                      }`}>
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-white font-medium group-hover:text-cyan-300 transition-colors duration-300">
                        {user.name}
                      </span>
                    </div>
                    {selectedUser === user.id && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-8 bg-gradient-to-b from-purple-400 to-cyan-400 rounded-full"></div>
              <h2 className="text-2xl font-bold text-white">Assets</h2>
            </div>

            {selectedUser ? (
              loadingAssets ? (
                <div className="flex items-center justify-center py-12">
                  <div className="relative">
                    <div className="w-12 h-12 border-4 border-cyan-200 border-t-cyan-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-purple-500 rounded-full animate-spin animation-delay-150"></div>
                  </div>
                  <p className="ml-4 text-gray-300 text-lg">Loading assets...</p>
                </div>
              ) : (
                assets.length > 0 ? (
                  <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                    {assets.map((asset, index) => (
                      <div
                        key={asset.tokenId}
                        className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-102 hover:shadow-lg hover:shadow-cyan-500/20"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="absolute top-4 right-4">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                            <div className="w-4 h-4 bg-white rounded opacity-80"></div>
                          </div>
                        </div>
                        
                        <div className="pr-12">
                          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                            {asset.assetName}
                          </h3>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-400 text-sm">Token ID:</span>
                              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-mono">
                                {asset.tokenId}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-400 text-sm">Count:</span>
                              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-bold">
                                {asset.tokenCount}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Hover effect */}
                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-gray-400 rounded opacity-60"></div>
                    </div>
                    <p className="text-gray-400 text-lg">No assets found for this user.</p>
                  </div>
                )
              )
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center animate-pulse">
                  <div className="w-8 h-8 text-white">👤</div>
                </div>
                <p className="text-gray-300 text-lg mb-2">Please select a user</p>
                <p className="text-gray-500">to view their assets</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(139, 92, 246, 0.3) transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, rgba(139, 92, 246, 0.5), rgba(34, 211, 238, 0.5));
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, rgba(139, 92, 246, 0.8), rgba(34, 211, 238, 0.8));
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animation-delay-150 {
          animation-delay: 150ms;
        }
        
        .animation-delay-2000 {
          animation-delay: 2000ms;
        }
      `}</style>
    </div>
  );
}

export default App;