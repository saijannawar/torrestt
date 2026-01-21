import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { createPrimeService, deletePrimeService } from '../../graphql/mutations'; // Check if this path needs to be ../graphql or ../../graphql depending on your folder depth
import { listPrimeServices } from '../../graphql/queries';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'; 
import { Trash2, Link as LinkIcon, Menu, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const client = generateClient();

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [newName, setNewName] = useState('');
  const [newUrl, setNewUrl] = useState('');

  useEffect(() => { fetchServices(); }, []);

  async function fetchServices() {
    try {
      const result = await client.graphql({ query: listPrimeServices });
      const sorted = result.data.listPrimeServices.items.sort((a, b) => a.name.localeCompare(b.name));
      setServices(sorted);
    } catch (err) { console.log('Error fetching services:', err); }
  }

  async function handleAddService() {
    if (!newName || !newUrl) return alert("Please enter both Name and URL");
    try {
      const result = await client.graphql({
        query: createPrimeService,
        variables: { input: { name: newName, url: newUrl, isActive: true } }
      });
      setServices([...services, result.data.createPrimeService]);
      setNewName(''); setNewUrl('');
    } catch (err) { console.error(err); }
  }

  async function handleDeleteService(id) {
    if(!window.confirm("Remove this service?")) return;
    try {
      await client.graphql({ query: deletePrimeService, variables: { input: { id } } });
      setServices(services.filter(s => s.id !== id));
    } catch (err) { console.error(err); }
  }

  return (
    <Authenticator hideSignUp={true}>
      {({ signOut, user }) => (
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-4xl mx-auto">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-8 bg-white p-5 rounded-xl shadow-sm">
              <div className="flex items-center gap-4">
                 <Link to="/admin" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"><ArrowLeft size={20}/></Link>
                 <div>
                    <h1 className="text-2xl font-bold text-gray-900">Manage Services</h1>
                    <p className="text-gray-500 text-sm">Control links in the top black navbar.</p>
                 </div>
              </div>
              <button onClick={signOut} className="text-red-600 text-sm font-bold">Sign Out</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Add Form */}
              <div className="bg-white p-6 rounded-xl shadow-sm h-fit">
                  <h3 className="font-bold flex items-center gap-2 mb-4"><Menu size={18}/> Add New Service</h3>
                  <input className="w-full border p-2 mb-3 rounded" placeholder="Name (e.g. Stock Photos)" value={newName} onChange={e => setNewName(e.target.value)} />
                  <input className="w-full border p-2 mb-4 rounded" placeholder="URL (e.g. /photos)" value={newUrl} onChange={e => setNewUrl(e.target.value)} />
                  <button onClick={handleAddService} className="w-full bg-black text-white py-2 rounded font-bold">Add to Navbar</button>
              </div>

              {/* List */}
              <div className="space-y-3">
                {services.map((service) => (
                  <div key={service.id} className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-900 text-white p-2 rounded"><LinkIcon size={16}/></div>
                      <div>
                          <p className="font-bold">{service.name}</p>
                          <p className="text-xs text-blue-500">{service.url}</p>
                      </div>
                    </div>
                    <button onClick={() => handleDeleteService(service.id)} className="text-gray-400 hover:text-red-600"><Trash2 size={18}/></button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </Authenticator>
  );
};

export default ManageServices;