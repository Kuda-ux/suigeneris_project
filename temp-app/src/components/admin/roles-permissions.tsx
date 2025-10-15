'use client';

import { useState, useEffect } from 'react';
import { Shield, Users, Settings, Eye, Edit, Trash2, Plus, Check, X, UserPlus, RefreshCw, Search, Filter, Crown, Lock, Unlock } from 'lucide-react';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  createdAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

const permissions = [
  { id: 'dashboard.view', name: 'View Dashboard', category: 'Dashboard' },
  { id: 'products.view', name: 'View Products', category: 'Products' },
  { id: 'products.create', name: 'Create Products', category: 'Products' },
  { id: 'products.edit', name: 'Edit Products', category: 'Products' },
  { id: 'products.delete', name: 'Delete Products', category: 'Products' },
  { id: 'stock.view', name: 'View Stock', category: 'Stock' },
  { id: 'stock.issue', name: 'Issue Stock', category: 'Stock' },
  { id: 'stock.receive', name: 'Receive Stock', category: 'Stock' },
  { id: 'stock.return', name: 'Process Returns', category: 'Stock' },
  { id: 'orders.view', name: 'View Orders', category: 'Orders' },
  { id: 'orders.edit', name: 'Edit Orders', category: 'Orders' },
  { id: 'orders.fulfill', name: 'Fulfill Orders', category: 'Orders' },
  { id: 'reports.view', name: 'View Reports', category: 'Reports' },
  { id: 'reports.export', name: 'Export Reports', category: 'Reports' },
  { id: 'users.view', name: 'View Users', category: 'Users' },
  { id: 'users.manage', name: 'Manage Users', category: 'Users' },
  { id: 'settings.view', name: 'View Settings', category: 'Settings' },
  { id: 'settings.edit', name: 'Edit Settings', category: 'Settings' },
];

// API functions for roles and permissions
const fetchRoles = async (): Promise<Role[]> => {
  try {
    const response = await fetch('/api/admin/roles');
    if (!response.ok) throw new Error('Failed to fetch roles');
    return await response.json();
  } catch (error) {
    console.error('Error fetching roles:', error);
    return [];
  }
};

const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch('/api/admin/users');
    if (!response.ok) throw new Error('Failed to fetch users');
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

const createRole = async (roleData: Omit<Role, 'id' | 'createdAt'>): Promise<Role | null> => {
  try {
    const response = await fetch('/api/admin/roles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(roleData)
    });
    if (!response.ok) throw new Error('Failed to create role');
    return await response.json();
  } catch (error) {
    console.error('Error creating role:', error);
    return null;
  }
};

const updateRole = async (id: string, roleData: Partial<Role>): Promise<Role | null> => {
  try {
    const response = await fetch(`/api/admin/roles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(roleData)
    });
    if (!response.ok) throw new Error('Failed to update role');
    return await response.json();
  } catch (error) {
    console.error('Error updating role:', error);
    return null;
  }
};

export function RolesPermissions() {
  const [activeTab, setActiveTab] = useState<'roles' | 'users'>('roles');
  const [roles, setRoles] = useState<Role[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [rolesData, usersData] = await Promise.all([
          fetchRoles(),
          fetchUsers()
        ]);
        setRoles(rolesData);
        setUsers(usersData);
        setError(null);
      } catch (err) {
        setError('Failed to load roles and users data');
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getPermissionsByCategory = () => {
    const grouped: { [key: string]: typeof permissions } = {};
    permissions.forEach(permission => {
      if (!grouped[permission.category]) {
        grouped[permission.category] = [];
      }
      grouped[permission.category].push(permission);
    });
    return grouped;
  };

  const hasPermission = (rolePermissions: string[], permissionId: string) => {
    return rolePermissions.includes(permissionId);
  };

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    totalRoles: roles.length,
    adminUsers: users.filter(u => u.role === 'Admin').length
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users and roles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-600 mt-1">Manage users, roles and permissions</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => { setRoles([]); setUsers([]); setLoading(true); setTimeout(() => setLoading(false), 1000); }}
            className="flex items-center px-4 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
          <button
            onClick={() => setShowRoleModal(true)}
            className="flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
          >
            <UserPlus className="h-5 w-5 mr-2" />
            Add User
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-start justify-between mb-3">
            <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
          <h3 className="text-white text-3xl font-bold mb-1">{stats.totalUsers}</h3>
          <p className="text-blue-100 text-sm font-medium">Total Users</p>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-start justify-between mb-3">
            <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
              <Unlock className="h-6 w-6 text-white" />
            </div>
          </div>
          <h3 className="text-white text-3xl font-bold mb-1">{stats.activeUsers}</h3>
          <p className="text-emerald-100 text-sm font-medium">Active Users</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-start justify-between mb-3">
            <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
          </div>
          <h3 className="text-white text-3xl font-bold mb-1">{stats.totalRoles}</h3>
          <p className="text-purple-100 text-sm font-medium">Total Roles</p>
        </div>
        
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-start justify-between mb-3">
            <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
              <Crown className="h-6 w-6 text-white" />
            </div>
          </div>
          <h3 className="text-white text-3xl font-bold mb-1">{stats.adminUsers}</h3>
          <p className="text-amber-100 text-sm font-medium">Administrators</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-1 inline-flex">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center ${
            activeTab === 'users'
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Users className="h-4 w-4 mr-2" />
          Users
        </button>
        <button
          onClick={() => setActiveTab('roles')}
          className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center ${
            activeTab === 'roles'
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Shield className="h-4 w-4 mr-2" />
          Roles & Permissions
        </button>
      </div>

      {activeTab === 'roles' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Roles List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-sg-gray-200">
              <div className="p-4 border-b border-sg-gray-200">
                <h3 className="text-lg font-semibold text-sg-black">Roles</h3>
              </div>
              <div className="divide-y divide-sg-gray-200">
                {roles.map((role) => (
                  <div
                    key={role.id}
                    onClick={() => setSelectedRole(role)}
                    className={`p-4 cursor-pointer hover:bg-sg-gray-50 ${
                      selectedRole?.id === role.id ? 'bg-sg-navy/5 border-r-2 border-sg-navy' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-sg-black">{role.name}</h4>
                        <p className="text-sm text-sg-gray-600">{role.description}</p>
                        <p className="text-xs text-sg-gray-500 mt-1">
                          {role.userCount} users • {role.permissions.length} permissions
                        </p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button className="text-sg-gray-400 hover:text-sg-gray-600">
                          <Edit className="h-4 w-4" />
                        </button>
                        {role.name !== 'Admin' && (
                          <button className="text-red-400 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Permissions Detail */}
          <div className="lg:col-span-2">
            {selectedRole ? (
              <div className="bg-white rounded-lg shadow-sm border border-sg-gray-200">
                <div className="p-6 border-b border-sg-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-sg-black">{selectedRole.name} Permissions</h3>
                      <p className="text-sm text-sg-gray-600">{selectedRole.description}</p>
                    </div>
                    <button className="bg-sg-navy hover:bg-sg-navy/90 text-white px-4 py-2 rounded-lg text-sm">
                      Edit Role
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  {Object.entries(getPermissionsByCategory()).map(([category, categoryPermissions]) => (
                    <div key={category} className="mb-6">
                      <h4 className="text-sm font-semibold text-sg-black mb-3 uppercase tracking-wide">
                        {category}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {categoryPermissions.map((permission) => (
                          <div
                            key={permission.id}
                            className="flex items-center justify-between p-3 bg-sg-gray-50 rounded-lg"
                          >
                            <span className="text-sm text-sg-gray-700">{permission.name}</span>
                            {hasPermission(selectedRole.permissions, permission.id) ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <X className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-sg-gray-200 p-12 text-center">
                <Shield className="h-12 w-12 text-sg-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-sg-gray-900 mb-2">Select a Role</h3>
                <p className="text-sg-gray-600">Choose a role from the list to view its permissions</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b-2 border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">All Users</h3>
              <p className="text-sm text-gray-600 mt-1">Manage user accounts and permissions</p>
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Last Activity
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 font-medium">No users found</p>
                      <p className="text-gray-400 text-sm mt-1">Add users to get started</p>
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-blue-50/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm mr-3">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-900">{user.name}</div>
                            <div className="text-xs text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-3 py-1.5 text-xs font-bold rounded-full border-2 ${
                          user.role === 'Admin' 
                            ? 'bg-purple-100 text-purple-800 border-purple-200' 
                            : user.role === 'Manager'
                            ? 'bg-blue-100 text-blue-800 border-blue-200'
                            : 'bg-gray-100 text-gray-800 border-gray-200'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1.5 text-xs font-bold rounded-full border-2 ${
                          user.status === 'active' 
                            ? 'bg-green-100 text-green-800 border-green-200' 
                            : 'bg-red-100 text-red-800 border-red-200'
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full mr-1.5 ${
                            user.status === 'active' ? 'bg-green-600' : 'bg-red-600'
                          }`}></span>
                          {user.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                        {new Date(user.lastLogin).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="Edit User">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete User">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
